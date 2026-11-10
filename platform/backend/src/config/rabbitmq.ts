import amqplib, { Channel, ChannelModel } from 'amqplib';

const EXCHANGE = process.env.RABBITMQ_EXCHANGE ?? 'platform.exchange';

let connection: ChannelModel | null = null;
let channel: Channel | null = null;

export async function connectRabbitMQ() {
  const url = process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5673';
  connection = await amqplib.connect(url);
  channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
  console.log('[RabbitMQ] Connected, exchange asserted:', EXCHANGE);
}

export async function disconnectRabbitMQ() {
  try { await channel?.close(); } catch { /* ignore */ }
  try { await connection?.close(); } catch { /* ignore */ }
  channel = null;
  connection = null;
}


/** Best-effort: a missing or closed broker never fails the request that triggered the event. */
export async function publish(routingKey: string, payload: object) {
  if (!channel) return;
  try {
    channel.publish(EXCHANGE, routingKey, Buffer.from(JSON.stringify(payload)), { persistent: true });
  } catch (err) {
    console.warn(`[RabbitMQ] publish ${routingKey} failed:`, err instanceof Error ? err.message : err);
  }
}
