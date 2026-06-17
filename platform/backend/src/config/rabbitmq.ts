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

export function getChannel(): Channel {
  if (!channel) throw new Error('RabbitMQ channel not initialised');
  return channel;
}

export async function publish(routingKey: string, payload: object) {
  getChannel().publish(EXCHANGE, routingKey, Buffer.from(JSON.stringify(payload)), { persistent: true });
}

export async function subscribe(queue: string, routingKey: string, handler: (msg: object) => Promise<void>) {
  const ch = getChannel();
  await ch.assertQueue(queue, { durable: true });
  await ch.bindQueue(queue, EXCHANGE, routingKey);
  ch.consume(queue, async (msg) => {
    if (!msg) return;
    try {
      await handler(JSON.parse(msg.content.toString()));
      ch.ack(msg);
    } catch {
      ch.nack(msg, false, false);
    }
  });
}
