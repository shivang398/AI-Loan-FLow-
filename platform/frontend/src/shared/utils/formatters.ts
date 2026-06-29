export const formatAmount = (amount: number | null | undefined): string => {
  if (!amount && amount !== 0) return '—';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatAmountCompact = (amount: number | null | undefined): string => {
  if (!amount && amount !== 0) return '—';
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(1)}Cr`;
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(1)}L`;
  if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(1)}K`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

const LOAN_TYPE_MAP: Record<string, string> = {
  personal:  'Personal Loan',
  education: 'Education Loan',
  business:  'Business Loan',
  home:      'Home Loan',
  vehicle:   'Vehicle Loan',
  gold:      'Gold Loan',
};

export const formatLoanType = (type: string | null | undefined): string =>
  type ? (LOAN_TYPE_MAP[type.toLowerCase()] ?? type) : '—';

export const formatElapsed = (createdAt: string | null | undefined): string => {
  if (!createdAt) return '—';
  const diff = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m`;
  return `${Math.floor(hrs / 24)}d`;
};

export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatDateTime = (date: string | Date | null | undefined): string => {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

export const csvEscape = (value: string | number | null | undefined): string =>
  `"${String(value ?? '').replace(/"/g, '""')}"`;
