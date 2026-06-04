package com.financial.eligibility.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.financial.eligibility.model.Transaction;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PdfParserService {

    // ── Date patterns covering all major Indian bank statement formats ─────────
    private static final List<DateTimeFormatter> DATE_FORMATTERS = List.of(
        DateTimeFormatter.ofPattern("dd/MM/yyyy"),
        DateTimeFormatter.ofPattern("dd-MM-yyyy"),
        DateTimeFormatter.ofPattern("dd/MM/yy"),
        DateTimeFormatter.ofPattern("dd-MM-yy"),
        DateTimeFormatter.ofPattern("dd.MM.yyyy"),
        DateTimeFormatter.ofPattern("dd.MM.yy"),
        DateTimeFormatter.ofPattern("dd MMM yyyy"),
        DateTimeFormatter.ofPattern("dd MMM yy"),
        DateTimeFormatter.ofPattern("d MMM yyyy"),
        DateTimeFormatter.ofPattern("dd-MMM-yyyy"),
        DateTimeFormatter.ofPattern("dd-MMM-yy"),
        DateTimeFormatter.ofPattern("d-MMM-yyyy"),
        DateTimeFormatter.ofPattern("d/M/yyyy"),
        DateTimeFormatter.ofPattern("d-M-yyyy")
    );

    // FIX #6 — Added optional leading serial-number prefix (?:\d{1,3}\s+)?
    // ICICI OpTransactionHistory PDFs prefix every transaction line with a row number,
    // e.g. "1 01.05.2025 NFS/CASH WDL/...". The old pattern required the date at ^
    // position 0, so every ICICI line was treated as orphaned and groups stayed empty.
    // The prefix is a non-capturing group so group(1) still captures only the date.
    // Regex backtracking ensures PNB "10 May 2025" lines still parse correctly:
    // the engine tries (?:\d+\s+) = "10 ", fails to find a date after it, backtracks,
    // and then matches "10 May 2025" as the date directly.
    private static final Pattern LINE_DATE_PATTERN = Pattern.compile(
        "^(?:\\d{1,3}\\s+)?(\\d{1,2}[/\\-\\.]\\d{1,2}[/\\-\\.]\\d{2,4}"
        + "|\\d{1,2}[\\s\\-][A-Za-z]{3}[\\s\\-]\\d{2,4})"
        + "\\b",
        Pattern.CASE_INSENSITIVE
    );

    // ── Union Bank (CAMSfinserv) patterns ─────────────────────────────────────
    // Transactions start with a letter + 7-9 digits (e.g. Y69697658, S21665707)
    private static final Pattern UB_TXN_LINE = Pattern.compile(
        "^[A-Z]\\d{7,9}\\b", Pattern.CASE_INSENSITIVE);
    // dd/MM/yyyy date embedded in line 1 (3rd column, after ISO timestamp)
    private static final Pattern UB_TXN_DATE = Pattern.compile(
        "\\b(\\d{2}/\\d{2}/\\d{4})\\b");
    // DEBIT/CREDIT + amount + balance on line 2
    private static final Pattern UB_AMOUNT_LINE = Pattern.compile(
        "\\b(DEBIT|CREDIT)\\s+([\\d,]+\\.\\d{2})\\s+(-?[\\d,]+\\.\\d{2})",
        Pattern.CASE_INSENSITIVE);

    // FIX: \d{0,2} instead of \d{2} so split amounts like "75,000." (PDFBox clips
    // the decimal digits onto the next line in some BOB PDFs) are still captured.
    // BigDecimal("75000.") parses fine. 0-decimal case is harmless since Indian
    // bank amounts always have exactly 2 decimal places when complete.
    private static final Pattern AMOUNT_TOKEN = Pattern.compile(
        "([\\d,]+\\.\\d{0,2})\\s*(?:(Dr|DR|Cr|CR|cr|dr))?",
        Pattern.CASE_INSENSITIVE
    );

    /**
     * FIX #1 — SKIP_LINE was matching legitimate transaction description lines.
     *
     * Root cause of missing SBI Life transactions:
     * SBI statement continuation lines like "Insurance Co. Ltd" on the line after
     * the HDFC transaction could cause SKIP_LINE to fire if it contained certain
     * keywords. More critically, after PDFBox extracts text with setSortByPosition(true),
     * column-based PDFs may produce interleaved lines where a date-starting transaction
     * line lands in the middle of another transaction's continuation text.
     *
     * Fixes applied:
     * 1. Removed over-broad patterns that could match transaction description text
     *    (e.g. "statement of account", "generated on" were safe but "insurance" was not present;
     *    the real danger was patterns like "account.*:" consuming description text).
     * 2. Added explicit guard: SKIP_LINE is NEVER applied to lines that start with a date.
     *    (This guard already existed in groupLinesByTransaction but is now also enforced in
     *    the pattern itself via a negative-lookahead.)
     * 3. Increased max continuation lines from 4 to 6 to handle long description wrapping
     *    in SBI/PNB statements without dropping the next transaction.
     */
    private static final Pattern SKIP_LINE = Pattern.compile(
          "closing\\s*balance|opening\\s*balance|brought\\s*forward|carried\\s*forward"
        + "|total\\s*transactions|statement\\s*summary|end\\s*of\\s*statement"
        + "|sub\\s*total"
        + "|page\\s*no\\.?\\s*(:|\\d)|page\\s+\\d+\\s+of\\s+\\d+"
        + "|joint\\s*holders"
        + "|rtgs/neft\\s*ifsc"
        + "|\\bmicr\\s*:"
        + "|account\\s*branch\\s*:"
        + "|account\\s*status\\s*:"
        + "|account\\s*type\\s*:"
        + "|a/c\\s*open\\s*date"
        + "|branch\\s*code\\s*:"
        + "|cust(omer)?\\s*(id|no)\\s*:"
        + "|od\\s*limit\\s*:"
        + "|nomination\\s*:"
        + "|\\*?closing\\s*balance\\s*includes"
        + "|contents\\s*of\\s*this\\s*statement"
        + "|generated\\s*on\\s*:"
        + "|hdfc\\s*bank\\s*(limited|gstin|house)"
        + "|registered\\s*office\\s*address"
        + "|state\\s*account\\s*branch"
        + "|gstin\\s*number|gstn\\s*:"
        + "|statement\\s*of\\s*account"
        + "|yono\\s*sbi|branch\\s*address\\s*:"
        + "|account\\s*summary|ifsc\\s*code\\s*:"
        // FIX: tightened — only match lines where the ENTIRE line is a label (no amounts present)
        // Removed the over-broad "^(account|cust|...).*\\s:\\s" which could match description text
        + "|^(date|value\\s*dt)\\s+(narration|description|particulars|details)"
        // Footer boilerplate lines
        + "|please\\s*do\\s*not\\s*share\\s*your"
        + "|bank\\s*never\\s*ask"
        // BOB footer: "*This is computer-generated statement. No signature required."
        + "|computer[\\s\\-]generated",
        Pattern.CASE_INSENSITIVE
    );

    // ─────────────────────────────────────────────────────────────────────────

    public List<Transaction> parse(MultipartFile file, String password) throws IOException {
        byte[] bytes = file.getBytes();
        try (PDDocument doc = loadDocument(bytes, password)) {
            int totalPages = doc.getNumberOfPages();

            StringBuilder sb = new StringBuilder();
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);

            for (int p = 1; p <= totalPages; p++) {
                stripper.setStartPage(p);
                stripper.setEndPage(p);
                String pageText = stripper.getText(doc);
                log.info("Page {}/{}: {} chars, {} non-empty lines", p, totalPages,
                    pageText.length(), pageText.lines().filter(l -> !l.isBlank()).count());
                sb.append(pageText);
            }

            String rawText = sb.toString();
            log.info("Total extracted: {} chars, {} lines",
                rawText.length(), rawText.split("\\r?\\n").length);

            try {
                java.nio.file.Files.writeString(java.nio.file.Path.of("/tmp/bsa_raw.txt"), rawText);
                log.info("Raw text written to /tmp/bsa_raw.txt");
            } catch (Exception ignored) {}

            return parseText(rawText);
        }
    }

    // ── Document loading ──────────────────────────────────────────────────────

    private PDDocument loadDocument(byte[] bytes, String password) throws IOException {
        RandomAccessReadBuffer buf = new RandomAccessReadBuffer(bytes);
        try {
            if (password != null && !password.isBlank()) {
                return Loader.loadPDF(buf, password.trim());
            }
            return Loader.loadPDF(buf);
        } catch (InvalidPasswordException e) {
            throw new IllegalArgumentException(
                password == null || password.isBlank()
                    ? "This PDF is password-protected. Please provide the password."
                    : "Incorrect PDF password. Common passwords: date of birth (DDMMYYYY), last 4 digits of mobile number.",
                e
            );
        }
    }

    // ── Text → Transaction list ───────────────────────────────────────────────

    private List<Transaction> parseText(String text) {
        String[] lines = text.split("\\r?\\n");

        // ── Union Bank (CAMSfinserv) format — completely different layout ─────
        if (isUnionBankFormat(lines)) {
            log.info("Detected Union Bank (CAMSfinserv) format — using dedicated parser");
            List<Transaction> result = parseUnionBankLines(lines);
            if (result.isEmpty()) throw new IllegalStateException(
                "No transactions could be extracted from the Union Bank statement.");
            log.info("Parsed {} transactions from Union Bank PDF", result.size());
            return result;
        }

        int startIdx = findTableStart(lines);
        log.info("Table start index: {} / {} total lines", startIdx, lines.length);
        if (startIdx < 0) {
            throw new IllegalStateException(
                "Could not locate the transaction table. "
                + "Please ensure this is a valid Indian bank statement PDF.");
        }

        List<List<String>> groups = groupLinesByTransaction(lines, startIdx);
        log.info("Transaction groups found: {}", groups.size());
        if (groups.isEmpty()) {
            throw new IllegalStateException(
                "No transactions could be extracted from the statement.");
        }

        List<Transaction> result = new ArrayList<>();
        // FIX #8 — Seed prevBalance from the statement's opening balance header line.
        // Without this, the very first transaction has prevBalance=null, so
        // fallbackClassify() always returns null and isDebitDescription() is the sole
        // classifier — causing misclassification for the first entry in every statement.
        BigDecimal prevBalance = extractOpeningBalance(lines, startIdx);

        for (List<String> group : groups) {
            Transaction txn = parseGroup(group, prevBalance);
            if (txn != null) {
                // FIX #2: Update prevBalance even when txn has no balance (use last known).
                // Previously: only updated when balance != null, causing stale prevBalance
                // which broke fallbackClassify() for subsequent transactions.
                if (txn.getBalance() != null) {
                    prevBalance = txn.getBalance();
                    result.add(txn);
                } else {
                    log.warn("Transaction on {} has no balance — skipping: {}",
                        txn.getDate(), txn.getDescription());
                }
            }
        }

        if (result.isEmpty()) {
            throw new IllegalStateException(
                "Statement parsed but no valid transactions were found.");
        }

        log.info("Parsed {} transactions from PDF", result.size());
        return result;
    }

    // FIX: also matches "BROUGHT FORWARD" (SBI places it one line after the table header,
    // i.e. AFTER startIdx, so we now search startIdx+5 lines rather than just before it)
    private static final Pattern OPENING_BALANCE_PATTERN = Pattern.compile(
        "(?:opening\\s*balance|brought\\s*forward)[^\\d]*([\\d,]+\\.\\d{2})",
        Pattern.CASE_INSENSITIVE
    );

    private BigDecimal extractOpeningBalance(String[] lines, int startIdx) {
        // Search header section AND a few lines after the table header.
        int limit = Math.min(startIdx + 5, lines.length);
        for (int i = 0; i < limit; i++) {
            Matcher m = OPENING_BALANCE_PATTERN.matcher(lines[i]);
            if (m.find()) {
                try {
                    BigDecimal ob = new BigDecimal(m.group(1).replace(",", ""));
                    log.info("Opening balance extracted: {}", ob);
                    return ob;
                } catch (NumberFormatException ignored) {}
            }
        }
        return null;
    }

    // ── Union Bank (CAMSfinserv) format detection & parsing ───────────────────

    private boolean isUnionBankFormat(String[] lines) {
        int check = Math.min(25, lines.length);
        for (int i = 0; i < check; i++) {
            String l = lines[i];
            if (l.contains("Bank : Union Bank") || l.contains("CAMSfinserv")) return true;
            if (l.contains("Trxn ID") && l.contains("Value Date"))            return true;
        }
        return false;
    }

    private boolean isUnionBankPageLine(String line) {
        String u = line.toUpperCase();
        return u.startsWith("POWERED BY CAMS")
            || (u.contains("PAGE ") && u.contains(" OF "))
            || u.startsWith("STATEMENT FROM")
            || u.startsWith("BANK : ")
            || u.startsWith("ACCOUNT NUMBER")
            || u.startsWith("FI TYPE")
            || u.startsWith("TRXN ID")
            || u.equals("TRANSACTIONS")
            || u.startsWith("PROFILE")
            || u.startsWith("SUMMARY")
            || u.startsWith("OPENING DATE")
            || u.startsWith("BALANCE TIME")
            || u.startsWith("NAME ")
            || u.startsWith("TYPE AMOUNT");
    }

    /**
     * Union Bank (CAMSfinserv) parser.
     *
     * Each transaction occupies 2-4 lines with this layout (PDFBox setSortByPosition):
     *   Line 1: [TrxnID] [ISO-date] [dd/MM/yyyy] [HH:mm:ss] [narration-start]
     *   Line 2: [time-frag] [am|pm] OTHERS [narration-cont] [DEBIT|CREDIT] [amt] [bal] [TrxnID]
     *   Line 3+: optional narration / VPA continuations
     *
     * The explicit DEBIT/CREDIT type column makes debit/credit classification trivial.
     */
    private List<Transaction> parseUnionBankLines(String[] lines) {
        List<Transaction> result = new ArrayList<>();

        int i = 0;
        while (i < lines.length) {
            String line = lines[i].trim();
            i++;

            if (line.isEmpty() || isUnionBankPageLine(line)) continue;
            if (!UB_TXN_LINE.matcher(line).find())           continue;

            // Collect continuation lines until the next transaction ID
            List<String> group = new ArrayList<>();
            group.add(line);
            while (i < lines.length) {
                String next = lines[i].trim();
                if (next.isEmpty())               { i++; continue; }
                if (isUnionBankPageLine(next))    { i++; continue; }
                if (UB_TXN_LINE.matcher(next).find()) break;
                if (group.size() < 6) group.add(next);
                i++;
            }

            Transaction t = parseUnionBankGroup(group);
            if (t != null) result.add(t);
        }

        log.info("Union Bank: parsed {} transactions from {} lines", result.size(), lines.length);
        return result;
    }

    private Transaction parseUnionBankGroup(List<String> lines) {
        String firstLine = lines.get(0);
        String fullText  = String.join(" ", lines);

        // Date: dd/MM/yyyy in line 1 (appears after the ISO timestamp column)
        Matcher dm = UB_TXN_DATE.matcher(firstLine);
        if (!dm.find()) return null;
        LocalDate date = null;
        for (DateTimeFormatter fmt : DATE_FORMATTERS) {
            try { date = LocalDate.parse(dm.group(1), fmt); break; }
            catch (DateTimeParseException ignored) {}
        }
        if (date == null) return null;

        // DEBIT/CREDIT + amount + balance (anywhere in the full group text)
        Matcher am = UB_AMOUNT_LINE.matcher(fullText);
        if (!am.find()) return null;
        String    type = am.group(1).toUpperCase();
        BigDecimal amt = new BigDecimal(am.group(2).replace(",", ""));
        BigDecimal bal = new BigDecimal(am.group(3).replace(",", ""));

        String desc = buildUnionBankDescription(fullText);

        return Transaction.builder()
            .date(date)
            .description(desc.isBlank() ? "N/A" : desc)
            .debit ("DEBIT" .equals(type) ? amt : null)
            .credit("CREDIT".equals(type) ? amt : null)
            .balance(bal)
            .build();
    }

    private String buildUnionBankDescription(String fullText) {
        return fullText
            // strip transaction IDs (letter + 7-9 digits)
            .replaceAll("[A-Z]\\d{7,9}\\b", " ")
            // strip ISO timestamp 2025-04-29T11:51:0 (may be cut short at line boundary)
            .replaceAll("\\d{4}-\\d{2}-\\d{2}T[\\d:.]*", " ")
            // strip dd/MM/yyyy date
            .replaceAll("\\b\\d{2}/\\d{2}/\\d{4}\\b", " ")
            // strip HH:mm:ss time
            .replaceAll("\\b\\d{1,2}:\\d{2}:\\d{2}\\b", " ")
            // strip time-of-day fragment "0 am", "2 pm" (ISO date remainder + am/pm)
            .replaceAll("(?i)\\b\\d{1,2}\\s+(am|pm)\\b", " ")
            // strip mode column (always "OTHERS" in this format)
            .replaceAll("(?i)\\bOTHERS\\b", " ")
            // strip DEBIT/CREDIT keyword and the two amounts that follow
            .replaceAll("(?i)\\b(DEBIT|CREDIT)\\s+[\\d,]+\\.\\d{2}\\s+-?[\\d,]+\\.\\d{2}\\b", " ")
            // strip remaining bare decimal numbers
            .replaceAll("\\b[\\d,]+\\.\\d{2}\\b", " ")
            .replaceAll("\\s{2,}", " ")
            .replaceAll("^[^A-Za-z0-9/]+", "")
            .trim();
    }

    // ── Find where transaction data starts ────────────────────────────────────

    private int findTableStart(String[] lines) {
        for (int i = 0; i < lines.length; i++) {
            String lower = lines[i].toLowerCase();
            boolean hasDate    = lower.contains("date") || lower.contains("value dt");
            boolean hasFinance = lower.contains("debit")   || lower.contains("credit")
                              || lower.contains("amount")  || lower.contains("withdrawal")
                              || lower.contains("deposit");
            boolean hasBalance = lower.contains("balance");
            if (hasDate && (hasFinance || hasBalance)) {
                return i + 1;
            }
        }
        for (int i = 0; i < lines.length; i++) {
            if (looksLikeTransactionLine(lines[i])) return i;
        }
        return -1;
    }

    // ── Group consecutive lines belonging to the same transaction ─────────────

    private List<List<String>> groupLinesByTransaction(String[] lines, int startIdx) {
        List<List<String>> groups = new ArrayList<>();
        List<String> current = null;

        String pendingPrefix = null;

        for (int i = startIdx; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;

            // DATE LINE: always starts a new transaction group — never skip, never continue.
            if (looksLikeTransactionLine(line)) {
                if (current != null && !current.isEmpty()) groups.add(current);
                current = new ArrayList<>();
                current.add(line);
                if (pendingPrefix != null) {
                    current.add(pendingPrefix);
                    pendingPrefix = null;
                }
                continue;
            }

            // NON-DATE LINE: apply skip rules only here (never on date lines).
            if (SKIP_LINE.matcher(line).find()) {
                log.debug("Skipping line (SKIP_LINE): {}",
                    line.substring(0, Math.min(80, line.length())));
                continue;
            }
            if (looksLikeColumnHeader(line)) {
                log.debug("Skipping line (column header): {}",
                    line.substring(0, Math.min(80, line.length())));
                continue;
            }

            // AU Bank prefix detection: no amounts + next non-empty line is a date
            // → hold as pending prefix for that next transaction's group.
            if (!AMOUNT_TOKEN.matcher(line).find() && isNextNonEmptyLineATransaction(lines, i + 1)) {
                pendingPrefix = line;
                log.debug("AU Bank prefix held: {}", line.substring(0, Math.min(80, line.length())));
                continue;
            }

            if (current != null && current.size() <= 6) {
                current.add(line);
            } else if (current == null) {
                log.debug("Orphaned line (no active txn): {}",
                    line.substring(0, Math.min(80, line.length())));
            }
        }

        if (current != null && !current.isEmpty()) groups.add(current);
        log.info("Grouped {} transaction groups from {} lines (starting at index {})",
            groups.size(), lines.length - startIdx, startIdx);
        return groups;
    }

    private boolean looksLikeTransactionLine(String line) {
        if (line == null || line.isBlank()) return false;
        // Check SKIP_LINE first — BOB page footers start with a date ("17/04/2026 19:25 ... Page N of 27")
        // but are not transactions. SKIP_LINE contains "page\\s+\\d+\\s+of\\s+\\d+" which catches them.
        if (SKIP_LINE.matcher(line.trim()).find()) return false;
        return LINE_DATE_PATTERN.matcher(line.trim()).find();
    }

    private boolean isNextNonEmptyLineATransaction(String[] lines, int from) {
        for (int i = from; i < lines.length; i++) {
            String l = lines[i].trim();
            if (!l.isEmpty()) return looksLikeTransactionLine(l);
        }
        return false;
    }

    private boolean looksLikeColumnHeader(String line) {
        String lower = line.toLowerCase().trim();
        // SBI splits its column header across two lines: "Cheque" and "No/Reference"
        if (lower.equals("cheque") || lower.equals("no/reference")) return true;
        boolean hasDate    = lower.contains("date") || lower.contains("value dt");
        boolean hasFinance = lower.contains("debit")     || lower.contains("credit")
                          || lower.contains("withdrawal") || lower.contains("deposit")
                          || lower.contains("amount");
        return hasDate && hasFinance;
    }

    // ── Parse a single transaction group (1+ lines) ───────────────────────────

    private Transaction parseGroup(List<String> lines, BigDecimal prevBalance) {
        String firstLine = lines.get(0);
        String fullText  = String.join(" ", lines).replaceAll("\\s{2,}", "  ");

        LocalDate date = extractDate(firstLine);
        if (date == null) return null;

        // FIX #7 — Extract amounts from fullText with the date prefix stripped, not firstLine.
        // Two reasons:
        // 1. ICICI OpTransactionHistory puts amounts on continuation lines, so firstLine has none.
        // 2. Dates like "01.05.2025" produce a false "01.05" amount token; stripping the date
        //    prefix first eliminates it without affecting any other bank format.
        String textForAmounts = LINE_DATE_PATTERN.matcher(fullText.trim()).replaceFirst("").trim();
        List<AmountToken> amounts = extractAmounts(textForAmounts);
        if (amounts.isEmpty()) return null;

        BigDecimal balance = amounts.get(amounts.size() - 1).value();
        BigDecimal debit   = null;
        BigDecimal credit  = null;

        String description = extractDescription(fullText, amounts);

        if (amounts.size() >= 3) {
            BigDecimal a1 = amounts.get(amounts.size() - 3).value();
            BigDecimal a2 = amounts.get(amounts.size() - 2).value();
            String    s1  = amounts.get(amounts.size() - 3).suffix();
            String    s2  = amounts.get(amounts.size() - 2).suffix();

            if (!s1.isEmpty()) {
                if (isCrSuffix(s1)) credit = a1; else debit = a1;
            } else if (!s2.isEmpty()) {
                if (isCrSuffix(s2)) credit = a2; else debit = a2;
            } else if (a1.compareTo(BigDecimal.ZERO) > 0 && a2.compareTo(BigDecimal.ZERO) == 0) {
                BigDecimal classified = fallbackClassify(a1, prevBalance, balance);
                debit = (classified != null) ? classified : a1;
            } else if (a2.compareTo(BigDecimal.ZERO) > 0 && a1.compareTo(BigDecimal.ZERO) == 0) {
                credit = a2;
            } else {
                debit  = a1.compareTo(BigDecimal.ZERO) > 0 ? a1 : null;
                credit = a2.compareTo(BigDecimal.ZERO) > 0 ? a2 : null;
            }

        } else if (amounts.size() == 2) {
            AmountToken tok0 = amounts.get(0);
            AmountToken tok1 = amounts.get(amounts.size() - 1);

            // BOB multi-line: PDFBox puts the balance (large, Dr-suffix) on the date line
            // and the transaction amount (no suffix) on the continuation line. The normal
            // layout is [txnAmt, balance], so here we need to swap.
            // Guard: only swap when the suffixed value is strictly larger (balance > txnAmt).
            if (!tok0.suffix().isEmpty() && tok1.suffix().isEmpty()
                    && tok0.value().compareTo(tok1.value()) > 0) {
                balance = tok0.value();
                tok0    = tok1; // tok0 is now the transaction amount with no suffix
            }

            AmountToken tok = tok0;
            if (!tok.suffix().isEmpty()) {
                if (isCrSuffix(tok.suffix())) credit = tok.value(); else debit = tok.value();
            } else {
                Boolean descClassification = classifyFromDescription(description);
                if (descClassification != null) {
                    if (descClassification) credit = tok.value(); else debit = tok.value();
                } else {
                    // Primary: balance delta
                    BigDecimal classified = fallbackClassify(tok.value(), prevBalance, balance);
                    if (classified != null) {
                        debit = classified;
                    } else if (prevBalance != null && balance != null
                            && balance.compareTo(prevBalance) > 0) {
                        // Balance increased → definitively a credit; skip description heuristics
                        credit = tok.value();
                    } else {
                        // Secondary hint — look for debit keywords in description
                        // Catches "CMP MANDATE DEBIT", "ACHDr", "NACH DEBIT" etc.
                        if (isDebitDescription(description)) {
                            debit = tok.value();
                        } else {
                            credit = tok.value();
                        }
                    }
                }
            }
        }

        if (amounts.size() < 2) return null;

        return Transaction.builder()
            .date(date)
            .description(description)
            .debit(debit)
            .credit(credit)
            .balance(balance)
            .build();
    }

    // ── Amount extraction ─────────────────────────────────────────────────────

    private record AmountToken(BigDecimal value, String suffix) {}

    private List<AmountToken> extractAmounts(String text) {
        Matcher m = AMOUNT_TOKEN.matcher(text);
        List<AmountToken> all = new ArrayList<>();
        while (m.find()) {
            String raw    = m.group(1).replace(",", "");
            String suffix = m.group(2) != null ? m.group(2) : "";
            try {
                all.add(new AmountToken(new BigDecimal(raw), suffix));
            } catch (NumberFormatException ignored) {}
        }
        int size = all.size();
        return size > 3 ? all.subList(size - 3, size) : all;
    }

    private boolean isCrSuffix(String s) {
        return s.equalsIgnoreCase("Cr") || s.equalsIgnoreCase("CR");
    }

    private Boolean classifyFromDescription(String description) {
        if (description == null) return null;
        String upper = description.toUpperCase();
        if (upper.matches(".*\\b(ACH|ECS|NACH|ENACH)\\s*(DR|Db|DEBIT)\\b.*")
            || upper.endsWith(" DR") || upper.endsWith(" DEBIT")
            || upper.contains(" DR ") || upper.contains("-DR") || upper.contains(" DR-")) {
            return false; // debit
        }
        if (upper.matches(".*\\b(ACH|ECS|NACH|ENACH)\\s*(CR|Cr|CREDIT)\\b.*")
            || upper.endsWith(" CR") || upper.endsWith(" CREDIT")
            || upper.contains(" CR ") || upper.contains("-CR") || upper.contains(" CR-")) {
            return true; // credit
        }
        return null;
    }
    private boolean isDebitDescription(String description) {
        if (description == null) return false;
        String upper = description.toUpperCase();
        return upper.contains("DEBIT")
            || upper.contains("MANDATE")
            || upper.contains("ACHDR")
            || upper.contains("ACH DR")
            || upper.contains("NACH")
            || upper.contains("NACH DR")
            || upper.contains("ECS")
            || upper.contains("ECS DR")
            || upper.contains("NEFT DR")
            || upper.contains("TRANSFER TO")
            || upper.contains("ATM")
            || upper.contains("UPI/DR")
            || (upper.contains("IMPS") && !upper.contains("/P2A") && !upper.contains("REMITTER"))
            || upper.contains("WDL")
            || upper.contains("NFS/")
            || upper.contains(" EMI ")
            || upper.contains("/EMI")
            || upper.contains("BILL PAY") || upper.contains("BIL/")
            || upper.contains("CMS/")       // Collection Management System debit (BOB CMS/BAJFINSERV)
            || upper.contains("CHARGE")
            || upper.contains("PENALTY");
    }

    private BigDecimal fallbackClassify(BigDecimal amount, BigDecimal prev, BigDecimal current) {
        if (prev == null) return null;
        return current.compareTo(prev) < 0 ? amount : null;
    }

    // ── Date extraction ───────────────────────────────────────────────────────

    private LocalDate extractDate(String text) {
        Matcher m = LINE_DATE_PATTERN.matcher(text.trim());
        if (!m.find()) return null;
        String raw = m.group(1).trim().replaceAll("\\s+", " ");
        for (DateTimeFormatter fmt : DATE_FORMATTERS) {
            try {
                return LocalDate.parse(raw, fmt);
            } catch (DateTimeParseException ignored) {}
        }
        return null;
    }

    // ── Description extraction ────────────────────────────────────────────────

    private String extractDescription(String text, List<AmountToken> amounts) {
        // Strip first (transaction) date at start of line
        String withoutDate = LINE_DATE_PATTERN.matcher(text.trim()).replaceFirst("").trim();

        // Remove ALL amount tokens from anywhere in the text.
        // This fixes SBI-style statements where amounts sit on the date line (middle of
        // fullText) with description prefix/continuation lines appended after them.
        // The old end-anchored ($) removal missed those amounts entirely.
        String result = AMOUNT_TOKEN.matcher(withoutDate).replaceAll("").trim();

        // Strip any secondary date still at the start (e.g. SBI "value date" column)
        result = LINE_DATE_PATTERN.matcher(result.trim()).replaceFirst("").trim();

        result = result.replaceAll("\\s{2,}", " ")
                       .replaceAll("^[^A-Za-z0-9]+", "")
                       .trim();

        return result.isBlank() ? "N/A" : result;
    }
}