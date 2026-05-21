import React from 'react';
import { Row, Col } from 'antd';
import { TrendingUp, TrendingDown, FileText, Users, IndianRupee, Clock } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const chartData = [
  { name: 'Mon', applications: 400, disbursed: 240 },
  { name: 'Tue', applications: 300, disbursed: 139 },
  { name: 'Wed', applications: 620, disbursed: 380 },
  { name: 'Thu', applications: 478, disbursed: 390 },
  { name: 'Fri', applications: 589, disbursed: 480 },
  { name: 'Sat', applications: 239, disbursed: 180 },
  { name: 'Sun', applications: 349, disbursed: 230 },
];

const stats = [
  {
    label: 'Total Applications',
    value: '2,485',
    trend: '+12.5%',
    up: true,
    icon: FileText,
    iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    iconColor: '#2563eb',
    accent: 'linear-gradient(90deg, #3b82f6, #2563eb)',
  },
  {
    label: 'Active Connectors',
    value: '842',
    trend: '+4.2%',
    up: true,
    icon: Users,
    iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    iconColor: '#7c3aed',
    accent: 'linear-gradient(90deg, #8b5cf6, #6d28d9)',
  },
  {
    label: 'Disbursed Amount',
    value: '₹45.2Cr',
    trend: '+18.7%',
    up: true,
    icon: IndianRupee,
    iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    iconColor: '#059669',
    accent: 'linear-gradient(90deg, #10b981, #059669)',
  },
  {
    label: 'Pending Audits',
    value: '24',
    trend: '-2.1%',
    up: false,
    icon: Clock,
    iconBg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
    iconColor: '#c2410c',
    accent: 'linear-gradient(90deg, #f97316, #ea580c)',
  },
];

const regions = [
  { name: 'North Region', pct: 42, color: '#3b82f6' },
  { name: 'South Region', pct: 28, color: '#10b981' },
  { name: 'West Region', pct: 18, color: '#f59e0b' },
  { name: 'East Region', pct: 12, color: '#ef4444' },
];

const recentActivity = [
  { id: 'APP-3821', name: 'Rahul Sharma', amount: '₹8.5L', status: 'Approved', time: '2 min ago', color: '#16a34a', bg: '#f0fdf4' },
  { id: 'APP-3820', name: 'Priya Mehta', amount: '₹12L', status: 'Under Review', time: '15 min ago', color: '#b45309', bg: '#fffbeb' },
  { id: 'APP-3819', name: 'Anil Kumar', amount: '₹4.2L', status: 'Rejected', time: '1 hr ago', color: '#b91c1c', bg: '#fef2f2' },
  { id: 'APP-3818', name: 'Sunita Rao', amount: '₹6.8L', status: 'Disbursed', time: '3 hr ago', color: '#1d4ed8', bg: '#eff6ff' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white', border: '1px solid #e2e8f0', borderRadius: 12,
        padding: '12px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      }}>
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
  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-header-title">Dashboard Overview</h1>
            <span className="page-header-subtitle">Real-time credit distribution analytics · Updated just now</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
            background: '#f0fdf4', borderRadius: 100, border: '1px solid #bbf7d0',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#16a34a' }}>Live</span>
          </div>
        </div>
      </div>

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
                    {s.trend} vs last month
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
        {/* Area Chart */}
        <Col xs={24} lg={16}>
          <div className="pro-card" style={{
            background: 'white', border: '1px solid #e2e8f0',
            borderRadius: 20, padding: 24,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Application Trends</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Daily applications vs disbursements</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['1W', '1M', '3M', 'YTD'].map((t, i) => (
                  <button key={t} style={{
                    padding: '4px 12px', borderRadius: 8, border: 'none',
                    background: i === 0 ? '#3b82f6' : '#f1f5f9',
                    color: i === 0 ? 'white' : '#64748b',
                    fontWeight: 600, fontSize: 12, cursor: 'pointer',
                  }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ height: 300, minHeight: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
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
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                  <Area type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gApps)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                  <Area type="monotone" dataKey="disbursed" stroke="#10b981" strokeWidth={2.5} fill="url(#gDisb)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>

        {/* Regional Distribution */}
        <Col xs={24} lg={8}>
          <div style={{
            background: 'white', border: '1px solid #e2e8f0',
            borderRadius: 20, padding: 24, height: '100%',
          }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>Regional Split</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>Distribution by geography</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {regions.map((r) => (
                <div key={r.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 13, color: '#334155' }}>{r.name}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: r.color }}>{r.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${r.pct}%`,
                      background: r.color, borderRadius: 100,
                      transition: 'width 1s ease-out',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{
              marginTop: 24, padding: '14px 16px',
              background: '#f8fafc', borderRadius: 12,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Coverage</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>28 States</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active RMs</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>156</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Recent Activity */}
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Recent Applications</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Latest loan application activity</div>
          </div>
          <button style={{
            padding: '7px 16px', borderRadius: 10, border: '1px solid #e2e8f0',
            background: 'white', color: '#475569', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            View All →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Table Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            padding: '10px 16px', background: '#f8fafc', borderRadius: 10,
            marginBottom: 4,
          }}>
            {['Application ID', 'Applicant', 'Amount', 'Status', 'Time'].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>
            ))}
          </div>

          {recentActivity.map((a) => (
            <div key={a.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
              transition: 'background 150ms',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontWeight: 600, fontSize: 13, color: '#1d4ed8', fontFamily: 'monospace' }}>{a.id}</span>
              <span style={{ fontWeight: 500, fontSize: 13, color: '#334155' }}>{a.name}</span>
              <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{a.amount}</span>
              <div>
                <span style={{
                  display: 'inline-flex', padding: '3px 10px', borderRadius: 100,
                  background: a.bg, color: a.color,
                  fontSize: 11, fontWeight: 700,
                }}>
                  {a.status}
                </span>
              </div>
              <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
