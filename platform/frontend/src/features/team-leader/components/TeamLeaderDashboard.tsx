import React, { useState, useEffect, useCallback } from 'react';
import {
  Row, Col, Table, Avatar, Badge, Tooltip, Spin, Progress,
  Input, Select, Card,
} from 'antd';
import {
  Target, TrendingUp, ShieldAlert, Users, RefreshCw,
  Search, CheckCircle, AlertCircle, Zap, Calendar,
} from 'lucide-react';
import api from '../../../shared/services/apiClient';

// ── Types ──────────────────────────────────────────────────────────
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  loanAmount: number;
  loanType: string;
  status: string;
  assignedTo: string;
  createdAt: string;
}

interface Connector {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  region: string;
  createdAt: string;
}

// ── Helpers ─────────────────────────────────────────────────────────
const SLA_NEW_HOURS      = 48;  // flag lead if stuck in NEW > 48h
const SLA_REVIEW_HOURS   = 120; // flag lead if stuck IN_REVIEW > 5 days

const hoursSince = (iso: string) =>
  (Date.now() - new Date(iso).getTime()) / 3_600_000;

const fmtAmount = (n: number) =>
  n ? `₹${n.toLocaleString('en-IN')}` : '—';

const fmtAge = (iso: string) => {
  const h = hoursSince(iso);
  if (h < 1)  return `${Math.round(h * 60)}m`;
  if (h < 24) return `${Math.floor(h)}h`;
  return `${Math.floor(h / 24)}d`;
};

const isThisMonth = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
};

const STATUS_CFG: Record<string, { label: string; color: string; bg: string }> = {
  NEW:          { label: 'New Application', color: '#7c3aed', bg: '#f5f3ff' },
  IN_REVIEW:    { label: 'Being Checked',   color: '#1d4ed8', bg: '#eff6ff' },
  DOCS_PENDING: { label: 'Papers Pending',  color: '#c2410c', bg: '#fff7ed' },
  QUERY_RAISED: { label: 'Info Needed',     color: '#b91c1c', bg: '#fef2f2' },
  RESOLVED:     { label: 'Done',            color: '#059669', bg: '#ecfdf5' },
};

const ROLE_COLORS: Record<string, string> = {
  RM:              '#3b82f6',
  TEAM_LEADER:     '#8b5cf6',
  OPERATIONS:      '#f59e0b',
  PARTNER_MANAGER: '#ec4899',
  CONNECTOR:       '#10b981',
};

// ─────────────────────────────────────────────────────────────────────
const TeamLeaderDashboard: React.FC = () => {
  const [leads,      setLeads]      = useState<Lead[]>([]);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [leadsRes, connRes] = await Promise.all([
        api.get('/customers/leads'),
        api.get('/connectors'),
      ]);
      setLeads(leadsRes.data?.data ?? []);
      setConnectors(connRes.data?.data ?? []);
    } catch { /* silently fail */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Derived stats ────────────────────────────────────────────────
  const totalLeads    = leads.length;
  const newThisMonth  = leads.filter(l => isThisMonth(l.createdAt)).length;
  const resolvedTotal = leads.filter(l => l.status === 'RESOLVED').length;
  const conversionPct = totalLeads > 0 ? Math.round((resolvedTotal / totalLeads) * 100) : 0;

  const slaBreaches = leads.filter(l =>
    (l.status === 'NEW'       && hoursSince(l.createdAt) > SLA_NEW_HOURS) ||
    (l.status === 'IN_REVIEW' && hoursSince(l.createdAt) > SLA_REVIEW_HOURS)
  );

  const statusCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});

  const filteredLeads = leads.filter(l => {
    const matchStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const term = search.toLowerCase();
    const matchSearch = !term ||
      `${l.firstName} ${l.lastName} ${l.email} ${l.mobile}`.toLowerCase().includes(term);
    return matchStatus && matchSearch;
  });

  // ── Lead table columns ──────────────────────────────────────────
  const leadsColumns = [
    {
      title: 'APPLICANT',
      key: 'name',
      render: (_: any, r: Lead) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar size={32} style={{ background: '#eef2ff', color: '#4f46e5', fontWeight: 700, fontSize: 12 }}>
            {r.firstName[0]}
          </Avatar>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>
              {r.firstName} {r.lastName}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.mobile}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'LOAN',
      key: 'loan',
      render: (_: any, r: Lead) => (
        <div>
          <div style={{ fontWeight: 800, fontSize: 13, fontFamily: 'monospace', color: '#0f172a' }}>
            {fmtAmount(r.loanAmount)}
          </div>
          <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'capitalize' }}>{r.loanType}</div>
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => {
        const cfg = STATUS_CFG[s] || STATUS_CFG.NEW;
        return (
          <span style={{
            background: cfg.bg, color: cfg.color, borderRadius: 999,
            fontWeight: 700, fontSize: 10, padding: '3px 10px',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            {cfg.label}
          </span>
        );
      },
    },
    {
      title: 'ASSIGNED TO',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (e: string) => (
        <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>{e || 'Unassigned'}</span>
      ),
    },
    {
      title: 'AGE',
      dataIndex: 'createdAt',
      key: 'age',
      render: (ts: string) => {
        const h = hoursSince(ts);
        const isOld = h > 72;
        return (
          <span style={{ fontWeight: 700, fontSize: 12, color: isOld ? '#dc2626' : '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
            {isOld && <AlertCircle size={12} />}
            {fmtAge(ts)}
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontWeight: 900, fontSize: 24, color: '#0f172a', letterSpacing: '-0.03em' }}>
            Team Leader Hub
          </h1>
          <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>
            Live pipeline · {totalLeads} leads · {connectors.length} team members
          </span>
        </div>
        <Tooltip title="Refresh">
          <button
            onClick={fetchAll}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569' }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </Tooltip>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* ── KPI Cards ── */}
          <Row gutter={[16, 16]}>
            {[
              { label: 'Total Leads',      value: totalLeads,    icon: Target,     color: '#4f46e5', bg: '#eef2ff' },
              { label: 'Added This Month', value: newThisMonth,  icon: Calendar,   color: '#0891b2', bg: '#ecfeff' },
              { label: 'Conversion Rate',  value: `${conversionPct}%`, icon: TrendingUp, color: '#059669', bg: '#ecfdf5' },
              { label: 'SLA Breaches',     value: slaBreaches.length, icon: ShieldAlert, color: slaBreaches.length > 0 ? '#dc2626' : '#059669', bg: slaBreaches.length > 0 ? '#fef2f2' : '#ecfdf5' },
            ].map((k, i) => (
              <Col key={i} xs={24} sm={12} xl={6}>
                <Card variant="borderless" style={{ borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                        {k.label}
                      </div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: k.color, lineHeight: 1 }}>
                        {k.value}
                      </div>
                    </div>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <k.icon size={20} color={k.color} />
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ── Pipeline Status Breakdown ── */}
          <Card variant="borderless" style={{ borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#0f172a', marginBottom: 20 }}>
              Pipeline Breakdown
            </div>
            <Row gutter={[12, 12]}>
              {Object.entries(STATUS_CFG).map(([key, cfg]) => {
                const count = statusCounts[key] || 0;
                const pct   = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
                return (
                  <Col key={key} xs={12} sm={8} md={4} style={{ textAlign: 'center' }}>
                    <div style={{ background: cfg.bg, borderRadius: 14, padding: '16px 12px', border: `1.5px solid ${cfg.color}20` }}>
                      <div style={{ fontSize: 24, fontWeight: 900, color: cfg.color }}>{count}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>
                        {cfg.label}
                      </div>
                      <Progress
                        percent={pct}
                        showInfo={false}
                        strokeColor={cfg.color}
                        trailColor={`${cfg.color}20`}
                        size={['100%', 4]}
                        style={{ marginTop: 8, marginBottom: 0 }}
                      />
                      <div style={{ fontSize: 10, color: cfg.color, fontWeight: 600 }}>{pct}%</div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>

          <Row gutter={[20, 20]}>
            {/* ── Lead Pipeline Table ── */}
            <Col xs={24} lg={16}>
              <Card
                variant="borderless"
                style={{ borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', height: '100%' }}
                styles={{ body: { padding: 0 } }}
              >
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 800, fontSize: 15, color: '#0f172a' }}>Lead Pipeline</span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Input
                      placeholder="Search applicant..."
                      prefix={<Search size={13} style={{ color: '#cbd5e1' }} />}
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      style={{ width: 180, borderRadius: 10, height: 34, fontSize: 13 }}
                    />
                    <Select
                      value={statusFilter}
                      onChange={setStatusFilter}
                      style={{ width: 150 }}
                      size="small"
                      options={[
                        { value: 'ALL',          label: 'All Statuses' },
                        { value: 'NEW',          label: 'New Application' },
                        { value: 'IN_REVIEW',    label: 'Being Checked' },
                        { value: 'QUERY_RAISED', label: 'Info Needed' },
                        { value: 'RESOLVED',     label: 'Done' },
                      ]}
                    />
                  </div>
                </div>
                <Table
                  columns={leadsColumns}
                  dataSource={filteredLeads.map(l => ({ ...l, key: l.id }))}
                  pagination={{ pageSize: 8, size: 'small' }}
                  rowKey="id"
                  size="small"
                  locale={{ emptyText: 'No leads match the filter.' }}
                  style={{ fontSize: 13 }}
                />
              </Card>
            </Col>

            {/* ── Right column: SLA Alerts + Team ── */}
            <Col xs={24} lg={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>

                {/* SLA Breach Alerts */}
                <Card
                  variant="borderless"
                  style={{
                    borderRadius: 16,
                    border: slaBreaches.length > 0 ? '1.5px solid #fecdd3' : '1px solid #d1fae5',
                    background: slaBreaches.length > 0 ? '#fff5f5' : '#f0fdf4',
                    boxShadow: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <ShieldAlert size={18} color={slaBreaches.length > 0 ? '#dc2626' : '#059669'} />
                    <span style={{ fontWeight: 800, fontSize: 14, color: slaBreaches.length > 0 ? '#dc2626' : '#059669' }}>
                      SLA Breaches
                    </span>
                    <span style={{
                      marginLeft: 'auto',
                      background: slaBreaches.length > 0 ? '#dc2626' : '#059669',
                      color: '#fff', borderRadius: 999, fontSize: 10, fontWeight: 800, padding: '1px 8px',
                    }}>
                      {slaBreaches.length}
                    </span>
                  </div>

                  {slaBreaches.length === 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#059669', fontSize: 13, fontWeight: 600 }}>
                      <CheckCircle size={16} /> All leads within SLA limits
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {slaBreaches.slice(0, 5).map(l => (
                        <div key={l.id} style={{ background: '#fff', padding: '10px 14px', borderRadius: 10, border: '1px solid #fecdd3' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                            <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>
                              {l.firstName} {l.lastName}
                            </span>
                            <span style={{ fontWeight: 800, fontSize: 11, color: '#dc2626' }}>
                              {fmtAge(l.createdAt)} old
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                              {STATUS_CFG[l.status]?.label || l.status}
                            </span>
                            <span style={{ fontSize: 10, color: '#cbd5e1' }}>·</span>
                            <span style={{ fontSize: 10, color: '#94a3b8' }}>{fmtAmount(l.loanAmount)}</span>
                          </div>
                        </div>
                      ))}
                      {slaBreaches.length > 5 && (
                        <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', fontWeight: 600 }}>
                          +{slaBreaches.length - 5} more
                        </div>
                      )}
                    </div>
                  )}
                </Card>

                {/* Channel Partners / Team Members */}
                <Card
                  variant="borderless"
                  style={{ borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', flex: 1 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Users size={16} color="#4f46e5" />
                    <span style={{ fontWeight: 800, fontSize: 14, color: '#0f172a' }}>Team Members</span>
                    <span style={{ marginLeft: 'auto', background: '#eef2ff', color: '#4f46e5', borderRadius: 999, fontSize: 10, fontWeight: 800, padding: '1px 8px' }}>
                      {connectors.length}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320, overflowY: 'auto' }}>
                    {connectors.length === 0 ? (
                      <div style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                        No team members found
                      </div>
                    ) : connectors.map(c => {
                      const name = `${c.firstName} ${c.lastName}`.trim() || c.email;
                      const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
                      const color = ROLE_COLORS[c.role] || '#64748b';
                      return (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#f8fafc', borderRadius: 12, border: '1px solid #f1f5f9' }}>
                          <Avatar size={36} style={{ background: `${color}18`, color, fontWeight: 800, fontSize: 12, flexShrink: 0, border: `1.5px solid ${color}30` }}>
                            {initials}
                          </Avatar>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {name}
                            </div>
                            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}>{c.email}</div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                            <Badge status={c.status === 'ACTIVE' ? 'success' : 'default'} />
                            <span style={{ fontSize: 9, fontWeight: 800, background: `${color}15`, color, borderRadius: 4, padding: '1px 6px', textTransform: 'uppercase' }}>
                              {c.role}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </Col>
          </Row>

          {/* ── Monthly Target Tracker ── */}
          <Card
            variant="borderless"
            style={{ borderRadius: 16, border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Zap size={16} color="#f59e0b" />
                <span style={{ fontWeight: 800, fontSize: 15, color: '#0f172a' }}>Monthly Target Tracker</span>
                <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>
                  — {new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            <Row gutter={[16, 16]}>
              {(() => {
                const thisMonthLeads = leads.filter(l => isThisMonth(l.createdAt));
                const resolvedThisMonth = thisMonthLeads.filter(l => l.status === 'RESOLVED').length;
                const target = 10; // monthly target leads
                const pct = Math.min(Math.round((newThisMonth / target) * 100), 100);
                const resPct = Math.min(Math.round((resolvedThisMonth / Math.max(newThisMonth, 1)) * 100), 100);

                return [
                  {
                    label: 'New Leads This Month',
                    current: newThisMonth,
                    target,
                    pct,
                    color: '#4f46e5',
                    unit: 'leads',
                  },
                  {
                    label: 'Resolved This Month',
                    current: resolvedThisMonth,
                    target: Math.max(newThisMonth, 1),
                    pct: resPct,
                    color: '#059669',
                    unit: 'closed',
                  },
                  {
                    label: 'Active Pipeline',
                    current: leads.filter(l => !['RESOLVED'].includes(l.status)).length,
                    target: 20,
                    pct: Math.min(Math.round((leads.filter(l => !['RESOLVED'].includes(l.status)).length / 20) * 100), 100),
                    color: '#0891b2',
                    unit: 'in progress',
                  },
                  {
                    label: 'Conversion Rate',
                    current: conversionPct,
                    target: 70,
                    pct: Math.min(Math.round((conversionPct / 70) * 100), 100),
                    color: '#f59e0b',
                    unit: '% (target 70%)',
                  },
                ].map((item, i) => (
                  <Col key={i} xs={24} sm={12} xl={6}>
                    <div style={{ padding: '16px 18px', background: '#f8fafc', borderRadius: 14, border: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>{item.label}</span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: item.color }}>
                          {item.current} <span style={{ fontWeight: 500, color: '#94a3b8', fontSize: 10 }}>{item.unit}</span>
                        </span>
                      </div>
                      <Progress
                        percent={item.pct}
                        showInfo={false}
                        strokeColor={item.color}
                        trailColor={`${item.color}15`}
                        size={['100%', 8]}
                        style={{ marginBottom: 6 }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600 }}>
                          Target: {item.target} {item.unit}
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: item.pct >= 100 ? '#059669' : item.color }}>
                          {item.pct}%
                        </span>
                      </div>
                    </div>
                  </Col>
                ));
              })()}
            </Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default TeamLeaderDashboard;
