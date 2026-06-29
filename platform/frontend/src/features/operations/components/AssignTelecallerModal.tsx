import React from 'react';
import { Modal, Button, Select, Space } from 'antd';
import { PhoneCall } from 'lucide-react';
import { Lead } from '../types';
import { formatAmount, formatLoanType } from '../../../shared/utils/formatters';

interface Props {
  lead: Lead | null;
  telecallers: { label: string; value: string }[];
  assignEmail: string;
  loading: boolean;
  onChangeEmail: (email: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const AssignTelecallerModal: React.FC<Props> = ({
  lead, telecallers, assignEmail, loading, onChangeEmail, onConfirm, onCancel,
}) => (
  <Modal
    open={!!lead}
    onCancel={onCancel}
    title={
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <PhoneCall size={16} color="#06b6d4" />
        <span style={{ fontWeight: 900, fontSize: 15, color: '#1e293b' }}>Assign to Telecaller</span>
      </div>
    }
    footer={
      <Space>
        <Button onClick={onCancel} style={{ borderRadius: 8 }}>Cancel</Button>
        <Button
          loading={loading}
          disabled={!assignEmail}
          onClick={onConfirm}
          style={{ borderRadius: 8, fontWeight: 700, background: '#06b6d4', color: '#fff', border: 'none' }}
        >
          Assign Lead
        </Button>
      </Space>
    }
    width={440}
    styles={{ body: { padding: '20px 24px' } }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {lead && (
        <div style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#334155' }}>
          <strong>{lead.firstName} {lead.lastName}</strong>
          <span style={{ color: '#94a3b8', marginLeft: 8 }}>·</span>
          <span style={{ marginLeft: 8 }}>{formatAmount(lead.loanAmount)} {formatLoanType(lead.loanType)}</span>
        </div>
      )}
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Select Telecaller
        </div>
        <Select
          showSearch
          value={assignEmail || undefined}
          onChange={onChangeEmail}
          placeholder={telecallers.length === 0 ? 'No telecallers found — add one first' : 'Search by name or email…'}
          style={{ width: '100%' }}
          size="large"
          options={telecallers}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          notFoundContent={telecallers.length === 0 ? 'No telecallers yet. Create one in HR → User Management.' : 'No match'}
        />
      </div>
      {lead?.assignedTo && (
        <div style={{ fontSize: 12, color: '#64748b' }}>
          Currently assigned to: <strong>{lead.assignedTo}</strong>
        </div>
      )}
    </div>
  </Modal>
);

export default AssignTelecallerModal;
