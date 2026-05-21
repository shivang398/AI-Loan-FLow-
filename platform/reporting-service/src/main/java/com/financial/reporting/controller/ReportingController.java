package com.financial.reporting.controller;

import com.financial.reporting.service.ReportingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportingController {

    private final ReportingService reportingService;

    @GetMapping("/connector-summary/download")
    public ResponseEntity<byte[]> downloadConnectorReport() throws IOException {
        // Placeholder data - in production, fetched from DB queries
        List<String> headers = List.of("Connector ID", "Name", "Total Leads", "Converted", "Commission");
        List<Map<String, Object>> data = List.of(
                Map.of("Connector ID", "C001", "Name", "Raj Kumar", "Total Leads", 25, "Converted", 18, "Commission", 180000)
        );

        byte[] reportBytes = reportingService.generateExcelReport("Connector Summary", headers, data);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=connector_report.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(reportBytes);
    }
}
