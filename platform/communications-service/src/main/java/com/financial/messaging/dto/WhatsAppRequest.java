package com.financial.messaging.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class WhatsAppRequest {
    private String messaging_product;
    private String recipient_type;
    private String to;
    private String type;
    private TextMessage text;
    private TemplateMessage template;
    private MediaMessage image;
    private MediaMessage document;

    @Data
    @Builder
    public static class TextMessage {
        private String body;
    }

    @Data
    @Builder
    public static class TemplateMessage {
        private String name;
        private Language language;
        private List<Component> components;
    }

    @Data
    @Builder
    public static class Language {
        private String code;
    }

    @Data
    @Builder
    public static class Component {
        private String type;
        private List<Parameter> parameters;
    }

    @Data
    @Builder
    public static class Parameter {
        private String type;
        private String text;
        private MediaMessage image;
        private MediaMessage document;
    }

    @Data
    @Builder
    public static class MediaMessage {
        private String id;
        private String link;
        private String caption;
        private String filename;
    }
}
