import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: parseInt(process.env.REDIS_PORT ?? '6381'),
  lazyConnect: true,
});

redis.on('error', (err) => console.error('[Redis]', err.message));

export async function connectRedis() {
  await redis.connect();
  console.log('[Redis] Connected');
}

export async function disconnectRedis() {
  await redis.quit();
}

export async function revokeToken(jti: string, expiryMs: number) {
  const ttlSeconds = Math.ceil((expiryMs - Date.now()) / 1000);
  if (ttlSeconds > 0) await redis.set(`revoked:${jti}`, '1', 'EX', ttlSeconds);
}

export async function isTokenRevoked(jti: string): Promise<boolean> {
  return (await redis.exists(`revoked:${jti}`)) === 1;
}

export async function setPasswordResetToken(token: string, email: string) {
  await redis.set(`pwd_reset:${token}`, email, 'EX', 3600);
}

export async function getPasswordResetEmail(token: string): Promise<string | null> {
  return redis.get(`pwd_reset:${token}`);
}

export async function deletePasswordResetToken(token: string) {
  await redis.del(`pwd_reset:${token}`);
}

export default redis;
