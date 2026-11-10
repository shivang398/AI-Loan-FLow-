import 'express-async-errors';
import express from 'express';
import rateLimit from 'express-rate-limit';

// Make BigInt JSON-serializable (Prisma returns BigInt for certain DB columns)
(BigInt.prototype as any).toJSON = function () { return this.toString(); };
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import loanRoutes from './routes/loan.routes';
import eligibilityRoutes from './routes/eligibility.routes';
import policyRoutes from './routes/policy.routes';
import customerRoutes from './routes/customer.routes';
import documentRoutes from './routes/document.routes';
import connectorRoutes from './routes/connector.routes';
import commissionRoutes from './routes/commission.routes';
import foirRoutes from './routes/foir.routes';
import routingRoutes from './routes/routing.routes';
import commsRoutes from './routes/communications.routes';
import { authDb, loanDb, customerDb, salesOpsDb, commsDb, analyticsDb } from './config/prisma';
import { pingRedis } from './config/redis';
import whatsappRoutes, { whatsappWebhookRouter, interaktWebhookRouter } from './routes/whatsapp.routes';
import notificationsRoutes from './routes/notifications.routes';
import analyticsRoutes from './routes/analytics.routes';
import reportsRoutes from './routes/reports.routes';
import careersRoutes from './routes/careers.routes';
import callRoutes from './routes/call.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

const app = express();

// Trust the first proxy hop so req.ip reflects the real client IP
// Number of reverse proxies in front of the API, so req.ip (rate limits, audit logs) is the real client.
// Default 1 = the frontend nginx container. If another proxy sits in front of it on the host
// (e.g. something forwarding public 443 to 127.0.0.1:8443), set TRUST_PROXY_HOPS=2.
app.set('trust proxy', Math.max(0, parseInt(process.env.TRUST_PROXY_HOPS ?? '1', 10) || 0));

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
}));

// Restrict CORS to known origins — wildcard + credentials is invalid per spec
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({ origin: corsOrigins, credentials: true }));

// Strip Authorization header from access logs to prevent JWT token leakage
morgan.token('redacted-auth', () => '[REDACTED]');
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
// Keep the raw bytes for webhook signature verification (WhatsApp HMAC)
app.use(express.json({ limit: '10mb', verify: (req, _res, buf) => { (req as express.Request & { rawBody?: Buffer }).rawBody = buf; } }));
app.use(cookieParser());

// Cap pagination size to 100 to prevent DB abuse
app.use((req, _res, next) => {
  if (req.query.size) {
    const s = parseInt(req.query.size as string, 10);
    if (!isNaN(s) && s > 100) req.query.size = '100';
  }
  next();
});

// General API rate limiter — 200 requests per minute per IP for authenticated routes
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// Stricter limiter for write operations (POST/PUT/DELETE)
const writeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many write requests, please slow down.' },
});

// ── Health ────────────────────────────────────────────────────────────────────
// Liveness: the process is up (used by the container healthcheck — must not depend on other services)
app.get('/health', (_req, res) => res.json({ status: 'UP', timestamp: new Date().toISOString() }));

// Readiness: the databases and Redis answer. Use for post-deploy checks and monitoring.
app.get('/health/ready', async (_req, res) => {
  const probe = async (fn: () => Promise<unknown>) => { try { await fn(); return 'UP'; } catch { return 'DOWN'; } };
  const checks = {
    database: await probe(() => Promise.all([authDb, loanDb, customerDb, salesOpsDb, commsDb, analyticsDb].map(db => db.$queryRaw`SELECT 1`))),
    redis: await probe(() => pingRedis()),
  };
  const ready = Object.values(checks).every(v => v === 'UP');
  res.status(ready ? 200 : 503).json({ status: ready ? 'READY' : 'NOT_READY', checks, timestamp: new Date().toISOString() });
});

// Monolith svc-health — all services live in this process, respond UP for each
app.get('/svc-health/:service', (_req, res) => res.json({ status: 'UP', timestamp: new Date().toISOString() }));

// ── Auth ──────────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);

// ── Loans & Eligibility & Policies ───────────────────────────────────────────
app.use('/loans', apiLimiter, loanRoutes);
app.use('/eligibility', apiLimiter, eligibilityRoutes);
app.use('/policies', apiLimiter, policyRoutes);

// ── Customers & Documents ─────────────────────────────────────────────────────
app.use('/customers', apiLimiter, customerRoutes);
app.use('/documents', apiLimiter, documentRoutes);

// ── Sales Ops (Connectors, Commissions, FOIR, Routing) ───────────────────────
app.use('/connectors', apiLimiter, connectorRoutes);
app.use('/commissions', apiLimiter, commissionRoutes);
app.use('/foir', apiLimiter, foirRoutes);
app.use('/routing', writeLimiter, routingRoutes);

// ── Communications & Notifications ───────────────────────────────────────────
app.use('/messaging/whatsapp/webhook', whatsappWebhookRouter);   // public, no rate limit — see whatsapp.routes.ts
app.use('/messaging/whatsapp/interakt-webhook', interaktWebhookRouter);
app.use('/messaging', apiLimiter, commsRoutes);
app.use('/whatsapp', apiLimiter, whatsappRoutes);
app.use('/notifications', apiLimiter, notificationsRoutes);

// ── Analytics & Reports ───────────────────────────────────────────────────────
app.use('/analytics', apiLimiter, analyticsRoutes);
app.use('/reports', apiLimiter, reportsRoutes);

// ── Careers ───────────────────────────────────────────────────────────────────
app.use('/careers', careersRoutes);

// ── Telecalling ───────────────────────────────────────────────────────────────
app.use('/calls', apiLimiter, callRoutes);

// ── Error handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
