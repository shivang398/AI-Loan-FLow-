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
      '/api/auth': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, '/auth'),
      },
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
      '/api/loans': {
        target: 'http://127.0.0.1:8084',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/loans/, '/loans'),
      },
      '/api/customers': {
        target: 'http://127.0.0.1:8083',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/customers/, '/customers'),
      },
      '/api/eligibility': {
        target: 'http://127.0.0.1:8085',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/eligibility/, '/eligibility'),
      },
      '/api/analyse': {
        target: 'http://127.0.0.1:8085',
        changeOrigin: true,
      },
      '/api/commissions': {
        target: 'http://127.0.0.1:8092',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/commissions/, ''),
      },
      '/api/messaging': {
        target: 'http://127.0.0.1:8087',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/messaging/, '/messaging'),
      },
      '/api/policies': {
        target: 'http://127.0.0.1:8086',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/policies/, '/policies'),
      },
      '/api/rm': {
        target: 'http://127.0.0.1:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rm/, '/rm'),
      },
      '/api/queries': {
        target: 'http://127.0.0.1:8089',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/queries/, '/queries'),
      },
      '/api/documents': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/documents/, '/documents'),
      },
      '/api/reports': {
        target: 'http://127.0.0.1:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/reports/, '/reports'),
      },
      '/api/analytics': {
        target: 'http://127.0.0.1:8094',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/analytics/, '/analytics'),
      },
      '/api/routing': {
        target: 'http://127.0.0.1:8095',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/routing/, '/routing'),
      },
      '/ws-messaging': {
        target: 'http://127.0.0.1:8087',
        ws: true,
        changeOrigin: true,
      },
      // Catch-all for any other /api requests to auth-service or a default
      '/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
