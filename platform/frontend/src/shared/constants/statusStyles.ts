// Loan / Lead status styles — single source of truth used across all dashboards

export interface StatusStyle {
  color: string;
  bg: string;
  label: string;
  dot?: string;
}

export const LEAD_STATUS_STYLES: Record<string, StatusStyle> = {
  NEW:          { color: '#7c3aed', bg: '#f5f3ff',  label: 'New Application', dot: '#7c3aed' },
  IN_REVIEW:    { color: '#1d4ed8', bg: '#eff6ff',  label: 'In Review',       dot: '#3b82f6' },
  CONTACTED:    { color: '#0369a1', bg: '#e0f2fe',  label: 'Contacted',       dot: '#0ea5e9' },
  DOCS_PENDING: { color: '#c2410c', bg: '#fff7ed',  label: 'Docs Pending',    dot: '#f97316' },
  QUERY_RAISED: { color: '#b91c1c', bg: '#fef2f2',  label: 'Info Needed',     dot: '#ef4444' },
  RESOLVED:     { color: '#059669', bg: '#ecfdf5',  label: 'Done',            dot: '#10b981' },
  REJECTED:     { color: '#6b7280', bg: '#f9fafb',  label: 'Rejected',        dot: '#9ca3af' },
  DISBURSED:    { color: '#065f46', bg: '#d1fae5',  label: 'Disbursed',       dot: '#059669' },
  CONVERTED:    { color: '#1e40af', bg: '#dbeafe',  label: 'Converted',       dot: '#2563eb' },
};



export const ROLE_COLORS: Record<string, string> = {
  ADMIN:           '#6366f1',
  RM:              '#3b82f6',
  OPERATIONS:      '#f59e0b',
  CONNECTOR:       '#10b981',
};

export const ROLE_LABELS: Record<string, string> = {
  ADMIN:           'Admin',
  RM:              'Relationship Manager',
  OPERATIONS:      'Operations',
  CONNECTOR:       'Channel Partner',
};
