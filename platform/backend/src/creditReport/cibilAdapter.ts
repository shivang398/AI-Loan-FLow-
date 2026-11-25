import type { CrifFailureCode } from './crifAdapter';

/**
 * TransUnion CIBIL soft pull through Tenacio (`cibil-soft-pull`).
 *
 *   POST $CIBIL_API_BASE_URL
 *   headers: client-id, x-api-key, workflow-id
 *   body:    {"input": {"mobileNumber", "name", "panNumber", "consent": true}}
 *
 * Tenacio returns the report in the CCR layout (`CCRResponse.CIRReportDataLst[0].CIRReportData`), the
 * same layout `decodeIndividualFullReport` reads — see individualFullReportFromCibil.ts.
 * A customer with no bureau record comes back as `status: "error"` with a "no data" message.
 */

export interface CibilIdentity { name: string; mobile: string; pan?: string | null }

export type CibilOutcome =
  | { status: 'SUCCESS'; raw: unknown }
  | { status: 'NOT_FOUND' }
  | { status: 'UNAVAILABLE'; errorCode: CrifFailureCode };

/** Client ID and API key are the same Tenacio account as CRIF unless set separately. */
export function loadCibilConfigFromEnv(env: NodeJS.ProcessEnv = process.env) {
  const timeout = Number(env.CIBIL_REQUEST_TIMEOUT_MS ?? env.CRIF_REQUEST_TIMEOUT_MS);
  return {
    url: env.CIBIL_API_BASE_URL || 'https://api.tenacio.io/api/v1/services/cibil-soft-pull',
    clientId: env.CIBIL_CLIENT_ID || env.CRIF_CLIENT_ID || '',
    apiKey: env.CIBIL_API_KEY || env.CRIF_API_KEY || '',
    workflowId: env.CIBIL_WORKFLOW_ID || '5d2e9c46-68e4-4d6e-a52e-b1287a63e80b',
    timeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : 30_000,
    debug: env.CRIF_DEBUG_LOGGING === 'true' || env.CIBIL_DEBUG_LOGGING === 'true',
  };
}

const isBag = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function classifyHttpFailure(status: number): CrifFailureCode {
  if (status === 401 || status === 403) return 'AUTH_OR_CONFIGURATION_FAILED';
  if (status === 400 || status === 422) return 'INVALID_PROVIDER_REQUEST';
  if (status === 429) return 'RATE_LIMITED';
  return 'PROVIDER_UNAVAILABLE';
}

/** Tenacio's error message, if the body is an error reply. */
function errorMessage(body: unknown): string | null {
  if (!isBag(body) || body.status !== 'error') return null;
  const pick = (v: unknown) => (isBag(v) && typeof v.message === 'string' ? v.message : null);
  return pick(body.serviceError) ?? pick(body.error) ?? (typeof body.message === 'string' ? body.message : '') ?? '';
}

/** Key paths only (no values), so the first live replies show the layout without exposing customer data. */
export function describeShape(node: unknown, prefix = '', depth = 0, out: string[] = []): string[] {
  if (depth > 4 || out.length > 80) return out;
  if (Array.isArray(node)) {
    out.push(`${prefix}[${node.length}]`);
    if (node.length > 0) describeShape(node[0], `${prefix}[0]`, depth + 1, out);
  } else if (isBag(node)) {
    for (const [k, v] of Object.entries(node)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (isBag(v) || Array.isArray(v)) describeShape(v, path, depth + 1, out);
      else out.push(path);
    }
  }
  return out;
}

export async function pullCibil(identity: CibilIdentity, fetchImpl: typeof fetch = fetch): Promise<CibilOutcome> {
  const cfg = loadCibilConfigFromEnv();
  const log = (msg: string) => { if (cfg.debug) console.info(`[CIBIL-DIAG] ${msg}`); };
  if (!cfg.url || !cfg.clientId || !cfg.apiKey || !cfg.workflowId) {
    log('step=lookup classifiedAs=AUTH_OR_CONFIGURATION_FAILED (settings missing)');
    return { status: 'UNAVAILABLE', errorCode: 'AUTH_OR_CONFIGURATION_FAILED' };
  }

  let response: Response;
  try {
    response = await fetchImpl(cfg.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': 'RealMoney/1.0',
        'client-id': cfg.clientId,
        'x-api-key': cfg.apiKey,
        'workflow-id': cfg.workflowId,
      },
      body: JSON.stringify({ input: { mobileNumber: identity.mobile, name: identity.name, panNumber: identity.pan ?? '', consent: true } }),
      signal: AbortSignal.timeout(cfg.timeoutMs),
    });
  } catch {
    log('step=lookup classifiedAs=NETWORK_OR_TIMEOUT');
    return { status: 'UNAVAILABLE', errorCode: 'NETWORK_OR_TIMEOUT' };
  }

  let body: unknown = null;
  try { body = await response.json(); } catch { /* handled below */ }

  const message = errorMessage(body);
  if (message !== null && message.toLowerCase().includes('no data')) {
    log(`step=lookup httpStatus=${response.status} classifiedAs=NOT_FOUND (provider reported no data)`);
    return { status: 'NOT_FOUND' };
  }
  if (message !== null || !response.ok) {
    console.warn(`[CIBIL] provider replied HTTP ${response.status}: ${(message || 'no message').slice(0, 120)}`);
  }
  if (!response.ok) {
    const errorCode = classifyHttpFailure(response.status);
    log(`step=lookup httpStatus=${response.status} classifiedAs=${errorCode}`);
    return { status: 'UNAVAILABLE', errorCode };
  }
  if (body === null || message !== null) {
    const embedded = isBag(body) && typeof body.serviceStatusCode === 'number' ? body.serviceStatusCode : null;
    const errorCode = embedded ? classifyHttpFailure(embedded) : 'PROVIDER_UNAVAILABLE';
    log(`step=lookup httpStatus=${response.status} embeddedStatus=${embedded ?? '-'} classifiedAs=${errorCode}`);
    return { status: 'UNAVAILABLE', errorCode };
  }

  log(`step=lookup httpStatus=${response.status} classifiedAs=SUCCESS shape=${describeShape(body).join(',')}`);
  return { status: 'SUCCESS', raw: body };
}
