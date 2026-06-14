import 'dotenv/config';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import app from './app';
import { connectAllDatabases, disconnectAllDatabases } from './config/prisma';
import { connectRedis } from './config/redis';
import { connectRabbitMQ } from './config/rabbitmq';
import { setSocketServer } from './services/communications.service';

const PORT = parseInt(process.env.PORT ?? '8080');

async function bootstrap() {
  console.log('[Boot] Connecting to databases...');
  await connectAllDatabases();

  console.log('[Boot] Connecting to Redis...');
  await connectRedis();

  console.log('[Boot] Connecting to RabbitMQ...');
  await connectRabbitMQ();

  const server = http.createServer(app);

  const io = new SocketServer(server, {
    cors: { origin: process.env.CORS_ORIGIN ?? '*', credentials: true },
    path: '/socket.io',
  });

  setSocketServer(io);

  io.on('connection', (socket) => {
    const { conversationId, roomKey } = socket.handshake.query;
    if (conversationId) socket.join(`conv:${conversationId}`);
    if (roomKey) socket.join(`room:${roomKey}`);

    socket.on('join_conversation', (id: string) => socket.join(`conv:${id}`));
    socket.on('join_room', (key: string) => socket.join(`room:${key}`));
    socket.on('disconnect', () => { /* cleanup if needed */ });
  });

  server.listen(PORT, () => console.log(`[Server] Running on port ${PORT}`));

  const shutdown = async () => {
    console.log('[Shutdown] Graceful shutdown...');
    server.close();
    await disconnectAllDatabases();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  console.error('[Boot] Fatal error:', err);
  process.exit(1);
});
