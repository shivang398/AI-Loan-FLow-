import { Request, Response, NextFunction } from 'express';
import { fail } from '../utils/response';

// Prisma "known request" errors that are really client mistakes, not server faults
const PRISMA_CLIENT_ERRORS: Record<string, { status: number; message: (target: string) => string }> = {
  P2002: { status: 409, message: t => `A record with this ${t || 'value'} already exists` },   // unique constraint
  P2003: { status: 400, message: () => 'This refers to a record that does not exist' },        // foreign key
  P2025: { status: 404, message: () => 'Record not found' },                                    // update/delete of missing row
};

/** "connectors_phone_key" / ["phone"] → "phone" */
function uniqueTarget(meta: { target?: unknown } | undefined): string {
  const t = meta?.target;
  const raw = Array.isArray(t) ? t.join(', ') : typeof t === 'string' ? t : '';
  return raw.replace(/^[a-z_]+?_(?=[a-z_]+_key$)/, '').replace(/_key$/, '').replace(/_/g, ' ');
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const prisma = err as Error & { code?: string; meta?: { target?: unknown } };
  const known = prisma.code ? PRISMA_CLIENT_ERRORS[prisma.code] : undefined;
  if (known) {
    res.status(known.status).json(fail(known.message(uniqueTarget(prisma.meta))));
    return;
  }

  const status = (err as { status?: number }).status ?? 500;

  if (status >= 500) {
    // Suppress stack traces in production to avoid leaking internal paths (LOW-7)
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Error]', err.message, err.stack);
    } else {
      console.error('[Error]', err.message);
    }
  }

  // App-thrown errors (4xx) carry a safe message intended for the client.
  // Unexpected 5xx errors get a generic message — no internal details exposed.
  const message = status < 500 ? (err.message || 'Bad request') : 'Internal server error';
  res.status(status).json(fail(message));
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json(fail('Route not found'));
}
