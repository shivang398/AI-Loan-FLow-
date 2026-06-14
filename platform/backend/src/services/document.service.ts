import { v4 as uuidv4 } from 'uuid';
import { customerDb } from '../config/prisma';
import { uploadToS3, getPresignedUrl, deleteFromS3 } from '../config/s3';

export async function uploadDocument(data: {
  loanId?: string; ownerId?: string; uploadedBy: string; documentType: string;
  folderPath?: string; file: { buffer: Buffer; originalname: string; mimetype: string; size: number };
}) {
  const id = uuidv4();
  const s3Key = `documents/${data.ownerId ?? data.loanId ?? 'general'}/${id}/${data.file.originalname}`;
  await uploadToS3(s3Key, data.file.buffer, data.file.mimetype);

  return customerDb.document.create({
    data: {
      id, loanId: data.loanId, ownerId: data.ownerId, uploadedBy: data.uploadedBy,
      documentType: data.documentType, s3Key, fileName: data.file.originalname,
      mimeType: data.file.mimetype, fileSizeBytes: BigInt(data.file.size),
      status: 'UPLOADED', createdAt: new Date(), folderPath: data.folderPath ?? '/',
    },
  });
}

export async function getDocuments(filters: { loanId?: string; ownerId?: string; documentType?: string; page: number; size: number }) {
  const where = {
    ...(filters.loanId && { loanId: filters.loanId }),
    ...(filters.ownerId && { ownerId: filters.ownerId }),
    ...(filters.documentType && { documentType: filters.documentType }),
  };
  const [items, total] = await Promise.all([
    customerDb.document.findMany({ where, skip: filters.page * filters.size, take: filters.size, orderBy: { createdAt: 'desc' } }),
    customerDb.document.count({ where }),
  ]);
  return { items, total, page: filters.page, size: filters.size };
}

export async function getDocumentById(id: string, accessedBy: string) {
  const doc = await customerDb.document.findUnique({ where: { id } });
  if (!doc) throw Object.assign(new Error('Document not found'), { status: 404 });
  await customerDb.documentAccessLog.create({ data: { id: uuidv4(), documentId: id, accessedBy, accessType: 'VIEW', accessedAt: new Date() } });
  const downloadUrl = await getPresignedUrl(doc.s3Key);
  return { ...doc, downloadUrl };
}

export async function deleteDocument(id: string, deletedBy: string) {
  const doc = await customerDb.document.findUnique({ where: { id } });
  if (!doc) throw Object.assign(new Error('Document not found'), { status: 404 });
  await deleteFromS3(doc.s3Key);
  await customerDb.documentAccessLog.create({ data: { id: uuidv4(), documentId: id, accessedBy: deletedBy, accessType: 'DELETE', accessedAt: new Date() } });
  await customerDb.document.update({ where: { id }, data: { status: 'DELETED', updatedAt: new Date() } });
}

export async function reviewDocument(id: string, data: { status: string; reviewRemarks?: string; reviewerId: string }) {
  const doc = await customerDb.document.findUnique({ where: { id } });
  if (!doc) throw Object.assign(new Error('Document not found'), { status: 404 });
  return customerDb.document.update({
    where: { id },
    data: { status: data.status, reviewRemarks: data.reviewRemarks, reviewerId: data.reviewerId, reviewedAt: new Date(), updatedAt: new Date() },
  });
}
