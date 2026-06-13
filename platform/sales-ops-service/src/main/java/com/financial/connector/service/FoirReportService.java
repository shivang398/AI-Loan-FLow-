package com.financial.connector.service;

import com.financial.connector.model.EligibilityStatus;
import com.financial.connector.model.FoirResult;
import com.financial.connector.model.LoanObligation;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import java.awt.Color;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoirReportService {

    private static final Color BRAND      = new Color(79, 70, 229);
    private static final Color BRAND_LIGHT= new Color(238, 242, 255);
    private static final Color SUCCESS    = new Color(5, 150, 105);
    private static final Color SUCCESS_BG = new Color(209, 250, 229);
    private static final Color WARN       = new Color(217, 119, 6);
    private static final Color WARN_BG    = new Color(254, 243, 199);
    private static final Color DANGER     = new Color(220, 38, 38);
    private static final Color DANGER_BG  = new Color(254, 226, 226);
    private static final Color HEADER_BG  = new Color(15, 23, 42);
    private static final Color ROW_ALT    = new Color(248, 250, 252);
    private static final Color BORDER_CLR = new Color(226, 232, 240);
    private static final Color TEXT_MUTED = new Color(100, 116, 139);

    private static final Font FONT_TITLE      = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 22, BRAND);
    private static final Font FONT_SECTION    = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11, HEADER_BG);
    private static final Font FONT_LABEL      = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9,  TEXT_MUTED);
    private static final Font FONT_VALUE_BOLD = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, HEADER_BG);
    private static final Font FONT_TH         = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9,  Color.WHITE);
    private static final Font FONT_TD         = FontFactory.getFont(FontFactory.HELVETICA,      9,  HEADER_BG);
    private static final Font FONT_SMALL      = FontFactory.getFont(FontFactory.HELVETICA,      8,  TEXT_MUTED);

    public byte[] generate(FoirResult r) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             Document doc = new Document(PageSize.A4, 45, 45, 60, 55)) {
            PdfWriter writer = PdfWriter.getInstance(doc, baos);
            writer.setPageEvent(new HeaderFooterEvent(r.applicantName()));
            doc.open();

            addTitle(doc, r);
            doc.add(Chunk.NEWLINE);
            addApplicantSection(doc, r);
            doc.add(Chunk.NEWLINE);
            addFoirSection(doc, r);
            doc.add(Chunk.NEWLINE);
            addProposedLoanSection(doc, r);
            doc.add(Chunk.NEWLINE);
            addMaxEligibilitySection(doc, r);
            doc.add(Chunk.NEWLINE);
            addBudgetBreakup(doc, r);
            if (r.existingObligations() != null && !r.existingObligations().isEmpty()) {
                doc.add(Chunk.NEWLINE);
                addObligationsTable(doc, r);
            }

            doc.close();
            log.info("FOIR PDF generated for '{}'", r.applicantName());
            return baos.toByteArray();
        } catch (DocumentException | IOException e) {
            log.error("Failed to generate FOIR PDF for '{}'", r.applicantName(), e);
            throw new RuntimeException("PDF generation failed: " + e.getMessage(), e);
        }
    }

    private void addTitle(Document doc, FoirResult r) throws DocumentException {
        Paragraph title = new Paragraph("FOIR Analysis Report", FONT_TITLE);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(4);
        doc.add(title);

        Paragraph sub = new Paragraph(
            "Fixed Obligation to Income Ratio  ·  Generated "
            + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")), FONT_SMALL);
        sub.setAlignment(Element.ALIGN_CENTER);
        sub.setSpacingAfter(8);
        doc.add(sub);

        PdfPTable hr = new PdfPTable(1);
        hr.setWidthPercentage(100);
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(BRAND);
        cell.setFixedHeight(3f);
        cell.setBorder(Rectangle.NO_BORDER);
        hr.addCell(cell);
        doc.add(hr);
    }

    private void addApplicantSection(Document doc, FoirResult r) throws DocumentException {
        doc.add(sectionHeader("Applicant Information"));
        PdfPTable t = kvTable();
        addKv(t, "Applicant Name",        r.applicantName(), false);
        addKv(t, "Applicant Type",        switch (r.applicantType()) {
            case SALARIED                   -> "Salaried Employee";
            case GOVT_SALARIED              -> "Government / PSU Salaried";
            case SELF_EMPLOYED              -> "Self-Employed / Business Owner";
            case SELF_EMPLOYED_PROFESSIONAL -> "Self-Employed Professional";
            case NRI                        -> "NRI";
            case PENSIONER                  -> "Pensioner";
        }, false);
        addKv(t, "Gross Monthly Income",  formatInr(r.grossMonthlyIncome()), false);
        addKv(t, "Net Monthly Income",    formatInr(r.netMonthlyIncome()), true);
        doc.add(t);
    }

    private void addFoirSection(Document doc, FoirResult r) throws DocumentException {
        doc.add(sectionHeader("FOIR Analysis"));

        Color sc = statusColor(r.eligibilityStatus());
        Color sb = statusBg(r.eligibilityStatus());

        PdfPTable banner = new PdfPTable(1);
        banner.setWidthPercentage(100);
        banner.setSpacingAfter(8);
        PdfPCell bc = new PdfPCell(new Phrase(
            statusLabel(r.eligibilityStatus()) + "  —  " + r.eligibilityMessage(),
            FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, sc)
        ));
        bc.setBackgroundColor(sb);
        bc.setPadding(10);
        bc.setBorderColor(sc);
        bc.setBorderWidth(1.2f);
        banner.addCell(bc);
        doc.add(banner);

        PdfPTable t = kvTable();
        addKv(t, "Current FOIR (without new loan)", r.currentFoirPercent() + "%", r.alreadyOverLeveraged());
        addKv(t, "FOIR After Proposed Loan",        r.foirAfterProposedLoan() + "%", false);
        addKv(t, "FOIR Eligible Limit",             r.foirEligibleLimit() + "%", false);
        addKv(t, "FOIR Borderline Limit",           r.foirBorderlineLimit() + "%", false);
        addKv(t, "Total Existing EMIs",             formatInr(r.totalExistingObligations()), false);
        if (r.alreadyOverLeveraged())
            addKv(t, "Warning", "Existing obligations alone exceed the eligible FOIR limit.", true);
        doc.add(t);
    }

    private void addProposedLoanSection(Document doc, FoirResult r) throws DocumentException {
        doc.add(sectionHeader("Proposed Loan & EMI Details"));
        PdfPTable t = kvTable();
        addKv(t, "Loan Amount",           formatInr(r.proposedLoanAmount()), false);
        addKv(t, "Tenure",                r.proposedTenureMonths() + " months ("
                                          + (r.proposedTenureMonths() / 12) + " yrs "
                                          + (r.proposedTenureMonths() % 12) + " mths)", false);
        addKv(t, "Interest Rate",         r.proposedInterestRate() + "% p.a.", false);
        addKv(t, "Monthly EMI",           formatInr(r.proposedEmi()), true);
        addKv(t, "Total Interest",        formatInr(r.totalInterestPayable()), false);
        addKv(t, "Total Amount Payable",  formatInr(r.totalAmountPayable()), false);
        doc.add(t);
    }

    private void addMaxEligibilitySection(Document doc, FoirResult r) throws DocumentException {
        doc.add(sectionHeader("Maximum Loan Eligibility (at " + r.foirEligibleLimit() + "% FOIR limit)"));
        PdfPTable t = kvTable();
        addKv(t, "Max Affordable EMI",  formatInr(r.maxAffordableEmi()), true);
        addKv(t, "Max Eligible Loan",   formatInr(r.maxEligibleLoanAmount()), true);
        BigDecimal headroom = r.maxEligibleLoanAmount().subtract(r.proposedLoanAmount());
        addKv(t, "Headroom vs Proposed",
              headroom.compareTo(BigDecimal.ZERO) >= 0 ? "+" + formatInr(headroom) : "−" + formatInr(headroom.abs()),
              false);
        doc.add(t);
    }

    private void addBudgetBreakup(Document doc, FoirResult r) throws DocumentException {
        doc.add(sectionHeader("Monthly Budget Breakup"));
        FoirResult.BudgetBreakup b = r.monthlyBudgetBreakup();
        PdfPTable t = new PdfPTable(new float[]{40f, 30f, 30f});
        t.setWidthPercentage(100);
        t.setSpacingAfter(6);
        addTh(t, "Category"); addTh(t, "Amount"); addTh(t, "% of Income");
        addTr(t, "Net Monthly Income",    formatInr(b.income()),          "100.00%", false, BRAND_LIGHT);
        addTr(t, "Existing EMIs",         formatInr(b.existingEmiTotal()), b.existingEmiPercent() + "%", false, ROW_ALT);
        addTr(t, "New EMI (Proposed)",    formatInr(b.newEmiAmount()),     b.newEmiPercent() + "%", false, null);
        boolean neg = b.remainingBalance().compareTo(BigDecimal.ZERO) < 0;
        addTr(t, "Remaining Balance",     formatInr(b.remainingBalance()), b.remainingPercent() + "%",
              neg, neg ? DANGER_BG : SUCCESS_BG);
        doc.add(t);
    }

    private void addObligationsTable(Document doc, FoirResult r) throws DocumentException {
        doc.add(sectionHeader("Existing Obligations Breakdown"));
        PdfPTable t = new PdfPTable(new float[]{60f, 40f});
        t.setWidthPercentage(100);
        addTh(t, "Obligation Type"); addTh(t, "Monthly Amount");
        boolean alt = false;
        for (LoanObligation ob : r.existingObligations()) {
            addTr(t, ob.type().displayName(), formatInr(ob.amount()), null, false, alt ? ROW_ALT : null);
            alt = !alt;
        }
        addTr(t, "TOTAL", formatInr(r.totalExistingObligations()), null, false, BRAND_LIGHT);
        doc.add(t);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private PdfPTable kvTable() {
        PdfPTable t = new PdfPTable(new float[]{45f, 55f});
        t.setWidthPercentage(100); t.setSpacingAfter(6); return t;
    }

    private void addKv(PdfPTable t, String label, String value, boolean highlight) {
        PdfPCell lc = new PdfPCell(new Phrase(label, FONT_LABEL));
        lc.setBorderColor(BORDER_CLR); lc.setPadding(7);
        lc.setBackgroundColor(highlight ? WARN_BG : ROW_ALT);
        Font vf = highlight ? FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, WARN) : FONT_VALUE_BOLD;
        PdfPCell vc = new PdfPCell(new Phrase(value, vf));
        vc.setBorderColor(BORDER_CLR); vc.setPadding(7);
        vc.setBackgroundColor(highlight ? WARN_BG : Color.WHITE);
        t.addCell(lc); t.addCell(vc);
    }

    private void addTh(PdfPTable t, String text) {
        PdfPCell c = new PdfPCell(new Phrase(text, FONT_TH));
        c.setBackgroundColor(HEADER_BG); c.setPadding(8); c.setBorderColor(HEADER_BG); t.addCell(c);
    }

    private void addTr(PdfPTable t, String c1, String c2, String c3, boolean danger, Color bg) {
        Font f = danger ? FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, DANGER) : FONT_TD;
        PdfPCell a = new PdfPCell(new Phrase(c1, f));
        a.setPadding(7); a.setBorderColor(BORDER_CLR); if (bg != null) a.setBackgroundColor(bg); t.addCell(a);
        PdfPCell b = new PdfPCell(new Phrase(c2, f));
        b.setPadding(7); b.setBorderColor(BORDER_CLR); b.setHorizontalAlignment(Element.ALIGN_RIGHT);
        if (bg != null) b.setBackgroundColor(bg); t.addCell(b);
        if (c3 != null) {
            PdfPCell cc = new PdfPCell(new Phrase(c3, f));
            cc.setPadding(7); cc.setBorderColor(BORDER_CLR); cc.setHorizontalAlignment(Element.ALIGN_RIGHT);
            if (bg != null) cc.setBackgroundColor(bg); t.addCell(cc);
        }
    }

    private Paragraph sectionHeader(String text) {
        Paragraph p = new Paragraph(text.toUpperCase(), FONT_SECTION);
        p.setSpacingBefore(4); p.setSpacingAfter(6); return p;
    }

    private String formatInr(BigDecimal amount) {
        if (amount == null) return "₹0.00";
        NumberFormat nf = NumberFormat.getNumberInstance(Locale.of("en", "IN"));
        nf.setMinimumFractionDigits(2); nf.setMaximumFractionDigits(2);
        return "₹" + nf.format(amount);
    }

    private Color statusColor(EligibilityStatus s) {
        return switch (s) { case ELIGIBLE -> SUCCESS; case BORDERLINE -> WARN; case NOT_ELIGIBLE -> DANGER; };
    }
    private Color statusBg(EligibilityStatus s) {
        return switch (s) { case ELIGIBLE -> SUCCESS_BG; case BORDERLINE -> WARN_BG; case NOT_ELIGIBLE -> DANGER_BG; };
    }
    private String statusLabel(EligibilityStatus s) {
        return switch (s) { case ELIGIBLE -> "ELIGIBLE"; case BORDERLINE -> "BORDERLINE"; case NOT_ELIGIBLE -> "NOT ELIGIBLE"; };
    }

    private static class HeaderFooterEvent extends PdfPageEventHelper {
        private final String applicantName;
        HeaderFooterEvent(String applicantName) { this.applicantName = applicantName; }

        @Override
        public void onEndPage(PdfWriter writer, Document document) {
            PdfContentByte cb = writer.getDirectContent();
            Rectangle pg = document.getPageSize();
            cb.setColorFill(new Color(79, 70, 229));
            cb.rectangle(pg.getLeft(), pg.getTop() - 30, pg.getWidth(), 30);
            cb.fill();
            ColumnText.showTextAligned(cb, Element.ALIGN_LEFT,
                new Phrase("Auditor AI  ·  FOIR Analysis Report",
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, Color.WHITE)),
                pg.getLeft(45), pg.getTop() - 18, 0);
            ColumnText.showTextAligned(cb, Element.ALIGN_RIGHT,
                new Phrase(applicantName, FontFactory.getFont(FontFactory.HELVETICA, 9, Color.WHITE)),
                pg.getRight(45), pg.getTop() - 18, 0);
            ColumnText.showTextAligned(cb, Element.ALIGN_CENTER,
                new Phrase("Page " + writer.getPageNumber() + "  ·  Confidential — For Internal Use Only",
                    FontFactory.getFont(FontFactory.HELVETICA, 7, new Color(100, 116, 139))),
                (pg.getLeft() + pg.getRight()) / 2, pg.getBottom(20), 0);
        }
    }
}
