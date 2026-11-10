export const formatAmount = (amount: number | null | undefined): string => {
  if (!amount && amount !== 0) return '—';
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
