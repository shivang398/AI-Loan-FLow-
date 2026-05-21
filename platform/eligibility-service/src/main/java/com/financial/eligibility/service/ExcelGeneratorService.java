package com.financial.eligibility.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.financial.eligibility.model.AnalysisResult;
import com.financial.eligibility.model.AnalysisResult.KeyDateBalance;
import com.financial.eligibility.model.AnalysisResult.LoanDetail;
import com.financial.eligibility.model.AnalysisResult.MerchantCategory;
import com.financial.eligibility.model.AnalysisResult.MonthlySummary;
import com.financial.eligibility.model.Transaction;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ExcelGeneratorService {

    private static final DateTimeFormatter DATE_FMT  = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter MONTH_FMT = DateTimeFormatter.ofPattern("MMM yyyy");

    // Brand colours
    private static final byte[] HEADER_COLOR  = hexToRgb("1E293B"); // slate-900
    private static final byte[] ALT_ROW_COLOR = hexToRgb("F8FAFC"); // slate-50
    private static final byte[] CREDIT_COLOR  = hexToRgb("D1FAE5"); // emerald-100
    private static final byte[] DEBIT_COLOR   = hexToRgb("FEE2E2"); // red-100
    private static final byte[] ACCENT_COLOR  = hexToRgb("EFF6FF"); // blue-50
    private static final byte[] BOUNCE_COLOR  = hexToRgb("FFE4E6"); // rose-100
    private static final byte[] SECTION_COLOR = hexToRgb("F1F5F9"); // slate-100

    // ── Public API ────────────────────────────────────────────────────────────

    public byte[] generate(AnalysisResult result) throws IOException {
        try (XSSFWorkbook wb = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Styles s = new Styles(wb);

            buildTransactionSheet (wb, s, result.getTransactions());
            buildMonthlySheet     (wb, s, result.getMonthlySummaries());
            buildAmbSheet         (wb, s, result.getMonthlyAmb(), result.getOverallAmb());
            buildKeyDateSheet     (wb, s, result.getKeyDateBalances(), result.getOverallKeyDateAvg());
            buildCashSheet        (wb, s, result.getCashTransactions());
            buildSalarySheet      (wb, s, result.getSalaryCredits());
            buildEmiSheet         (wb, s, result.getEmiDeductions());
            buildLoanDetailsSheet (wb, s, result.getLoanDetails());
            buildBounceSheet      (wb, s, result.getBounceReturns());
            buildMerchantSheet    (wb, s, result.getMerchantCategories());

            wb.write(out);
            log.info("Generated Excel workbook with {} sheets", wb.getNumberOfSheets());
            return out.toByteArray();
        }
    }

    // ── Sheet 1: Transaction List ─────────────────────────────────────────────

    private void buildTransactionSheet(XSSFWorkbook wb, Styles s, List<Transaction> txns) {
        XSSFSheet sheet = wb.createSheet("Transaction List");
        sheet.setColumnWidth(0, 3200);
        sheet.setColumnWidth(1, 14000);
        sheet.setColumnWidth(2, 3800);
        sheet.setColumnWidth(3, 3800);
        sheet.setColumnWidth(4, 4000);

        writeHeaderRow(sheet, s, new String[]{"Date", "Description", "Debit (₹)", "Credit (₹)", "Balance (₹)"}, 0);
        sheet.createFreezePane(0, 1);

        int rowIdx = 1;
        BigDecimal totalDebit  = BigDecimal.ZERO;
        BigDecimal totalCredit = BigDecimal.ZERO;

        for (Transaction t : txns) {
            Row row = sheet.createRow(rowIdx);
            boolean isCredit = t.isCredit();
            CellStyle rowStyle = (rowIdx % 2 == 0) ? s.altRow : s.normal;
            CellStyle amtStyle = isCredit ? s.creditAmt : s.debitAmt;

            cell     (row, 0, t.getDate() != null ? t.getDate().format(DATE_FMT) : "", rowStyle);
            cell     (row, 1, t.getDescription(), rowStyle);
            cellMoney(row, 2, t.getDebit(),   amtStyle);
            cellMoney(row, 3, t.getCredit(),  amtStyle);
            cellMoney(row, 4, t.getBalance(), s.moneyNormal);

            if (t.getDebit()  != null) totalDebit  = totalDebit.add(t.getDebit());
            if (t.getCredit() != null) totalCredit = totalCredit.add(t.getCredit());
            rowIdx++;
        }

        Row totals = sheet.createRow(rowIdx);
        cell     (totals, 0, "TOTAL", s.totalLabel);
        cell     (totals, 1, txns.size() + " transactions", s.totalLabel);
        cellMoney(totals, 2, totalDebit,  s.totalMoney);
        cellMoney(totals, 3, totalCredit, s.totalMoney);
        cell     (totals, 4, "", s.totalLabel);
    }

    // ── Sheet 2: Monthly Summary ──────────────────────────────────────────────

    private void buildMonthlySheet(XSSFWorkbook wb, Styles s,
                                   Map<YearMonth, MonthlySummary> summaries) {
        XSSFSheet sheet = wb.createSheet("Monthly Summary");
        sheet.setColumnWidth(0, 3200);
        sheet.setColumnWidth(1, 4000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 4500);
        sheet.setColumnWidth(4, 3200);

        writeHeaderRow(sheet, s, new String[]{"Month", "Total Credits (₹)", "Total Debits (₹)",
                                              "Closing Balance (₹)", "Transactions"}, 0);
        int rowIdx = 1;
        for (Map.Entry<YearMonth, MonthlySummary> e : summaries.entrySet()) {
            MonthlySummary ms = e.getValue();
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell     (row, 0, e.getKey().format(MONTH_FMT), base);
            cellMoney(row, 1, ms.getTotalCredits(),  s.creditAmt);
            cellMoney(row, 2, ms.getTotalDebits(),   s.debitAmt);
            cellMoney(row, 3, ms.getClosingBalance(), s.moneyNormal);
            cellNum  (row, 4, ms.getTransactionCount(), base);
            rowIdx++;
        }
    }

    // ── Sheet 3: Average Monthly Balance ─────────────────────────────────────

    private void buildAmbSheet(XSSFWorkbook wb, Styles s,
                               Map<YearMonth, BigDecimal> monthlyAmb, BigDecimal overall) {
        XSSFSheet sheet = wb.createSheet("Avg Monthly Balance");
        sheet.setColumnWidth(0, 3200);
        sheet.setColumnWidth(1, 5000);

        writeHeaderRow(sheet, s, new String[]{"Month", "Average Monthly Balance (₹)"}, 0);

        int rowIdx = 1;
        for (Map.Entry<YearMonth, BigDecimal> e : monthlyAmb.entrySet()) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell     (row, 0, e.getKey().format(MONTH_FMT), base);
            cellMoney(row, 1, e.getValue(), s.moneyNormal);
            rowIdx++;
        }

        sheet.createRow(rowIdx); // spacer
        Row overallRow = sheet.createRow(rowIdx + 1);
        cell     (overallRow, 0, "OVERALL AMB", s.totalLabel);
        cellMoney(overallRow, 1, overall, s.totalMoney);
    }

    // ── Sheet 4: Banking Balance on Key Dates ────────────────────────────────

    private static final int[] KEY_DATES = {1, 5, 10, 15, 20, 25, 30};

    private void buildKeyDateSheet(XSSFWorkbook wb, Styles s,
                                   Map<YearMonth, KeyDateBalance> keyDateBalances,
                                   BigDecimal overallAvg) {
        XSSFSheet sheet = wb.createSheet("Banking Balance (Key Dates)");
        sheet.setColumnWidth(0, 3200);
        for (int i = 1; i <= KEY_DATES.length; i++) sheet.setColumnWidth(i, 4000);
        sheet.setColumnWidth(KEY_DATES.length + 1, 4500);

        writeHeaderRow(sheet, s,
            new String[]{"Month", "1st", "5th", "10th", "15th", "20th", "25th", "30th", "Avg Balance (₹)"}, 0);
        sheet.createFreezePane(0, 1);

        int rowIdx = 1;
        for (Map.Entry<YearMonth, KeyDateBalance> e : keyDateBalances.entrySet()) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell(row, 0, e.getKey().format(MONTH_FMT), base);
            Map<Integer, BigDecimal> dateBalances = e.getValue().getDateBalances();
            int col = 1;
            for (int keyDate : KEY_DATES) {
                cellMoney(row, col++, dateBalances.get(keyDate), s.moneyNormal);
            }
            cellMoney(row, col, e.getValue().getAverageBalance(), s.totalMoney);
            rowIdx++;
        }

        sheet.createRow(rowIdx); // spacer
        Row overallRow = sheet.createRow(rowIdx + 1);
        cell(overallRow, 0, "OVERALL AVG", s.totalLabel);
        for (int col = 1; col <= KEY_DATES.length; col++) cell(overallRow, col, "", s.totalLabel);
        cellMoney(overallRow, KEY_DATES.length + 1, overallAvg, s.totalMoney);
    }

    // ── Sheet 5: Cash Analysis ────────────────────────────────────────────────

    private void buildCashSheet(XSSFWorkbook wb, Styles s, List<Transaction> cash) {
        XSSFSheet sheet = wb.createSheet("Cash Analysis");
        sheet.setColumnWidth(0, 3200);
        sheet.setColumnWidth(1, 12000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 3000);

        writeHeaderRow(sheet, s, new String[]{"Date", "Description", "Amount (₹)", "Type"}, 0);

        int rowIdx = 1;
        for (Transaction t : cash) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            boolean dep = t.isCredit();
            cell     (row, 0, fmt(t.getDate()), base);
            cell     (row, 1, t.getDescription(), base);
            cellMoney(row, 2, t.getAmount(), dep ? s.creditAmt : s.debitAmt);
            cell     (row, 3, dep ? "DEPOSIT" : "WITHDRAWAL", dep ? s.tagGreen : s.tagRed);
            rowIdx++;
        }

        if (cash.isEmpty()) infoRow(sheet, rowIdx, "No cash transactions detected.", s);
    }

    // ── Sheet 6: Salary Credits ───────────────────────────────────────────────

    private void buildSalarySheet(XSSFWorkbook wb, Styles s, List<Transaction> salary) {
        XSSFSheet sheet = wb.createSheet("Salary Credits");
        sheet.setColumnWidth(0, 3200);
        sheet.setColumnWidth(1, 14000);
        sheet.setColumnWidth(2, 4000);

        writeHeaderRow(sheet, s, new String[]{"Date", "Description", "Amount (₹)"}, 0);

        int rowIdx = 1;
        BigDecimal total = BigDecimal.ZERO;
        for (Transaction t : salary) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell     (row, 0, fmt(t.getDate()), base);
            cell     (row, 1, t.getDescription(), base);
            cellMoney(row, 2, t.getCredit(), s.creditAmt);
            if (t.getCredit() != null) total = total.add(t.getCredit());
            rowIdx++;
        }

        if (salary.isEmpty()) {
            infoRow(sheet, rowIdx, "No salary credits detected.", s);
        } else {
            Row tot = sheet.createRow(rowIdx + 1);
            cell     (tot, 0, "TOTAL SALARY", s.totalLabel);
            cell     (tot, 1, "", s.totalLabel);
            cellMoney(tot, 2, total, s.totalMoney);
        }
    }

    // ── Sheet 7: EMI & Loan Deductions (grouped by month, dates shown) ─────────

    private void buildEmiSheet(XSSFWorkbook wb, Styles s, List<Transaction> emis) {
        XSSFSheet sheet = wb.createSheet("EMI & Loan Deductions");
        sheet.setColumnWidth(0, 3000);  // Month
        sheet.setColumnWidth(1, 3000);  // Date
        sheet.setColumnWidth(2, 14000); // Description
        sheet.setColumnWidth(3, 4000);  // Amount
        sheet.setColumnWidth(4, 4000);  // Month Total

        writeHeaderRow(sheet, s,
            new String[]{"Month", "Date", "Description", "EMI Amount (₹)", "Month Total (₹)"}, 0);
        sheet.createFreezePane(0, 1);

        if (emis.isEmpty()) {
            infoRow(sheet, 1, "No EMI or loan deductions detected.", s);
            return;
        }

        // Group by month (TreeMap preserves chronological order)
        Map<YearMonth, List<Transaction>> byMonth = emis.stream()
            .collect(Collectors.groupingBy(
                t -> YearMonth.from(t.getDate()), TreeMap::new, Collectors.toList()));

        int rowIdx = 1;
        BigDecimal grandTotal = BigDecimal.ZERO;

        for (Map.Entry<YearMonth, List<Transaction>> entry : byMonth.entrySet()) {
            YearMonth ym       = entry.getKey();
            List<Transaction> monthEmis = entry.getValue();
            BigDecimal monthTotal = monthEmis.stream()
                .map(Transaction::getDebit).filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            grandTotal = grandTotal.add(monthTotal);

            boolean firstInMonth = true;
            for (Transaction t : monthEmis) {
                Row row = sheet.createRow(rowIdx);
                CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
                cell     (row, 0, firstInMonth ? ym.format(MONTH_FMT) : "", base);
                cell     (row, 1, fmt(t.getDate()), base);
                cell     (row, 2, t.getDescription(), base);
                cellMoney(row, 3, t.getDebit(), s.debitAmt);
                if (firstInMonth) cellMoney(row, 4, monthTotal, s.totalMoney);
                else              cell     (row, 4, "", base);
                firstInMonth = false;
                rowIdx++;
            }
        }

        Row tot = sheet.createRow(rowIdx + 1);
        cell     (tot, 0, "GRAND TOTAL", s.totalLabel);
        cell     (tot, 1, "", s.totalLabel);
        cell     (tot, 2, emis.size() + " EMI payments across " + byMonth.size() + " months", s.totalLabel);
        cellMoney(tot, 3, grandTotal, s.totalMoney);
        cell     (tot, 4, "", s.totalLabel);
    }

    // ── Sheet 8: Loan Details ────────────────────────────────────────────────

    private void buildLoanDetailsSheet(XSSFWorkbook wb, Styles s, List<LoanDetail> loans) {
        XSSFSheet sheet = wb.createSheet("Loan Details");

        if (loans == null || loans.isEmpty()) {
            sheet.setColumnWidth(0, 8000);
            writeHeaderRow(sheet, s,
                new String[]{"Lender / Loan", "Category", "Avg EMI (₹)", "Pay Day",
                             "Payments", "Total Paid (₹)", "First Payment", "Last Payment"}, 0);
            infoRow(sheet, 1, "No EMI/loan patterns detected.", s);
            return;
        }

        // ── Part 1: Loan summary table ────────────────────────────────────────
        sheet.setColumnWidth(0, 7000);
        sheet.setColumnWidth(1, 5000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 3200);
        sheet.setColumnWidth(4, 3000);
        sheet.setColumnWidth(5, 4500);
        sheet.setColumnWidth(6, 3500);
        sheet.setColumnWidth(7, 3500);

        writeHeaderRow(sheet, s,
            new String[]{"Lender / Loan", "Category", "Avg EMI (₹)", "Typical Pay Day",
                         "Payments Made", "Total Paid (₹)", "First Payment", "Last Payment"}, 0);
        sheet.createFreezePane(0, 1);

        int rowIdx = 1;
        for (LoanDetail loan : loans) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell     (row, 0, loan.getLenderName(), base);
            cell     (row, 1, loan.getLoanCategory(), base);
            cellMoney(row, 2, loan.getAvgEmiAmount(), s.debitAmt);
            int d = loan.getPaymentDayOfMonth();
            cell     (row, 3, d > 0 ? d + ordinal(d) + " of month" : "—", base);
            cellNum  (row, 4, loan.getPaymentCount(), base);
            cellMoney(row, 5, loan.getTotalPaid(), s.debitAmt);
            cell     (row, 6, fmt(loan.getFirstPaymentDate()), base);
            cell     (row, 7, fmt(loan.getLastPaymentDate()), base);
            rowIdx++;
        }

        rowIdx += 2; // spacer before calendar section

        // ── Part 2: Monthly payment calendar ─────────────────────────────────
        // Collect all months across all loans
        Set<YearMonth> allMonths = new TreeSet<>();
        for (LoanDetail loan : loans) {
            if (loan.getMonthlyPaymentDates() != null)
                allMonths.addAll(loan.getMonthlyPaymentDates().keySet());
        }
        if (allMonths.isEmpty()) return;

        // Cap calendar columns at 6 loans to keep the sheet readable
        List<LoanDetail> calLoans = loans.size() > 6 ? loans.subList(0, 6) : loans;

        // Calendar header row
        String[] calHeaders = new String[calLoans.size() + 2];
        calHeaders[0] = "Month";
        for (int i = 0; i < calLoans.size(); i++) {
            int pd = calLoans.get(i).getPaymentDayOfMonth();
            calHeaders[i + 1] = calLoans.get(i).getLenderName()
                + (pd > 0 ? " (" + pd + ordinal(pd) + ")" : "");
        }
        calHeaders[calLoans.size() + 1] = "Monthly Total (₹)";

        // Set calendar column widths
        sheet.setColumnWidth(0, 3000);
        for (int i = 1; i <= calLoans.size(); i++) sheet.setColumnWidth(i, 4500);
        sheet.setColumnWidth(calLoans.size() + 1, 4500);

        writeHeaderRow(sheet, s, calHeaders, rowIdx);
        rowIdx++;

        for (YearMonth ym : allMonths) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell(row, 0, ym.format(MONTH_FMT), base);
            BigDecimal rowTotal = BigDecimal.ZERO;
            for (int i = 0; i < calLoans.size(); i++) {
                LoanDetail loan = calLoans.get(i);
                if (loan.getMonthlyPaymentDates() == null
                        || !loan.getMonthlyPaymentDates().containsKey(ym)) {
                    cell(row, i + 1, "—", base);
                    continue;
                }
                // Sum debits for this loan in this month
                BigDecimal lmt = loan.getPayments().stream()
                    .filter(t -> t.getDate() != null && YearMonth.from(t.getDate()).equals(ym))
                    .map(Transaction::getDebit).filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
                cellMoney(row, i + 1, lmt, s.debitAmt);
                rowTotal = rowTotal.add(lmt);
            }
            cellMoney(row, calLoans.size() + 1, rowTotal, s.totalMoney);
            rowIdx++;
        }
    }

    // Returns "st", "nd", "rd", "th" suffix for a day of month
    private String ordinal(int d) {
        if (d >= 11 && d <= 13) return "th";
        return switch (d % 10) { case 1 -> "st"; case 2 -> "nd"; case 3 -> "rd"; default -> "th"; };
    }

    // ── Sheet 9: Bounce / Return Flags ───────────────────────────────────────

    private void buildBounceSheet(XSSFWorkbook wb, Styles s, List<Transaction> bounces) {
        XSSFSheet sheet = wb.createSheet("Bounce & Return Flags");
        sheet.setColumnWidth(0, 3200);
        sheet.setColumnWidth(1, 14000);
        sheet.setColumnWidth(2, 4000);
        sheet.setColumnWidth(3, 3500);

        writeHeaderRow(sheet, s, new String[]{"Date", "Description", "Amount (₹)", "Flag"}, 0);

        int rowIdx = 1;
        for (Transaction t : bounces) {
            Row row = sheet.createRow(rowIdx++);
            cell     (row, 0, fmt(t.getDate()), s.bounceRow);
            cell     (row, 1, t.getDescription(), s.bounceRow);
            cellMoney(row, 2, t.getAmount(), s.debitAmt);
            cell     (row, 3, "⚠ FLAGGED", s.tagRed);
        }

        if (bounces.isEmpty()) infoRow(sheet, rowIdx, "No bounce or return entries detected.", s);
    }

    // ── Sheet 10: Top Merchants / Categories ─────────────────────────────────

    private void buildMerchantSheet(XSSFWorkbook wb, Styles s,
                                    Map<String, MerchantCategory> merchants) {
        XSSFSheet sheet = wb.createSheet("Top Merchants & Categories");
        sheet.setColumnWidth(0, 5000);
        sheet.setColumnWidth(1, 3200);
        sheet.setColumnWidth(2, 4500);

        writeHeaderRow(sheet, s, new String[]{"Category", "Transactions", "Total Spent (₹)"}, 0);

        int rowIdx = 1;
        for (MerchantCategory mc : merchants.values()) {
            Row row = sheet.createRow(rowIdx);
            CellStyle base = rowIdx % 2 == 0 ? s.altRow : s.normal;
            cell     (row, 0, mc.getCategory(), base);
            cellNum  (row, 1, (int) mc.getCount(), base);
            cellMoney(row, 2, mc.getTotalAmount(), s.debitAmt);
            rowIdx++;
        }

        if (merchants.isEmpty()) infoRow(sheet, rowIdx, "No categorisable debit transactions found.", s);
    }

    // ── Cell helpers ──────────────────────────────────────────────────────────

    private void writeHeaderRow(XSSFSheet sheet, Styles s, String[] labels, int rowNum) {
        Row row = sheet.createRow(rowNum);
        row.setHeightInPoints(20);
        for (int i = 0; i < labels.length; i++) cell(row, i, labels[i], s.header);
    }

    private void infoRow(XSSFSheet sheet, int rowIdx, String message, Styles s) {
        Row row = sheet.createRow(rowIdx + 1);
        cell(row, 0, message, s.info);
    }

    private Cell cell(Row row, int col, String value, CellStyle style) {
        Cell c = row.createCell(col, CellType.STRING);
        c.setCellValue(value != null ? value : "");
        c.setCellStyle(style);
        return c;
    }

    /**
     * FIX: Use CellType.BLANK explicitly when value is null/zero to avoid
     * Excel warnings about mixed cell types in numeric columns.
     * Previously setCellValue("") was called on what Excel expected to be a numeric cell.
     */
    private Cell cellMoney(Row row, int col, BigDecimal value, CellStyle style) {
        Cell c;
        if (value != null && value.compareTo(BigDecimal.ZERO) != 0) {
            c = row.createCell(col, CellType.NUMERIC);
            c.setCellValue(value.doubleValue());
        } else {
            c = row.createCell(col, CellType.BLANK);
        }
        c.setCellStyle(style);
        return c;
    }

    private Cell cellNum(Row row, int col, int value, CellStyle style) {
        Cell c = row.createCell(col, CellType.NUMERIC);
        c.setCellValue(value);
        c.setCellStyle(style);
        return c;
    }

    private String fmt(LocalDate d) {
        return d != null ? d.format(DATE_FMT) : "";
    }

    // ── Colour helpers ────────────────────────────────────────────────────────

    private static byte[] hexToRgb(String hex) {
        int r = Integer.parseInt(hex.substring(0, 2), 16);
        int g = Integer.parseInt(hex.substring(2, 4), 16);
        int b = Integer.parseInt(hex.substring(4, 6), 16);
        return new byte[]{(byte) r, (byte) g, (byte) b};
    }

    private static XSSFColor xssfColor(byte[] rgb) {
        return new XSSFColor(rgb, null);
    }

    // ── Style factory ─────────────────────────────────────────────────────────

    private static class Styles {
        final XSSFCellStyle header, normal, altRow;
        final XSSFCellStyle moneyNormal, creditAmt, debitAmt;
        final XSSFCellStyle totalLabel, totalMoney;
        final XSSFCellStyle tagGreen, tagRed, bounceRow, info;

        Styles(XSSFWorkbook wb) {
            DataFormat df    = wb.createDataFormat();
            short moneyFmt   = df.getFormat("#,##0.00");

            XSSFFont boldWhite = font(wb, true,  255, 255, 255, 11);
            XSSFFont boldDark  = font(wb, true,  15,  23,  42,  10);
            XSSFFont regular   = font(wb, false, 30,  30,  30,  10);
            XSSFFont green     = font(wb, false, 5,   150, 105, 10);
            XSSFFont red       = font(wb, false, 185, 28,  28,  10);
            XSSFFont gray      = fontItalic(wb, 100, 116, 139, 10);

            header = style(wb, HEADER_COLOR, boldWhite, null, HorizontalAlignment.LEFT);
            border(header);

            normal = style(wb, null, regular, null, HorizontalAlignment.LEFT);
            border(normal);

            altRow = style(wb, ALT_ROW_COLOR, regular, null, HorizontalAlignment.LEFT);
            border(altRow);

            moneyNormal = style(wb, null, regular, moneyFmt, HorizontalAlignment.RIGHT);
            border(moneyNormal);

            creditAmt = style(wb, CREDIT_COLOR, green, moneyFmt, HorizontalAlignment.RIGHT);
            border(creditAmt);

            debitAmt = style(wb, DEBIT_COLOR, red, moneyFmt, HorizontalAlignment.RIGHT);
            border(debitAmt);

            totalLabel = style(wb, SECTION_COLOR, boldDark, null, HorizontalAlignment.LEFT);
            border(totalLabel);

            totalMoney = style(wb, SECTION_COLOR, boldDark, moneyFmt, HorizontalAlignment.RIGHT);
            border(totalMoney);

            tagGreen = style(wb, CREDIT_COLOR, green, null, HorizontalAlignment.CENTER);
            border(tagGreen);

            tagRed = style(wb, DEBIT_COLOR, red, null, HorizontalAlignment.CENTER);
            border(tagRed);

            bounceRow = style(wb, BOUNCE_COLOR, regular, null, HorizontalAlignment.LEFT);
            border(bounceRow);

            info = style(wb, ACCENT_COLOR, gray, null, HorizontalAlignment.LEFT);
            border(info);
        }

        private XSSFCellStyle style(XSSFWorkbook wb, byte[] bg, XSSFFont font,
                                    Short dataFmt, HorizontalAlignment align) {
            XSSFCellStyle cs = wb.createCellStyle();
            if (bg != null) {
                cs.setFillForegroundColor(xssfColor(bg));
                cs.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            }
            if (font != null) cs.setFont(font);
            if (dataFmt != null) cs.setDataFormat(dataFmt);
            cs.setAlignment(align);
            cs.setVerticalAlignment(VerticalAlignment.CENTER);
            return cs;
        }

        private void border(CellStyle cs) {
            cs.setBorderBottom(BorderStyle.THIN);
            cs.setBorderTop(BorderStyle.THIN);
            cs.setBorderLeft(BorderStyle.THIN);
            cs.setBorderRight(BorderStyle.THIN);
            cs.setBottomBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
            cs.setTopBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
            cs.setLeftBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
            cs.setRightBorderColor(IndexedColors.GREY_25_PERCENT.getIndex());
        }

        private XSSFFont font(XSSFWorkbook wb, boolean bold, int r, int g, int b, int size) {
            XSSFFont f = (XSSFFont) wb.createFont();
            f.setBold(bold);
            f.setColor(xssfColor(new byte[]{(byte)r, (byte)g, (byte)b}));
            f.setFontHeightInPoints((short) size);
            return f;
        }

        private XSSFFont fontItalic(XSSFWorkbook wb, int r, int g, int b, int size) {
            XSSFFont f = (XSSFFont) wb.createFont();
            f.setItalic(true);
            f.setColor(xssfColor(new byte[]{(byte)r, (byte)g, (byte)b}));
            f.setFontHeightInPoints((short) size);
            return f;
        }
    }
}