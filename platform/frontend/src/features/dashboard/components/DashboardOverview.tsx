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
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
        <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 8px', fontSize: 13 }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
            <span style={{ color: '#64748b' }}>{p.name}:</span>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.value}</span>
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
      const [loansRes, connRes] = await Promise.allSettled([
        apiClient.get('/loans'),
        apiClient.get('/connectors?roles=CONNECTOR'),
      ]);
      const loanList = loansRes.status === 'fulfilled' ? (loansRes.value.data?.data || loansRes.value.data || []) : [];
      const connList = connRes.status === 'fulfilled' ? (connRes.value.data?.data || connRes.value.data || []) : [];

      setLoans(Array.isArray(loanList) ? loanList : []);
      setConnectors(Array.isArray(connList) ? connList : []);
      setChartData(buildWeekChart(Array.isArray(loanList) ? loanList : []));
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
      iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      iconColor: '#2563eb',
      accent: 'linear-gradient(90deg, #3b82f6, #2563eb)',
    },
    {
      label: 'Active Partners',
      value: activeConnectors > 0 ? String(activeConnectors) : '—',
      trend: `${connectors.length} total onboarded`,
      up: true,
      icon: Users,
      iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      iconColor: '#7c3aed',
      accent: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
    },
    {
      label: 'Disbursed Amount',
      value: totalDisbursed > 0 ? `₹${(totalDisbursed / 10000000).toFixed(2)}Cr` : '—',
      trend: totalDisbursed > 0 ? `${approvedLoans} disbursals` : 'No disbursals yet',
      up: true,
      icon: IndianRupee,
      iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      iconColor: '#059669',
      accent: 'linear-gradient(90deg, #10b981, #059669)',
    },
    {
      label: 'Pending Review',
      value: pendingLoans > 0 ? String(pendingLoans) : '0',
      trend: totalLoans > 0 ? `of ${totalLoans} total` : 'No applications',
      up: pendingLoans === 0,
      icon: Clock,
      iconBg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
      iconColor: '#c2410c',
      accent: 'linear-gradient(90deg, #f97316, #ea580c)',
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
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#475569' }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: '#f0fdf4', borderRadius: 100, border: '1px solid #bbf7d0' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>Live</span>
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

          {/* Charts Row */}
          <Row gutter={[20, 20]}>
            {/* Area Chart — real weekly loan data */}
            <Col xs={24} lg={16}>
              <div className="pro-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Application Trends</div>
                    <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Daily applications vs disbursements · last 7 days</div>
                  </div>
                </div>
                <div style={{ height: 300, minHeight: 300 }}>
                  {chartData.some(d => d.applications > 0) ? (
                    <ResponsiveContainer width="100%" height={300} debounce={10}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="gApps" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gDisb" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                        <Area type="monotone" dataKey="applications" name="Applications" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gApps)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                        <Area type="monotone" dataKey="disbursed" name="Disbursed" stroke="#10b981" strokeWidth={2.5} fill="url(#gDisb)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
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
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, height: '100%' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>System Health</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>
                  {checkedServices > 0
                    ? <span><span style={{ color: '#16a34a', fontWeight: 700 }}>{upServices}</span> UP · <span style={{ color: downServices > 0 ? '#dc2626' : '#94a3b8', fontWeight: 700 }}>{downServices}</span> DOWN</span>
                    : 'Checking services…'}
                </div>

                {/* RabbitMQ special row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, background: '#f0fdf4', marginBottom: 8, border: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 5px #22c55e' }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>RabbitMQ</span>
                    <span style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>:5673</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#16a34a' }}>UP</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 280, overflowY: 'auto' }}>
                  {SERVICES.map(svc => {
                    const status = serviceHealth[svc.port];
                    const isUp = status === true;
                    const isDown = status === false;
                    return (
                      <div key={svc.port} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', borderRadius: 8, background: isDown ? '#fef2f2' : '#f8fafc' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {isUp ? <CheckCircle2 size={13} color="#16a34a" /> : isDown ? <XCircle size={13} color="#dc2626" /> : <AlertCircle size={13} color="#f59e0b" />}
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>{svc.name}</span>
                          <span style={{ fontSize: 10, color: '#94a3b8' }}>:{svc.port}</span>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: isUp ? '#16a34a' : isDown ? '#dc2626' : '#f59e0b' }}>
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
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Recent Applications</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Latest loan application activity</div>
              </div>
            </div>

            {recentLoans.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr', padding: '10px 16px', background: '#f8fafc', borderRadius: 10, marginBottom: 4 }}>
                  {['Application ID', 'Applicant', 'Amount', 'Status', 'Date'].map(h => (
                    <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
                  ))}
                </div>
                {recentLoans.map((loan, idx) => {
                  const { color, bg } = statusStyle(loan.status);
                  const name = loan.customerName || loan.applicantName || `Loan #${idx + 1}`;
                  const amt = loan.loanAmount || loan.amount || 0;
                  const date = loan.createdAt ? new Date(loan.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) : '—';
                  return (
                    <div key={loan.id || idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr', padding: '14px 16px', borderRadius: 10, cursor: 'pointer', transition: 'background 150ms' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontWeight: 600, fontSize: 12, color: '#1d4ed8', fontFamily: 'monospace' }}>{String(loan.id || '').slice(0, 8).toUpperCase()}</span>
                      <span style={{ fontWeight: 500, fontSize: 13, color: '#334155' }}>{name}</span>
                      <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>₹{(amt / 100000).toFixed(1)}L</span>
                      <div>
                        <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 100, background: bg, color, fontSize: 11, fontWeight: 700 }}>
                          {loan.status || 'PENDING'}
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{date}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span style={{ color: '#94a3b8', fontSize: 13 }}>No loan applications yet. They will appear here once channel partners submit cases.</span>} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
