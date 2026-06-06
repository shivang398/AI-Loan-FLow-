import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Space,
  Drawer,
  Timeline,
  Input,
  App,
  Avatar,
  Table,
  Card,
  Tooltip,
  Spin,
  Modal,
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
  // Extended fields
  profession?: string;
  netMonthlySalary?: number;
  gender?: string;
  maritalStatus?: string;
  dob?: string;
  alternateContact?: string;
  whatsappNo?: string;
  officialEmail?: string;
  currentAddressLine1?: string;
  currentAddressLine2?: string;
  currentState?: string;
  currentDistrict?: string;
  currentCity?: string;
  currentPincode?: string;
  residenceType?: string;
  permanentAddressLine1?: string;
  permanentAddressLine2?: string;
  permanentState?: string;
  permanentDistrict?: string;
  permanentCity?: string;
  permanentPincode?: string;
  jobType?: string;
  designation?: string;
  modeOfSalary?: string;
  officeAddress?: string;
  officeState?: string;
  officeDistrict?: string;
  officeCity?: string;
  officePincode?: string;
  existingEmi?: number;
  hasPriorPersonalLoan?: boolean;
  opsNotes?: string;
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
  const [activeTab, setActiveTab] = useState<'ALL' | 'NEW' | 'IN_REVIEW' | 'QUERY_RAISED' | 'RESOLVED'>('ALL');

  const filtered = leads.filter(l => {
    const term = search.toLowerCase();
    const matchSearch = !term || `${l.firstName} ${l.lastName} ${l.email} ${l.mobile}`.toLowerCase().includes(term);
    const matchTab = activeTab === 'ALL' || l.status === activeTab;
    return matchSearch && matchTab;
  });

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    NEW:          { color: '#7c3aed', bg: '#f5f3ff', label: 'New Application' },
    IN_REVIEW:    { color: '#1d4ed8', bg: '#eff6ff', label: 'Being Checked' },
    DOCS_PENDING: { color: '#c2410c', bg: '#fff7ed', label: 'Papers Pending' },
    QUERY_RAISED: { color: '#b91c1c', bg: '#fef2f2', label: 'Info Needed' },
    RESOLVED:     { color: '#059669', bg: '#ecfdf5', label: 'Done' },
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
    { key: 'ALL',          label: 'All',          count: leads.length },
    { key: 'NEW',          label: 'New',          count: leads.filter(l => l.status === 'NEW').length },
    { key: 'IN_REVIEW',    label: 'Being Checked', count: leads.filter(l => l.status === 'IN_REVIEW').length },
    { key: 'QUERY_RAISED', label: 'Info Needed',  count: leads.filter(l => l.status === 'QUERY_RAISED').length },
    { key: 'RESOLVED',     label: 'Done',         count: leads.filter(l => l.status === 'RESOLVED').length },
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
  const { notification } = App.useApp();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  // Document records for the open lead: documentType -> { id, fileName }
  const [leadDocs, setLeadDocs] = useState<Record<string, { id: string; fileName?: string }>>({});
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<string | null>(null); // doc id being fetched
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  // Ops notes
  const [notesValue, setNotesValue] = useState('');
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

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

  const handleViewDetail = async (lead: Lead) => {
    setDrawerLead(lead);
    setIsDrawerOpen(true);
    setNotesValue(lead.opsNotes || '');
    setNotesSaved(false);
    // Fetch uploaded documents for this customer
    if (lead.customerId) {
      setLoadingDocs(true);
      try {
        const res = await api.get(`/documents/by-customer/${lead.customerId}`);
        const docs: any[] = res.data?.data ?? [];
        const map: Record<string, { id: string; fileName?: string }> = {};
        docs.forEach((d: any) => { if (d.documentType && d.id) map[d.documentType] = { id: d.id, fileName: d.fileName }; });
        setLeadDocs(map);
      } catch {
        setLeadDocs({});
      } finally {
        setLoadingDocs(false);
      }
    } else {
      setLeadDocs({});
    }
  };

  const handleViewDoc = async (docId: string) => {
    setViewingDoc(docId);
    try {
      const res = await api.get(`/documents/${docId}/presigned-url`);
      const url: string = res.data?.data ?? res.data;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      notification.error({ message: 'Could not open document. Please try again.', style: { borderRadius: 12 } });
    } finally {
      setViewingDoc(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!drawerLead) return;
    setNotesSaving(true);
    try {
      await api.put(`/customers/leads/${drawerLead.id}/notes`, { notes: notesValue });
      setLeads(prev => prev.map(l => l.id === drawerLead.id ? { ...l, opsNotes: notesValue } : l));
      setDrawerLead(prev => prev ? { ...prev, opsNotes: notesValue } : null);
      setNotesSaved(true);
    } catch {
      // silently fail; user can retry
    } finally {
      setNotesSaving(false);
    }
  };

  const updateStatus = async (newStatus: string, successMsg: string) => {
    if (!drawerLead) return;
    setActionLoading(true);
    try {
      await api.put(`/customers/leads/${drawerLead.id}/status`, { status: newStatus });
      setLeads(prev => prev.map(l => l.id === drawerLead.id ? { ...l, status: newStatus } : l));
      setDrawerLead(prev => prev ? { ...prev, status: newStatus } : null);
      notification.success({
        message: successMsg,
        style: { borderRadius: 16, border: '1px solid #d1fae5' },
      });
      if (newStatus === 'RESOLVED') setIsDrawerOpen(false);
    } catch (err: any) {
      notification.error({
        message: err?.response?.data?.message || 'Failed to update lead status',
        style: { borderRadius: 16 },
      });
    } finally {
      setActionLoading(false);
    }
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
            {/* Header */}
            <div style={{ background: '#fff', padding: '24px 28px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span style={{ background: '#eef2ff', color: '#4f46e5', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Lead Review
                  </span>
                  <Title level={3} style={{ margin: '6px 0 0', fontWeight: 900, letterSpacing: '-0.04em', color: '#0f172a' }}>
                    {drawerLead.firstName} {drawerLead.lastName}
                  </Title>
                </div>
                <Avatar size={46} style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', fontWeight: 900, fontSize: 18 }}>
                  {drawerLead.firstName[0]}
                </Avatar>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Loan Amount', value: formatAmount(drawerLead.loanAmount) },
                  { label: 'Loan Type',   value: formatLoanType(drawerLead.loanType) },
                  { label: 'Lead Age',    value: getElapsed(drawerLead.createdAt) },
                  { label: 'Assigned To', value: drawerLead.assignedTo || 'Unassigned' },
                  { label: 'Profession',  value: drawerLead.profession || '—' },
                  { label: 'Monthly Salary', value: drawerLead.netMonthlySalary ? formatAmount(drawerLead.netMonthlySalary) : '—' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{label}</Text>
                    <Text style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>{value}</Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, padding: '20px 28px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Personal Info */}
              <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
                <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#4f46e5" /> Personal Information
                </Title>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'Email',           value: drawerLead.email },
                    { label: 'Mobile',          value: drawerLead.mobile },
                    { label: 'Alt. Contact',    value: drawerLead.alternateContact || '—' },
                    { label: 'WhatsApp',        value: drawerLead.whatsappNo || '—' },
                    { label: 'Official Email',  value: drawerLead.officialEmail || '—' },
                    { label: 'Gender',          value: drawerLead.gender || '—' },
                    { label: 'Marital Status',  value: drawerLead.maritalStatus || '—' },
                    { label: 'Date of Birth',   value: drawerLead.dob || '—' },
                    { label: 'PAN Number',      value: drawerLead.panNumber },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</Text>
                      <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12 }}>{value}</Text>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Address */}
              <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
                <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText size={13} color="#059669" /> Address Details
                </Title>
                <div style={{ marginBottom: 10 }}>
                  <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Current Address</Text>
                  <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12, lineHeight: 1.6 }}>
                    {[drawerLead.currentAddressLine1, drawerLead.currentAddressLine2, drawerLead.currentCity, drawerLead.currentDistrict, drawerLead.currentState, drawerLead.currentPincode].filter(Boolean).join(', ') || '—'}
                  </Text>
                  {drawerLead.residenceType && (
                    <span style={{ display: 'inline-block', marginTop: 4, fontSize: 10, fontWeight: 700, color: '#6366f1', background: '#eef2ff', borderRadius: 6, padding: '2px 8px' }}>
                      {drawerLead.residenceType}
                    </span>
                  )}
                </div>
                <div>
                  <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Permanent Address</Text>
                  <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12, lineHeight: 1.6 }}>
                    {[drawerLead.permanentAddressLine1, drawerLead.permanentAddressLine2, drawerLead.permanentCity, drawerLead.permanentDistrict, drawerLead.permanentState, drawerLead.permanentPincode].filter(Boolean).join(', ') || '—'}
                  </Text>
                </div>
              </Card>

              {/* Employment */}
              <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
                <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Activity size={13} color="#f59e0b" /> Employment & Finances
                </Title>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  {[
                    { label: 'Job Type',       value: drawerLead.jobType || '—' },
                    { label: 'Designation',    value: drawerLead.designation || '—' },
                    { label: 'Salary Mode',    value: drawerLead.modeOfSalary || '—' },
                    { label: 'Existing EMI',   value: drawerLead.existingEmi ? formatAmount(drawerLead.existingEmi) : '₹0' },
                    { label: 'Prior PL Loan',  value: drawerLead.hasPriorPersonalLoan != null ? (drawerLead.hasPriorPersonalLoan ? 'Yes' : 'No') : '—' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</Text>
                      <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12 }}>{value}</Text>
                    </div>
                  ))}
                </div>
                <div>
                  <Text style={{ display: 'block', fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Office Address</Text>
                  <Text style={{ fontWeight: 600, color: '#334155', fontSize: 12, lineHeight: 1.6 }}>
                    {[drawerLead.officeAddress, drawerLead.officeCity, drawerLead.officeDistrict, drawerLead.officeState, drawerLead.officePincode].filter(Boolean).join(', ') || '—'}
                  </Text>
                </div>
              </Card>

              {/* KYC Documents */}
              <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
                <Title level={5} style={{ fontWeight: 900, marginBottom: 12, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={13} color="#10b981" /> KYC Documents
                </Title>
                {loadingDocs ? (
                  <Spin size="small" />
                ) : (
                  <Timeline items={[
                    { key: 'PAN_CARD', label: 'PAN Card' },
                    { key: 'AADHAAR_CARD', label: 'Aadhaar Card' },
                    { key: 'BANK_STATEMENT', label: 'Bank Statement (6 months)' },
                    { key: 'SALARY_SLIP', label: 'Salary Slips (3 months)' },
                  ].map(({ key, label }) => {
                    const doc = leadDocs[key];
                    return {
                      color: doc ? 'green' : 'gray',
                      children: (
                        <Text style={{ fontWeight: doc ? 700 : 600, color: doc ? '#15803d' : '#94a3b8', fontSize: 12 }}>
                          {label} — {doc ? '✓ Submitted' : 'Not uploaded'}
                        </Text>
                      ),
                    };
                  })} />
                )}
              </Card>

              {/* Ops Notes */}
              <Card size="small" style={{ borderRadius: 12, border: '1px solid #f1f5f9', boxShadow: 'none' }}>
                <Title level={5} style={{ fontWeight: 900, marginBottom: 10, color: '#1e293b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ClipboardCheck size={13} color="#4f46e5" /> Ops Notes
                </Title>
                <textarea
                  value={notesValue}
                  onChange={e => { setNotesValue(e.target.value); setNotesSaved(false); }}
                  placeholder="Add internal notes about this lead — document requests, call logs, issues, next steps…"
                  style={{
                    width: '100%', minHeight: 100, padding: '10px 12px', borderRadius: 10,
                    border: '1.5px solid #e2e8f0', fontSize: 12, fontWeight: 500, color: '#334155',
                    fontFamily: 'Inter, sans-serif', resize: 'vertical', outline: 'none',
                    background: '#f8fafc', boxSizing: 'border-box', lineHeight: 1.6,
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#6366f1')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, gap: 8, alignItems: 'center' }}>
                  {notesSaved && (
                    <Text style={{ fontSize: 11, color: '#10b981', fontWeight: 700 }}>✓ Saved</Text>
                  )}
                  <Button
                    size="small"
                    loading={notesSaving}
                    onClick={handleSaveNotes}
                    style={{ borderRadius: 8, fontWeight: 700, fontSize: 11, background: '#4f46e5', color: '#fff', border: 'none' }}
                  >
                    Save Notes
                  </Button>
                </div>
              </Card>
            </div>
            <div style={{ background: '#fff', padding: '20px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {/* View Documents — always available if any docs exist */}
              {Object.keys(leadDocs).length > 0 && (
                <Button
                  onClick={() => setDocsModalOpen(true)}
                  style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #bfdbfe', color: '#1d4ed8', background: '#eff6ff', fontSize: 13, letterSpacing: '0.02em' }}
                >
                  View Documents
                </Button>
              )}
              {/* Ask for Info — something is missing or unclear, shown on all active leads */}
              {drawerLead?.status !== 'QUERY_RAISED' && drawerLead?.status !== 'RESOLVED' && (
                <Button
                  loading={actionLoading}
                  onClick={() => updateStatus('QUERY_RAISED', 'Asked customer for more information')}
                  style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #fca5a5', color: '#dc2626', fontSize: 13, letterSpacing: '0.02em' }}
                >
                  Ask for Info
                </Button>
              )}
              {/* Continue Checking — info received, pick back up after a query */}
              {drawerLead?.status === 'QUERY_RAISED' && (
                <Button
                  loading={actionLoading}
                  onClick={() => updateStatus('IN_REVIEW', 'Info received — continuing review')}
                  style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, border: '1.5px solid #93c5fd', color: '#1d4ed8', fontSize: 13, letterSpacing: '0.02em' }}
                >
                  Continue Checking
                </Button>
              )}
              {/* Start Checking — begin work on a fresh application */}
              {drawerLead?.status === 'NEW' && (
                <Button
                  type="primary"
                  loading={actionLoading}
                  onClick={() => updateStatus('IN_REVIEW', 'Started checking the application')}
                  style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, background: '#059669', border: 'none', boxShadow: '0 4px 14px rgba(5,150,105,0.25)', fontSize: 13, letterSpacing: '0.02em' }}
                >
                  Start Checking
                </Button>
              )}
              {/* Mark as Done — close the case once everything is verified */}
              {drawerLead?.status === 'IN_REVIEW' && (
                <Button
                  type="primary"
                  loading={actionLoading}
                  onClick={() => updateStatus('RESOLVED', 'Application verified and closed')}
                  style={{ flex: 1, height: 48, borderRadius: 12, fontWeight: 800, background: '#4f46e5', border: 'none', fontSize: 13, letterSpacing: '0.02em' }}
                >
                  Mark as Done
                </Button>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Document Review Modal */}
      <Modal
        open={docsModalOpen}
        onCancel={() => setDocsModalOpen(false)}
        footer={null}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={16} color="#4f46e5" />
            <span style={{ fontWeight: 900, fontSize: 15, color: '#1e293b' }}>
              KYC Documents — {drawerLead?.firstName} {drawerLead?.lastName}
            </span>
          </div>
        }
        width={480}
        styles={{ body: { padding: '20px 24px' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { key: 'PAN_CARD',      label: 'PAN Card',                   icon: '🪪' },
            { key: 'AADHAAR_CARD',  label: 'Aadhaar Card',               icon: '📋' },
            { key: 'BANK_STATEMENT',label: 'Bank Statement (6 months)',   icon: '🏦' },
            { key: 'SALARY_SLIP',   label: 'Salary Slips (3 months)',     icon: '💰' },
          ].map(({ key, label, icon }) => {
            const doc = leadDocs[key];
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: doc ? '#f0fdf4' : '#f8fafc', border: `1px solid ${doc ? '#bbf7d0' : '#e2e8f0'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: doc ? '#15803d' : '#94a3b8' }}>{label}</div>
                    <div style={{ fontSize: 11, color: doc ? '#16a34a' : '#cbd5e1', fontWeight: 600 }}>
                      {doc ? '✓ Submitted' : 'Not uploaded'}
                    </div>
                  </div>
                </div>
                {doc ? (
                  <Button
                    size="small"
                    icon={<Eye size={12} />}
                    loading={viewingDoc === doc.id}
                    onClick={() => handleViewDoc(doc.id)}
                    style={{ fontWeight: 700, fontSize: 12, borderRadius: 8, height: 32, padding: '0 14px', background: '#4f46e5', color: '#fff', border: 'none' }}
                  >
                    Open
                  </Button>
                ) : (
                  <span style={{ fontSize: 11, color: '#cbd5e1', fontWeight: 600 }}>—</span>
                )}
              </div>
            );
          })}
        </div>
      </Modal>

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
