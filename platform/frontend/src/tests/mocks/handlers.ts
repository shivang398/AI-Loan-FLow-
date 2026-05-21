import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth Mock
  http.post('*/api/v1/auth/login', () => {
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        user: {
          id: '1',
          email: 'admin@example.com',
          role: 'ADMIN'
        }
      }
    });
  }),

  // Users Mock
  http.get('*/api/v1/users', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: '1', email: 'user@example.com', role: 'ADMIN' }
      ]
    });
  }),

  // Analytics Mock
  http.get('*/api/v1/analytics/stats', () => {
    return HttpResponse.json({
      success: true,
      data: {
        volume: 1200000,
        tat: 7.2,
        approvalRate: 65
      }
    });
  })
];
