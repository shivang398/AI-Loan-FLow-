package com.financial.eligibility.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.eligibility.dto.BsaAiResult;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.io.RandomAccessReadBuffer;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.util.*;

@Service
@Slf4j
public class GroqBsaService {

    @Value("${groq.api-key}")
    private String apiKey;

    @Value("${groq.url}")
    private String groqUrl;

    @Value("${groq.model:llama-3.3-70b-versatile}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper  = new ObjectMapper();

    // ── Public entry points ───────────────────────────────────────────────────

    public BsaAiResult analyzeFile(byte[] pdfBytes, String source) throws IOException {
        String text = extractText(pdfBytes);
        return callGroq(text, source);
    }

    public BsaAiResult analyzeUrl(String presignedUrl, String source) throws IOException {
        byte[] bytes = downloadBytes(presignedUrl);
        return analyzeFile(bytes, source);
    }

    // ── PDF text extraction ───────────────────────────────────────────────────

    private String extractText(byte[] bytes) throws IOException {
        try (PDDocument doc = Loader.loadPDF(new RandomAccessReadBuffer(bytes))) {
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);

            int totalPages = doc.getNumberOfPages();
            // Extract per-page so we can sample across the document
            List<String> pages = new ArrayList<>();
            for (int p = 1; p <= totalPages; p++) {
                stripper.setStartPage(p);
                stripper.setEndPage(p);
                pages.add(stripper.getText(doc));
            }

            // Budget: 9,000 chars total (≈4.5k tokens) — under Groq free-tier 12k TPM cap
            // Allocation: page 1 (account info), ALL middle pages sampled, last page (closing).
            int budget = 9_000;

            if (totalPages == 1) {
                String t = pages.get(0);
                return t.length() > budget ? t.substring(0, budget) : t;
            }

            // First page (capped at 2000 chars) — account details, period, opening balance
            String first = pages.get(0);
            if (first.length() > 2_000) first = first.substring(0, 2_000);

            // Last page (capped at 2000 chars) — closing balance, most recent transactions
            String last = pages.get(totalPages - 1);
            if (last.length() > 2_000) last = last.substring(last.length() > 2_000 ? last.length() - 2_000 : 0);

            // Middle pages: sample EVERY page (not every other), cap each at 700 chars
            // This ensures EMI rows that appear once per month are not skipped
            StringBuilder middle = new StringBuilder();
            int middleBudget = budget - first.length() - last.length();
            for (int p = 1; p < totalPages - 1 && middle.length() < middleBudget; p++) {
                String pg = pages.get(p);
                int take = Math.min(700, middleBudget - middle.length());
                middle.append(pg, 0, Math.min(pg.length(), take)).append("\n");
            }

            String result = first + "\n\n[...transactions...]\n\n" + middle + "\n\n[...closing...]\n\n" + last;
            log.debug("BSA text extracted: {} chars from {} pages", result.length(), totalPages);
            return result;
        }
    }

    private byte[] downloadBytes(String url) throws IOException {
        try (InputStream in = URI.create(url).toURL().openStream()) {
            return in.readAllBytes();
        }
    }

    // ── Groq API call ─────────────────────────────────────────────────────────

    private BsaAiResult callGroq(String statementText, String source) {
        String systemPrompt = """
            You are an expert Indian bank statement analyst. Extract financial data from the raw PDF text
            of an Indian bank statement and return ONLY a valid JSON object. NO markdown, NO extra text.

            TRANSACTION LINE FORMATS (know these patterns):
            HDFC:   DD/MM/YY  Narration           Chq/Ref  Value Date  Withdrawal(Dr)  Deposit(Cr)  Balance
            SBI:    DD-MM-YYYY Narration           Ref No   Debit       Credit          Balance
            ICICI:  S.No  Date  Narration          Ref      Amount      Type  Balance
            AXIS:   DD-MM-YYYY Narration           Chq No   Debit(INR)  Credit(INR)     Balance
            KOTAK:  DD/MM/YYYY Description         Chq No   Debit       Credit          Balance

            SALARY KEYWORDS (credits): SALARY, SAL CR, NEFT-SALARY, INWARD NEFT, NEFT CR, IMPS CR, RTGS CR, CREDITED BY EMPLOYER

            EMI / LOAN KEYWORDS (debits) — match ANY of these in narration:
              NACH DR, ECS DR, ACH DR, SI DR, AUTO DEBIT, STANDING INSTRUCTION
              EMI, LOAN EMI, LOAN REPAYMENT, LOAN INSTALL
              HDFC LOAN, SBI LOAN, ICICI LOAN, AXIS LOAN, KOTAK LOAN, BAJAJ FIN, BAJAJ FINANCE
              TATA CAPITAL, FULLERTON, HOME CREDIT, CAPITAL FIRST, MUTHOOT, MANAPPURAM, ADITYA BIRLA FIN
              HOME LOAN, CAR LOAN, PERSONAL LOAN, AUTO LOAN, VEHICLE LOAN, EDUCATION LOAN, GOLD LOAN
              CREDITCARD PAYMENT, CREDIT CARD PAYMENT, CC PAYMENT, HDFC CREDITCARD, ICICI CC, AMEX
              LIC PREMIUM, INSURANCE PREMIUM, TERM PLAN, POLICY PREMIUM

            RECURRING DEBIT RULE: If the SAME amount (±10%) debits on approximately the SAME date (±3 days)
            across 2+ months and is ≥ ₹1,000 — treat it as an EMI/fixed obligation even if keyword missing.

            BOUNCE KEYWORDS: RETURN, RTN, BOUNCE, DISHONOUR, INSUFF, UNPAID, REJECTED

            Required JSON (return ALL fields, never omit):
            {
              "bankName": "string",
              "accountHolderName": "string (full name from statement header)",
              "accountNumber": "string (mask all but last 4 digits, e.g. XXXX1234)",
              "statementPeriod": "string (e.g. Dec 2025 – May 2026)",
              "openingBalance": number,
              "closingBalance": number,
              "monthlyAverageCredit": number,
              "monthlyAverageDebit": number,
              "bouncedCheques": number,
              "estimatedFoir": number,
              "salaryCredits": [{ "date": "DD MMM YYYY", "amount": number, "source": "string" }],
              "emiDebits":     [{ "date": "DD MMM YYYY", "amount": number, "label": "string (e.g. Home Loan – HDFC, Car Loan – SBI, Personal Loan – Bajaj Finance, Credit Card – ICICI)" }],
              "topExpenseCategories": [{ "category": "string", "amount": number, "percentage": number }],
              "riskFlags": ["string"],
              "analysisNotes": "string"
            }

            CALCULATION RULES:
            - Text may be sampled (head + middle + tail) — compute from ALL visible transactions
            - Count distinct months visible in the statement (e.g. Dec, Jan, Feb = 3 months)
            - monthlyAverageCredit: SUM of all Cr/Deposit amounts ÷ number of distinct months
            - monthlyAverageDebit: SUM of all Dr/Withdrawal amounts ÷ number of distinct months
            - NEVER return 0 for averages if any transactions are visible
            - closingBalance: rightmost balance on the LAST visible transaction row
            - openingBalance: balance on the FIRST visible transaction row or stated opening balance
            - estimatedFoir: (sum of all monthly fixed EMI obligations ÷ monthlyAverageCredit) × 100
              e.g. if salary ₹50,000 and EMI ₹15,000 → FOIR = 30.0; NEVER return 0 if EMI debits exist
            - bouncedCheques: count rows containing RETURN/RTN/BOUNCE/DISHONOUR/INSUFF

            TOP EXPENSE CATEGORIES — MONTHLY AVERAGES, not totals:
            - amount = category_total ÷ number_of_months (monthly average per category)
            - percentage = (category_monthly_avg ÷ monthlyAverageDebit) × 100
            - Break UPI debits into sub-buckets using narration keywords:
                "UPI Food & Dining"    → Swiggy, Zomato, IRCTC food, restaurant names
                "UPI Shopping"         → Amazon, Flipkart, Myntra, Ajio, Meesho
                "UPI Utilities"        → electricity, water, gas, recharge, broadband, BESCOM, MSEDCL
                "UPI Personal Transfer"→ UPI/to <person name>, P2P, pay to mobile number
                "UPI Others"           → all remaining UPI credits not matched above
            - Non-UPI buckets: "Cash Withdrawal" (ATM), "Loan EMI" (NACH/ECS/EMI), "Bank Transfer" (NEFT/RTGS OUT), "Cheque" (CHQ)
            - Max 5 categories, sorted by monthly average amount descending

            RISK FLAGS:
            - "No salary credit detected in [month]" — if any visible month has no salary-like credit
            - "Low balance alert: balance below ₹5,000 on [date]" — if balance column shows < 5000
            - "Bounced transaction on [date]" — for each RETURN/BOUNCE entry
            - "High cash withdrawal pattern" — if ATM debits > 5 in any single month
            - "Overdraft utilised" — if any balance shows negative

            - analysisNotes: 2-3 sentences covering: income stability (salary regularity), debt load (FOIR level), and overall risk
            - All amounts as plain numbers in INR, no ₹ symbol
            """;

        String userMessage = "Analyze this bank statement:\n\n" + statementText;

        Map<String, Object> requestBody = new LinkedHashMap<>();
        requestBody.put("model", model);
        requestBody.put("temperature", 0.1);
        requestBody.put("max_tokens", 1024);
        requestBody.put("response_format", Map.of("type", "json_object"));
        requestBody.put("messages", List.of(
            Map.of("role", "system", "content", systemPrompt),
            Map.of("role", "user",   "content", userMessage)
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                groqUrl, HttpMethod.POST,
                new HttpEntity<>(requestBody, headers),
                String.class
            );

            JsonNode root    = objectMapper.readTree(response.getBody());
            String jsonStr   = root.path("choices").get(0).path("message").path("content").asText();
            JsonNode parsed  = objectMapper.readTree(jsonStr);

            BsaAiResult result = objectMapper.treeToValue(parsed, BsaAiResult.class);
            result.setSource(source);
            log.info("Groq BSA analysis complete — bank={}, period={}", result.getBankName(), result.getStatementPeriod());
            return result;

        } catch (Exception e) {
            log.error("Groq BSA analysis failed: {}", e.getMessage());
            throw new RuntimeException("AI analysis failed: " + e.getMessage(), e);
        }
    }
}
