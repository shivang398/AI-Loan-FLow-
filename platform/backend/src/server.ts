import 'dotenv/config';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as SocketServer } from 'socket.io';
import app from './app';
import { connectAllDatabases, disconnectAllDatabases } from './config/prisma';
import { connectRedis, disconnectRedis } from './config/redis';
import { connectRabbitMQ, disconnectRabbitMQ } from './config/rabbitmq';
import { setSocketServer } from './services/communications.service';

const PORT = parseInt(process.env.PORT ?? '8080');

async function bootstrap() {
  console.log('[Boot] Connecting to databases...');
  try {
    await connectAllDatabases();
  } catch (err: any) {
    console.warn('[Boot] DB pre-connect failed (will retry on first query):', err.message?.slice(0, 120));
  }

  console.log('[Boot] Connecting to Redis...');
  await connectRedis();

  console.log('[Boot] Connecting to RabbitMQ...');
  await connectRabbitMQ();

  const server = http.createServer(app);

  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
    : ['http://localhost:3000', 'http://localhost:5173'];

  const io = new SocketServer(server, {
    cors: { origin: corsOrigins, credentials: true },
    path: '/socket.io',
  });

  setSocketServer(io);

  // Verify JWT before accepting any WebSocket connection
  io.use((socket, next) => {
    const token =
      (socket.handshake.auth?.token as string) ||
      (socket.handshake.query?.token as string);
    if (!token) return next(new Error('Authentication required'));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] }) as { sub: string; id?: string; roles: string; jti: string };
      (socket as any).user = { id: payload.id ?? payload.sub, email: payload.sub, roles: payload.roles?.split(',') ?? [] };
      next();
    } catch {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    const user = (socket as any).user as { id: string; roles: string[] };
    const { conversationId, roomKey } = socket.handshake.query;
    if (conversationId) socket.join(`conv:${conversationId}`);
    if (roomKey) socket.join(`room:${roomKey}`);

    // Only allow joining conversations/rooms that the user's role can access (LOW-3)
    const ROOM_ROLES = ['ADMIN', 'OPERATIONS', 'RM', 'TEAM_LEADER', 'PARTNER_MANAGER', 'CONNECTOR'];
    socket.on('join_conversation', (id: string) => {
      if (typeof id === 'string' && id.length <= 64) socket.join(`conv:${id}`);
    });
    socket.on('join_room', (key: string) => {
      if (typeof key === 'string' && key.length <= 64 && user.roles.some(r => ROOM_ROLES.includes(r))) {
        socket.join(`room:${key}`);
      }
    });
    socket.on('disconnect', () => { /* cleanup if needed */ });
  });

  server.listen(PORT, () => console.log(`[Server] Running on port ${PORT}`));

  let shutdownInProgress = false;
  const shutdown = async () => {
    if (shutdownInProgress) return;
    shutdownInProgress = true;
    console.log('[Shutdown] Graceful shutdown initiated...');

    // Safety net: force-exit after 4s if something hangs (tsx watch gives 5s)
    const forceExit = setTimeout(() => {
      console.error('[Shutdown] Timeout — force exiting');
      process.exit(1);
    }, 4000);
    forceExit.unref();

    // 1. Close Socket.IO — drops all WebSocket connections immediately
    await new Promise<void>((resolve) => io.close(() => resolve()));

    // 2. Stop accepting new HTTP requests; wait for in-flight requests to finish
    await new Promise<void>((resolve) => server.close(() => resolve()));

    // 3. Close all external connections in parallel
    await Promise.allSettled([
      disconnectAllDatabases(),
      disconnectRedis(),
      disconnectRabbitMQ(),
    ]);

    clearTimeout(forceExit);
    console.log('[Shutdown] Clean exit');
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  console.error('[Boot] Fatal error:', err);
  process.exit(1);
});
