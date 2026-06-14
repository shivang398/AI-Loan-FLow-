import { Request, Response, NextFunction } from 'express';
import { fail } from '../utils/response';

export function requireRoles(...allowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = req.user?.roles ?? [];
    const hasRole = allowed.some((r) => userRoles.includes(r));
    if (!hasRole) {
      res.status(403).json(fail('Insufficient permissions'));
      return;
    }
    next();
  };
}
