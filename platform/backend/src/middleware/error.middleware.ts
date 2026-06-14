import { Request, Response, NextFunction } from 'express';
import { fail } from '../utils/response';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('[Error]', err.message, err.stack);
  const status = (err as { status?: number }).status ?? 500;
  res.status(status).json(fail(err.message || 'Internal server error'));
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json(fail('Route not found'));
}
