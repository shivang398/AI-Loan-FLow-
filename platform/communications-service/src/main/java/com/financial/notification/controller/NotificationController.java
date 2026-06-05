package com.financial.notification.controller;

import com.financial.common.dto.ApiResponse;
import com.financial.notification.entity.Notification;
import com.financial.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Notification>>> getNotifications(Authentication auth) {
        List<Notification> notifications = isAdmin(auth)
                ? notificationRepository.findTop20ByOrderByCreatedAtDesc()
                : List.of();
        return ResponseEntity.ok(ApiResponse.success("Notifications fetched", notifications, UUID.randomUUID().toString()));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getUnreadCount(Authentication auth) {
        long count = isAdmin(auth) ? notificationRepository.countByReadFalse() : 0L;
        return ResponseEntity.ok(ApiResponse.success("Unread count", Map.of("count", count), UUID.randomUUID().toString()));
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markRead(@PathVariable UUID id, Authentication auth) {
        if (auth == null) throw new org.springframework.security.access.AccessDeniedException("Authentication required");
        UUID callerId = UUID.nameUUIDFromBytes(auth.getName().getBytes(java.nio.charset.StandardCharsets.UTF_8));
        notificationRepository.findById(id).ifPresent(n -> {
            // Only allow marking own notifications as read, unless admin/ops
            if (isAdmin(auth) || callerId.equals(n.getRecipientId())) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        });
        return ResponseEntity.ok(ApiResponse.success("Marked as read", null, UUID.randomUUID().toString()));
    }

    @PostMapping("/read-all")
    public ResponseEntity<ApiResponse<Void>> markAllRead(Authentication auth) {
        if (auth == null) throw new org.springframework.security.access.AccessDeniedException("Authentication required");
        UUID callerId = UUID.nameUUIDFromBytes(auth.getName().getBytes(java.nio.charset.StandardCharsets.UTF_8));
        // Mark only the caller's unread notifications — not the entire system's
        List<Notification> unread = notificationRepository.findAll().stream()
                .filter(n -> !n.isRead() && (isAdmin(auth) || callerId.equals(n.getRecipientId())))
                .toList();
        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
        return ResponseEntity.ok(ApiResponse.success("All marked as read", null, UUID.randomUUID().toString()));
    }

    private boolean isAdmin(Authentication auth) {
        if (auth == null) return false;
        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(a -> a.equals("ADMIN") || a.equals("OPERATIONS") || a.equals("ROLE_ADMIN") || a.equals("ROLE_OPERATIONS"));
    }
}
