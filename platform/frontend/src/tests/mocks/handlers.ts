import { http, HttpResponse } from 'msw';

export const handlers = [
  // Auth Mock
  http.post('*/api/auth/login', () => {
    return HttpResponse.json({
      success: true,
      data: {
        token: 'mock-jwt-token',
        id: '1',
        email: 'admin@example.com',
        role: 'ADMIN',
      }
    });
  }),

  // Users Mock
  http.get('*/api/auth/users/lookup', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: '1', email: 'user@example.com', role: 'ADMIN' }
      ]
    });
  }),

  // Analytics Mock
  http.get('*/api/analytics/stats', () => {
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
