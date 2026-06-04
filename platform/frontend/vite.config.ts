import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    port: 3000,
    proxy: {
      // ── Health-check routes (6 merged services) ──────────────────────────────
      '/api/svc-health/auth':         { target: 'http://127.0.0.1:8081', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/connector':    { target: 'http://127.0.0.1:8082', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/commission':   { target: 'http://127.0.0.1:8082', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/routing':      { target: 'http://127.0.0.1:8082', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/customer':     { target: 'http://127.0.0.1:8083', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/document':     { target: 'http://127.0.0.1:8083', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/loan':         { target: 'http://127.0.0.1:8084', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/eligibility':  { target: 'http://127.0.0.1:8084', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/policy':       { target: 'http://127.0.0.1:8084', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/messaging':    { target: 'http://127.0.0.1:8087', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/notification': { target: 'http://127.0.0.1:8087', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/reporting':    { target: 'http://127.0.0.1:8093', changeOrigin: true, rewrite: () => '/actuator/health' },
      '/api/svc-health/analytics':    { target: 'http://127.0.0.1:8093', changeOrigin: true, rewrite: () => '/actuator/health' },

      // ── auth-service :8081 ───────────────────────────────────────────────────
      '/api/auth': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, '/auth'),
      },

      // ── sales-ops-service :8082 (connectors + commissions + routing) ─────────
      '/api/connectors': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/connectors/, '/connectors'),
      },
      '/api/foir': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/foir/, '/foir'),
      },
      '/api/transactions': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/transactions/, '/transactions'),
      },
      '/api/slabs': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/slabs/, '/slabs'),
      },
      '/api/commissions': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/commissions/, ''),
      },
      '/api/routing': {
        target: 'http://127.0.0.1:8082',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/routing/, '/routing'),
      },

      // ── customer-document-service :8083 (customers + documents) ─────────────
      '/api/customers': {
        target: 'http://127.0.0.1:8083',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/customers/, '/customers'),
      },
      '/api/documents': {
        target: 'http://127.0.0.1:8083',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/documents/, '/documents'),
      },

      // ── loan-core-service :8084 (loans + eligibility + policy) ──────────────
      '/api/loans': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/loans/, '/loans'),
      },
      '/api/eligibility': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/eligibility/, '/eligibility'),
      },
      '/api/analyse': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
      },
      '/api/policies': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/policies/, '/policies'),
      },
      '/api/bsa': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bsa/, '/bsa'),
      },

      // ── communications-service :8087 (messaging + notifications) ────────────
      '/api/messaging/team-meeting': {
        target: 'http://127.0.0.1:8087',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/messaging\/team-meeting/, '/team-meeting'),
      },
      '/api/messaging': {
        target: 'http://127.0.0.1:8087',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/messaging/, '/messaging'),
      },
      '/api/notifications': {
        target: 'http://127.0.0.1:8087',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/notifications/, '/notifications'),
      },
      '/api/webhooks': {
        target: 'http://127.0.0.1:8087',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhooks/, '/webhooks'),
      },

      // ── analytics-reporting-service :8093 (analytics + reporting) ───────────
      '/api/analytics': {
        target: 'http://127.0.0.1:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/analytics/, '/analytics'),
      },
      '/api/reports': {
        target: 'http://127.0.0.1:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/reports/, '/reports'),
      },

      // ── WebSocket (communications-service) ───────────────────────────────────
      '/ws-messaging': {
        target: 'http://127.0.0.1:8087',
        ws: true,
        changeOrigin: true,
      },
      '/ws/team-meeting': {
        target: 'http://127.0.0.1:8087',
        ws: true,
        changeOrigin: true,
      },

      // ── Catch-all ────────────────────────────────────────────────────────────
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
