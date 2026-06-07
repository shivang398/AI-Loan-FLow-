import React, { useState, useEffect } from 'react';
import {
  Typography, Table, Tag, Button, Input, Select, Modal, Form,
  Row, Col, Empty, App as AntApp,
} from 'antd';
import {
  Search, Phone, User, RefreshCw,
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface Lead {
  id: string;
  fullName: string;
  mobileNumber: string;
  loanAmount: number | null;
  loanPurpose: string | null;
  monthlyIncome: number | null;
  employmentType: string | null;
  city: string | null;
  isEligible: boolean | null;
  maxLoanAmount: number | null;
  status: string;
  submittedAt: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: 'blue',
  CONTACTED: 'processing',
  INTERESTED: 'cyan',
  CONVERTED: 'success',
  REJECTED: 'error',
  NOT_INTERESTED: 'default',
};


const CheckEligibility: React.FC = () => {
  const { message } = AntApp.useApp();
  useSelector((state: RootState) => state.auth);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updateForm] = Form.useForm();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (statusFilter) params.status = statusFilter;
      const res = await apiClient.get('/eligibility/submissions', { params });
      setLeads(res.data?.data || []);
    } catch {
      message.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [statusFilter]);

  const handleStatusUpdate = async (values: { status: string }) => {
    if (!selectedLead) return;
    try {
      await apiClient.put(`/eligibility/submissions/${selectedLead.id}/status`, {
        status: values.status,
      });
      message.success('Lead status updated');
      setSelectedLead(null);
      fetchLeads();
    } catch {
      message.error('Update failed');
    }
  };

  const filtered = leads.filter(l =>
    !searchText ||
    l.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
    l.mobileNumber.includes(searchText)
  );

  const stats = {
    total: leads.length,
    newLeads: leads.filter(l => l.status === 'NEW').length,
    contacted: leads.filter(l => l.status === 'CONTACTED').length,
    converted: leads.filter(l => l.status === 'CONVERTED').length,
  };

  const columns: ColumnsType<Lead> = [
    {
      title: 'Lead',
      key: 'lead',
      render: (_, r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <User size={16} color="#2563eb" />
          </div>
          <div>
            <Text strong style={{ fontSize: 14 }}>{r.fullName}</Text>
            <br />
            <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              <Phone size={10} style={{ marginRight: 4 }} />+91 {r.mobileNumber}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Loan Request',
      key: 'loan',
      render: (_, r) => (
        <div>
          <Text strong>₹{r.loanAmount ? r.loanAmount.toLocaleString('en-IN') : '—'}</Text>
          <br />
          <Text style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {r.loanPurpose ? r.loanPurpose.charAt(0).toUpperCase() + r.loanPurpose.slice(1) : '—'}
          </Text>
        </div>
      ),
    },
    {
      title: 'Income',
      dataIndex: 'monthlyIncome',
      key: 'income',
      render: (v) => v ? <Text>₹{Number(v).toLocaleString('en-IN')}/mo</Text> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={STATUS_COLORS[status] || 'default'} style={{ borderRadius: 20, fontWeight: 600 }}>
          {status.replace('_', ' ')}
        </Tag>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'submittedAt',
      key: 'date',
      render: (v) => v ? new Date(v).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, r) => (
        <Button
          size="small"
          type="primary"
          ghost
          onClick={() => { setSelectedLead(r); updateForm.setFieldsValue({ status: r.status }); }}
        >
          Update Status
        </Button>
      ),
    },
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
          CRM
        </div>
        <Title level={2} style={{ margin: 0 }}>Check Eligibility — Leads</Title>
        <Text style={{ color: 'var(--text-muted)' }}>Leads from the landing page eligibility form</Text>
      </div>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Leads', value: stats.total, color: '#6366f1', bg: '#ede9fe' },
          { label: 'New', value: stats.newLeads, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Contacted', value: stats.contacted, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Converted', value: stats.converted, color: '#10b981', bg: '#ecfdf5' },
        ].map(stat => (
          <Col xs={12} md={6} key={stat.label}>
            <div style={{
              background: 'white', borderRadius: 16, padding: '18px 20px',
              border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: stat.color }}>{stat.value}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Filters */}
      <div style={{
        background: 'white', borderRadius: 16, padding: '16px 20px', marginBottom: 20,
        border: '1px solid var(--surface-3)', display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <Input
          prefix={<Search size={14} />}
          placeholder="Search by name or mobile..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ maxWidth: 280 }}
          allowClear
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter || undefined}
          onChange={v => setStatusFilter(v || '')}
          allowClear
          style={{ width: 180 }}
        >
          <Select.Option value="NEW">New</Select.Option>
          <Select.Option value="CONTACTED">Contacted</Select.Option>
          <Select.Option value="INTERESTED">Interested</Select.Option>
          <Select.Option value="CONVERTED">Converted</Select.Option>
          <Select.Option value="REJECTED">Rejected</Select.Option>
        </Select>
        <div style={{ marginLeft: 'auto' }}>
          <Button icon={<RefreshCw size={14} />} onClick={fetchLeads} loading={loading}>Refresh</Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--surface-3)', overflow: 'hidden' }}>
        <Table
          dataSource={filtered}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 15, showSizeChanger: false }}
          locale={{ emptyText: <Empty description="No leads yet. Leads from the website form will appear here." image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
        />
      </div>

      {/* Update Status Modal */}
      <Modal
        title={`Update Lead — ${selectedLead?.fullName}`}
        open={!!selectedLead}
        onCancel={() => setSelectedLead(null)}
        footer={null}
        forceRender
      >
        <Form form={updateForm} layout="vertical" onFinish={handleStatusUpdate} style={{ marginTop: 16 }}>
          <Form.Item name="status" label="New Status" rules={[{ required: true }]}>
            <Select size="large">
              <Select.Option value="NEW">New</Select.Option>
              <Select.Option value="CONTACTED">Contacted</Select.Option>
              <Select.Option value="INTERESTED">Interested</Select.Option>
              <Select.Option value="CONVERTED">Converted — Onboarded as Lead</Select.Option>
              <Select.Option value="REJECTED">Rejected</Select.Option>
              <Select.Option value="NOT_INTERESTED">Not Interested</Select.Option>
            </Select>
          </Form.Item>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button onClick={() => setSelectedLead(null)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ background: '#4f46e5', border: 'none' }}>
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckEligibility;
