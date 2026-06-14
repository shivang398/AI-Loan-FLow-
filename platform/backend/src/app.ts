import 'express-async-errors';
import express from 'express';

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
import notificationsRoutes from './routes/notifications.routes';
import analyticsRoutes from './routes/analytics.routes';
import reportsRoutes from './routes/reports.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

const app = express();

// Trust the first proxy hop so req.ip reflects the real client IP
app.set('trust proxy', 1);

app.use(helmet());

// Restrict CORS to known origins — wildcard + credentials is invalid per spec
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];
app.use(cors({ origin: corsOrigins, credentials: true }));

// Strip Authorization header from access logs to prevent JWT token leakage
morgan.token('redacted-auth', () => '[REDACTED]');
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Cap pagination size to 100 to prevent DB abuse
app.use((req, _res, next) => {
  if (req.query.size) {
    const s = parseInt(req.query.size as string, 10);
    if (!isNaN(s) && s > 100) req.query.size = '100';
  }
  next();
});

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'UP', timestamp: new Date().toISOString() }));

// ── Auth ──────────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);

// ── Loans & Eligibility & Policies ───────────────────────────────────────────
app.use('/loans', loanRoutes);
app.use('/eligibility', eligibilityRoutes);
app.use('/policies', policyRoutes);

// ── Customers & Documents ─────────────────────────────────────────────────────
app.use('/customers', customerRoutes);
app.use('/documents', documentRoutes);

// ── Sales Ops (Connectors, Commissions, FOIR, Routing) ───────────────────────
app.use('/connectors', connectorRoutes);
app.use('/commissions', commissionRoutes);
app.use('/foir', foirRoutes);
app.use('/routing', routingRoutes);

// ── Communications & Notifications ───────────────────────────────────────────
app.use('/messaging', commsRoutes);
app.use('/notifications', notificationsRoutes);

// ── Analytics & Reports ───────────────────────────────────────────────────────
app.use('/analytics', analyticsRoutes);
app.use('/reports', reportsRoutes);

// ── Error handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
