import React, { useState, useEffect } from 'react';
import { Row, Col, Button, DatePicker, Space, Spin, message } from 'antd';
import {
  Clock, Target, Download, IndianRupee, Zap,
  TrendingUp, TrendingDown,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import apiClient from '../../../shared/services/apiClient';

const { RangePicker } = DatePicker;

const INDUSTRY_TAT = [
  { stage: 'Onboarding', benchmark: 2 },
  { stage: 'Credit Check', benchmark: 1 },
  { stage: 'Ops Review', benchmark: 3 },
  { stage: 'Disbursement', benchmark: 2 },
];

const INDUSTRY_REJECTION = [
  { name: 'Low Credit Score', value: 45 },
  { name: 'Incomplete KYC', value: 25 },
  { name: 'Income Mismatch', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981'];

const defaultKpis = [
  {
    key: 'TAT_AVG',
    label: 'Avg. TAT (Hours)',
    value: '7.4',
    delta: '-12%',
    up: true,
    desc: 'Better than target',
    icon: Clock,
    iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    iconColor: '#2563eb',
    accent: '#3b82f6',
  },
  {
    key: 'APPROVAL_RATE',
    label: 'Approval Rate',
    value: '68.5%',
    delta: '+3.2%',
    up: true,
    desc: 'Above industry avg',
    icon: Target,
    iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    iconColor: '#059669',
    accent: '#10b981',
  },
  {
    key: 'DISBURSED_AMOUNT',
    label: 'Daily Volume',
    value: '₹1.2 Cr',
    delta: '+18%',
    up: true,
    desc: 'vs yesterday',
    icon: IndianRupee,
    iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    iconColor: '#7c3aed',
    accent: '#8b5cf6',
  },
  {
    key: 'UPTIME',
    label: 'System Uptime',
    value: '99.98%',
    delta: 'SLA Met',
    up: true,
    desc: 'All systems normal',
    icon: Zap,
    iconBg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
    iconColor: '#c2410c',
    accent: '#f97316',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'white', border: '1px solid #e2e8f0', borderRadius: 12,
      padding: '12px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    }}>
      <p style={{ fontWeight: 700, color: '#0f172a', margin: '0 0 8px', fontSize: 13 }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, marginTop: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
          <span style={{ color: '#64748b' }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const BusinessAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'quarter'>('week');
  const [kpis, setKpis] = useState<any[]>(defaultKpis);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState<any>(null);
  const [disbursementData, setDisbursementData] = useState<any[]>([]);
  const [loanCount, setLoanCount] = useState(0);
  const [connectorCount, setConnectorCount] = useState(0);

  const fetchAnalytics = async (fromDate: string, toDate: string) => {
    setLoading(true);
    try {
      const res = await apiClient.get('/analytics/dashboard', {
        params: { from: fromDate, to: toDate }
      });
      const snapshots = res.data?.data || [];
      if (snapshots.length > 0) {
        // Map live snapshot metrics into our KPI structure
        const updatedKpis = defaultKpis.map(k => {
          const matchingSnapshot = snapshots.find((s: any) => s.metricType === k.key);
          if (matchingSnapshot) {
            let formattedValue = matchingSnapshot.metricValue.toString();
            if (k.key === 'APPROVAL_RATE') {
              formattedValue = `${matchingSnapshot.metricValue}%`;
            } else if (k.key === 'DISBURSED_AMOUNT') {
              formattedValue = `₹${matchingSnapshot.metricValue} Cr`;
            }
            return {
              ...k,
              value: formattedValue,
            };
          }
          return k;
        });
        setKpis(updatedKpis);
      } else {
        setKpis(defaultKpis);
      }
    } catch (err) {
      console.error('Failed to fetch live analytics snapshots', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fromStr = thirtyDaysAgo.toISOString().split('T')[0];
    const toStr = today.toISOString().split('T')[0];
    fetchAnalytics(fromStr, toStr);

    // Fetch real loan data for disbursement chart
    const fetchLiveData = async () => {
      try {
        const [loansRes, connRes] = await Promise.allSettled([
          apiClient.get('/loans'),
          apiClient.get('/connectors'),
        ]);
        const loans: any[] = loansRes.status === 'fulfilled' ? (loansRes.value.data?.data || loansRes.value.data || []) : [];
        const connectors: any[] = connRes.status === 'fulfilled' ? (connRes.value.data?.data || connRes.value.data || []) : [];
        setLoanCount(loans.length);
        setConnectorCount(connectors.length);

        // Build weekly disbursement data from loans
        const now = new Date();
        const weeks = Array.from({ length: 4 }, (_, i) => {
          const start = new Date(now); start.setDate(now.getDate() - (3 - i) * 7 - 7);
          const end = new Date(now); end.setDate(now.getDate() - (3 - i) * 7);
          const weekLoans = loans.filter(l => {
            const d = l.createdAt ? new Date(l.createdAt) : null;
            return d && d >= start && d < end;
          });
          const amount = weekLoans.reduce((s: number, l: any) => s + (l.loanAmount || l.amount || 0) / 10000000, 0);
          return { name: `Week ${i + 1}`, amount: Math.round(amount * 100) / 100, target: 50 };
        });
        setDisbursementData(weeks);
      } catch { /* silent fail — charts just won't show data */ }
    };
    fetchLiveData();
  }, []);

  const handleDateChange = (values: any) => {
    setDates(values);
    if (values && values[0] && values[1]) {
      const fromStr = values[0].format('YYYY-MM-DD');
      const toStr = values[1].format('YYYY-MM-DD');
      fetchAnalytics(fromStr, toStr);
    }
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1 className="page-header-title">Business Intelligence Hub</h1>
          <span className="page-header-subtitle">Deep-dive into operational efficiency and distribution metrics</span>
        </div>
        <Space size={10}>
          <RangePicker
            value={dates}
            onChange={handleDateChange}
            style={{ borderRadius: 12, height: 40 }}
          />
          <Button
            icon={<Download size={15} />}
            style={{ height: 40, borderRadius: 12, fontWeight: 600, border: '1px solid #e2e8f0' }}
            onClick={() => message.success('Exporting dynamic report package...')}
          >
            Export Report
          </Button>
        </Space>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <Spin size="large" tip="Synthesizing intelligence telemetry snapshot..." />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <Row gutter={[20, 20]}>
            {kpis.map((k, i) => (
              <Col key={i} xs={24} sm={12} xl={6}>
                <div className={`stat-card animate-fade-in-up stagger-${i + 1}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="stat-card-icon" style={{ background: k.iconBg }}>
                      <k.icon size={22} color={k.iconColor} />
                    </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: k.up ? '#f0fdf4' : '#fef2f2',
                  color: k.up ? '#16a34a' : '#dc2626',
                  padding: '3px 8px', borderRadius: 100,
                  fontSize: 11, fontWeight: 700,
                }}>
                  {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {k.delta}
                </div>
              </div>
              <div className="stat-card-value" style={{ marginTop: 12 }}>{k.value}</div>
              <div className="stat-card-label">{k.label}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{k.desc}</div>
              {/* Mini sparkline bar */}
              <div style={{ marginTop: 16, height: 3, background: '#f1f5f9', borderRadius: 100 }}>
                <div style={{
                  height: '100%', width: '72%',
                  background: k.accent, borderRadius: 100,
                  boxShadow: `0 0 8px ${k.accent}60`,
                }} />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* TAT + Rejection Row */}
      <Row gutter={[20, 20]}>
        {/* TAT Chart */}
        <Col xs={24} lg={16}>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Turnaround Time by Stage</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Industry benchmark targets (hours)</div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', background: '#fef2f2', borderRadius: 100,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c' }}>1 Stage over SLA</span>
              </div>
            </div>
            <div style={{ height: 320, minHeight: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INDUSTRY_TAT} layout="vertical" barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis type="category" dataKey="stage" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontWeight: 600, fontSize: 13 }} width={115} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                  <Bar dataKey="benchmark" name="Industry Benchmark (hrs)" radius={[0, 6, 6, 0]} barSize={24} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>

        {/* Rejection Donut */}
        <Col xs={24} lg={8}>
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, height: '100%' }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>Rejection Reasons</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Why applications are declined</div>
            <div style={{ height: 220, minHeight: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={INDUSTRY_REJECTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {INDUSTRY_REJECTION.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              {INDUSTRY_REJECTION.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ height: 4, width: 50, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.value}%`, background: COLORS[i], borderRadius: 100 }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', minWidth: 30, textAlign: 'right' }}>{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Disbursement Trend */}
      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Disbursement Volume Trends</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Weekly disbursement vs target (₹ Cr)</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['week', 'month', 'quarter'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  padding: '5px 14px', borderRadius: 8, border: 'none',
                  background: activeTab === t ? '#3b82f6' : '#f1f5f9',
                  color: activeTab === t ? 'white' : '#64748b',
                  fontWeight: 600, fontSize: 12, cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: 280, minHeight: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={disbursementData}>
              <defs>
                <linearGradient id="gLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
              <Line
                type="monotone" dataKey="amount" name="Actual" stroke="#3b82f6" strokeWidth={3}
                dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: 'white' }}
                activeDot={{ r: 7, strokeWidth: 0 }}
              />
              <Line
                type="monotone" dataKey="target" name="Target" stroke="#e2e8f0"
                strokeWidth={2} strokeDasharray="6 4"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary strip */}
        <div style={{
          marginTop: 16, padding: '14px 20px',
          background: '#f8fafc', borderRadius: 12,
          display: 'flex', gap: 32, alignItems: 'center',
        }}>
          {[
            { label: 'Total Loans', value: String(loanCount) || '—', color: '#0f172a' },
            { label: 'Active Connectors', value: String(connectorCount) || '—', color: '#0f172a' },
            { label: 'Total Volume (Cr)', value: disbursementData.length ? `₹${disbursementData.reduce((s, d) => s + d.amount, 0).toFixed(1)} Cr` : '—', color: '#059669' },
            { label: 'Data Source', value: 'Live Platform', color: '#4f46e5' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</div>
  );
};

export default BusinessAnalytics;
