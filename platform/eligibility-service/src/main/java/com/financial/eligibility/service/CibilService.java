package com.financial.eligibility.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.eligibility.dto.CibilRequestDto;
import com.financial.eligibility.dto.CibilSummaryDto;
import java.awt.Color;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.ColumnText;
import com.lowagie.text.pdf.PdfContentByte;
import com.lowagie.text.pdf.PdfPageEventHelper;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CibilService {

    private final ObjectMapper objectMapper;

    @Value("${tenacio.api.url}")
    private String apiUrl;

    @Value("${tenacio.api.client-id}")
    private String clientId;

    @Value("${tenacio.api.key}")
    private String apiKey;

    @Value("${tenacio.api.workflow-id}")
    private String workflowId;

    // ── Colours matching TransUnion CIBIL palette ─────────────────────────────

    private static final Color CIBIL_DARK_BLUE  = new Color(0,  60, 113);   // #003C71
    private static final Color CIBIL_MID_BLUE   = new Color(0, 114, 188);   // #0072BC
    private static final Color CIBIL_LIGHT_BLUE = new Color(215, 234, 248); // #D7EAF8
    private static final Color HEADER_GREY      = new Color(64,  64,  64);  // #404040
    private static final Color TABLE_HEADER_BG  = new Color(0,  60, 113);
    private static final Color TABLE_ALT_ROW    = new Color(242, 247, 253);
    private static final Color TABLE_ROW        = Color.WHITE;
    private static final Color BORDER_LIGHT     = new Color(200, 215, 230);
    private static final Color SCORE_GREEN      = new Color( 21, 128,  61);  // 750+
    private static final Color SCORE_LIME       = new Color( 77, 175,  74);  // 700-749
    private static final Color SCORE_AMBER      = new Color(245, 158,  11);  // 650-699
    private static final Color SCORE_ORANGE     = new Color(234,  88,  12);  // 550-649
    private static final Color SCORE_RED        = new Color(185,  28,  28);  // <550

    // ── Fonts ─────────────────────────────────────────────────────────────────

    private Font bold(float sz, Color c)  { return FontFactory.getFont(FontFactory.HELVETICA_BOLD,  sz, c); }
    private Font reg(float sz, Color c)   { return FontFactory.getFont(FontFactory.HELVETICA,        sz, c); }
    private Font italic(float sz, Color c){ return FontFactory.getFont(FontFactory.HELVETICA_OBLIQUE, sz, c); }

    // ── Public entry points ───────────────────────────────────────────────────

    public byte[] generateCibilReportPdf(CibilRequestDto dto) {
        boolean hasCredentials = !isBlank(clientId) && !isBlank(apiKey) && !isBlank(workflowId);

        JsonNode apiResponse = null;
        if (hasCredentials) {
            apiResponse = callTenacioApi(dto);
        } else {
            log.warn("CIBIL API credentials not configured — generating demo report for PAN={}", dto.getPanNumber());
        }
        return buildBankStandardPdf(dto, apiResponse);
    }

    public CibilSummaryDto getCibilSummary(CibilRequestDto dto) {
        boolean hasCredentials = !isBlank(clientId) && !isBlank(apiKey) && !isBlank(workflowId);

        JsonNode apiResponse = null;
        if (hasCredentials) {
            apiResponse = callTenacioApi(dto);
        } else {
            log.warn("CIBIL API credentials not configured — returning demo summary for PAN={}", dto.getPanNumber());
        }

        boolean demoMode = (apiResponse == null);
        CibilData data = demoMode ? buildDemoData(dto) : parseApiResponse(dto, apiResponse);
        return toSummaryDto(data, demoMode);
    }

    private CibilSummaryDto toSummaryDto(CibilData data, boolean demoMode) {
        CibilSummaryDto dto = new CibilSummaryDto();
        dto.setReportId(data.reportId);
        dto.setCibilScore(data.cibilScore);
        dto.setScoreBand(scoreBandLabel(data.cibilScore));
        dto.setScoreDate(data.scoreDate);
        dto.setFullName(data.fullName);
        dto.setDob(data.dob);
        dto.setGender(data.gender);
        dto.setAddress(data.address);
        dto.setOccupationType(data.occupationType);
        dto.setIncome(data.income);
        dto.setTotalAccounts(data.accounts.size());
        dto.setActiveAccounts(data.activeAccounts);
        dto.setClosedAccounts(data.closedAccounts);
        dto.setOverdueAccounts(data.overdueAccounts);
        dto.setTotalBalance(data.totalBalance);
        dto.setTotalOverdue(data.totalOverdue);
        dto.setEnquiryCount(data.enquiries.size());
        dto.setDemoMode(demoMode);

        List<CibilSummaryDto.AccountSummary> accountSummaries = new ArrayList<>();
        for (AccountDetail acct : data.accounts) {
            CibilSummaryDto.AccountSummary s = new CibilSummaryDto.AccountSummary();
            s.setMemberName(acct.memberName);
            s.setAccountType(acct.accountType);
            s.setAccountNumber(acct.accountNumber);
            s.setCurrentBalance(acct.currentBalance);
            s.setAmountOverdue(acct.amountOverdue);
            s.setAccountStatus(acct.accountStatus);
            s.setDateOpened(acct.dateOpened);
            s.setDateClosed(acct.dateClosed);
            accountSummaries.add(s);
        }
        dto.setAccounts(accountSummaries);
        return dto;
    }

    private String scoreBandLabel(int score) {
        if (score <= 5)    return "NO_HISTORY"; // CIBIL NH (No History) code
        if (score >= 750)  return "EXCELLENT";
        if (score >= 700)  return "GOOD";
        if (score >= 650)  return "FAIR";
        if (score >= 550)  return "POOR";
        return "VERY_POOR";
    }

    // ── Tenacio API call ──────────────────────────────────────────────────────

    private JsonNode callTenacioApi(CibilRequestDto dto) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("client-id",   clientId);
        headers.set("x-api-key",   apiKey);
        headers.set("workflow-id", workflowId);

        Map<String, Object> input = new LinkedHashMap<>();
        input.put("mobileNumber", dto.getMobileNumber());
        input.put("name",         dto.getName());
        input.put("panNumber",    dto.getPanNumber());
        input.put("consent",      dto.isConsent());

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("input", input);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                apiUrl, new HttpEntity<>(payload, headers), String.class);
            log.info("Tenacio CIBIL API — status={}", response.getStatusCode());
            log.info("Tenacio RAW RESPONSE: {}", response.getBody());

            JsonNode root = objectMapper.readTree(response.getBody());

            // Tenacio returns HTTP 200 for business errors — detect and throw
            String apiStatus = root.path("status").asText("");
            if ("error".equalsIgnoreCase(apiStatus)) {
                String msg = root.path("serviceError").path("message").asText("");
                if (msg.isBlank()) msg = root.path("message").asText("CIBIL lookup failed");
                log.error("Tenacio business error for PAN={}: {}", dto.getPanNumber(), msg);
                // Make "No Data Found" actionable for the connector
                if ("No Data Found".equalsIgnoreCase(msg)) {
                    throw new RuntimeException(
                        "No CIBIL record found for this PAN + mobile combination. " +
                        "Please verify: (1) PAN is correct, (2) Mobile number is the one " +
                        "the customer used when applying for their first loan or credit card.");
                }
                throw new RuntimeException(msg);
            }

            return root;
        } catch (HttpStatusCodeException e) {
            log.error("Tenacio error: {} — {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException(extractErrorMessage(e.getResponseBodyAsString()));
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            log.error("Failed to reach Tenacio CIBIL API", e);
            throw new RuntimeException("Unable to reach CIBIL service. Please try again later.");
        }
    }

    private String extractErrorMessage(String body) {
        try {
            JsonNode node = objectMapper.readTree(body);
            if (node.has("message") && node.get("message").isTextual()) return node.get("message").asText();
            // Tenacio format: {"error": {"message": "..."}}
            JsonNode errorNode = node.get("error");
            if (errorNode != null) {
                if (errorNode.isTextual())                  return errorNode.asText();
                if (errorNode.has("message"))               return errorNode.get("message").asText();
            }
        } catch (Exception ignored) {}
        return body != null && !body.isBlank() ? body : "Unknown API error";
    }

    // ── Master PDF builder ────────────────────────────────────────────────────

    private byte[] buildBankStandardPdf(CibilRequestDto dto, JsonNode api) {
        try {
            Document doc = new Document(PageSize.A4, 40, 40, 55, 55);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter writer = PdfWriter.getInstance(doc, out);

            // Page-number footer
            writer.setPageEvent(new PdfPageEventHelper() {
                @Override
                public void onEndPage(PdfWriter w, Document d) {
                    try {
                        PdfContentByte cb = w.getDirectContent();
                        // Bottom border line
                        cb.setColorStroke(CIBIL_MID_BLUE);
                        cb.setLineWidth(0.5f);
                        cb.moveTo(d.left(), d.bottom() - 10);
                        cb.lineTo(d.right(), d.bottom() - 10);
                        cb.stroke();
                        // Page footer text
                        Font footFont = reg(7, new Color(120, 120, 120));
                        ColumnText.showTextAligned(cb, Element.ALIGN_LEFT,
                            new Phrase("CONFIDENTIAL — For authorised use only. Not for public distribution.", footFont),
                            d.left(), d.bottom() - 22, 0);
                        ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT,
                            new Phrase("Page " + w.getPageNumber(), footFont),
                            d.right(), d.bottom() - 22, 0);
                    } catch (Exception ignored) {}
                }
            });

            doc.open();

            boolean demoMode = (api == null);

            // ── Parse data (real or demo) ──────────────────────────────────
            CibilData data = demoMode ? buildDemoData(dto) : parseApiResponse(dto, api);

            // ── Section 0: Report Header ───────────────────────────────────
            addReportHeader(doc, dto, data, demoMode, writer);
            doc.add(vGap(6));

            // ── Section 1: Enquiry Information ─────────────────────────────
            addSectionTitle(doc, "SECTION 1 — ENQUIRY INFORMATION");
            addKeyValueTable(doc, new String[][]{
                {"Purpose of Enquiry",    "Credit Assessment / Soft Pull"},
                {"Date of Enquiry",       now("dd-MM-yyyy")},
                {"Time of Enquiry",       now("HH:mm:ss")},
                {"Report ID",             data.reportId},
                {"Enquiring Member",      "Real Money Advisory Platform"},
                {"Consent Obtained",      dto.isConsent() ? "Yes — Customer consent recorded" : "No"},
            });
            doc.add(vGap(6));

            // ── Section 2: Personal Information ───────────────────────────
            addSectionTitle(doc, "SECTION 2 — PERSONAL INFORMATION");
            addKeyValueTable(doc, new String[][]{
                {"Full Name (as per PAN)", data.fullName},
                {"Date of Birth",          data.dob},
                {"Gender",                 data.gender},
                {"PAN Number",             dto.getPanNumber().toUpperCase()},
                {"Mobile Number",          dto.getMobileNumber()},
                {"Email Address",          data.email},
                {"Current Address",        data.address},
                {"Occupation Type",        data.occupationType},
                {"Net Monthly Income",     data.income},
            });
            doc.add(vGap(6));

            // ── Section 3: CIBIL Credit Score ──────────────────────────────
            addSectionTitle(doc, "SECTION 3 — CIBIL TRANSUNION SCORE");
            addScorePanel(doc, data.cibilScore, data.scoreDate);
            doc.add(vGap(6));

            // ── Section 4: Account Summary ─────────────────────────────────
            addSectionTitle(doc, "SECTION 4 — ACCOUNT SUMMARY");
            addAccountSummaryTable(doc, data);
            doc.add(vGap(6));

            // ── Section 5: Account Details ─────────────────────────────────
            addSectionTitle(doc, "SECTION 5 — ACCOUNT DETAILS (Credit Facilities)");
            for (int i = 0; i < data.accounts.size(); i++) {
                addAccountDetail(doc, data.accounts.get(i), i + 1);
                if (i < data.accounts.size() - 1) doc.add(vGap(4));
            }
            if (data.accounts.isEmpty()) {
                doc.add(new Paragraph("No credit accounts found.", reg(9, HEADER_GREY)));
            }
            doc.add(vGap(6));

            // ── Section 6: Enquiry History ─────────────────────────────────
            addSectionTitle(doc, "SECTION 6 — ENQUIRY HISTORY (Last 24 Months)");
            addEnquiryTable(doc, data.enquiries);
            doc.add(vGap(6));

            // ── Section 7: Legal & RBI Disclaimer ─────────────────────────
            addSectionTitle(doc, "SECTION 7 — REGULATORY NOTICE");
            addDisclaimerBlock(doc, dto, demoMode);

            doc.close();
            return out.toByteArray();

        } catch (Exception e) {
            log.error("Error building CIBIL PDF", e);
            throw new RuntimeException("Failed to generate CIBIL PDF", e);
        }
    }

    // ── Header block ──────────────────────────────────────────────────────────

    private void addReportHeader(Document doc, CibilRequestDto dto,
                                  CibilData data, boolean demoMode, PdfWriter writer)
            throws DocumentException {

        // Top coloured bar
        PdfContentByte cb = writer.getDirectContent();
        float left   = doc.left();
        float right  = doc.right();
        float top    = doc.top();

        cb.setColorFill(CIBIL_DARK_BLUE);
        cb.rectangle(left, top + 8, right - left, 34);
        cb.fill();

        // CIBIL title text in bar
        ColumnText.showTextAligned(cb, Element.ALIGN_LEFT,
            new Phrase("CREDIT INFORMATION REPORT (CIR)", bold(13, Color.WHITE)),
            left + 6, top + 18, 0);
        ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT,
            new Phrase("TransUnion CIBIL  |  Regulated by RBI", reg(8, new Color(180, 210, 240))),
            right - 6, top + 18, 0);

        doc.add(vGap(20));

        if (demoMode) {
            PdfPTable demoTable = new PdfPTable(1);
            demoTable.setWidthPercentage(100);
            demoTable.setSpacingAfter(6);
            PdfPCell demoCell = new PdfPCell(new Phrase(
                "⚠  DEMO MODE — CIBIL API credentials not configured. Data shown is illustrative only.",
                bold(8, new Color(185, 28, 28))));
            demoCell.setBackgroundColor(new Color(254, 226, 226));
            demoCell.setPadding(7);
            demoCell.setBorderColor(new Color(185, 28, 28));
            demoTable.addCell(demoCell);
            doc.add(demoTable);
        }

        // Sub-header info row
        PdfPTable headerTable = new PdfPTable(3);
        headerTable.setWidthPercentage(100);
        headerTable.setWidths(new float[]{34f, 33f, 33f});
        headerTable.setSpacingAfter(0);

        headerTable.addCell(headerInfoCell("Report Generated", now("dd MMM yyyy, hh:mm a")));
        headerTable.addCell(headerInfoCell("Report Reference ID", data.reportId));
        headerTable.addCell(headerInfoCell("Member Reference", "RMAP/" + dto.getPanNumber().toUpperCase()));
        doc.add(headerTable);
    }

    private PdfPCell headerInfoCell(String label, String value) {
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.BOTTOM);
        cell.setBorderColorBottom(CIBIL_MID_BLUE);
        cell.setBorderWidthBottom(1.5f);
        cell.setPadding(8);
        cell.setBackgroundColor(CIBIL_LIGHT_BLUE);
        Paragraph p = new Paragraph();
        p.add(new Chunk(label + "\n", reg(7, CIBIL_DARK_BLUE)));
        p.add(new Chunk(value, bold(9, CIBIL_DARK_BLUE)));
        cell.addElement(p);
        return cell;
    }

    // ── Section title ─────────────────────────────────────────────────────────

    private void addSectionTitle(Document doc, String title) throws DocumentException {
        PdfPTable t = new PdfPTable(1);
        t.setWidthPercentage(100);
        t.setSpacingAfter(4);
        PdfPCell cell = new PdfPCell(new Phrase(title, bold(9, Color.WHITE)));
        cell.setBackgroundColor(TABLE_HEADER_BG);
        cell.setPadding(6);
        cell.setBorder(Rectangle.NO_BORDER);
        t.addCell(cell);
        doc.add(t);
    }

    // ── Key-value 2-column table ──────────────────────────────────────────────

    private void addKeyValueTable(Document doc, String[][] rows) throws DocumentException {
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{22f, 28f, 22f, 28f});
        table.setSpacingAfter(4);

        boolean alt = false;
        int col = 0;
        for (String[] row : rows) {
            Color rowBg = alt ? TABLE_ALT_ROW : TABLE_ROW;
            if (col == 0) alt = !alt;
            table.addCell(labelCell(row[0], rowBg));
            table.addCell(valueCell(row[1], rowBg));
            col++;
            if (col == 2) col = 0;
        }
        // Fill odd cell if needed
        if (col == 1) {
            table.addCell(labelCell("", TABLE_ROW));
            table.addCell(valueCell("", TABLE_ROW));
        }
        doc.add(table);
    }

    // ── Score panel ───────────────────────────────────────────────────────────

    private void addScorePanel(Document doc, int score, String scoreDate) throws DocumentException {
        PdfPTable panel = new PdfPTable(2);
        panel.setWidthPercentage(100);
        panel.setWidths(new float[]{35f, 65f});
        panel.setSpacingAfter(4);

        // Left: big score
        Color scoreColor = scoreColor(score);
        PdfPCell scoreCell = new PdfPCell();
        scoreCell.setBorderColor(BORDER_LIGHT);
        scoreCell.setPadding(14);
        scoreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
        scoreCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

        Paragraph scorePara = new Paragraph();
        scorePara.setAlignment(Element.ALIGN_CENTER);
        scorePara.add(new Chunk(String.valueOf(score), bold(42, scoreColor)));
        scorePara.add(Chunk.NEWLINE);
        scorePara.add(new Chunk("CIBIL TransUnion Score", bold(8, CIBIL_DARK_BLUE)));
        scorePara.add(Chunk.NEWLINE);
        scorePara.add(new Chunk("Score Date: " + scoreDate, reg(7, HEADER_GREY)));
        scoreCell.addElement(scorePara);
        panel.addCell(scoreCell);

        // Right: score band legend + interpretation
        PdfPCell legendCell = new PdfPCell();
        legendCell.setBorderColor(BORDER_LIGHT);
        legendCell.setPadding(10);

        Paragraph legend = new Paragraph();
        legend.add(new Chunk("Score Range Interpretation\n", bold(9, CIBIL_DARK_BLUE)));
        legend.add(vGapInline(4));

        String[][] bands = {
            {"750 – 900", "EXCELLENT",  "Highly likely to be approved. Best interest rates available."},
            {"700 – 749", "GOOD",       "Strong profile. Approval likely with standard terms."},
            {"650 – 699", "FAIR",       "Moderate risk. May face conditional approval."},
            {"550 – 649", "POOR",       "High risk. Approval uncertain. Higher interest rates."},
            {"300 – 549", "VERY POOR",  "Unlikely to be approved. Significant credit issues."},
        };
        for (String[] band : bands) {
            Color bc = bandColor(band[0]);
            String marker = isInBand(score, band[0]) ? "▶ " : "   ";
            legend.add(new Chunk(marker + band[0] + " — " + band[1] + "\n",
                bold(8, isInBand(score, band[0]) ? bc : HEADER_GREY)));
            if (isInBand(score, band[0])) {
                legend.add(new Chunk("     " + band[2] + "\n", italic(7, new Color(80,80,80))));
            }
        }
        legendCell.addElement(legend);
        panel.addCell(legendCell);

        doc.add(panel);
    }

    // ── Account summary table ─────────────────────────────────────────────────

    private void addAccountSummaryTable(Document doc, CibilData data) throws DocumentException {
        PdfPTable t = new PdfPTable(6);
        t.setWidthPercentage(100);
        t.setWidths(new float[]{20f, 13f, 13f, 14f, 20f, 20f});
        t.setSpacingAfter(4);

        String[] heads = {"Total Accounts","Active","Closed","Overdue","Total Balance (₹)","Total Overdue (₹)"};
        for (String h : heads) {
            PdfPCell c = new PdfPCell(new Phrase(h, bold(8, Color.WHITE)));
            c.setBackgroundColor(CIBIL_MID_BLUE);
            c.setPadding(7);
            c.setHorizontalAlignment(Element.ALIGN_CENTER);
            c.setBorderColor(CIBIL_DARK_BLUE);
            t.addCell(c);
        }
        String[] vals = {
            String.valueOf(data.accounts.size()),
            String.valueOf(data.activeAccounts),
            String.valueOf(data.closedAccounts),
            String.valueOf(data.overdueAccounts),
            "₹" + formatAmount(data.totalBalance),
            "₹" + formatAmount(data.totalOverdue),
        };
        for (String v : vals) {
            PdfPCell c = new PdfPCell(new Phrase(v, bold(9, CIBIL_DARK_BLUE)));
            c.setBackgroundColor(CIBIL_LIGHT_BLUE);
            c.setPadding(7);
            c.setHorizontalAlignment(Element.ALIGN_CENTER);
            c.setBorderColor(BORDER_LIGHT);
            t.addCell(c);
        }
        doc.add(t);
    }

    // ── Individual account detail block ───────────────────────────────────────

    private void addAccountDetail(Document doc, AccountDetail acct, int idx) throws DocumentException {
        // Account sub-header
        PdfPTable hdr = new PdfPTable(1);
        hdr.setWidthPercentage(100);
        PdfPCell hdrCell = new PdfPCell(new Phrase(
            "  " + idx + ".  " + acct.memberName + "  |  " + acct.accountType, bold(9, Color.WHITE)));
        hdrCell.setBackgroundColor(CIBIL_MID_BLUE);
        hdrCell.setPadding(5);
        hdrCell.setBorder(Rectangle.NO_BORDER);
        hdr.addCell(hdrCell);
        doc.add(hdr);

        // Account fields
        PdfPTable t = new PdfPTable(6);
        t.setWidthPercentage(100);
        t.setWidths(new float[]{16f, 16f, 14f, 14f, 16f, 24f});

        String[] cols = {"Account No.", "Ownership", "Date Opened", "Date Closed", "Credit Limit / Sanctioned", "Current Balance"};
        for (String c : cols) {
            PdfPCell cell = new PdfPCell(new Phrase(c, bold(7, Color.WHITE)));
            cell.setBackgroundColor(TABLE_HEADER_BG);
            cell.setPadding(5);
            cell.setBorderColor(CIBIL_DARK_BLUE);
            t.addCell(cell);
        }
        String[] vals = {
            acct.accountNumber,
            acct.ownership,
            acct.dateOpened,
            acct.dateClosed.isEmpty() ? "Active" : acct.dateClosed,
            "₹" + formatAmount(acct.sanctionedAmount),
            "₹" + formatAmount(acct.currentBalance),
        };
        for (int i = 0; i < vals.length; i++) {
            Color bg = (i % 2 == 0) ? TABLE_ALT_ROW : TABLE_ROW;
            PdfPCell cell = new PdfPCell(new Phrase(vals[i], reg(8, HEADER_GREY)));
            cell.setPadding(5);
            cell.setBackgroundColor(bg);
            cell.setBorderColor(BORDER_LIGHT);
            t.addCell(cell);
        }
        doc.add(t);

        // Overdue + status row
        PdfPTable status = new PdfPTable(4);
        status.setWidthPercentage(100);
        status.setWidths(new float[]{25f, 25f, 25f, 25f});
        addKVRow(status, "Amount Overdue (₹)", acct.amountOverdue > 0 ? "₹" + formatAmount(acct.amountOverdue) : "NIL", acct.amountOverdue > 0);
        addKVRow(status, "Account Status", acct.accountStatus, acct.accountStatus.contains("OVERDUE") || acct.accountStatus.contains("WRITTEN"));
        addKVRow(status, "Last Payment Date", acct.lastPaymentDate, false);
        addKVRow(status, "Payment Frequency", acct.paymentFrequency, false);
        doc.add(status);

        // Payment track record (24 months)
        if (!acct.paymentHistory.isEmpty()) {
            doc.add(new Paragraph("  Payment Track Record (24 months — left = most recent)", reg(7, HEADER_GREY)));
            doc.add(vGap(2));
            addPaymentTrack(doc, acct.paymentHistory);
        }
    }

    private void addKVRow(PdfPTable t, String label, String value, boolean highlight) {
        PdfPCell lc = new PdfPCell(new Phrase(label, bold(7, CIBIL_DARK_BLUE)));
        lc.setBackgroundColor(CIBIL_LIGHT_BLUE);
        lc.setPadding(5);
        lc.setBorderColor(BORDER_LIGHT);
        t.addCell(lc);
        PdfPCell vc = new PdfPCell(new Phrase(value, bold(8, highlight ? SCORE_RED : HEADER_GREY)));
        vc.setBackgroundColor(highlight ? new Color(255, 235, 235) : TABLE_ROW);
        vc.setPadding(5);
        vc.setBorderColor(BORDER_LIGHT);
        t.addCell(vc);
    }

    private void addPaymentTrack(Document doc, List<String> history) throws DocumentException {
        int cols = Math.min(history.size(), 24);
        if (cols == 0) return;
        PdfPTable t = new PdfPTable(cols);
        t.setWidthPercentage(100);
        for (int i = 0; i < cols; i++) {
            String h = history.get(i);
            Color bg = paymentColor(h);
            PdfPCell c = new PdfPCell(new Phrase(h, bold(6, Color.WHITE)));
            c.setBackgroundColor(bg);
            c.setHorizontalAlignment(Element.ALIGN_CENTER);
            c.setPadding(3);
            c.setBorderColor(Color.WHITE);
            t.addCell(c);
        }
        doc.add(t);
        // Legend
        Paragraph leg = new Paragraph(
            "  STD = Standard (on-time)  |  SMA = Special Mention  |  SUB = Sub-Standard  |  DBT = Doubtful  |  LSS = Loss  |  XXX = No payment due",
            reg(6, new Color(130, 130, 130)));
        leg.setSpacingAfter(2);
        doc.add(leg);
    }

    // ── Enquiry history table ─────────────────────────────────────────────────

    private void addEnquiryTable(Document doc, List<EnquiryRecord> enquiries) throws DocumentException {
        PdfPTable t = new PdfPTable(5);
        t.setWidthPercentage(100);
        t.setWidths(new float[]{20f, 30f, 20f, 15f, 15f});
        t.setSpacingAfter(4);

        for (String h : new String[]{"Date of Enquiry", "Enquiring Member", "Purpose", "Amount (₹)", "Product Type"}) {
            PdfPCell c = new PdfPCell(new Phrase(h, bold(8, Color.WHITE)));
            c.setBackgroundColor(TABLE_HEADER_BG);
            c.setPadding(6);
            c.setBorderColor(CIBIL_DARK_BLUE);
            t.addCell(c);
        }

        if (enquiries.isEmpty()) {
            PdfPCell empty = new PdfPCell(new Phrase("No enquiries in the last 24 months.", reg(8, HEADER_GREY)));
            empty.setColspan(5);
            empty.setPadding(8);
            empty.setBorderColor(BORDER_LIGHT);
            t.addCell(empty);
        } else {
            boolean alt = false;
            for (EnquiryRecord e : enquiries) {
                Color bg = alt ? TABLE_ALT_ROW : TABLE_ROW;
                for (String v : new String[]{e.date, e.memberName, e.purpose, e.amount, e.productType}) {
                    PdfPCell c = new PdfPCell(new Phrase(v, reg(8, HEADER_GREY)));
                    c.setPadding(5);
                    c.setBackgroundColor(bg);
                    c.setBorderColor(BORDER_LIGHT);
                    t.addCell(c);
                }
                alt = !alt;
            }
        }
        doc.add(t);
    }

    // ── Disclaimer block ──────────────────────────────────────────────────────

    private void addDisclaimerBlock(Document doc, CibilRequestDto dto, boolean demoMode) throws DocumentException {
        PdfPTable box = new PdfPTable(1);
        box.setWidthPercentage(100);
        PdfPCell cell = new PdfPCell();
        cell.setPadding(10);
        cell.setBorderColor(CIBIL_MID_BLUE);
        cell.setBackgroundColor(new Color(240, 247, 255));

        Paragraph p = new Paragraph();
        p.add(new Chunk("REGULATORY NOTICES\n\n", bold(9, CIBIL_DARK_BLUE)));
        p.add(new Chunk(
            "1. This Credit Information Report (CIR) has been generated pursuant to explicit written consent "
            + "obtained from " + dto.getName() + " (PAN: " + dto.getPanNumber().toUpperCase() + ") as mandated "
            + "under Section 20(b) of the Credit Information Companies (Regulation) Act, 2005 (CICRA).\n\n",
            reg(7.5f, HEADER_GREY)));
        p.add(new Chunk(
            "2. This is a Soft Pull enquiry. It does NOT impact the consumer's CIBIL Score.\n\n",
            reg(7.5f, HEADER_GREY)));
        p.add(new Chunk(
            "3. This report is CONFIDENTIAL and is intended solely for the use of the authorised financial "
            + "institution or individual that initiated the enquiry. Any unauthorised disclosure, reproduction "
            + "or redistribution is strictly prohibited under applicable RBI and CICRA regulations.\n\n",
            reg(7.5f, HEADER_GREY)));
        p.add(new Chunk(
            "4. Credit decisions must not be based solely on this report. Lenders are required to exercise "
            + "independent credit judgment as per RBI Master Circular on Fair Practices Code.\n\n",
            reg(7.5f, HEADER_GREY)));
        p.add(new Chunk(
            "5. TransUnion CIBIL Limited is a Credit Information Company licensed by Reserve Bank of India. "
            + "For disputes or corrections, the consumer may write to cibilsupport@transunion.com or "
            + "visit www.cibil.com.\n\n",
            reg(7.5f, HEADER_GREY)));
        if (demoMode) {
            p.add(new Chunk(
                "⚠  DEMO DATA NOTICE: This report was generated in demo mode because CIBIL API credentials "
                + "(TENACIO_CLIENT_ID / TENACIO_API_KEY / TENACIO_WORKFLOW_ID) are not configured in the "
                + "environment. All credit data shown is fictitious and for format demonstration only.\n",
                bold(7.5f, new Color(185, 28, 28))));
        }
        cell.addElement(p);
        box.addCell(cell);
        doc.add(box);
    }

    // ── Demo data builder ─────────────────────────────────────────────────────

    private CibilData buildDemoData(CibilRequestDto dto) {
        CibilData d = new CibilData();
        d.reportId       = "RMAP-DEMO-" + System.currentTimeMillis() % 100000;
        d.fullName       = dto.getName().toUpperCase();
        d.dob            = "15-06-1988";
        d.gender         = "Male";
        d.email          = "—";
        d.address        = "123, Sector 14, Gurugram, Haryana — 122001";
        d.occupationType = "Salaried";
        d.income         = "₹85,000 per month";
        d.cibilScore     = 742;
        d.scoreDate      = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        // Accounts
        AccountDetail hl = new AccountDetail();
        hl.memberName       = "HDFC Bank Ltd.";
        hl.accountType      = "Home Loan";
        hl.accountNumber    = "HDFC****3421";
        hl.ownership        = "Self";
        hl.dateOpened       = "10-04-2019";
        hl.dateClosed       = "";
        hl.sanctionedAmount = 4500000;
        hl.currentBalance   = 3120000;
        hl.amountOverdue    = 0;
        hl.accountStatus    = "STANDARD";
        hl.lastPaymentDate  = "05-" + prevMonth();
        hl.paymentFrequency = "Monthly";
        hl.paymentHistory   = List.of("STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","STD",
                                       "STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","STD");

        AccountDetail pl = new AccountDetail();
        pl.memberName       = "ICICI Bank Ltd.";
        pl.accountType      = "Personal Loan";
        pl.accountNumber    = "ICICI****7890";
        pl.ownership        = "Self";
        pl.dateOpened       = "12-09-2021";
        pl.dateClosed       = "";
        pl.sanctionedAmount = 500000;
        pl.currentBalance   = 187000;
        pl.amountOverdue    = 0;
        pl.accountStatus    = "STANDARD";
        pl.lastPaymentDate  = "03-" + prevMonth();
        pl.paymentFrequency = "Monthly";
        pl.paymentHistory   = List.of("STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","STD",
                                       "STD","STD","STD","STD","STD","STD","STD","STD","XXX","XXX","XXX","XXX");

        AccountDetail cc = new AccountDetail();
        cc.memberName       = "Axis Bank Ltd.";
        cc.accountType      = "Credit Card";
        cc.accountNumber    = "AXIS****5512";
        cc.ownership        = "Self";
        cc.dateOpened       = "20-01-2020";
        cc.dateClosed       = "";
        cc.sanctionedAmount = 150000;
        cc.currentBalance   = 34500;
        cc.amountOverdue    = 0;
        cc.accountStatus    = "STANDARD";
        cc.lastPaymentDate  = "02-" + prevMonth();
        cc.paymentFrequency = "Monthly";
        cc.paymentHistory   = List.of("STD","STD","STD","STD","SMA","STD","STD","STD","STD","STD","STD","STD",
                                       "STD","STD","STD","STD","STD","STD","STD","STD","STD","STD","XXX","XXX");

        d.accounts       = List.of(hl, pl, cc);
        d.activeAccounts = 3;
        d.closedAccounts = 0;
        d.overdueAccounts= 0;
        d.totalBalance   = 3120000 + 187000 + 34500;
        d.totalOverdue   = 0;

        // Enquiries
        EnquiryRecord e1 = new EnquiryRecord();
        e1.date        = "10-" + prevMonth();
        e1.memberName  = "Bajaj Finance Ltd.";
        e1.purpose     = "Personal Loan";
        e1.amount      = "₹3,00,000";
        e1.productType = "Personal Loan";

        EnquiryRecord e2 = new EnquiryRecord();
        e2.date        = "22-03-" + (LocalDate.now().getYear() - 1);
        e2.memberName  = "ICICI Bank Ltd.";
        e2.purpose     = "Personal Loan";
        e2.amount      = "₹5,00,000";
        e2.productType = "Personal Loan";

        d.enquiries = List.of(e1, e2);
        return d;
    }

    // ── Real API response parser ───────────────────────────────────────────────

    private CibilData parseApiResponse(CibilRequestDto dto, JsonNode api) {
        CibilData d = new CibilData();
        d.reportId  = safeText(api, "requestId", "RMAP-" + System.currentTimeMillis() % 100000);
        d.fullName  = dto.getName().toUpperCase();
        d.scoreDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        // Actual Tenacio/JadeMacaw response structure:
        // data.cibilData.GetCustomerAssetsResponse.GetCustomerAssetsSuccess.Asset.TrueLinkCreditReport
        JsonNode report = navigate(api,
            "data/cibilData/GetCustomerAssetsResponse/GetCustomerAssetsSuccess/Asset/TrueLinkCreditReport");

        JsonNode borrower = navigate(report, "Borrower");

        // ── Score ─────────────────────────────────────────────────────────────
        // riskScore is a STRING like "722" or "00722"
        String riskScoreRaw = safeText(navigate(borrower, "CreditScore"), "riskScore", "0");
        try { d.cibilScore = Integer.parseInt(riskScoreRaw.trim()); } catch (Exception ignored) {}

        log.info("Parsed cibilScore={} (raw='{}') from Tenacio response (reportId={})",
            d.cibilScore, riskScoreRaw, d.reportId);

        // ── Personal info ─────────────────────────────────────────────────────
        JsonNode birth  = navigate(borrower, "Birth/BirthDate");
        if (birth != null) {
            String day   = safeText(birth, "day",   "01");
            String month = safeText(birth, "month", "01");
            String year  = safeText(birth, "year",  "");
            if (!year.isEmpty()) d.dob = String.format("%02d-%02d-%s",
                Integer.parseInt(day), Integer.parseInt(month), year);
        }

        d.gender = genderLabel(safeText(borrower, "Gender", ""));

        JsonNode employer = navigate(borrower, "Employer");
        d.occupationType = safeText(navigate(employer, "OccupationCode"), "description", "—");
        String incomeRaw = safeText(employer, "income", "");
        if (!incomeRaw.isEmpty()) {
            try {
                long income = (long) Double.parseDouble(incomeRaw);
                d.income = "₹" + String.format("%,d", income) + " per month";
            } catch (Exception ignored) { d.income = incomeRaw; }
        }

        JsonNode emailArr = navigate(borrower, "EmailAddress");
        if (emailArr != null && emailArr.isArray() && emailArr.size() > 0) {
            d.email = safeText(emailArr.get(0), "Email", "—");
        }

        JsonNode addrArr = navigate(borrower, "BorrowerAddress");
        if (addrArr != null && addrArr.isArray() && addrArr.size() > 0) {
            JsonNode addr = navigate(addrArr.get(0), "CreditAddress");
            d.address = buildTrueLinkAddress(addr);
        }

        // ── Accounts (TradeLinePartition) ──────────────────────────────────────
        d.accounts = new ArrayList<>();
        JsonNode tradelines = navigate(report, "TradeLinePartition");
        if (tradelines != null && tradelines.isArray()) {
            for (JsonNode tl : tradelines) {
                JsonNode tl2 = navigate(tl, "Tradeline");
                if (tl2 == null) continue;
                AccountDetail acct = new AccountDetail();
                acct.memberName       = safeText(tl2, "creditorName", "Unknown");
                acct.accountType      = accountTypeLabel(safeText(tl, "accountTypeSymbol", ""));
                acct.accountNumber    = maskAccount(safeText(tl2, "accountNumber", "****"));
                acct.ownership        = ownershipLabel(safeText(
                    navigate(tl2, "AccountDesignator"), "symbol", ""));
                acct.dateOpened       = formatTrueLinkDate(safeText(tl2, "dateOpened", ""));
                acct.dateClosed       = formatTrueLinkDate(safeText(tl2, "dateClosed", ""));
                acct.sanctionedAmount = parseLongSafe(safeText(tl2, "highBalance", "0"));
                acct.currentBalance   = parseLongSafe(safeText(tl2, "currentBalance", "0"));
                acct.amountOverdue    = parseLongSafe(
                    safeText(navigate(tl2, "GrantedTrade"), "amountPastDue", "0"));
                acct.accountStatus    = acct.amountOverdue > 0 ? "OVERDUE" : "STANDARD";
                acct.lastPaymentDate  = formatTrueLinkDate(
                    safeText(navigate(tl2, "GrantedTrade"), "dateLastPayment", ""));
                acct.paymentFrequency = "Monthly";

                JsonNode hist = navigate(tl2, "GrantedTrade/PayStatusHistory/MonthlyPayStatus");
                acct.paymentHistory = new ArrayList<>();
                if (hist != null && hist.isArray()) {
                    for (JsonNode h : hist) {
                        String s = safeText(h, "status", "0");
                        acct.paymentHistory.add("0".equals(s) ? "STD" : "SMA");
                        if (acct.paymentHistory.size() >= 24) break;
                    }
                }
                d.accounts.add(acct);
            }
        }

        d.activeAccounts  = (int) d.accounts.stream().filter(a -> a.dateClosed.isEmpty()).count();
        d.closedAccounts  = d.accounts.size() - d.activeAccounts;
        d.overdueAccounts = (int) d.accounts.stream().filter(a -> a.amountOverdue > 0).count();
        d.totalBalance    = d.accounts.stream().mapToLong(a -> a.currentBalance).sum();
        d.totalOverdue    = d.accounts.stream().mapToLong(a -> a.amountOverdue).sum();

        // ── Enquiries (InquiryPartition) ──────────────────────────────────────
        d.enquiries = new ArrayList<>();
        JsonNode inquiries = navigate(report, "InquiryPartition");
        if (inquiries != null && inquiries.isArray()) {
            for (JsonNode iq : inquiries) {
                JsonNode inq = navigate(iq, "Inquiry");
                if (inq == null) continue;
                EnquiryRecord er = new EnquiryRecord();
                er.date        = formatTrueLinkDate(safeText(inq, "inquiryDate", "—"));
                er.memberName  = safeText(inq, "subscriberName", "—");
                er.purpose     = "Personal Loan";
                er.amount      = "₹" + formatAmount(parseLongSafe(safeText(inq, "amount", "0")));
                er.productType = "Personal Loan";
                d.enquiries.add(er);
            }
        }

        return d;
    }

    private String buildTrueLinkAddress(JsonNode addr) {
        if (addr == null) return "—";
        String street = safeText(addr, "StreetAddress", "");
        String pin    = safeText(addr, "PostalCode", "");
        if (street.isBlank()) return "—";
        return street.trim() + (pin.isBlank() ? "" : " — " + pin);
    }

    private String accountTypeLabel(String symbol) {
        return switch (symbol) {
            case "01" -> "Auto Loan";
            case "02" -> "Home Loan";
            case "03" -> "Property Loan";
            case "04" -> "Business Loan";
            case "05" -> "Personal Loan";
            case "06" -> "Consumer Loan";
            case "07" -> "Personal Loan (CC)";
            case "08" -> "Home Loan";
            case "09" -> "OD / Overdraft";
            case "10" -> "Credit Card";
            case "11" -> "Home Loan";
            case "12" -> "Property Loan";
            case "13" -> "Business Loan";
            case "31" -> "Consumer Loan";
            case "32" -> "Gold Loan";
            case "33" -> "Loan Against Securities";
            case "35" -> "Kisan Credit Card";
            case "37" -> "Two-Wheeler Loan";
            case "38" -> "Commercial Vehicle Loan";
            case "39" -> "Construction Equipment Loan";
            case "43" -> "Pradhan Mantri Loan";
            case "51" -> "Business Credit Card";
            case "52" -> "Fleet Card";
            case "61" -> "Business Loan";
            default   -> "Loan (" + symbol + ")";
        };
    }

    private String ownershipLabel(String symbol) {
        return switch (symbol) {
            case "1" -> "Individual";
            case "2" -> "Joint";
            case "3" -> "Guarantor";
            case "4" -> "Co-Applicant";
            default  -> "Self";
        };
    }

    private String formatTrueLinkDate(String raw) {
        if (raw == null || raw.isBlank()) return "";
        // Format: "2023-11-04+05:30" → "04-11-2023"
        try {
            String date = raw.contains("+") ? raw.substring(0, raw.indexOf('+')) : raw;
            String[] parts = date.split("-");
            if (parts.length >= 3) return parts[2] + "-" + parts[1] + "-" + parts[0];
        } catch (Exception ignored) {}
        return raw;
    }

    private long parseLongSafe(String s) {
        if (s == null || s.isBlank()) return 0;
        try {
            long v = (long) Double.parseDouble(s.trim());
            return v < 0 ? 0 : v; // CIBIL uses -1 for "not reported" — treat as 0
        }
        catch (Exception e) { return 0; }
    }

    private JsonNode firstNonNull(JsonNode... nodes) {
        for (JsonNode n : nodes) if (n != null && !n.isNull() && !n.isMissingNode()) return n;
        return null;
    }

    private int firstNonZeroInt(int... values) {
        for (int v : values) if (v != 0) return v;
        return 0;
    }

    private AccountDetail parseAccount(JsonNode a) {
        AccountDetail acct = new AccountDetail();
        acct.memberName       = safeText(a, "SubscriberName", safeText(a, "memberName", "Unknown Bank"));
        acct.accountType      = safeText(a, "AccountType", safeText(a, "accountType", "—"));
        acct.accountNumber    = maskAccount(safeText(a, "AccountNumber", safeText(a, "accountNumber", "****")));
        acct.ownership        = safeText(a, "OwnershipType", "Self");
        acct.dateOpened       = formatDate(safeText(a, "DateOpened", "—"));
        acct.dateClosed       = formatDate(safeText(a, "DateClosed", ""));
        acct.sanctionedAmount = safeInt(a, "HighCreditOrSanctionedAmount",
                                  safeInt(a, "sanctionedAmount", safeInt(a, "CreditLimit", 0)));
        acct.currentBalance   = safeInt(a, "CurrentBalance", safeInt(a, "currentBalance", 0));
        acct.amountOverdue    = safeInt(a, "AmountOverdue", safeInt(a, "amountOverdue", 0));
        acct.accountStatus    = safeText(a, "AccountStatus", safeText(a, "status", "STANDARD"));
        acct.lastPaymentDate  = formatDate(safeText(a, "DateOfLastPayment", "—"));
        acct.paymentFrequency = safeText(a, "PaymentFrequency", "Monthly");

        // Payment history (24m)
        acct.paymentHistory = new ArrayList<>();
        JsonNode ph = navigate(a, "PaymentHistory");
        if (ph == null) ph = navigate(a, "paymentHistory");
        if (ph != null && ph.isArray()) {
            for (JsonNode h : ph) {
                acct.paymentHistory.add(h.asText("XXX").trim());
                if (acct.paymentHistory.size() >= 24) break;
            }
        } else if (ph != null && ph.isTextual()) {
            // Sometimes it's a string like "000111..."
            for (char c : ph.asText().toCharArray()) {
                acct.paymentHistory.add(String.valueOf(c).equals("0") ? "STD" : "SMA");
                if (acct.paymentHistory.size() >= 24) break;
            }
        }
        return acct;
    }

    // ── Data classes ──────────────────────────────────────────────────────────

    static class CibilData {
        String reportId, fullName, dob, gender, email, address, occupationType, income, scoreDate;
        int cibilScore;
        List<AccountDetail> accounts = new ArrayList<>();
        List<EnquiryRecord> enquiries = new ArrayList<>();
        int activeAccounts, closedAccounts, overdueAccounts;
        long totalBalance, totalOverdue;
    }

    static class AccountDetail {
        String memberName, accountType, accountNumber, ownership;
        String dateOpened, dateClosed, lastPaymentDate, paymentFrequency;
        long sanctionedAmount, currentBalance, amountOverdue;
        String accountStatus;
        List<String> paymentHistory = new ArrayList<>();
    }

    static class EnquiryRecord {
        String date, memberName, purpose, amount, productType;
    }

    // ── Cell helpers ──────────────────────────────────────────────────────────

    private PdfPCell labelCell(String text, Color bg) {
        PdfPCell c = new PdfPCell(new Phrase(text, bold(8, CIBIL_DARK_BLUE)));
        c.setBackgroundColor(CIBIL_LIGHT_BLUE);
        c.setPadding(5);
        c.setBorderColor(BORDER_LIGHT);
        return c;
    }

    private PdfPCell valueCell(String text, Color bg) {
        PdfPCell c = new PdfPCell(new Phrase(text, reg(8, HEADER_GREY)));
        c.setBackgroundColor(bg);
        c.setPadding(5);
        c.setBorderColor(BORDER_LIGHT);
        return c;
    }

    // ── Utility helpers ───────────────────────────────────────────────────────

    private String now(String pattern) {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(pattern));
    }

    private String prevMonth() {
        LocalDate last = LocalDate.now().minusMonths(1);
        return last.format(DateTimeFormatter.ofPattern("MM-yyyy"));
    }

    private Paragraph vGap(float pts) {
        Paragraph p = new Paragraph(" ");
        p.setSpacingAfter(pts);
        return p;
    }

    private Chunk vGapInline(float pts) {
        // Chunk.setLineHeight() does not exist in OpenPDF; spacing is controlled by the surrounding Paragraph
        return new Chunk("\n");
    }

    private String formatAmount(long amount) {
        return String.format("%,d", amount);
    }

    private String maskAccount(String acc) {
        if (acc == null || acc.length() <= 4) return acc;
        return "****" + acc.substring(acc.length() - 4);
    }

    private String formatDate(String raw) {
        if (raw == null || raw.isBlank() || raw.equals("—")) return raw == null ? "" : raw;
        // Try to parse known formats
        try {
            if (raw.matches("\\d{8}")) { // DDMMYYYY
                return raw.substring(0, 2) + "-" + raw.substring(2, 4) + "-" + raw.substring(4);
            }
        } catch (Exception ignored) {}
        return raw;
    }

    private String genderLabel(String g) {
        if ("M".equalsIgnoreCase(g) || "MALE".equalsIgnoreCase(g)) return "Male";
        if ("F".equalsIgnoreCase(g) || "FEMALE".equalsIgnoreCase(g)) return "Female";
        return g.isEmpty() ? "—" : g;
    }

    private String buildAddress(JsonNode addr) {
        if (addr == null) return "—";
        String[] parts = {
            safeText(addr, "Line1", ""), safeText(addr, "Line2", ""),
            safeText(addr, "City", ""),  safeText(addr, "State", ""),
            safeText(addr, "PIN", ""),
        };
        StringBuilder sb = new StringBuilder();
        for (String p : parts) if (!p.isBlank()) { if (sb.length() > 0) sb.append(", "); sb.append(p); }
        return sb.length() == 0 ? "—" : sb.toString();
    }

    private Color scoreColor(int score) {
        if (score >= 750) return SCORE_GREEN;
        if (score >= 700) return SCORE_LIME;
        if (score >= 650) return SCORE_AMBER;
        if (score >= 550) return SCORE_ORANGE;
        return SCORE_RED;
    }

    private Color bandColor(String band) {
        if (band.startsWith("750")) return SCORE_GREEN;
        if (band.startsWith("700")) return SCORE_LIME;
        if (band.startsWith("650")) return SCORE_AMBER;
        if (band.startsWith("550")) return SCORE_ORANGE;
        return SCORE_RED;
    }

    private boolean isInBand(int score, String band) {
        String[] p = band.split("–");
        if (p.length != 2) return false;
        try {
            int lo = Integer.parseInt(p[0].trim());
            int hi = Integer.parseInt(p[1].trim());
            return score >= lo && score <= hi;
        } catch (Exception e) { return false; }
    }

    private Color paymentColor(String code) {
        return switch (code.toUpperCase()) {
            case "STD" -> SCORE_GREEN;
            case "SMA" -> SCORE_AMBER;
            case "SUB" -> SCORE_ORANGE;
            case "DBT", "LSS" -> SCORE_RED;
            default -> new Color(180, 180, 180); // XXX / unknown
        };
    }

    private String safeText(JsonNode node, String path, String fallback) {
        if (node == null) return fallback;
        JsonNode n = navigateFromNode(node, path);
        return (n != null && !n.isNull() && n.isValueNode()) ? n.asText(fallback) : fallback;
    }

    private int safeInt(JsonNode node, String path, int fallback) {
        if (node == null) return fallback;
        JsonNode n = navigateFromNode(node, path);
        return (n != null && !n.isNull() && n.isValueNode()) ? n.asInt(fallback) : fallback;
    }

    private JsonNode navigate(JsonNode root, String path) {
        if (root == null || path == null || path.isBlank()) return root;
        return navigateFromNode(root, path);
    }

    private JsonNode navigateFromNode(JsonNode node, String path) {
        if (node == null) return null;
        String[] parts = path.split("/");
        JsonNode current = node;
        for (String part : parts) {
            if (current == null) return null;
            if (part.matches("\\d+")) {
                current = current.isArray() ? current.get(Integer.parseInt(part)) : null;
            } else {
                current = current.get(part);
            }
        }
        return current;
    }

    private boolean isBlank(String s) {
        return s == null || s.isBlank();
    }
}
