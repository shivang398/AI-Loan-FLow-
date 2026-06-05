import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, Input, Select, Tag, Modal, Descriptions,
  Spin, Empty, Row, Col, Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  Search, ClipboardList, RefreshCw, Clock, CheckCircle,
  XCircle, AlertTriangle, Loader, FileText, Eye,
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

/* ── types ──────────────────────────────────────────────────────────────── */
interface Connector { id: string; firstName: string; lastName: string; email: string; }
interface HierarchyMapping { id: string; connector: Connector; manager: Connector; }
interface Submission {
  id: string; fullName: string; mobileNumber: string; loanAmount: number;
  loanPurpose: string; employmentType: string; city: string; monthlyIncome: number;
  isEligible: boolean; maxLoanAmount: number; status: string; submittedAt: string;
  assignedConnectorId?: string;
}

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  NEW:       { label: 'New',       color: '#2563eb', bg: '#eff6ff', icon: <FileText   size={11} /> },
  CONTACTED: { label: 'Contacted', color: '#854d0e', bg: '#fefce8', icon: <Clock       size={11} /> },
  IN_REVIEW: { label: 'In Review', color: '#0369a1', bg: '#f0f9ff', icon: <Loader      size={11} /> },
  APPROVED:  { label: 'Approved',  color: '#15803d', bg: '#f0fdf4', icon: <CheckCircle size={11} /> },
  REJECTED:  { label: 'Rejected',  color: '#dc2626', bg: '#fef2f2', icon: <XCircle     size={11} /> },
  DISBURSED: { label: 'Disbursed', color: '#6d28d9', bg: '#f5f3ff', icon: <CheckCircle size={11} /> },
};

const fmt = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(1)}Cr` :
  n >= 1e5 ? `₹${(n / 1e5).toFixed(1)}L`  :
  `₹${(n || 0).toLocaleString('en-IN')}`;

const daysSince = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);

/* ── component ───────────────────────────────────────────────────────────── */
const WorkflowMonitor: React.FC = () => {
  const [_rmProfile,   setRmProfile]    = useState<Connector | null>(null);
  const [reportees,    setReportees]    = useState<HierarchyMapping[]>([]);
  const [submissions,  setSubmissions]  = useState<Submission[]>([]);
  const [filtered,     setFiltered]     = useState<Submission[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [refreshing,   setRefreshing]   = useState(false);
  const [search,       setSearch]       = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [connFilter,   setConnFilter]   = useState<string>('ALL');
  const [detail,       setDetail]       = useState<Submission | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const meRes = await apiClient.get('/connectors/me');
      const me: Connector = meRes.data?.data;
      setRmProfile(me);

      const [repRes, subRes] = await Promise.all([
        apiClient.get(`/connectors/${me.id}/reportees`),
        apiClient.get('/eligibility/submissions'),
      ]);

      const reps: HierarchyMapping[] = repRes.data?.data || [];
      setReportees(reps);

      const allSubs: Submission[] = subRes.data?.data || [];
      setSubmissions(allSubs);
      setFiltered(allSubs);
    } catch {
      /* degrade gracefully */
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* ── filtering ────────────────────────────────────────────────────────── */
  useEffect(() => {
    let data = submissions;
    if (statusFilter !== 'ALL') data = data.filter(s => s.status === statusFilter);
    if (connFilter   !== 'ALL') data = data.filter(s => s.assignedConnectorId === connFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(s =>
        s.fullName?.toLowerCase().includes(q) ||
        s.mobileNumber?.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q) ||
        s.loanPurpose?.toLowerCase().includes(q)
      );
    }
    setFiltered(data);
  }, [search, statusFilter, connFilter, submissions]);

  /* ── connector lookup map ─────────────────────────────────────────────── */
  const connMap: Record<string, string> = {};
  reportees.forEach(r => {
    if (r.connector) connMap[r.connector.id] = `${r.connector.firstName} ${r.connector.lastName}`;
  });

  /* ── pipeline counts ─────────────────────────────────────────────────── */
  const countBy = (status: string) => submissions.filter(s => s.status === status).length;
  const slaRisk = submissions.filter(s =>
    ['NEW', 'CONTACTED'].includes(s.status) && daysSince(s.submittedAt) > 7
  ).length;

  /* ── columns ─────────────────────────────────────────────────────────── */
  const columns: ColumnsType<Submission> = [
    {
      title: 'Customer',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      render: (v: string, r) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{v}</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.mobileNumber} · {r.city || '—'}</div>
        </div>
      ),
    },
    {
      title: 'Loan Amount',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      sorter: (a, b) => (a.loanAmount || 0) - (b.loanAmount || 0),
      render: (v: number) => <span style={{ fontWeight: 700, fontSize: 13 }}>{fmt(v)}</span>,
    },
    {
      title: 'Purpose',
      dataIndex: 'loanPurpose',
      key: 'loanPurpose',
      render: (v: string) => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{v || '—'}</span>,
    },
    {
      title: 'Connector',
      dataIndex: 'assignedConnectorId',
      key: 'connector',
      render: (id: string) => (
        <span style={{ fontSize: 12, fontWeight: 500 }}>{id ? (connMap[id] || id.slice(0, 8) + '…') : <span style={{ color: '#94a3b8' }}>Unassigned</span>}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: Object.entries(STATUS_MAP).map(([k, v]) => ({ text: v.label, value: k })),
      onFilter: (v, r) => r.status === v,
      render: (s: string) => {
        const cfg = STATUS_MAP[s] || { label: s, color: '#64748b', bg: '#f8fafc', icon: null };
        return (
          <Tag icon={cfg.icon} style={{ background: cfg.bg, color: cfg.color, border: 'none', borderRadius: 100, padding: '2px 10px', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {cfg.label}
          </Tag>
        );
      },
    },
    {
      title: 'Age',
      dataIndex: 'submittedAt',
      key: 'age',
      sorter: (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      render: (v: string) => {
        const d = daysSince(v);
        return (
          <Tooltip title={v ? new Date(v).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}>
            <span style={{ fontSize: 12, color: d > 7 ? '#ef4444' : 'var(--text-muted)', fontWeight: d > 7 ? 700 : 400 }}>
              {d === 0 ? 'Today' : `${d}d ago`}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, r) => (
        <button
          onClick={e => { e.stopPropagation(); setDetail(r); }}
          style={{ background: 'none', border: '1px solid var(--surface-3)', borderRadius: 8, padding: '4px 10px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
        >
          <Eye size={12} /> View
        </button>
      ),
    },
  ];

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
      <Spin size="large" tip="Loading workflow data…" />
    </div>
  );

  const connectorOptions = [
    { value: 'ALL', label: 'All Connectors' },
    ...reportees.map(r => ({
      value: r.connector?.id,
      label: `${r.connector?.firstName} ${r.connector?.lastName}`,
    })),
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Header */}
      <div style={{
        background: 'white', padding: '20px 26px', borderRadius: 18,
        border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(16,185,129,0.3)' }}>
            <ClipboardList size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Workflow Monitor</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
              {submissions.length} submissions · {slaRisk > 0 && <span style={{ color: '#ef4444', fontWeight: 700 }}>{slaRisk} SLA at risk</span>}
            </p>
          </div>
        </div>
        <Tooltip title="Refresh">
          <button
            onClick={() => load(true)}
            style={{ background: refreshing ? '#f0fdf4' : 'var(--surface-1)', border: '1px solid var(--surface-3)', borderRadius: 10, padding: '7px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}
          >
            <RefreshCw size={13} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>
        </Tooltip>
      </div>

      {/* Pipeline Status Cards */}
      <Row gutter={[12, 12]}>
        {Object.entries(STATUS_MAP).map(([key, cfg]) => (
          <Col key={key} xs={12} sm={8} xl={4}>
            <div
              onClick={() => setStatusFilter(statusFilter === key ? 'ALL' : key)}
              style={{
                background: statusFilter === key ? cfg.bg : 'white',
                borderRadius: 14, padding: '14px 16px',
                border: `1.5px solid ${statusFilter === key ? cfg.color + '50' : 'var(--surface-3)'}`,
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: statusFilter === key ? `0 4px 12px ${cfg.color}20` : '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{cfg.label}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: statusFilter === key ? cfg.color : 'var(--text-primary)' }}>{countBy(key)}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* SLA Alert */}
      {slaRisk > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertTriangle size={16} color="#ef4444" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626' }}>
            {slaRisk} submission{slaRisk > 1 ? 's' : ''} awaiting action for over 7 days — immediate follow-up required.
          </span>
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setSearch('');
            }}
            style={{ marginLeft: 'auto', background: 'white', border: '1px solid #fecaca', borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#dc2626' }}
          >
            Show All
          </button>
        </div>
      )}

      {/* Filter Bar + Table */}
      <div className="pro-card" style={{ padding: 0 }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--surface-2)', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <Input
            prefix={<Search size={14} color="#94a3b8" />}
            placeholder="Search customer, mobile, city…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 240, borderRadius: 10 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 140 }}
            options={[
              { value: 'ALL', label: 'All Status' },
              ...Object.entries(STATUS_MAP).map(([k, v]) => ({ value: k, label: v.label })),
            ]}
          />
          <Select
            value={connFilter}
            onChange={setConnFilter}
            style={{ width: 180 }}
            options={connectorOptions}
          />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
            {filtered.length} of {submissions.length} shown
          </span>
        </div>

        {filtered.length === 0 ? (
          <Empty description="No submissions match your filters" style={{ padding: '60px 0' }} />
        ) : (
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 12, showSizeChanger: false, showQuickJumper: true }}
            className="premium-table"
            onRow={r => ({ onClick: () => setDetail(r), style: { cursor: 'pointer' } })}
            rowClassName={r => r.status === 'NEW' && daysSince(r.submittedAt) > 7 ? 'sla-risk-row' : ''}
          />
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        open={!!detail}
        onCancel={() => setDetail(null)}
        footer={null}
        width={580}
        title={
          <span style={{ fontWeight: 800, fontSize: 15 }}>Submission Detail</span>
        }
      >
        {detail && (() => {
          const cfg = STATUS_MAP[detail.status] || STATUS_MAP.NEW;
          const connector = detail.assignedConnectorId ? connMap[detail.assignedConnectorId] : null;
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Status + SLA badge */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Tag style={{ background: cfg.bg, color: cfg.color, border: 'none', borderRadius: 100, padding: '4px 14px', fontSize: 12, fontWeight: 700 }}>
                  {cfg.label}
                </Tag>
                {daysSince(detail.submittedAt) > 7 && ['NEW', 'CONTACTED'].includes(detail.status) && (
                  <Tag icon={<AlertTriangle size={11} />} style={{ background: '#fef2f2', color: '#dc2626', border: 'none', borderRadius: 100, padding: '4px 12px', fontSize: 11, fontWeight: 700 }}>
                    SLA Risk · {daysSince(detail.submittedAt)}d old
                  </Tag>
                )}
              </div>

              <Descriptions column={2} size="small" labelStyle={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: 12 }} contentStyle={{ fontSize: 13 }}>
                <Descriptions.Item label="Full Name" span={2}><strong>{detail.fullName}</strong></Descriptions.Item>
                <Descriptions.Item label="Mobile">{detail.mobileNumber || '—'}</Descriptions.Item>
                <Descriptions.Item label="City">{detail.city || '—'}</Descriptions.Item>
                <Descriptions.Item label="Loan Amount">{fmt(detail.loanAmount)}</Descriptions.Item>
                <Descriptions.Item label="Purpose">{detail.loanPurpose || '—'}</Descriptions.Item>
                <Descriptions.Item label="Monthly Income">{fmt(detail.monthlyIncome)}</Descriptions.Item>
                <Descriptions.Item label="Employment">{detail.employmentType || '—'}</Descriptions.Item>
                <Descriptions.Item label="Eligible">
                  {detail.isEligible === true ? (
                    <Tag style={{ background: '#f0fdf4', color: '#16a34a', border: 'none', fontSize: 11, fontWeight: 700, borderRadius: 100 }}>YES</Tag>
                  ) : detail.isEligible === false ? (
                    <Tag style={{ background: '#fef2f2', color: '#dc2626', border: 'none', fontSize: 11, fontWeight: 700, borderRadius: 100 }}>NO</Tag>
                  ) : '—'}
                </Descriptions.Item>
                <Descriptions.Item label="Max Loan">{detail.maxLoanAmount ? fmt(detail.maxLoanAmount) : '—'}</Descriptions.Item>
                <Descriptions.Item label="Connector">{connector || (detail.assignedConnectorId ? detail.assignedConnectorId.slice(0, 8) + '…' : <span style={{ color: '#94a3b8' }}>Unassigned</span>)}</Descriptions.Item>
                <Descriptions.Item label="Submitted">
                  {detail.submittedAt ? new Date(detail.submittedAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                </Descriptions.Item>
              </Descriptions>
            </div>
          );
        })()}
      </Modal>

      <style>{`
        .sla-risk-row td { background: #fff8f8 !important; }
        .sla-risk-row:hover td { background: #fff2f2 !important; }
      `}</style>
    </div>
  );
};

export default WorkflowMonitor;
