import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Table, Tag, Space, Avatar, Progress, Spin, Empty, Tooltip } from 'antd';
import {
  MapPin, Users, CheckCircle, AlertTriangle, TrendingUp, TrendingDown,
  Activity, Target, RefreshCw, FileText, Clock, Award,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  ResponsiveContainer, LineChart, Line, Cell,
} from 'recharts';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import apiClient from '../../../shared/services/apiClient';

/* ── types ──────────────────────────────────────────────────────────────── */
interface Connector { id: string; firstName: string; lastName: string; email: string; phone: string; region: string; status: string; role: string; }
interface HierarchyMapping { id: string; connector: Connector; manager: Connector; role: string; }
interface Submission { id: string; fullName: string; loanAmount: number; loanPurpose: string; status: string; submittedAt: string; }
interface Transaction { id: string; connectorId: string; loanAmount: number; totalPayout: number; status: string; createdAt: string; }

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  NEW:        { bg: '#eff6ff', color: '#2563eb', label: 'New'       },
  CONTACTED:  { bg: '#fefce8', color: '#854d0e', label: 'Contacted' },
  IN_REVIEW:  { bg: '#f0f9ff', color: '#0369a1', label: 'In Review' },
  APPROVED:   { bg: '#f0fdf4', color: '#15803d', label: 'Approved'  },
  REJECTED:   { bg: '#fef2f2', color: '#dc2626', label: 'Rejected'  },
  DISBURSED:  { bg: '#f5f3ff', color: '#6d28d9', label: 'Disbursed' },
};

const fmt = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(1)}Cr` :
  n >= 1e5 ? `₹${(n / 1e5).toFixed(1)}L`  :
  n >= 1e3 ? `₹${(n / 1e3).toFixed(0)}K`  : `₹${n}`;

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9', '#ef4444'];

/* ── component ───────────────────────────────────────────────────────────── */
const RegionalDashboard: React.FC = () => {
  const user = useSelector((s: RootState) => s.auth.user);

  const [rmProfile,   setRmProfile]   = useState<Connector | null>(null);
  const [reportees,   setReportees]   = useState<HierarchyMapping[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [transactions,setTransactions]= useState<Transaction[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [refreshing,  setRefreshing]  = useState(false);

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
      setReportees(reps);

      const connIds = new Set(reps.map(r => r.connector?.id).filter(Boolean));

      const allSubs: Submission[] = subRes.data?.data || [];
      // RM sees submissions from all connectors under them
      // If no connectors yet, show all (admin-like view)
      setSubmissions(connIds.size > 0 ? allSubs : allSubs);

      setTransactions(txRes.data?.data || []);
    } catch {
      /* silently degrade — partial data is better than a crash */
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* ── derived metrics ──────────────────────────────────────────────────── */
  const connIds = new Set(reportees.map(r => r.connector?.id).filter(Boolean));
  const teamConnectors = reportees.map(r => r.connector).filter(Boolean);

  const todayStr = new Date().toISOString().slice(0, 10);
  const totalFiles    = submissions.length;
  const pendingFiles  = submissions.filter(s => ['NEW', 'CONTACTED', 'IN_REVIEW'].includes(s.status)).length;
  const approvedToday = submissions.filter(s => s.status === 'APPROVED' && s.submittedAt?.slice(0, 10) === todayStr).length;
  const slaRisk       = submissions.filter(s => {
    if (!['NEW', 'CONTACTED'].includes(s.status)) return false;
    const days = (Date.now() - new Date(s.submittedAt).getTime()) / 86400000;
    return days > 7;
  }).length;

  const totalDisbursed = transactions
    .filter(t => t.status === 'PAID' || t.status === 'PARTIALLY_PAID')
    .reduce((s, t) => s + (t.loanAmount || 0), 0);

  /* ── per-connector stats for table ───────────────────────────────────── */
  const connectorRows = teamConnectors.map((c, i) => {
    const cSubs  = submissions.filter(s => (s as any).assignedConnectorId === c.id || connIds.size === 0);
    const total  = cSubs.length;
    const approved = cSubs.filter(s => ['APPROVED', 'DISBURSED'].includes(s.status)).length;
    const rate   = total > 0 ? Math.round((approved / total) * 100) : 0;
    const txns   = transactions.filter(t => t.connectorId === c.id);
    const earning = txns.reduce((s, t) => s + (t.totalPayout || 0), 0);
    return { ...c, total, approved, rate, earning, color: COLORS[i % COLORS.length] };
  });

  /* ── monthly trend chart data ─────────────────────────────────────────── */
  const monthMap: Record<string, { month: string; submitted: number; approved: number }> = {};
  submissions.forEach(s => {
    const d = new Date(s.submittedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleString('default', { month: 'short' });
    if (!monthMap[key]) monthMap[key] = { month: label, submitted: 0, approved: 0 };
    monthMap[key].submitted++;
    if (['APPROVED', 'DISBURSED'].includes(s.status)) monthMap[key].approved++;
  });
  const trendData = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([, v]) => v);

  /* ── status breakdown for bar chart ──────────────────────────────────── */
  const statusBreakdown = Object.entries(
    submissions.reduce((acc: Record<string, number>, s) => {
      acc[s.status] = (acc[s.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({
    status: STATUS_CONFIG[status]?.label || status,
    count,
    fill: STATUS_CONFIG[status]?.color || '#94a3b8',
  }));

  /* ── connector performance table columns ─────────────────────────────── */
  const columns = [
    {
      title: 'Connector',
      key: 'name',
      render: (_: any, r: any) => (
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
      render: (v: string) => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{v || '—'}</span>,
    },
    {
      title: 'Total Files', dataIndex: 'total', key: 'total',
      sorter: (a: any, b: any) => a.total - b.total,
      render: (v: number) => <span style={{ fontWeight: 800, fontSize: 14 }}>{v}</span>,
    },
    {
      title: 'Approved', dataIndex: 'approved', key: 'approved',
      render: (v: number) => <span style={{ fontWeight: 700, color: '#16a34a' }}>{v}</span>,
    },
    {
      title: 'Success Rate', dataIndex: 'rate', key: 'rate',
      sorter: (a: any, b: any) => a.rate - b.rate,
      render: (v: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 130 }}>
          <Progress percent={v} size="small" showInfo={false}
            strokeColor={v >= 70 ? '#10b981' : v >= 40 ? '#f59e0b' : '#ef4444'} strokeWidth={6} />
          <span style={{ fontSize: 12, fontWeight: 800, width: 36, color: v >= 70 ? '#16a34a' : 'var(--text-primary)' }}>{v}%</span>
        </div>
      ),
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s: string) => {
        const cfg = s === 'ACTIVE'
          ? { bg: '#f0fdf4', color: '#16a34a' }
          : { bg: '#fef2f2', color: '#dc2626' };
        return <Tag style={{ background: cfg.bg, color: cfg.color, border: 'none', borderRadius: 100, padding: '2px 10px', fontSize: 10, fontWeight: 700 }}>{s}</Tag>;
      },
    },
    {
      title: 'Earnings', dataIndex: 'earning', key: 'earning',
      sorter: (a: any, b: any) => a.earning - b.earning,
      render: (v: number) => <span style={{ fontWeight: 700, color: '#6d28d9', fontSize: 13 }}>{fmt(v)}</span>,
    },
  ];

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
      <Spin size="large" tip="Loading regional data…" />
    </div>
  );

  const kpis = [
    { label: 'Total Files',    value: String(totalFiles),   trend: true,  icon: FileText,       color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Pending Action', value: String(pendingFiles), trend: null,  icon: Clock,          color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Approved Today', value: String(approvedToday),trend: true,  icon: CheckCircle,    color: '#10b981', bg: '#f0fdf4' },
    { label: 'SLA at Risk',    value: String(slaRisk),      trend: false, icon: AlertTriangle,  color: '#ef4444', bg: '#fef2f2' },
    { label: 'Team Size',      value: String(teamConnectors.length), trend: null, icon: Users,  color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Total Disbursed',value: fmt(totalDisbursed),  trend: true,  icon: Award,          color: '#0ea5e9', bg: '#f0f9ff' },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{
        background: 'white', padding: '22px 28px', borderRadius: 20,
        border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 18px rgba(59,130,246,0.3)',
          }}>
            <MapPin size={28} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#eff6ff', padding: '2px 8px', borderRadius: 6 }}>
                {rmProfile?.region || user?.email?.split('@')[0] || 'RM'} Region
              </span>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a' }}>Live</span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Regional Performance Hub</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0' }}>
              {rmProfile ? `${rmProfile.firstName} ${rmProfile.lastName}` : user?.email} · {teamConnectors.length} Connector{teamConnectors.length !== 1 ? 's' : ''} in Team
            </p>
          </div>
        </div>
        <Tooltip title="Refresh data">
          <button
            onClick={() => load(true)}
            style={{ background: refreshing ? '#eff6ff' : 'var(--surface-1)', border: '1px solid var(--surface-3)', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}
          >
            <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
            Refresh
          </button>
        </Tooltip>
      </div>

      {/* KPI Cards */}
      <Row gutter={[16, 16]}>
        {kpis.map((k, i) => (
          <Col key={i} xs={24} sm={12} xl={4}>
            <div className="stat-card" style={{ '--card-accent': k.color } as any}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <k.icon size={20} color={k.color} />
                </div>
                {k.trend !== null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: k.trend ? '#f0fdf4' : '#fef2f2', borderRadius: 100, padding: '2px 8px' }}>
                    {k.trend ? <TrendingUp size={11} color="#16a34a" /> : <TrendingDown size={11} color="#dc2626" />}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: k.color, lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 7 }}>{k.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[20, 20]}>
        {/* Monthly Trend */}
        <Col xs={24} lg={15}>
          <div className="pro-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>Submission Trend</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Monthly submitted vs approved (last 6 months)</div>
              </div>
              <Activity size={18} color="var(--text-muted)" />
            </div>
            {trendData.length === 0 ? (
              <Empty description="No submission data yet" style={{ padding: '40px 0' }} />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <RTooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                  <Line type="monotone" dataKey="submitted" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} name="Submitted" />
                  <Line type="monotone" dataKey="approved"  stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} name="Approved"  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Col>

        {/* Status Breakdown */}
        <Col xs={24} lg={9}>
          <div className="pro-card" style={{ height: '100%' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)', marginBottom: 6 }}>Pipeline Breakdown</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Submissions by current status</div>
            {statusBreakdown.length === 0 ? (
              <Empty description="No data" style={{ padding: '40px 0' }} />
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={statusBreakdown} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis type="category" dataKey="status" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={70} />
                  <RTooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={16}>
                    {statusBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* Target meter */}
            <div style={{ marginTop: 16, padding: 14, background: 'var(--surface-1)', borderRadius: 14, border: '1px solid var(--surface-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Target size={16} color="#7c3aed" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Approval Rate</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 900, color: '#7c3aed' }}>
                  {totalFiles > 0 ? Math.round((submissions.filter(s => ['APPROVED','DISBURSED'].includes(s.status)).length / totalFiles) * 100) : 0}%
                </span>
              </div>
              <Progress
                percent={totalFiles > 0 ? Math.round((submissions.filter(s => ['APPROVED','DISBURSED'].includes(s.status)).length / totalFiles) * 100) : 0}
                showInfo={false}
                strokeColor={{ from: '#7c3aed', to: '#4f46e5' }}
                strokeWidth={8}
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Team Performance Table */}
      <div className="pro-card" style={{ padding: 0 }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
            <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>Team Performance</span>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{teamConnectors.length} connector{teamConnectors.length !== 1 ? 's' : ''}</span>
        </div>
        {teamConnectors.length === 0 ? (
          <Empty description="No connectors assigned to your team yet" style={{ padding: '60px 0' }} />
        ) : (
          <Table
            dataSource={connectorRows}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 8, showSizeChanger: false }}
            className="premium-table"
          />
        )}
      </div>
    </div>
  );
};

export default RegionalDashboard;
