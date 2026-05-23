import React, { useState, useEffect } from 'react';
import { Row, Col, Button, DatePicker, Space, Spin, Empty } from 'antd';
import {
  Target, Download, IndianRupee,
  TrendingUp, TrendingDown, Users, FileText,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import apiClient from '../../../shared/services/apiClient';

const { RangePicker } = DatePicker;
const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
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

const EmptyChart = ({ message }: { message: string }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span style={{ color: '#94a3b8', fontSize: 13 }}>{message}</span>} />
  </div>
);

const BusinessAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'quarter'>('week');
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState<any>(null);

  // Real data state
  const [loans, setLoans] = useState<any[]>([]);
  const [connectors, setConnectors] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>([]);
  const [disbursementData, setDisbursementData] = useState<any[]>([]);
  const [rejectionData, setRejectionData] = useState<any[]>([]);

  const buildDisbursementChart = (loanList: any[], tab: 'week' | 'month' | 'quarter') => {
    if (!loanList.length) return [];
    const now = new Date();
    if (tab === 'week') {
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now); d.setDate(now.getDate() - (6 - i));
        const label = d.toLocaleDateString('en-IN', { weekday: 'short' });
        const dayLoans = loanList.filter(l => {
          const ld = l.createdAt ? new Date(l.createdAt) : null;
          return ld && ld.toDateString() === d.toDateString();
        });
        return { name: label, amount: dayLoans.reduce((s: number, l: any) => s + (l.loanAmount || l.amount || 0) / 10000000, 0).toFixed(2) };
      });
    }
    if (tab === 'month') {
      return Array.from({ length: 4 }, (_, i) => {
        const start = new Date(now); start.setDate(now.getDate() - (3 - i) * 7 - 7);
        const end = new Date(now); end.setDate(now.getDate() - (3 - i) * 7);
        const wLoans = loanList.filter(l => {
          const ld = l.createdAt ? new Date(l.createdAt) : null;
          return ld && ld >= start && ld < end;
        });
        return { name: `Wk ${i + 1}`, amount: wLoans.reduce((s: number, l: any) => s + (l.loanAmount || l.amount || 0) / 10000000, 0).toFixed(2) };
      });
    }
    // quarter — monthly
    return Array.from({ length: 3 }, (_, i) => {
      const m = new Date(now); m.setMonth(now.getMonth() - (2 - i));
      const mLoans = loanList.filter(l => {
        const ld = l.createdAt ? new Date(l.createdAt) : null;
        return ld && ld.getMonth() === m.getMonth() && ld.getFullYear() === m.getFullYear();
      });
      return {
        name: m.toLocaleDateString('en-IN', { month: 'short' }),
        amount: mLoans.reduce((s: number, l: any) => s + (l.loanAmount || l.amount || 0) / 10000000, 0).toFixed(2),
      };
    });
  };

  const buildRejectionChart = (loanList: any[]) => {
    const rejected = loanList.filter(l => ['REJECTED', 'DECLINED', 'CLOSED'].includes(l.status?.toUpperCase?.()));
    if (!rejected.length) return [];
    const reasons: Record<string, number> = {};
    rejected.forEach(l => {
      const r = l.rejectionReason || l.remarks || 'Other';
      reasons[r] = (reasons[r] || 0) + 1;
    });
    return Object.entries(reasons)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [loansRes, connRes, commRes] = await Promise.allSettled([
        apiClient.get('/loans'),
        apiClient.get('/connectors?roles=CONNECTOR'),
        apiClient.get('/commissions/transactions'),
      ]);
      const loanList: any[] = loansRes.status === 'fulfilled' ? (loansRes.value.data?.data || loansRes.value.data || []) : [];
      const connList: any[] = connRes.status === 'fulfilled' ? (connRes.value.data?.data || connRes.value.data || []) : [];
      const commList: any[] = commRes.status === 'fulfilled' ? (commRes.value.data?.data || commRes.value.data || []) : [];

      setLoans(loanList);
      setConnectors(connList);
      setCommissions(commList);
      setDisbursementData(buildDisbursementChart(loanList, activeTab));
      setRejectionData(buildRejectionChart(loanList));
    } catch (err) {
      console.error('Analytics load error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    setDisbursementData(buildDisbursementChart(loans, activeTab));
  }, [activeTab, loans]);

  // Computed KPIs from real data
  const totalLoans = loans.length;
  const approvedLoans = loans.filter(l => ['APPROVED', 'DISBURSED', 'ACTIVE'].includes(l.status?.toUpperCase?.())).length;
  const approvalRate = totalLoans > 0 ? ((approvedLoans / totalLoans) * 100).toFixed(1) : null;
  const totalDisbursed = loans.reduce((s, l) => s + (l.loanAmount || l.amount || 0), 0);
  const totalCommission = commissions.reduce((s, c) => s + (c.connectorCommission || c.totalPayout || 0), 0);
  const activeConnectors = connectors.filter(c => c.status === 'ACTIVE').length;

  const kpis = [
    {
      label: 'Total Loans',
      value: totalLoans > 0 ? String(totalLoans) : '—',
      delta: totalLoans > 0 ? `${approvedLoans} approved` : 'No loans yet',
      up: true,
      desc: 'All-time loan applications',
      icon: FileText,
      iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      iconColor: '#2563eb',
      accent: '#3b82f6',
    },
    {
      label: 'Approval Rate',
      value: approvalRate != null ? `${approvalRate}%` : '—',
      delta: approvalRate != null ? (Number(approvalRate) >= 60 ? 'On target' : 'Below target') : 'No data',
      up: approvalRate == null || Number(approvalRate) >= 60,
      desc: 'Approved / Total applications',
      icon: Target,
      iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      iconColor: '#059669',
      accent: '#10b981',
    },
    {
      label: 'Total Disbursed',
      value: totalDisbursed > 0 ? `₹${(totalDisbursed / 10000000).toFixed(2)} Cr` : '—',
      delta: totalCommission > 0 ? `₹${(totalCommission / 100000).toFixed(1)}L commissions` : 'No disbursals',
      up: true,
      desc: 'Cumulative loan disbursement',
      icon: IndianRupee,
      iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      iconColor: '#7c3aed',
      accent: '#8b5cf6',
    },
    {
      label: 'Active Partners',
      value: activeConnectors > 0 ? String(activeConnectors) : '—',
      delta: `${connectors.length} total onboarded`,
      up: true,
      desc: 'Channel partners generating business',
      icon: Users,
      iconBg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
      iconColor: '#c2410c',
      accent: '#f97316',
    },
  ];

  const hasDisbursal = disbursementData.some(d => Number(d.amount) > 0);
  const hasRejections = rejectionData.length > 0;

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1 className="page-header-title">Business Intelligence Hub</h1>
          <span className="page-header-subtitle">Live metrics computed from platform data</span>
        </div>
        <Space size={10}>
          <RangePicker value={dates} onChange={(v) => setDates(v)} style={{ borderRadius: 12, height: 40 }} />
          <Button icon={<Download size={15} />} style={{ height: 40, borderRadius: 12, fontWeight: 600 }} onClick={loadData}>
            Refresh
          </Button>
        </Space>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* KPI Cards — all from real data */}
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
                      padding: '3px 8px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                    }}>
                      {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {k.delta}
                    </div>
                  </div>
                  <div className="stat-card-value" style={{ marginTop: 12 }}>{k.value}</div>
                  <div className="stat-card-label">{k.label}</div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{k.desc}</div>
                  <div style={{ marginTop: 16, height: 3, background: '#f1f5f9', borderRadius: 100 }}>
                    <div style={{ height: '100%', width: k.value !== '—' ? '72%' : '0%', background: k.accent, borderRadius: 100, transition: 'width 1s ease', boxShadow: `0 0 8px ${k.accent}60` }} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Disbursement Trend */}
          <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a' }}>Disbursement Volume</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>₹ Crores · computed from loan records</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['week', 'month', 'quarter'] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} style={{
                    padding: '5px 14px', borderRadius: 8, border: 'none',
                    background: activeTab === t ? '#3b82f6' : '#f1f5f9',
                    color: activeTab === t ? 'white' : '#64748b',
                    fontWeight: 600, fontSize: 12, cursor: 'pointer',
                  }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ height: 280, minHeight: 280 }}>
              {hasDisbursal ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={disbursementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                    <Line type="monotone" dataKey="amount" name="₹ Cr Disbursed" stroke="#3b82f6" strokeWidth={3}
                      dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 7, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart message="No disbursements recorded yet — data will appear as loans are approved." />
              )}
            </div>
            <div style={{ marginTop: 16, padding: '14px 20px', background: '#f8fafc', borderRadius: 12, display: 'flex', gap: 32, alignItems: 'center' }}>
              {[
                { label: 'Total Loans', value: totalLoans > 0 ? String(totalLoans) : '—', color: '#0f172a' },
                { label: 'Approved', value: approvedLoans > 0 ? String(approvedLoans) : '—', color: '#059669' },
                { label: 'Total Volume', value: totalDisbursed > 0 ? `₹${(totalDisbursed / 10000000).toFixed(2)} Cr` : '—', color: '#059669' },
                { label: 'Partners Active', value: String(activeConnectors), color: '#4f46e5' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rejection Breakdown + Partner Activity */}
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, height: '100%' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>Rejection Breakdown</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Computed from loan rejection reasons</div>
                <div style={{ height: 200, minHeight: 200 }}>
                  {hasRejections ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={rejectionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                          paddingAngle={4} dataKey="value" startAngle={90} endAngle={-270}>
                          {rejectionData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v, n) => [`${v} loans`, n]} />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyChart message="No rejections recorded yet." />
                  )}
                </div>
                {hasRejections && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                    {rejectionData.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>{item.name}</span>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, height: '100%' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>Partner Onboarding</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Connector status breakdown · live</div>
                <div style={{ height: 200, minHeight: 200 }}>
                  {connectors.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Active', count: connectors.filter(c => c.status === 'ACTIVE').length },
                        { name: 'Pending', count: connectors.filter(c => c.status === 'PENDING_APPROVAL').length },
                        { name: 'Inactive', count: connectors.filter(c => c.status === 'INACTIVE').length },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" name="Partners" radius={[8, 8, 0, 0]} maxBarSize={60}>
                          {[0, 1, 2].map(i => (
                            <Cell key={i} fill={['#10b981', '#f59e0b', '#94a3b8'][i]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyChart message="No partners onboarded yet." />
                  )}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  {[
                    { label: 'Active', count: connectors.filter(c => c.status === 'ACTIVE').length, color: '#10b981' },
                    { label: 'Pending', count: connectors.filter(c => c.status === 'PENDING_APPROVAL').length, color: '#f59e0b' },
                    { label: 'Total', count: connectors.length, color: '#6366f1' },
                  ].map(s => (
                    <div key={s.label} style={{ flex: 1, padding: '10px 14px', background: '#f8fafc', borderRadius: 10, textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.count}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default BusinessAnalytics;
