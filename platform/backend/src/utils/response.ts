import { v4 as uuidv4 } from 'uuid';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
  timestamp: string;
  traceId: string;
}

export function ok<T>(message: string, data: T, traceId?: string): ApiResponse<T> {
  return { success: true, message, data, errors: [], timestamp: new Date().toISOString(), traceId: traceId ?? uuidv4() };
}

export function fail(message: string, errors: string[] = [], traceId?: string): ApiResponse<null> {
  return { success: false, message, data: null, errors, timestamp: new Date().toISOString(), traceId: traceId ?? uuidv4() };
}
