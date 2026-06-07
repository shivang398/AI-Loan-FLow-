import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Table, Tag, Space, Button, Select, Spin, Empty } from 'antd';
import {
  IndianRupee, Calendar, Download, ArrowUpRight, Clock, RefreshCw,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts';
import apiClient from '../../../shared/services/apiClient';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;

interface Transaction {
  id: string;
  status: string;
  totalAmount: number;
  amountPaid: number;
  paymentDate?: string;
  loanId?: string;
  createdAt?: string;
}

const STATUS_STYLE: Record<string, { color: string; label: string }> = {
  FULLY_PAID:     { color: 'success',    label: 'Paid' },
  PARTIALLY_PAID: { color: 'processing', label: 'Partial' },
  PENDING:        { color: 'warning',    label: 'Pending' },
  DISPUTED:       { color: 'error',      label: 'Disputed' },
};

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(n);

const CommissionDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isConnector = user?.role === 'CONNECTOR';

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>(new Date().getFullYear().toString());

  const isUUID = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
  const connectorId = isConnector && user?.id && isUUID(user.id) ? user.id : null;

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const endpoint = connectorId
        ? `/commissions/transactions/connector/${connectorId}`
        : '/commissions/transactions';
      const res = await apiClient.get(endpoint);
      const list: Transaction[] = (res.data?.data || res.data || []).map((t: any) => ({
        id: t.id,
        status: t.status,
        totalAmount: Number(t.totalAmount || t.commissionAmount || 0),
        amountPaid: Number(t.amountPaid || 0),
        paymentDate: t.paymentDate,
        loanId: t.loanId,
        createdAt: t.createdAt,
      }));
      setTransactions(list);
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, [connectorId]);

  const totalEarned = transactions.reduce((s, t) => s + t.amountPaid, 0);
  const totalPending = transactions.filter(t => t.status === 'PENDING').reduce((s, t) => s + t.totalAmount, 0);
  const totalCommission = transactions.reduce((s, t) => s + t.totalAmount, 0);
  const partiallyPaidBalance = transactions
    .filter(t => t.status === 'PARTIALLY_PAID')
    .reduce((s, t) => s + (t.totalAmount - t.amountPaid), 0);

  const chartData = React.useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = parseInt(yearFilter);
    const byMonth: number[] = Array(12).fill(0);
    transactions.forEach(t => {
      const d = t.createdAt ? new Date(t.createdAt) : null;
      if (d && d.getFullYear() === year) {
        byMonth[d.getMonth()] += t.amountPaid;
      }
    });
    return months.map((month, i) => ({ month, amount: byMonth[i] }));
  }, [transactions, yearFilter]);

  const columns: ColumnsType<Transaction> = [
    {
      title: 'Loan ID',
      dataIndex: 'loanId',
      key: 'loanId',
      render: (v: string) => <Text code style={{ fontSize: 11 }}>{v ? v.slice(0, 8).toUpperCase() : '—'}</Text>,
    },
    {
      title: 'Commission',
      dataIndex: 'totalAmount',
      key: 'total',
      render: (v: number) => <Text strong>{fmt(v)}</Text>,
    },
    {
      title: 'Paid',
      dataIndex: 'amountPaid',
      key: 'paid',
      render: (v: number) => <Text style={{ color: '#059669', fontWeight: 700 }}>{fmt(v)}</Text>,
    },
    {
      title: 'Pending',
      key: 'pending',
      render: (_: any, r: Transaction) => {
        const p = r.totalAmount - r.amountPaid;
        return <Text style={{ color: p > 0 ? '#dc2626' : '#94a3b8', fontWeight: 600 }}>{fmt(Math.max(0, p))}</Text>;
      },
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'date',
      render: (v: string) => v ? new Date(v).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const s = STATUS_STYLE[status] || { color: 'default', label: status };
        return <Tag color={s.color} style={{ borderRadius: 20, fontWeight: 700, border: 'none', padding: '0 10px' }}>{s.label}</Tag>;
      },
    },
    {
      title: '',
      key: 'action',
      render: () => <Button type="link" icon={<Download size={14} />} size="small">Invoice</Button>,
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            My Earnings
          </div>
          <Title level={2} style={{ margin: 0 }}>Commissions & Payouts</Title>
          <Text style={{ color: 'var(--text-muted)' }}>Track your earnings and commission history.</Text>
        </div>
        <Space>
          <Select value={yearFilter} onChange={setYearFilter} style={{ width: 110 }}>
            {[new Date().getFullYear(), new Date().getFullYear() - 1].map(y => (
              <Select.Option key={y} value={String(y)}>FY {y}</Select.Option>
            ))}
          </Select>
          <Button icon={<RefreshCw size={14} />} onClick={fetchTransactions} loading={loading}>Refresh</Button>
          <Button type="primary" icon={<Download size={14} />} style={{ background: '#4f46e5', border: 'none' }}>
            Export
          </Button>
        </Space>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Spin size="large" /></div>
      ) : (
        <>
          <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
            {[
              { label: 'Total Commission Paid', value: fmt(totalEarned), Icon: IndianRupee, color: '#4f46e5', bg: '#ede9fe', sub: 'All time' },
              { label: 'Available for Payout', value: fmt(partiallyPaidBalance + totalPending), Icon: ArrowUpRight, color: '#10b981', bg: '#ecfdf5', sub: 'Ready to withdraw' },
              { label: 'Pending Release', value: fmt(totalPending), Icon: Clock, color: '#f59e0b', bg: '#fffbeb', sub: 'Under review' },
              { label: 'Total Commission', value: fmt(totalCommission), Icon: Calendar, color: '#3b82f6', bg: '#eff6ff', sub: 'All transactions' },
            ].map(stat => (
              <Col xs={12} md={6} key={stat.label}>
                <div style={{ background: 'white', borderRadius: 16, padding: '20px', border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <stat.Icon size={16} color={stat.color} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{stat.sub}</div>
                </div>
              </Col>
            ))}
          </Row>

          <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid var(--surface-3)', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Title level={5} style={{ margin: 0 }}>Monthly Earnings — {yearFilter}</Title>
            </div>
            {chartData.every(d => d.amount === 0) ? (
              <Empty description="No earnings data for this period" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ padding: '40px 0' }} />
            ) : (
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ left: 10, right: 10 }}>
                    <defs>
                      <linearGradient id="commGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                    <RechartsTooltip formatter={(v) => fmt(Number(v))} />
                    <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2.5} fill="url(#commGradient)" name="Earnings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--surface-3)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--surface-2)' }}>
              <Title level={5} style={{ margin: 0 }}>Commission History</Title>
            </div>
            {transactions.length === 0 ? (
              <Empty
                description="No commission records yet. Approved loans will generate commission entries."
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                style={{ padding: '60px 0' }}
              />
            ) : (
              <Table
                dataSource={transactions}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10, showSizeChanger: false }}
                size="middle"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommissionDashboard;
