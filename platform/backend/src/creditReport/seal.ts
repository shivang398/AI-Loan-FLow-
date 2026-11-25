import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from 'crypto';

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

/** One-string form for short values (e.g. the mobile number): base64url "iv.tag.cipher". */
export function sealToString(plain: string, aad: string): string {
  const { cipherText, iv, tag } = seal(plain, aad);
  return [iv, tag, cipherText].map(b => b.toString('base64url')).join('.');
}

export function unsealFromString(sealed: string, aad: string): string | null {
  try {
    const [iv, tag, cipherText] = sealed.split('.').map(p => Buffer.from(p, 'base64url'));
    return unseal(cipherText!, iv!, tag!, aad);
  } catch {
    return null;
  }
}

export const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

/**
 * Keyed fingerprint for matching a value without storing it (e.g. PAN). Keyed, unlike sha256 above:
 * PANs follow a fixed pattern, so a plain hash could be reversed by trying every PAN.
 */
export const keyedHash = (value: string, purpose: string) => createHmac('sha256', key()).update(`${purpose}:${value}`).digest('hex');
