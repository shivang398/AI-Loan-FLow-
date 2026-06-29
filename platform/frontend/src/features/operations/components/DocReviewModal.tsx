import React from 'react';
import { Modal, Button, Select, Input, Space } from 'antd';
import { ShieldCheck } from 'lucide-react';

interface Props {
  target: { docId: string; label: string } | null;
  status: 'APPROVED' | 'REJECTED';
  remarks: string;
  loading: boolean;
  onChangeStatus: (s: 'APPROVED' | 'REJECTED') => void;
  onChangeRemarks: (r: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const DocReviewModal: React.FC<Props> = ({
  target, status, remarks, loading, onChangeStatus, onChangeRemarks, onConfirm, onCancel,
}) => (
  <Modal
    open={!!target}
    onCancel={onCancel}
    title={
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ShieldCheck size={16} color="#059669" />
        <span style={{ fontWeight: 900, fontSize: 15, color: '#1e293b' }}>
          Review Document — {target?.label}
        </span>
      </div>
    }
    footer={
      <Space>
        <Button onClick={onCancel} style={{ borderRadius: 8 }}>Cancel</Button>
        <Button
          loading={loading}
          onClick={onConfirm}
          style={{
            borderRadius: 8, fontWeight: 700,
            background: status === 'APPROVED' ? '#059669' : '#dc2626',
            color: '#fff', border: 'none',
          }}
        >
          {status === 'APPROVED' ? 'Approve Document' : 'Reject Document'}
        </Button>
      </Space>
    }
    width={440}
    styles={{ body: { padding: '20px 24px' } }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Decision</div>
        <Select
          value={status}
          onChange={onChangeStatus}
          style={{ width: '100%' }}
          size="large"
          options={[
            { value: 'APPROVED', label: '✓ Approve — document is valid' },
            { value: 'REJECTED', label: '✗ Reject — document has issues' },
          ]}
        />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Remarks (optional)</div>
        <Input.TextArea
          value={remarks}
          onChange={e => onChangeRemarks(e.target.value)}
          placeholder="e.g. PAN card is blurry — please re-upload a clearer photo"
          rows={3}
          style={{ borderRadius: 10, fontSize: 13 }}
        />
      </div>
    </div>
  </Modal>
);

export default DocReviewModal;
