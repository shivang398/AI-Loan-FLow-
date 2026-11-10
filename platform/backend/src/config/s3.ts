import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Documents bucket (KYC files, CVs, policy PDFs). Production: real S3. Local: LocalStack (AWS_S3_ENDPOINT).
const BUCKET = process.env.AWS_S3_BUCKET ?? 'platform-documents';
const localEndpoint = process.env.AWS_S3_ENDPOINT;

// Credentials: explicit keys when both are set; otherwise the SDK's default chain, which on EC2 picks up the
// instance's IAM role — no long-lived keys needed in .env.production. LocalStack accepts any keys.
const explicitKeys = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
  ? { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY }
  : localEndpoint ? { accessKeyId: 'test', secretAccessKey: 'test' } : undefined;

export const s3 = new S3Client({
  region: process.env.AWS_REGION ?? 'ap-south-1',
  ...(explicitKeys && { credentials: explicitKeys }),
  ...(localEndpoint ? { endpoint: localEndpoint, forcePathStyle: true } : {}),
});

/** Bucket the app writes to — exposed for the startup configuration check. */
export const documentsBucket = () => BUCKET;

export async function uploadToS3(key: string, body: Buffer, mimeType: string) {
  // Encrypt at rest explicitly: these are PAN/Aadhaar copies, bank statements and CVs
  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: body, ContentType: mimeType, ServerSideEncryption: 'AES256' }));
  return key;
}

/** Short-lived download link: long enough to open a document, short enough that a leaked link soon expires. */
export async function getPresignedUrl(key: string, expiresInSeconds = 300): Promise<string> {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn: expiresInSeconds });
}

export async function deleteFromS3(key: string) {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}
