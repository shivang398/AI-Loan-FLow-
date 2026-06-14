import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND = 'http://127.0.0.1:8080';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    port: 3000,
    proxy: {
      // ── Service health — all map to the single Node.js /health endpoint ─────
      '/api/svc-health': {
        target: BACKEND,
        changeOrigin: true,
        rewrite: () => '/health',
      },

      // ── All API routes → Node.js backend :8080 ───────────────────────────────
      '/api/auth':        { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/connectors':  { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/commissions': { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/transactions':{ target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/foir':        { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/routing':     { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/slabs':       { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/customers':   { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/documents':   { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/loans':       { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/eligibility': { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/policies':    { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/bsa':         { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/messaging':   { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/notifications':{ target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/analytics':   { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/reports':     { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
      '/api/webhooks':    { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },

      // ── WebSocket (Socket.IO) ─────────────────────────────────────────────────
      '/socket.io': { target: BACKEND, changeOrigin: true, ws: true },

      // ── Catch-all ─────────────────────────────────────────────────────────────
      '/api': { target: BACKEND, changeOrigin: true, rewrite: (p) => p.replace(/^\/api/, '') },
    },
  },
})
