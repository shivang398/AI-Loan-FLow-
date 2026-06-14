import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, Input, Select, Tag, Space, Avatar, Modal, Descriptions,
  Badge, Spin, Empty, Row, Col, Progress, Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  Search, Users, RefreshCw, Phone, Mail, MapPin,
  TrendingUp, Award, FileText, Activity,
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

/* ── types ──────────────────────────────────────────────────────────────── */
interface Connector {
  id: string; firstName: string; lastName: string;
  email: string; phone: string; region: string; status: string; role: string;
  createdAt?: string;
}
interface HierarchyMapping { id: string; connector: Connector; manager: Connector; role: string; }
interface Submission { id: string; fullName: string; loanAmount: number; loanPurpose: string; status: string; submittedAt: string; }
interface Transaction { id: string; connectorId: string; loanAmount: number; totalPayout: number; status: string; createdAt: string; }

interface ConnectorRow extends Connector {
  totalFiles: number; approvedFiles: number; rate: number; earned: number; color: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9', '#ef4444', '#ec4899', '#14b8a6'];

const fmt = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(1)}Cr` :
  n >= 1e5 ? `₹${(n / 1e5).toFixed(1)}L`  :
  `₹${n.toLocaleString('en-IN')}`;

/* ── component ───────────────────────────────────────────────────────────── */
const ConnectorTracker: React.FC = () => {
  const [rmProfile,    setRmProfile]   = useState<Connector | null>(null);
  const [rows,         setRows]        = useState<ConnectorRow[]>([]);
  const [filtered,     setFiltered]    = useState<ConnectorRow[]>([]);
  const [submissions,  setSubmissions] = useState<Submission[]>([]);
  const [_transactions, setTransactions]= useState<Transaction[]>([]);
  const [loading,      setLoading]     = useState(true);
  const [refreshing,   setRefreshing]  = useState(false);
  const [search,       setSearch]      = useState('');
  const [statusFilter, setStatusFilter]= useState<string>('ALL');
  const [selected,     setSelected]    = useState<ConnectorRow | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const meRes = await apiClient.get('/connectors/me');
      const me: Connector = meRes.data?.data;
      setRmProfile(me);

      const [repRes, subRes, txRes] = await Promise.all([
        apiClient.get(`/connectors/${me.id}/reportees`),
        apiClient.get('/eligibility/submissions'),
        apiClient.get('/commissions/transactions'),
      ]);

      const reps: HierarchyMapping[] = repRes.data?.data || [];
      const allSubs: Submission[] = subRes.data?.data?.items ?? subRes.data?.data ?? [];
      const allTx: Transaction[]  = txRes.data?.data?.items ?? txRes.data?.data ?? [];

      setSubmissions(allSubs);
      setTransactions(allTx);

      const built: ConnectorRow[] = reps
        .map(r => r.connector)
        .filter(Boolean)
        .map((c, i) => {
          const cSubs  = allSubs.filter(s => (s as any).assignedConnectorId === c.id);
          const total  = cSubs.length;
          const approved = cSubs.filter(s => ['APPROVED', 'DISBURSED'].includes(s.status)).length;
          const rate   = total > 0 ? Math.round((approved / total) * 100) : 0;
          const earned = allTx
            .filter(t => t.connectorId === c.id)
            .reduce((s, t) => s + (t.totalPayout || 0), 0);
          return { ...c, totalFiles: total, approvedFiles: approved, rate, earned, color: COLORS[i % COLORS.length] };
        });

      setRows(built);
      setFiltered(built);
    } catch {
      /* degrade gracefully */
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* ── filter ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    let data = rows;
    if (statusFilter !== 'ALL') data = data.filter(r => r.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q) ||
        r.region?.toLowerCase().includes(q)
      );
    }
    setFiltered(data);
  }, [search, statusFilter, rows]);

  /* ── detail modal for selected connector ────────────────────────────── */
  const selectedSubs = selected
    ? submissions.filter(s => (s as any).assignedConnectorId === selected.id)
    : [];

  /* ── columns ─────────────────────────────────────────────────────────── */
  const columns: ColumnsType<ConnectorRow> = [
    {
      title: 'Connector',
      key: 'name',
      sorter: (a, b) => `${a.firstName}${a.lastName}`.localeCompare(`${b.firstName}${b.lastName}`),
      render: (_, r) => (
        <Space size={10}>
          <Avatar style={{ background: r.color + '20', color: r.color, fontWeight: 800, border: `1px solid ${r.color}30` }}>
            {r.firstName?.[0]}{r.lastName?.[0]}
          </Avatar>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{r.firstName} {r.lastName}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Region', dataIndex: 'region', key: 'region',
      render: (v: string) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
          <MapPin size={11} /> {v || '—'}
        </span>
      ),
    },
    {
      title: 'Phone', dataIndex: 'phone', key: 'phone',
      render: (v: string) => <span style={{ fontSize: 12 }}>{v || '—'}</span>,
    },
    {
      title: 'Total Files', dataIndex: 'totalFiles', key: 'totalFiles',
      sorter: (a, b) => a.totalFiles - b.totalFiles,
      render: (v: number) => <span style={{ fontWeight: 800, fontSize: 14 }}>{v}</span>,
    },
    {
      title: 'Success Rate', dataIndex: 'rate', key: 'rate',
      sorter: (a, b) => a.rate - b.rate,
      render: (v: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 120 }}>
          <Progress percent={v} size="small" showInfo={false}
            strokeColor={v >= 70 ? '#10b981' : v >= 40 ? '#f59e0b' : '#ef4444'} strokeWidth={6} />
          <span style={{ fontSize: 12, fontWeight: 800, width: 34, color: v >= 70 ? '#16a34a' : 'var(--text-primary)' }}>{v}%</span>
        </div>
      ),
    },
    {
      title: 'Earnings', dataIndex: 'earned', key: 'earned',
      sorter: (a, b) => a.earned - b.earned,
      render: (v: number) => <span style={{ fontWeight: 700, color: '#6d28d9', fontSize: 13 }}>{fmt(v)}</span>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      filters: [
        { text: 'Active',   value: 'ACTIVE'   },
        { text: 'Inactive', value: 'INACTIVE' },
      ],
      onFilter: (v, r) => r.status === v,
      render: (s: string) => {
        const active = s === 'ACTIVE';
        return (
          <Badge
            status={active ? 'success' : 'error'}
            text={<span style={{ fontSize: 12, fontWeight: 600, color: active ? '#16a34a' : '#dc2626' }}>{s}</span>}
          />
        );
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, r) => (
        <button
          onClick={() => setSelected(r)}
          style={{ background: '#eff6ff', border: 'none', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#2563eb' }}
        >
          View
        </button>
      ),
    },
  ];

  /* ── summary KPIs ────────────────────────────────────────────────────── */
  const totalFiles    = rows.reduce((s, r) => s + r.totalFiles, 0);
  const totalApproved = rows.reduce((s, r) => s + r.approvedFiles, 0);
  const avgRate       = rows.length ? Math.round(rows.reduce((s, r) => s + r.rate, 0) / rows.length) : 0;
  const totalEarned   = rows.reduce((s, r) => s + r.earned, 0);
  const activeCount   = rows.filter(r => r.status === 'ACTIVE').length;

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
      <Spin size="large" tip="Loading team data…" />
    </div>
  );

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* Header */}
      <div style={{
        background: 'white', padding: '20px 26px', borderRadius: 18,
        border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 50, height: 50, borderRadius: 14, background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(139,92,246,0.3)' }}>
            <Users size={24} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Connector Tracker</h2>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '2px 0 0' }}>
              {rmProfile ? `${rmProfile.firstName} ${rmProfile.lastName}'s Team` : 'My Team'} · {rows.length} connector{rows.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Tooltip title="Refresh">
          <button
            onClick={() => load(true)}
            style={{ background: refreshing ? '#eff6ff' : 'var(--surface-1)', border: '1px solid var(--surface-3)', borderRadius: 10, padding: '7px 13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}
          >
            <RefreshCw size={13} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>
        </Tooltip>
      </div>

      {/* KPI Row */}
      <Row gutter={[14, 14]}>
        {[
          { label: 'Team Size',       value: String(rows.length),    icon: Users,      color: '#8b5cf6', bg: '#f5f3ff' },
          { label: 'Active',          value: String(activeCount),    icon: Activity,   color: '#10b981', bg: '#f0fdf4' },
          { label: 'Total Files',     value: String(totalFiles),     icon: FileText,   color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Approved',        value: String(totalApproved),  icon: TrendingUp, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Avg Success Rate',value: `${avgRate}%`,          icon: Award,      color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Total Payouts',   value: fmt(totalEarned),       icon: Award,      color: '#6d28d9', bg: '#f5f3ff' },
        ].map((k, i) => (
          <Col key={i} xs={24} sm={12} xl={4}>
            <div style={{ background: 'white', borderRadius: 14, padding: '16px 18px', border: '1px solid var(--surface-3)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <k.icon size={18} color={k.color} />
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.label}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: k.color, lineHeight: 1.2 }}>{k.value}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Filter Bar + Table */}
      <div className="pro-card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--surface-2)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Input
            prefix={<Search size={14} color="#94a3b8" />}
            placeholder="Search by name, email, region…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 260, borderRadius: 10 }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 140 }}
            options={[
              { value: 'ALL',      label: 'All Status' },
              { value: 'ACTIVE',   label: 'Active'     },
              { value: 'INACTIVE', label: 'Inactive'   },
            ]}
          />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>
            {filtered.length} of {rows.length} shown
          </span>
        </div>

        {filtered.length === 0 ? (
          <Empty description="No connectors found" style={{ padding: '60px 0' }} />
        ) : (
          <Table
            dataSource={filtered}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: false }}
            className="premium-table"
            onRow={r => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })}
          />
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        open={!!selected}
        onCancel={() => setSelected(null)}
        footer={null}
        width={680}
        title={
          <Space size={10}>
            {selected && (
              <Avatar style={{ background: selected.color + '20', color: selected.color, fontWeight: 800 }}>
                {selected.firstName?.[0]}{selected.lastName?.[0]}
              </Avatar>
            )}
            <span style={{ fontWeight: 800 }}>{selected?.firstName} {selected?.lastName}</span>
            {selected && (
              <Tag style={{ background: selected.status === 'ACTIVE' ? '#f0fdf4' : '#fef2f2', color: selected.status === 'ACTIVE' ? '#16a34a' : '#dc2626', border: 'none', borderRadius: 100, fontSize: 10, fontWeight: 700 }}>
                {selected.status}
              </Tag>
            )}
          </Space>
        }
      >
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Descriptions column={2} size="small" labelStyle={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: 12 }}>
              <Descriptions.Item label={<><Mail size={11} style={{ marginRight: 4 }} />Email</>}>{selected.email}</Descriptions.Item>
              <Descriptions.Item label={<><Phone size={11} style={{ marginRight: 4 }} />Phone</>}>{selected.phone || '—'}</Descriptions.Item>
              <Descriptions.Item label={<><MapPin size={11} style={{ marginRight: 4 }} />Region</>}>{selected.region || '—'}</Descriptions.Item>
              <Descriptions.Item label="Role">{selected.role}</Descriptions.Item>
              <Descriptions.Item label="Joined">
                {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
              </Descriptions.Item>
            </Descriptions>

            {/* Performance Summary */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Total Files',   value: selected.totalFiles,              color: '#3b82f6' },
                { label: 'Approved',      value: selected.approvedFiles,           color: '#10b981' },
                { label: 'Success Rate',  value: `${selected.rate}%`,             color: '#f59e0b' },
                { label: 'Earned',        value: fmt(selected.earned),            color: '#6d28d9' },
              ].map((m, i) => (
                <div key={i} style={{ flex: 1, background: 'var(--surface-1)', borderRadius: 12, padding: '12px 14px', border: '1px solid var(--surface-3)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: m.color, marginTop: 4 }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Recent Submissions */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', marginBottom: 10 }}>Recent Submissions</div>
              {selectedSubs.length === 0 ? (
                <Empty description="No submissions yet" />
              ) : (
                <Table
                  dataSource={selectedSubs.slice(0, 5)}
                  rowKey="id"
                  size="small"
                  pagination={false}
                  columns={[
                    { title: 'Customer', dataIndex: 'fullName', key: 'fullName', render: (v: string) => <span style={{ fontWeight: 600, fontSize: 12 }}>{v}</span> },
                    { title: 'Amount',   dataIndex: 'loanAmount', key: 'loanAmount', render: (v: number) => <span style={{ fontSize: 12 }}>{fmt(v || 0)}</span> },
                    {
                      title: 'Status', dataIndex: 'status', key: 'status',
                      render: (s: string) => {
                        const cfg = { NEW: '#2563eb', APPROVED: '#16a34a', REJECTED: '#dc2626', IN_REVIEW: '#0369a1' }[s] || '#64748b';
                        return <Tag style={{ background: 'transparent', border: `1px solid ${cfg}`, color: cfg, borderRadius: 100, fontSize: 10, fontWeight: 700 }}>{s.replace('_', ' ')}</Tag>;
                      },
                    },
                    { title: 'Date', dataIndex: 'submittedAt', key: 'submittedAt', render: (v: string) => <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{v ? new Date(v).toLocaleDateString('en-IN') : '—'}</span> },
                  ]}
                />
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ConnectorTracker;
