import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenRevoked } from '../config/redis';
import { fail } from '../utils/response';

interface JwtPayload {
  sub: string;
  id?: string;
  roles: string;
  jti: string;
  exp: number;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json(fail('Missing or invalid Authorization header'));
    return;
  }

  const token = header.slice(7);
  try {
    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secret) as JwtPayload;

    if (payload.jti && (await isTokenRevoked(payload.jti))) {
      res.status(401).json(fail('Token has been revoked'));
      return;
    }

    req.user = {
      id: payload.id ?? payload.sub,  // payload.id = real UUID; fall back to email for old tokens
      email: payload.sub,
      roles: payload.roles ? payload.roles.split(',').map((r) => r.trim()) : [],
    };
    next();
  } catch {
    res.status(401).json(fail('Invalid or expired token'));
  }
}
