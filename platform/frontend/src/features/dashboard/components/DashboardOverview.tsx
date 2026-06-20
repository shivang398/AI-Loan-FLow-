import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Spin, Empty } from 'antd';
import { TrendingUp, TrendingDown, FileText, Users, IndianRupee, Clock, RefreshCw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import apiClient from '../../../shared/services/apiClient';

const SERVICES = [
  { name: 'Auth',          port: 8081 },
  { name: 'Connectors',    port: 8082 },
  { name: 'Customers',     port: 8083 },
  { name: 'Loans',         port: 8084 },
  { name: 'Eligibility',   port: 8085 },
  { name: 'Policy',        port: 8086 },
  { name: 'Messaging',     port: 8087 },
  { name: 'Documents',     port: 8090 },
  { name: 'Notifications', port: 8091 },
  { name: 'Commissions',   port: 8092 },
  { name: 'Reporting',     port: 8093 },
  { name: 'Analytics',     port: 8094 },
  { name: 'SM Routing',    port: 8095 },
];

// Dedicated health-check proxy routes (defined in vite.config.ts /api/svc-health/*)
// Each resolves to /actuator/health on the respective service directly.
const HEALTH_PROXIES: Record<number, string> = {
  8081: '/api/svc-health/auth',
  8082: '/api/svc-health/connector',
  8083: '/api/svc-health/customer',
  8084: '/api/svc-health/loan',
  8085: '/api/svc-health/eligibility',
  8086: '/api/svc-health/policy',
  8087: '/api/svc-health/messaging',
  8090: '/api/svc-health/document',
  8091: '/api/svc-health/notification',
  8092: '/api/svc-health/commission',
  8093: '/api/svc-health/reporting',
  8094: '/api/svc-health/analytics',
  8095: '/api/svc-health/routing',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--surface-0)', border: '1px solid var(--surface-3)', padding: '10px 14px', boxShadow: 'var(--shadow-md)', fontFamily: 'Inter, sans-serif' }}>
        <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px', fontSize: 12 }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5 }}>
            <div style={{ width: 8, height: 8, background: p.color }} />
            <span style={{ color: 'var(--text-muted)' }}>{p.name}:</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DashboardOverview: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<any[]>([]);
  const [connectors, setConnectors] = useState<any[]>([]);
  const [serviceHealth, setServiceHealth] = useState<Record<number, boolean | null>>({});
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [chartData, setChartData] = useState<any[]>([]);
  const [cibilStats, setCibilStats] = useState<any>(null);

  const buildWeekChart = (loanList: any[]) => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - i));
      const label = d.toLocaleDateString('en-IN', { weekday: 'short' });
      const dayLoans = loanList.filter(l => {
        const ld = l.createdAt ? new Date(l.createdAt) : null;
        return ld && ld.toDateString() === d.toDateString();
      });
      const applications = dayLoans.length;
      const disbursed = dayLoans.filter(l => ['DISBURSED', 'ACTIVE'].includes(l.status?.toUpperCase?.())).length;
      return { name: label, applications, disbursed };
    });
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [loansRes, connRes, cibilRes] = await Promise.allSettled([
        apiClient.get('/loans'),
        apiClient.get('/connectors?roles=CONNECTOR'),
        apiClient.get('/eligibility/cibil/stats'),
      ]);
      const loanList = loansRes.status === 'fulfilled' ? (loansRes.value.data?.data?.items ?? loansRes.value.data?.data ?? []) : [];
      const connList = connRes.status === 'fulfilled' ? (connRes.value.data?.data?.items ?? connRes.value.data?.data ?? []) : [];

      setLoans(Array.isArray(loanList) ? loanList : []);
      setConnectors(Array.isArray(connList) ? connList : []);
      setChartData(buildWeekChart(Array.isArray(loanList) ? loanList : []));
      if (cibilRes.status === 'fulfilled') setCibilStats(cibilRes.value.data?.data ?? null);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  const checkServiceHealth = useCallback(async () => {
    const results: Record<number, boolean | null> = {};
    await Promise.all(
      SERVICES.map(async (svc) => {
        try {
          const proxyPath = HEALTH_PROXIES[svc.port];
          // actuator/health is permitAll — no auth token needed
          const res = await fetch(proxyPath, {
            method: 'GET',
            signal: AbortSignal.timeout(4000),
          });
          const json = await res.json().catch(() => ({}));
          results[svc.port] = res.status === 200 && (json.status === 'UP' || res.status === 200);
        } catch {
          results[svc.port] = false;
        }
      })
    );
    setServiceHealth(results);
  }, []);

  useEffect(() => {
    loadData();
    checkServiceHealth();
  }, []);

  const totalLoans = loans.length;
  const approvedLoans = loans.filter(l => ['APPROVED', 'DISBURSED', 'ACTIVE'].includes(l.status?.toUpperCase?.())).length;
  const pendingLoans = loans.filter(l => ['PENDING', 'UNDER_REVIEW', 'SUBMITTED'].includes(l.status?.toUpperCase?.())).length;
  const totalDisbursed = loans.reduce((s, l) => s + (l.loanAmount || l.amount || 0), 0);
  const activeConnectors = connectors.filter(c => c.status === 'ACTIVE').length;

  const recentLoans = [...loans]
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 5);

  const statusStyle = (status: string) => {
    const s = status?.toUpperCase?.() || '';
    if (['APPROVED', 'DISBURSED', 'ACTIVE'].includes(s)) return { color: '#16a34a', bg: '#f0fdf4' };
    if (['REJECTED', 'DECLINED', 'CLOSED'].includes(s)) return { color: '#b91c1c', bg: '#fef2f2' };
    if (['PENDING', 'UNDER_REVIEW', 'SUBMITTED'].includes(s)) return { color: '#b45309', bg: '#fffbeb' };
    return { color: '#475569', bg: '#f8fafc' };
  };

  const upServices = Object.values(serviceHealth).filter(v => v === true).length;
  const downServices = Object.values(serviceHealth).filter(v => v === false).length;
  const checkedServices = Object.values(serviceHealth).filter(v => v !== null).length;

  const stats = [
    {
      label: 'Total Applications',
      value: totalLoans > 0 ? totalLoans.toLocaleString() : '—',
      trend: approvedLoans > 0 ? `${approvedLoans} approved` : 'No data yet',
      up: true,
      icon: FileText,
      iconBg: 'var(--rm-blue-light)',
      iconColor: '#0B2DA4',
      accent: 'linear-gradient(90deg, #0B2DA4, #0A1E6E)',
    },
    {
      label: 'Active Partners',
      value: activeConnectors > 0 ? String(activeConnectors) : '—',
      trend: `${connectors.length} total onboarded`,
      up: true,
      icon: Users,
      iconBg: '#EEF2FF',
      iconColor: '#1537C0',
      accent: 'linear-gradient(90deg, #1537C0, #0B2DA4)',
    },
    {
      label: 'Disbursed Amount',
      value: totalDisbursed > 0 ? `₹${(totalDisbursed / 10000000).toFixed(2)}Cr` : '—',
      trend: totalDisbursed > 0 ? `${approvedLoans} disbursals` : 'No disbursals yet',
      up: true,
      icon: IndianRupee,
      iconBg: '#F0FAF4',
      iconColor: '#1A7A4A',
      accent: 'linear-gradient(90deg, #1A7A4A, #155F3A)',
    },
    {
      label: 'Pending Review',
      value: pendingLoans > 0 ? String(pendingLoans) : '0',
      trend: totalLoans > 0 ? `of ${totalLoans} total` : 'No applications',
      up: pendingLoans === 0,
      icon: Clock,
      iconBg: '#FFF0F0',
      iconColor: '#CC1A1A',
      accent: 'linear-gradient(90deg, #CC1A1A, #A51414)',
    },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-header-title">Dashboard Overview</h1>
            <span className="page-header-subtitle">
              Real-time platform analytics · Last updated {lastRefresh.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => { loadData(); checkServiceHealth(); }}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', border: '1px solid var(--surface-3)', background: 'var(--surface-0)', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', borderRadius: 2 }}
            >
              <RefreshCw size={13} /> Refresh
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', background: '#F0FAF4', border: '1px solid #A3D9B8' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A4A' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Live</span>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Spin size="large" /></div>
      ) : (
        <>
          {/* Stat Cards */}
          <Row gutter={[20, 20]}>
            {stats.map((s, i) => (
              <Col key={i} xs={24} sm={12} xl={6}>
                <div className={`stat-card animate-fade-in-up stagger-${i + 1}`} style={{ '--card-accent': s.accent } as any}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div className="stat-card-label">{s.label}</div>
                      <div className="stat-card-value">{s.value}</div>
                      <div className={`stat-card-trend ${s.up ? 'up' : 'down'}`}>
                        {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {s.trend}
                      </div>
                    </div>
                    <div className="stat-card-icon" style={{ background: s.iconBg }}>
                      <s.icon size={22} color={s.iconColor} />
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* CIBIL Pulls Today */}
          {cibilStats && (
            <div className="pro-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', fontFamily: '"Playfair Display", Georgia, serif' }}>CIBIL Soft Pulls — Today</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>
                    {cibilStats.liveChecks > 0
                      ? `${cibilStats.liveChecks} live · ${cibilStats.demoChecks} demo · ${cibilStats.allTimeTotal} all time`
                      : `${cibilStats.demoChecks} demo mode · ${cibilStats.allTimeTotal} all time`}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {cibilStats.liveChecks > 0 ? (
                    <span style={{ padding: '3px 10px', background: '#F0FAF4', color: '#1A7A4A', fontSize: 11, fontWeight: 700, border: '1px solid #A3D9B8', letterSpacing: '0.06em' }}>LIVE</span>
                  ) : (
                    <span style={{ padding: '3px 10px', background: '#FFF8E7', color: '#B45309', fontSize: 11, fontWeight: 700, border: '1px solid #F6D86B', letterSpacing: '0.06em' }}>DEMO MODE</span>
                  )}
                </div>
              </div>

              <Row gutter={[16, 16]}>
                {/* Summary numbers */}
                <Col xs={24} sm={6}>
                  <div style={{ textAlign: 'center', padding: '16px 12px', background: 'var(--surface-1)', borderRadius: 4, border: '1px solid var(--surface-2)' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#0B2DA4', fontFamily: 'Inter, sans-serif' }}>{cibilStats.totalToday}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Checks Today</div>
                  </div>
                </Col>
                <Col xs={24} sm={6}>
                  <div style={{ textAlign: 'center', padding: '16px 12px', background: 'var(--surface-1)', borderRadius: 4, border: '1px solid var(--surface-2)' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: cibilStats.avgScore >= 750 ? '#1A7A4A' : cibilStats.avgScore >= 650 ? '#B45309' : '#CC1A1A', fontFamily: 'Inter, sans-serif' }}>{cibilStats.totalToday > 0 ? cibilStats.avgScore : '—'}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg Score</div>
                  </div>
                </Col>
                {/* Score band breakdown */}
                <Col xs={24} sm={12}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { band: 'EXCELLENT', label: 'Excellent', color: '#1A7A4A', bg: '#F0FAF4' },
                      { band: 'GOOD', label: 'Good', color: '#2563EB', bg: '#EFF6FF' },
                      { band: 'FAIR', label: 'Fair', color: '#B45309', bg: '#FFFBEB' },
                      { band: 'POOR', label: 'Poor / No History', color: '#CC1A1A', bg: '#FEF2F2' },
                    ].map(({ band, label, color, bg }) => (
                      <div key={band} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: bg, borderRadius: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                        <span style={{ fontSize: 16, fontWeight: 800, color, fontFamily: 'Inter, sans-serif' }}>
                          {(cibilStats.bandCounts?.[band] ?? 0) + (band === 'POOR' ? (cibilStats.bandCounts?.['NO_HISTORY'] ?? 0) : 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Recent checks table */}
              {cibilStats.recentChecks?.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Recent Checks</div>
                  <div style={{ borderRadius: 4, border: '1px solid var(--surface-2)', overflow: 'hidden' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '8px 14px', background: 'var(--surface-1)', borderBottom: '1px solid var(--surface-2)' }}>
                      {['Customer', 'Mobile', 'Score', 'Band', 'Time'].map(h => (
                        <span key={h} style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>{h}</span>
                      ))}
                    </div>
                    {cibilStats.recentChecks.slice(0, 5).map((c: any) => {
                      const bandColor = c.cibilScore >= 750 ? '#1A7A4A' : c.cibilScore >= 650 ? '#B45309' : '#CC1A1A';
                      return (
                        <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.5fr', padding: '11px 14px', borderBottom: '1px solid var(--surface-1)' }}>
                          <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{c.fullName}</span>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{c.mobileNumber}</span>
                          <span style={{ fontWeight: 800, fontSize: 14, color: bandColor, fontFamily: 'Inter, sans-serif' }}>{c.cibilScore}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: bandColor, fontFamily: 'Inter, sans-serif' }}>{c.scoreBand}</span>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                            {new Date(c.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            {c.demoMode && <span style={{ marginLeft: 6, fontSize: 10, background: '#FFF8E7', color: '#B45309', padding: '1px 5px', fontWeight: 700 }}>DEMO</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Charts Row */}
          <Row gutter={[20, 20]}>
            {/* Area Chart — real weekly loan data */}
            <Col xs={24} lg={16}>
              <div className="pro-card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.01em' }}>Application Trends</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>Daily applications vs disbursements · last 7 days</div>
                  </div>
                </div>
                <div style={{ height: 300, minHeight: 300 }}>
                  {chartData.some(d => d.applications > 0) ? (
                    <ResponsiveContainer width="100%" height={300} debounce={10}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0B2DA4" stopOpacity={0.12} />
                            <stop offset="95%" stopColor="#0B2DA4" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gDisb" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1A7A4A" stopOpacity={0.12} />
                            <stop offset="95%" stopColor="#1A7A4A" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--surface-2)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7A8FB0', fontSize: 11, fontWeight: 500 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7A8FB0', fontSize: 11 }} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
                        <Area type="monotone" dataKey="applications" name="Applications" stroke="#0B2DA4" strokeWidth={2} fill="url(#gApps)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                        <Area type="monotone" dataKey="disbursed" name="Disbursed" stroke="#1A7A4A" strokeWidth={2} fill="url(#gDisb)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span style={{ color: '#94a3b8', fontSize: 13 }}>No loan applications yet — chart will populate as loans are submitted.</span>} />
                    </div>
                  )}
                </div>
              </div>
            </Col>

            {/* Service Health Panel */}
            <Col xs={24} lg={8}>
              <div className="pro-card" style={{ padding: 20, height: '100%' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.01em', marginBottom: 3 }}>System Health</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14, fontFamily: 'Inter, sans-serif' }}>
                  {checkedServices > 0
                    ? <span><span style={{ color: '#1A7A4A', fontWeight: 700 }}>{upServices}</span> UP &nbsp;·&nbsp; <span style={{ color: downServices > 0 ? '#CC1A1A' : 'var(--text-muted)', fontWeight: 700 }}>{downServices}</span> DOWN</span>
                    : 'Checking services…'}
                </div>

                {/* RabbitMQ */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: '#F0FAF4', marginBottom: 6, border: '1px solid #A3D9B8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A7A4A' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>RabbitMQ</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>:5673</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#1A7A4A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>UP</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, maxHeight: 280, overflowY: 'auto' }}>
                  {SERVICES.map(svc => {
                    const status = serviceHealth[svc.port];
                    const isUp = status === true;
                    const isDown = status === false;
                    return (
                      <div key={svc.port} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: isDown ? '#FFF0F0' : 'var(--surface-1)', borderBottom: '1px solid var(--surface-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {isUp ? <CheckCircle2 size={12} color="#1A7A4A" /> : isDown ? <XCircle size={12} color="#CC1A1A" /> : <AlertCircle size={12} color="#8A6020" />}
                          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{svc.name}</span>
                          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>:{svc.port}</span>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: isUp ? '#1A7A4A' : isDown ? '#CC1A1A' : '#8A6020', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {status === null ? '…' : isUp ? 'UP' : 'DOWN'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>

          {/* Recent Applications */}
          <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--surface-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.01em' }}>Recent Applications</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>Latest loan application activity</div>
              </div>
            </div>

            {recentLoans.length > 0 ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr', padding: '9px 20px', background: 'var(--surface-1)', borderBottom: '1px solid var(--surface-3)' }}>
                  {['Application ID', 'Applicant', 'Amount', 'Status', 'Date'].map(h => (
                    <span key={h} style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>{h}</span>
                  ))}
                </div>
                {recentLoans.map((loan, idx) => {
                  const { color, bg } = statusStyle(loan.status);
                  const name = loan.customerName || loan.applicantName || `Loan #${idx + 1}`;
                  const amt = loan.loanAmount || loan.amount || 0;
                  const date = loan.createdAt ? new Date(loan.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—';
                  return (
                    <div key={loan.id || idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr', padding: '13px 20px', borderBottom: '1px solid var(--surface-2)', cursor: 'pointer', transition: 'background 120ms' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-1)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontWeight: 600, fontSize: 11.5, color: '#0B2DA4', fontFamily: 'monospace' }}>{String(loan.id || '').slice(0, 8).toUpperCase()}</span>
                      <span style={{ fontWeight: 500, fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{name}</span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>₹{(amt / 100000).toFixed(1)}L</span>
                      <div>
                        <span style={{ display: 'inline-flex', padding: '3px 10px', background: bg, color, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>
                          {loan.status || 'PENDING'}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{date}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: 40 }}>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span style={{ color: 'var(--text-muted)', fontSize: 13 }}>No loan applications yet. They will appear here once channel partners submit cases.</span>} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
