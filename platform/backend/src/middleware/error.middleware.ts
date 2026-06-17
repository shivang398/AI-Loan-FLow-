import { Request, Response, NextFunction } from 'express';
import { fail } from '../utils/response';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const status = (err as { status?: number }).status ?? 500;

  if (status >= 500) {
    // Only log unexpected errors server-side; never send stack to client
    console.error('[Error]', err.message, err.stack);
  }

  // App-thrown errors (4xx) carry a safe message intended for the client.
  // Unexpected 5xx errors get a generic message — no internal details exposed.
  const message = status < 500 ? (err.message || 'Bad request') : 'Internal server error';
  res.status(status).json(fail(message));
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json(fail('Route not found'));
}
