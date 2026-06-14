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

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*', credentials: true }));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

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
