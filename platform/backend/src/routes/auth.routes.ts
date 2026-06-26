import { Router, Request, Response } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import * as authService from '../services/auth.service';
import { authenticate } from '../middleware/auth.middleware';
import { requireRoles } from '../middleware/role.middleware';
import { ok, fail } from '../utils/response';
import { revokeAccessToken } from '../services/auth.service';

// 15 attempts per 15 minutes per IP — prevents brute-force account lockout attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: 'Too many attempts from this IP. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();
const REFRESH_COOKIE = 'refreshToken';
const REFRESH_MAX_AGE = 7 * 24 * 3600;

const RegisterSchema = z.object({ email: z.string().email(), password: z.string().min(8), role: z.string() });
const LoginSchema = z.object({ email: z.string().email(), password: z.string() });

router.post('/register', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const body = RegisterSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map((e) => e.message))); return; }
  const result = await authService.registerUser(body.data.email, body.data.password, body.data.role);
  res.json(ok('User registered successfully', result));
});

router.post('/register/partner', authLimiter, async (req: Request, res: Response) => {
  const body = RegisterSchema.omit({ role: true }).safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map((e) => e.message))); return; }
  const result = await authService.registerUser(body.data.email, body.data.password, 'CONNECTOR');
  res.json(ok('Partner registered successfully', result));
});

router.post('/login', authLimiter, async (req: Request, res: Response) => {
  const body = LoginSchema.safeParse(req.body);
  if (!body.success) { res.status(400).json(fail('Validation error', body.error.errors.map((e) => e.message))); return; }
  const ip = req.ip; // req.ip is correct when trust proxy is enabled in app.ts
  const result = await authService.authenticateUser(body.data.email, body.data.password, ip);
  res.setHeader('Set-Cookie', `${REFRESH_COOKIE}=${result.token}; Path=/api/auth; HttpOnly; Secure; SameSite=Strict; Max-Age=${REFRESH_MAX_AGE}`);
  res.json(ok('Login successful', { token: result.token, role: result.role, email: result.email, id: result.id }));
});

router.post('/refresh', async (req: Request, res: Response) => {
  const rawCookies = req.headers.cookie ?? '';
  const match = rawCookies.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${REFRESH_COOKIE}=`));
  const token = match?.split('=').slice(1).join('=');
  if (!token) { res.status(401).json(fail('No refresh token')); return; }
  const result = await authService.refreshToken(token);
  res.setHeader('Set-Cookie', `${REFRESH_COOKIE}=${result.token}; Path=/api/auth; HttpOnly; Secure; SameSite=Strict; Max-Age=${REFRESH_MAX_AGE}`);
  res.json(ok('Token refreshed', { token: result.token, role: result.role, email: result.email }));
});

router.post('/logout', async (req: Request, res: Response) => {
  const bearer = req.headers.authorization;
  if (bearer?.startsWith('Bearer ')) await revokeAccessToken(bearer.slice(7));
  res.setHeader('Set-Cookie', `${REFRESH_COOKIE}=; Path=/api/auth; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
  res.json(ok('Logged out', 'OK'));
});

router.get('/me', authenticate, async (req: Request, res: Response) => {
  const result = await authService.getCurrentUser(req.user!.email);
  res.json(ok('OK', result));
});

router.get('/users/lookup', authenticate, requireRoles('ADMIN', 'PARTNER_MANAGER'), async (req: Request, res: Response) => {
  const email = req.query.email as string;
  if (!email) { res.status(400).json(fail('email query param required')); return; }
  const result = await authService.lookupUserByEmail(email);
  res.json(ok('User found', result));
});

router.put('/users/:id/status', authenticate, requireRoles('ADMIN'), async (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) { res.status(400).json(fail('status is required')); return; }
  await authService.updateUserStatus(req.params.id, status);
  res.json(ok('User status updated', 'SUCCESS'));
});

router.post('/forgot-password', authLimiter, async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) { res.status(400).json(fail('email is required')); return; }
  await authService.forgotPassword(email);
  res.json(ok('If that email exists, a reset link has been sent.', 'OK'));
});

router.post('/reset-password', authLimiter, async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) { res.status(400).json(fail('token and newPassword are required')); return; }
  if (newPassword.length < 8) { res.status(400).json(fail('Password must be at least 8 characters')); return; }
  await authService.resetPassword(token, newPassword);
  res.json(ok('Password reset successfully.', 'OK'));
});

export default router;
