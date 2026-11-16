import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';

// AES-256-GCM for stored credit reports. Key: CREDIT_REPORT_ENCRYPTION_KEY (64 hex chars) when set,
// otherwise derived from JWT_SECRET — changing whichever is used makes older reports unreadable.
function key(): Buffer {
  const hex = process.env.CREDIT_REPORT_ENCRYPTION_KEY;
  if (hex && /^[0-9a-fA-F]{64}$/.test(hex)) return Buffer.from(hex, 'hex');
  return createHash('sha256').update(`credit-report:${process.env.JWT_SECRET ?? ''}`).digest();
}

export function seal(plain: string, aad: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  cipher.setAAD(Buffer.from(aad));
  const cipherText = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  return { cipherText, iv, tag: cipher.getAuthTag() };
}

export function unseal(cipherText: Buffer, iv: Buffer, tag: Buffer, aad: string): string {
  const decipher = createDecipheriv('aes-256-gcm', key(), iv);
  decipher.setAAD(Buffer.from(aad));
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(cipherText), decipher.final()]).toString('utf8');
}

export const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');
