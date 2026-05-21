package com.financial.eligibility.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.eligibility.dto.CibilRequestDto;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

    // ── Public entry point ────────────────────────────────────────────────────

    public byte[] generateCibilReportPdf(CibilRequestDto dto) {
        JsonNode apiResponse = callTenacioApi(dto);
        return buildPdf(dto, apiResponse);
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

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, entity, String.class);
            log.info("Tenacio CIBIL API responded — status: {}", response.getStatusCode());
            return objectMapper.readTree(response.getBody());
        } catch (HttpStatusCodeException e) {
            log.error("Tenacio API error: {} — {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException(extractErrorMessage(e.getResponseBodyAsString()));
        } catch (Exception e) {
            log.error("Failed to reach Tenacio CIBIL API", e);
            throw new RuntimeException("Unable to reach CIBIL service. Please try again later.");
        }
    }

    private String extractErrorMessage(String body) {
        try {
            JsonNode node = objectMapper.readTree(body);
            if (node.has("message")) return node.get("message").asText();
            if (node.has("error"))   return node.get("error").asText();
        } catch (Exception ignored) {}
        return body != null && !body.isBlank() ? body : "Unknown API error";
    }

    // ── PDF generation ────────────────────────────────────────────────────────

    private byte[] buildPdf(CibilRequestDto dto, JsonNode apiResponse) {
        try {
            Document doc = new Document(PageSize.A4, 50, 50, 60, 50);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            PdfWriter.getInstance(doc, out);
            doc.open();

            Font titleFont   = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, new BaseColor(30,  41,  59));
            Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, new BaseColor(71,  85,  105));
            Font labelFont   = FontFactory.getFont(FontFactory.HELVETICA_BOLD,  9, new BaseColor(71,  85,  105));
            Font valueFont   = FontFactory.getFont(FontFactory.HELVETICA,        9, new BaseColor(15,  23,  42));
            Font smallFont   = FontFactory.getFont(FontFactory.HELVETICA,        8, new BaseColor(148, 163, 184));

            // Title
            Paragraph title = new Paragraph("CIBIL Soft Pull Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(4);
            doc.add(title);

            Paragraph ts = new Paragraph(
                "Generated: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")),
                smallFont);
            ts.setAlignment(Element.ALIGN_CENTER);
            ts.setSpacingAfter(16);
            doc.add(ts);

            addLine(doc);

            // Customer Information
            doc.add(gap(8));
            doc.add(new Paragraph("Customer Information", sectionFont));
            doc.add(gap(4));

            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            infoTable.setWidths(new float[]{30f, 70f});
            infoTable.setSpacingAfter(16);
            addRow(infoTable, "Full Name",   dto.getName(),                              labelFont, valueFont);
            addRow(infoTable, "PAN Number",  dto.getPanNumber(),                         labelFont, valueFont);
            addRow(infoTable, "Mobile",      dto.getMobileNumber(),                      labelFont, valueFont);
            addRow(infoTable, "Consent",     dto.isConsent() ? "Given" : "Not Given",    labelFont, valueFont);
            doc.add(infoTable);

            addLine(doc);

            // Credit Report Response
            doc.add(gap(8));
            doc.add(new Paragraph("Credit Report Response", sectionFont));
            doc.add(gap(4));

            List<String[]> pairs = new ArrayList<>();
            flattenJson("", apiResponse, pairs);

            if (pairs.isEmpty()) {
                doc.add(new Paragraph("No data received from the CIBIL service.", valueFont));
            } else {
                PdfPTable dataTable = new PdfPTable(2);
                dataTable.setWidthPercentage(100);
                dataTable.setWidths(new float[]{38f, 62f});
                dataTable.setSpacingAfter(16);
                boolean alt = false;
                for (String[] pair : pairs) {
                    BaseColor bg = alt ? new BaseColor(248, 250, 252) : BaseColor.WHITE;
                    dataTable.addCell(styledCell(pair[0], labelFont, new BaseColor(241, 245, 249)));
                    dataTable.addCell(styledCell(pair[1], valueFont, bg));
                    alt = !alt;
                }
                doc.add(dataTable);
            }

            addLine(doc);

            // Footer
            doc.add(gap(6));
            Paragraph footer = new Paragraph(
                "Soft pull via Tenacio Workflow (" + workflowId + "). "
                + "This check does not impact the customer's CIBIL score.",
                smallFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            doc.add(footer);

            doc.close();
            return out.toByteArray();

        } catch (Exception e) {
            log.error("Error building CIBIL PDF", e);
            throw new RuntimeException("Failed to generate CIBIL PDF", e);
        }
    }

    // Flattens a JsonNode tree into [label, value] pairs using › separators for nesting
    private void flattenJson(String prefix, JsonNode node, List<String[]> pairs) {
        if (node == null || node.isNull()) return;

        if (node.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> it = node.fields();
            while (it.hasNext()) {
                Map.Entry<String, JsonNode> e = it.next();
                String key = prefix.isEmpty() ? toLabel(e.getKey()) : prefix + " › " + toLabel(e.getKey());
                flattenJson(key, e.getValue(), pairs);
            }
        } else if (node.isArray()) {
            int i = 0;
            for (JsonNode item : node) {
                flattenJson(prefix + " [" + (++i) + "]", item, pairs);
            }
        } else {
            pairs.add(new String[]{prefix, node.asText()});
        }
    }

    // Converts camelCase / snake_case JSON keys to readable labels
    private String toLabel(String key) {
        return key.replaceAll("([a-z])([A-Z])", "$1 $2")
                  .replaceAll("_", " ")
                  .trim();
    }

    // ── PDF helpers ───────────────────────────────────────────────────────────

    private PdfPCell styledCell(String text, Font font, BaseColor bg) {
        PdfPCell cell = new PdfPCell(new Phrase(text != null ? text : "—", font));
        cell.setBackgroundColor(bg);
        cell.setPadding(6);
        cell.setBorderColor(new BaseColor(226, 232, 240));
        return cell;
    }

    private void addRow(PdfPTable table, String label, String value, Font labelFont, Font valueFont) {
        table.addCell(styledCell(label, labelFont, new BaseColor(241, 245, 249)));
        table.addCell(styledCell(value, valueFont, BaseColor.WHITE));
    }

    private void addLine(Document doc) throws DocumentException {
        PdfPTable line = new PdfPTable(1);
        line.setWidthPercentage(100);
        PdfPCell cell = new PdfPCell(new Phrase(""));
        cell.setBorderWidthBottom(0.5f);
        cell.setBorderWidthTop(0);
        cell.setBorderWidthLeft(0);
        cell.setBorderWidthRight(0);
        cell.setBorderColorBottom(new BaseColor(226, 232, 240));
        cell.setPaddingBottom(0);
        cell.setPaddingTop(0);
        line.addCell(cell);
        doc.add(line);
    }

    private Paragraph gap(float pts) {
        Paragraph p = new Paragraph(" ");
        p.setSpacingAfter(pts);
        return p;
    }
}
