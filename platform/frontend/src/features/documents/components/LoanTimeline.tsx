import React, { useState, useEffect } from 'react';
import { Modal, Timeline, Spin, Empty, Tag, Button } from 'antd';
import apiClient from '../../../shared/services/apiClient';

interface HistoryEntry {
  id: string;
  status: string;
  remarks: string | null;
  changedAt: string;
  changedBy: string | null;
}

const STATUS_COLOR: Record<string, string> = {
  LEAD_CREATED:  'blue',
  IN_REVIEW:     'processing',
  UNDER_REVIEW:  'processing',
  DOCS_PENDING:  'warning',
  QUERY_RAISED:  'warning',
  APPROVED:      'success',
  DISBURSED:     'success',
  REJECTED:      'error',
};

interface Props {
  loanId: string;
  loanLabel?: string;
  onClose: () => void;
}

const LoanTimeline: React.FC<Props> = ({ loanId, loanLabel, onClose }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/loans/${loanId}/history`)
      .then(res => setHistory(res.data?.data || []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [loanId]);

  return (
    <Modal
      open
      title={loanLabel ? `Loan History — ${loanLabel}` : 'Loan History'}
      onCancel={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
      width={540}
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div>
      ) : history.length === 0 ? (
        <Empty description="No history available yet" />
      ) : (
        <Timeline
          style={{ marginTop: 16 }}
          items={history.map(h => ({
            color: STATUS_COLOR[h.status] || 'gray',
            children: (
              <div style={{ paddingBottom: 4 }}>
                <Tag color={STATUS_COLOR[h.status] || 'default'} style={{ marginBottom: 4 }}>
                  {h.status.replace(/_/g, ' ')}
                </Tag>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  {new Date(h.changedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  {h.changedBy && <span style={{ marginLeft: 8 }}>· {h.changedBy}</span>}
                </div>
                {h.remarks && (
                  <div style={{ fontSize: 13, color: '#374151', marginTop: 2 }}>
                    {h.remarks.replace(/\s*\[by:[^\]]+\]/, '').trim()}
                  </div>
                )}
              </div>
            ),
          }))}
        />
      )}
    </Modal>
  );
};

export default LoanTimeline;
