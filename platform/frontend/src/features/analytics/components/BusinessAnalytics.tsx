import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, DatePicker, Space, Spin, Empty } from 'antd';
import {
  Target, IndianRupee,
  TrendingUp, TrendingDown, Users, FileText, RefreshCw,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import apiClient from '../../../shared/services/apiClient';
import dayjs, { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'];

interface AnalyticsSnapshot {
  id: string;
  snapshotDate: string;
  metricType: string;
  metricValue: number;
  dimension: string | null;
  dimensionValue: string | null;
}

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

const buildTrendFromSnapshots = (
  snapshots: AnalyticsSnapshot[],
  tab: 'week' | 'month' | 'quarter'
): { name: string; amount: string }[] => {
  const disbursalSnaps = snapshots.filter(s => s.metricType === 'DISBURSED_AMOUNT');
  const now = dayjs();

  if (tab === 'week') {
    return Array.from({ length: 7 }, (_, i) => {
      const d = now.subtract(6 - i, 'day');
      const match = disbursalSnaps.find(s => s.snapshotDate === d.format('YYYY-MM-DD'));
      return { name: d.format('ddd'), amount: (match?.metricValue ?? 0).toFixed(2) };
    });
  }
  if (tab === 'month') {
    return Array.from({ length: 4 }, (_, i) => {
      const weekStart = now.subtract((3 - i + 1) * 7, 'day');
      const weekEnd   = now.subtract((3 - i) * 7, 'day');
      const total = disbursalSnaps
        .filter(s => dayjs(s.snapshotDate).isAfter(weekStart) && dayjs(s.snapshotDate).isBefore(weekEnd))
        .reduce((sum, s) => sum + s.metricValue, 0);
      return { name: `Wk ${i + 1}`, amount: total.toFixed(2) };
    });
  }
  return Array.from({ length: 3 }, (_, i) => {
    const m = now.subtract(2 - i, 'month');
    const total = disbursalSnaps
      .filter(s => dayjs(s.snapshotDate).format('YYYY-MM') === m.format('YYYY-MM'))
      .reduce((sum, s) => sum + s.metricValue, 0);
    return { name: m.format('MMM'), amount: total.toFixed(2) };
  });
};

const BusinessAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'quarter'>('week');
  const [loading, setLoading]     = useState(true);
  const [syncing, setSyncing]     = useState(false);
  const [dates, setDates]         = useState<[Dayjs, Dayjs] | null>(null);

  const [connectors, setConnectors] = useState<any[]>([]);

  const [summary, setSummary]               = useState<Record<string, number>>({});
  const [disbursementData, setDisbursementData] = useState<any[]>([]);
  const [rejectionData, setRejectionData]       = useState<any[]>([]);

  // Sync today's computed metrics into analytics-service (upsert, safe to repeat)
  const syncToAnalytics = useCallback(async (
    loanList: any[], connList: any[], commList: any[]
  ) => {
    const today = dayjs().format('YYYY-MM-DD');
    const totalLoans    = loanList.length;
    const approved      = loanList.filter(l => ['APPROVED', 'DISBURSED', 'ACTIVE'].includes(l.status?.toUpperCase?.())).length;
    const rejected      = loanList.filter(l => ['REJECTED', 'DECLINED', 'CLOSED'].includes(l.status?.toUpperCase?.())).length;
    const totalDisbursed = loanList.reduce((s, l) => s + (l.loanAmount || l.amount || 0), 0);
    const totalCommission = commList.reduce((s, c) => s + (c.connectorCommission || c.totalPayout || 0), 0);
    const activePartners  = connList.filter(c => c.status === 'ACTIVE').length;

    const snapshots = [
      { snapshotDate: today, metricType: 'TOTAL_LOANS',      metricValue: totalLoans, dimension: null, dimensionValue: null },
      { snapshotDate: today, metricType: 'APPROVAL_RATE',    metricValue: totalLoans > 0 ? (approved / totalLoans) * 100 : 0, dimension: null, dimensionValue: null },
      { snapshotDate: today, metricType: 'DISBURSED_AMOUNT', metricValue: totalDisbursed / 10_000_000, dimension: null, dimensionValue: null },
      { snapshotDate: today, metricType: 'ACTIVE_PARTNERS',  metricValue: activePartners, dimension: null, dimensionValue: null },
      { snapshotDate: today, metricType: 'TOTAL_PARTNERS',   metricValue: connList.length, dimension: null, dimensionValue: null },
      { snapshotDate: today, metricType: 'TOTAL_COMMISSION', metricValue: totalCommission / 100_000, dimension: null, dimensionValue: null },
      { snapshotDate: today, metricType: 'REJECTION_RATE',   metricValue: totalLoans > 0 ? (rejected / totalLoans) * 100 : 0, dimension: null, dimensionValue: null },
    ];

    try {
      setSyncing(true);
      await apiClient.post('/analytics/snapshots', snapshots);
      const res = await apiClient.get('/analytics/summary');
      setSummary(res.data?.data ?? {});
    } catch {
      // analytics sync is best-effort
    } finally {
      setSyncing(false);
    }
  }, []);

  const fetchTrendSnapshots = useCallback(async (tab: 'week' | 'month' | 'quarter') => {
    const to   = dayjs();
    const from = tab === 'week' ? to.subtract(7, 'day')
               : tab === 'month' ? to.subtract(30, 'day')
               : to.subtract(90, 'day');
    try {
      const res = await apiClient.get('/analytics/dashboard', {
        params: { from: from.format('YYYY-MM-DD'), to: to.format('YYYY-MM-DD') },
      });
      return (res.data?.data ?? []) as AnalyticsSnapshot[];
    } catch {
      return [] as AnalyticsSnapshot[];
    }
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch analytics summary (KPI cards)
      const sumRes = await apiClient.get('/analytics/summary').catch(() => null);
      if (sumRes) setSummary(sumRes.data?.data ?? {});

      // 2. Fetch source data from other services
      const [loansRes, connRes, commRes] = await Promise.allSettled([
        apiClient.get('/loans'),
        apiClient.get('/connectors?roles=CONNECTOR'),
        apiClient.get('/commissions/transactions'),
      ]);

      const loanList: any[] = loansRes.status === 'fulfilled' ? (loansRes.value.data?.data || loansRes.value.data || []) : [];
      const connList: any[] = connRes.status  === 'fulfilled' ? (connRes.value.data?.data  || connRes.value.data  || []) : [];
      const commList: any[] = commRes.status  === 'fulfilled' ? (commRes.value.data?.data  || commRes.value.data  || []) : [];

      setConnectors(connList);

      // 3. Push today's snapshot into analytics-service
      await syncToAnalytics(loanList, connList, commList);

      // 4. Fetch historical snapshots for trend chart
      const snaps = await fetchTrendSnapshots(activeTab);
      setDisbursementData(buildTrendFromSnapshots(snaps, activeTab));

      // 5. Rejection breakdown from live loan data
      const rejected = loanList.filter(l => ['REJECTED', 'DECLINED', 'CLOSED'].includes(l.status?.toUpperCase?.()));
      if (rejected.length > 0) {
        const reasons: Record<string, number> = {};
        rejected.forEach(l => {
          const r = l.rejectionReason || l.remarks || 'Other';
          reasons[r] = (reasons[r] || 0) + 1;
        });
        setRejectionData(
          Object.entries(reasons).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }))
        );
      } else {
        setRejectionData([]);
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab, syncToAnalytics, fetchTrendSnapshots]);

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (loading) return;
    fetchTrendSnapshots(activeTab).then(snaps =>
      setDisbursementData(buildTrendFromSnapshots(snaps, activeTab))
    );
  }, [activeTab]);

  // KPIs: analytics-service summary is the single source of truth
  const totalLoans      = summary['TOTAL_LOANS']      ?? 0;
  const approvalRate    = summary['APPROVAL_RATE']     ?? null;
  const totalDisbursed  = summary['DISBURSED_AMOUNT']  ?? 0;
  const activePartners  = summary['ACTIVE_PARTNERS']   ?? 0;
  const totalPartners   = summary['TOTAL_PARTNERS']    ?? 0;
  const totalCommission = summary['TOTAL_COMMISSION']  ?? 0;
  const hasData         = Object.keys(summary).length > 0;

  const kpis = [
    {
      label: 'Total Loans',
      value: totalLoans > 0 ? String(Math.round(totalLoans)) : '—',
      delta: totalLoans > 0 ? `${Math.round(approvalRate ?? 0)}% approved` : 'No loans yet',
      up: true,
      desc: 'All-time loan applications',
      icon: FileText,
      iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      iconColor: '#2563eb',
      accent: '#3b82f6',
    },
    {
      label: 'Approval Rate',
      value: approvalRate != null ? `${approvalRate.toFixed(1)}%` : '—',
      delta: approvalRate != null ? (approvalRate >= 60 ? 'On target' : 'Below target') : 'No data',
      up: approvalRate == null || approvalRate >= 60,
      desc: 'Approved / Total applications',
      icon: Target,
      iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
      iconColor: '#059669',
      accent: '#10b981',
    },
    {
      label: 'Total Disbursed',
      value: totalDisbursed > 0 ? `₹${totalDisbursed.toFixed(2)} Cr` : '—',
      delta: totalCommission > 0 ? `₹${totalCommission.toFixed(1)}L commissions` : 'No disbursals yet',
      up: true,
      desc: 'Cumulative loan disbursement',
      icon: IndianRupee,
      iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
      iconColor: '#7c3aed',
      accent: '#8b5cf6',
    },
    {
      label: 'Active Partners',
      value: activePartners > 0 ? String(Math.round(activePartners)) : '—',
      delta: `${Math.round(totalPartners)} total onboarded`,
      up: true,
      desc: 'Channel partners generating business',
      icon: Users,
      iconBg: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
      iconColor: '#c2410c',
      accent: '#f97316',
    },
  ];

  const hasDisbursal  = disbursementData.some(d => Number(d.amount) > 0);
  const hasRejections = rejectionData.length > 0;

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1 className="page-header-title">Business Analytics</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <span className="page-header-subtitle">Powered by analytics-service</span>
            {syncing && (
              <span style={{ fontSize: 11, color: '#6366f1', fontWeight: 700, background: '#eef2ff', borderRadius: 100, padding: '2px 10px' }}>
                Syncing…
              </span>
            )}
            {hasData && !syncing && (
              <span style={{ fontSize: 11, color: '#059669', fontWeight: 700, background: '#ecfdf5', borderRadius: 100, padding: '2px 10px' }}>
                ✓ Live
              </span>
            )}
          </div>
        </div>
        <Space size={10}>
          <RangePicker
            value={dates}
            onChange={(v: any) => setDates(v)}
            style={{ borderRadius: 12, height: 40 }}
          />
          <Button
            icon={<RefreshCw size={15} />}
            onClick={loadData}
            loading={loading}
            style={{ height: 40, borderRadius: 12, fontWeight: 600 }}
          >
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
                    <div style={{ height: '100%', width: k.value !== '—' ? '72%' : '0%', background: k.accent, borderRadius: 100, transition: 'width 1s ease' }} />
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
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>₹ Crores · sourced from analytics-service</div>
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
                      dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: 'white' }}
                      activeDot={{ r: 7, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart message="No disbursements recorded yet. Data will appear as loans are approved and synced." />
              )}
            </div>

            {/* Summary strip */}
            <div style={{ marginTop: 16, padding: '14px 20px', background: '#f8fafc', borderRadius: 12, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Total Loans',    value: totalLoans > 0      ? String(Math.round(totalLoans)) : '—',    color: '#0f172a' },
                { label: 'Approval Rate',  value: approvalRate != null ? `${approvalRate.toFixed(1)}%` : '—',    color: '#059669' },
                { label: 'Total Volume',   value: totalDisbursed > 0  ? `₹${totalDisbursed.toFixed(2)} Cr` : '—', color: '#059669' },
                { label: 'Active Partners',value: activePartners > 0  ? String(Math.round(activePartners)) : '—', color: '#4f46e5' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: s.color }}>{s.value}</div>
                </div>
              ))}
              {hasData && (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: '#eef2ff', borderRadius: 10, padding: '6px 14px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#4f46e5' }}>Analytics Service Active</span>
                </div>
              )}
            </div>
          </div>

          {/* Rejection Breakdown + Partner Activity */}
          <Row gutter={[20, 20]}>
            <Col xs={24} lg={12}>
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 20, padding: 24, height: '100%' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0f172a', marginBottom: 4 }}>Rejection Breakdown</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Loan rejection reasons · live from loan-service</div>
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
                <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Connector status breakdown · live from connector-service</div>
                <div style={{ height: 200, minHeight: 200 }}>
                  {connectors.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Active',   count: connectors.filter(c => c.status === 'ACTIVE').length },
                        { name: 'Pending',  count: connectors.filter(c => c.status === 'PENDING_APPROVAL').length },
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
                    { label: 'Active',  count: Math.round(activePartners), color: '#10b981' },
                    { label: 'Pending', count: connectors.filter(c => c.status === 'PENDING_APPROVAL').length, color: '#f59e0b' },
                    { label: 'Total',   count: Math.round(totalPartners),  color: '#6366f1' },
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
