import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Tag,
  Space,
  Drawer,
  Tabs,
  Timeline,
  Input,
  notification,
  Avatar,
  Table,
  Card,
  Tooltip,
  Spin,
} from 'antd';
import {
  Search,
  CheckCircle2,
  FileText,
  Activity,
  RefreshCw,
  Eye,
  ClipboardCheck,
  TrendingUp,
  ShieldAlert,
  UserCheck,
  Users,
} from 'lucide-react';
import api from '../../../shared/services/apiClient';

const { Text, Title } = Typography;

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  loanType: string;
  loanAmount: number;
  assignedTo: string;
  status: string;
  customerId: string;
  createdAt: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const formatAmount = (amount: number) =>
  amount ? `₹${amount.toLocaleString('en-IN')}` : '—';

const formatLoanType = (type: string) => {
  const map: Record<string, string> = {
    personal: 'Personal Loan',
    education: 'Education Loan',
    business: 'Business Loan',
  };
  return map[type] || type || '—';
};

const getElapsed = (createdAt: string): string => {
  const diff = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m`;
  return `${Math.floor(hrs / 24)}d`;
};

// ─────────────────────────────────────────────
// Leads Queue Table
// ─────────────────────────────────────────────
const LeadsQueueTable: React.FC<{
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
  onViewDetail: (lead: Lead) => void;
}> = ({ leads, loading, onRefresh, onViewDetail }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'NEW' | 'IN_REVIEW' | 'RESOLVED'>('ALL');

  const filtered = leads.filter(l => {
    const term = search.toLowerCase();
    const matchSearch = !term || `${l.firstName} ${l.lastName} ${l.email} ${l.mobile}`.toLowerCase().includes(term);
    const matchTab = activeTab === 'ALL' || l.status === activeTab;
    return matchSearch && matchTab;
  });

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    NEW:          { color: '#7c3aed', bg: '#f5f3ff', label: 'New Lead' },
    IN_REVIEW:    { color: '#1d4ed8', bg: '#eff6ff', label: 'In Review' },
    DOCS_PENDING: { color: '#c2410c', bg: '#fff7ed', label: 'Docs Pending' },
    QUERY_RAISED: { color: '#b91c1c', bg: '#fef2f2', label: 'Query Raised' },
    RESOLVED:     { color: '#059669', bg: '#ecfdf5', label: 'Resolved' },
  };

  const columns = [
    {
      title: 'LEAD ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#4f46e5', fontSize: 12 }}>
          #{id.slice(0, 8).toUpperCase()}
        </span>
      ),
    },
    {
      title: 'APPLICANT',
      key: 'customer',
      render: (_: any, record: Lead) => (
        <Space size={10}>
          <Avatar size={32} style={{ background: '#eff6ff', color: '#4f46e5', fontWeight: 800, fontSize: 12 }}>
            {record.firstName[0]}
          </Avatar>
          <div>
            <Text style={{ fontWeight: 700, color: '#1e293b', display: 'block', lineHeight: 1.2 }}>
              {record.firstName} {record.lastName}
            </Text>
            <Text style={{ fontSize: 11, color: '#94a3b8' }}>{record.mobile}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'LOAN',
      key: 'loan',
      render: (_: any, record: Lead) => (
        <div>
          <Text style={{ fontWeight: 900, color: '#0f172a', fontFamily: 'JetBrains Mono, monospace', display: 'block', fontSize: 13 }}>
            {formatAmount(record.loanAmount)}
          </Text>
          <Text style={{ fontSize: 11, color: '#94a3b8' }}>{formatLoanType(record.loanType)}</Text>
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const s = statusConfig[status] || statusConfig.NEW;
        return (
          <span style={{ background: s.bg, color: s.color, borderRadius: 999, fontWeight: 800, fontSize: 10, letterSpacing: '0.08em', padding: '4px 10px', textTransform: 'uppercase' as const }}>
            {s.label}
          </span>
        );
      },
    },
    {
      title: 'ASSIGNED TO',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (email: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <UserCheck size={13} color="#10b981" />
          <Text style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>{email || 'Unassigned'}</Text>
        </div>
      ),
    },
    {
      title: 'AGE',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (ts: string) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700, fontSize: 12, color: '#f59e0b' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          {getElapsed(ts)}
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 60,
      render: (_: any, record: Lead) => (
        <Tooltip title="View Details">
          <Button
            type="text"
            icon={<Eye size={15} />}
            onClick={e => { e.stopPropagation(); onViewDetail(record); }}
            style={{ color: '#94a3b8', width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        </Tooltip>
      ),
    },
  ];

  const tabs = [
    { key: 'ALL',       label: 'All Leads', count: leads.length },
    { key: 'NEW',       label: 'New',       count: leads.filter(l => l.status === 'NEW').length },
    { key: 'IN_REVIEW', label: 'In Review', count: leads.filter(l => l.status === 'IN_REVIEW').length },
    { key: 'RESOLVED',  label: 'Resolved',  count: leads.filter(l => l.status === 'RESOLVED').length },
  ];

  return (
    <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      {/* Toolbar */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4, background: '#f8fafc', padding: 3, borderRadius: 10 }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              style={{
                padding: '5px 14px', borderRadius: 7, border: 'none',
                background: activeTab === t.key ? '#4f46e5' : 'transparent',
                color: activeTab === t.key ? '#fff' : '#94a3b8',
                fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {t.label}
              {t.count > 0 && (
                <span style={{ background: activeTab === t.key ? 'rgba(255,255,255,0.25)' : '#e2e8f0', borderRadius: 999, padding: '1px 6px', fontSize: 10, fontWeight: 800 }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <Space size={8}>
          <Input
            placeholder="Search leads..."
            prefix={<Search size={13} style={{ color: '#cbd5e1' }} />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 200, borderRadius: 10, border: '1px solid #f1f5f9', background: '#f8fafc', height: 34, fontSize: 13 }}
          />
          <Tooltip title="Refresh">
            <Button icon={<RefreshCw size={14} />} onClick={onRefresh} loading={loading} style={{ height: 34, borderRadius: 10, border: '1px solid #f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center' }} />
          </Tooltip>
        </Space>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filtered.map(l => ({ ...l, key: l.id }))}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: loading ? 'Loading leads...' : 'No leads yet. Customers will appear here after registration.' }}
            onRow={record => ({
              onClick: () => onViewDetail(record as Lead),
              style: { cursor: 'pointer', transition: 'background 0.15s' },
            })}
            className="ops-queue-table"
          />
        </Spin>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Operations Dashboard
// ─────────────────────────────────────────────
const OperationsDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await api.get('/customers/leads');
      const data = res.data?.data ?? res.data ?? [];
      setLeads(Array.isArray(data) ? data : []);
    } catch {
      // silently fail; table shows empty state
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    const interval = setInterval(fetchLeads, 30000);
    return () => clearInterval(interval);
  }, []);

  const newCount = leads.filter(l => l.status === 'NEW').length;
  const uniqueOps = [...new Set(leads.map(l => l.assignedTo).filter(Boolean))].length;

  const handleViewDetail = (lead: Lead) => {
    setDrawerLead(lead);
    setIsDrawerOpen(true);
  };

  const handleMoveToReview = () => {
    notification.success({
      message: 'Lead Moved to Review',
      description: 'The lead has been marked as In Review.',
      style: { borderRadius: 16, border: '1px solid #d1fae5' },
    });
    setIsDrawerOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: 'calc(100vh - 152px)' }}>

      {/* ── Top KPI Bar ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto auto auto auto', gap: 16,
        alignItems: 'center', background: '#ffffff', borderRadius: 20,
        padding: '18px 24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', flexShrink: 0,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} color="#4f46e5" />
            </div>
            <Text style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Operations · Live Queue
            </Text>
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 900, letterSpacing: '-0.03em', color: '#0f172a' }}>
            Leads Dashboard
          </Title>
        </div>

        <div style={{ background: '#f5f3ff', borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardCheck size={17} color="#7c3aed" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: '#7c3aed', lineHeight: 1 }}>{leads.length}</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Leads</Text>
          </div>
        </div>

        <div style={{ background: '#fef2f2', borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={17} color="#ef4444" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: '#dc2626', lineHeight: 1 }}>{newCount}</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.1em' }}>New Leads</Text>
          </div>
        </div>

        <div style={{ background: '#ecfdf5', borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={17} color="#10b981" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: '#059669', lineHeight: 1 }}>{uniqueOps}</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ops Members</Text>
          </div>
        </div>

        <div style={{ background: '#eff6ff', borderRadius: 14, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={17} color="#3b82f6" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 16, color: '#2563eb', lineHeight: 1 }}>Auto</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Round Robin</Text>
          </div>
        </div>
      </div>

      {/* ── Leads Table (full width) ── */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <LeadsQueueTable
          leads={leads}
          loading={loadingLeads}
          onRefresh={fetchLeads}
          onViewDetail={handleViewDetail}
        />
      </div>

      {/* ── Lead Detail Drawer ── */}
      <Drawer
        title={null}
        placement="right"
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        {drawerLead && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
            <div style={{ background: '#fff', padding: '28px 32px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <span style={{ background: '#eef2ff', color: '#4f46e5', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Lead Review
                  </span>
                  <Title level={2} style={{ margin: '8px 0 0', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f172a' }}>
                    {drawerLead.firstName} {drawerLead.lastName}
                  </Title>
                </div>
                <Avatar size={50} style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', fontWeight: 900, fontSize: 20 }}>
                  {drawerLead.firstName[0]}
                </Avatar>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Email',       value: drawerLead.email },
                  { label: 'Mobile',      value: drawerLead.mobile },
                  { label: 'Assigned To', value: drawerLead.assignedTo || 'Unassigned' },
                  { label: 'Loan Type',   value: formatLoanType(drawerLead.loanType) },
                  { label: 'Loan Amount', value: formatAmount(drawerLead.loanAmount) },
                  { label: 'Lead Age',    value: getElapsed(drawerLead.createdAt) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <Text style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{label}</Text>
                    <Text style={{ fontWeight: 700, color: '#1e293b' }}>{value}</Text>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
              <Card style={{ borderRadius: 14, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Title level={5} style={{ fontWeight: 900, marginBottom: 16, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={15} color="#10b981" /> KYC Status
                </Title>
                <Timeline items={[
                  { color: 'green',  children: <Text style={{ fontWeight: 700, color: '#1e293b' }}>PAN Submitted — {drawerLead.panNumber}</Text> },
                  { color: 'orange', children: <Text style={{ fontWeight: 700, color: '#1e293b' }}>PAN Verification Pending</Text> },
                  { color: 'gray',   children: <Text style={{ fontWeight: 600, color: '#94a3b8' }}>Aadhaar e-KYC</Text> },
                  { color: 'gray',   children: <Text style={{ fontWeight: 600, color: '#94a3b8' }}>Credit Bureau Check</Text> },
                ]} />
              </Card>
            </div>
            <div style={{ background: '#fff', padding: '20px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12 }}>
              <Button style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #e2e8f0', color: '#94a3b8', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Raise Query
              </Button>
              <Button type="primary" onClick={handleMoveToReview} style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, background: '#059669', border: 'none', boxShadow: '0 4px 14px rgba(5,150,105,0.25)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Move to Review
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .ops-queue-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          color: #94a3b8 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          padding: 11px 14px !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .ops-queue-table .ant-table-tbody > tr > td {
          padding: 14px 14px !important;
          border-bottom: 1px solid #f8fafc !important;
          transition: background 0.15s !important;
        }
        .ops-queue-table .ant-table-tbody > tr:hover > td {
          background: #fafafe !important;
        }
        .ops-queue-table .ant-table { border-radius: 0 !important; }
      `}</style>
    </div>
  );
};

export default OperationsDashboard;
