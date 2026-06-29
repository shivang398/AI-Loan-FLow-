import React from 'react';
import { Drawer, Tabs, Tag, Spin, Row, Col, Card, Statistic, Form, Input, InputNumber, Button } from 'antd';
import { FormInstance } from 'antd/es/form';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { X, Mail, Phone, CalendarDays, MapPin, Award, BarChart2, Percent, Save } from 'lucide-react';

function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) || 'CP';
}

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
          <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
            {entry.name === 'amount' ? `₹${Number(entry.value).toLocaleString()}` : `${entry.value} disbursals`}
          </span>
        </div>
      ))}
    </div>
  );
};

interface Props {
  open: boolean;
  partner: any | null;
  drawerTab: string;
  loading: boolean;
  slabs: any[];
  chartData: any[];
  payoutForm: FormInstance;
  onClose: () => void;
  onChangeTab: (tab: string) => void;
  onSavePartnerPayout: (values: any) => void;
}

const PartnerProfileDrawer: React.FC<Props> = ({
  open, partner, drawerTab, loading, slabs, chartData,
  payoutForm, onClose, onChangeTab, onSavePartnerPayout,
}) => {
  if (!partner) return null;

  const joinDate = partner.createdAt
    ? new Date(partner.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : '—';
  const totalDisbursals = chartData.reduce((s: number, m: any) => s + (m.disbursals || 0), 0);
  const totalBusinessAmount = chartData.reduce((s: number, m: any) => s + (m.amount || 0), 0);

  return (
    <Drawer
      title={null}
      placement="right"
      width={700}
      open={open}
      onClose={onClose}
      closeIcon={null}
      destroyOnHidden
      styles={{ body: { padding: 0, background: '#f8fafc' }, header: { display: 'none' } }}
    >
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '28px 32px 24px', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}
        >
          <X size={16} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 68, height: 68, borderRadius: 20, background: 'linear-gradient(135deg, #3b82f6, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: 'white', boxShadow: '0 8px 24px rgba(37,99,235,0.4)', flexShrink: 0 }}>
            {getInitials(partner.name)}
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>Channel Partner</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{partner.name}</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag color={partner.status === 'ACTIVE' ? 'success' : partner.status === 'PENDING_APPROVAL' ? 'processing' : 'default'} style={{ fontWeight: 700 }}>
                {partner.status}
              </Tag>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} /> {partner.region}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact strip */}
      <div style={{ background: '#1e293b', padding: '14px 32px', display: 'flex', gap: 28, flexWrap: 'wrap' }}>
        {[
          { icon: <Mail size={13} />, value: partner.email },
          { icon: <Phone size={13} />, value: partner.phone },
          { icon: <CalendarDays size={13} />, value: `Joined ${joinDate}` },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 500 }}>
            {item.icon}{item.value}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 32px' }}>
        <Tabs
          activeKey={drawerTab}
          onChange={onChangeTab}
          className="premium-tabs"
          items={[
            {
              key: 'profile',
              label: <span style={{ fontWeight: 700 }}>Business Performance</span>,
              children: loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 32 }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card className="pro-card" style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', border: 'none' }}>
                        <Statistic
                          title={<span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>6-Month Disbursals</span>}
                          value={totalDisbursals}
                          prefix={<Award size={16} style={{ color: '#3b82f6' }} />}
                          valueStyle={{ color: '#1d4ed8', fontWeight: 800 }}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card className="pro-card" style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', border: 'none' }}>
                        <Statistic
                          title={<span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Commission Earned</span>}
                          value={totalBusinessAmount}
                          prefix="₹"
                          valueStyle={{ color: '#059669', fontWeight: 800 }}
                          formatter={(v) => Number(v).toLocaleString()}
                        />
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card className="pro-card" style={{ background: 'linear-gradient(135deg,#fefce8,#fef9c3)', border: 'none' }}>
                        <Statistic
                          title={<span style={{ fontSize: 11, fontWeight: 700, color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Per Month</span>}
                          value={Math.round(totalDisbursals / 6)}
                          suffix="disbursals"
                          valueStyle={{ color: '#a16207', fontWeight: 800, fontSize: 20 }}
                        />
                      </Card>
                    </Col>
                  </Row>
                  <div className="pro-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                      <BarChart2 size={18} color="#6366f1" />
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>Monthly Business Volume</span>
                      <Tag color="blue" style={{ marginLeft: 'auto', fontWeight: 700 }}>Last 6 Months</Tag>
                    </div>
                    <ResponsiveContainer width="100%" height={220} minWidth={1}>
                      <BarChart data={chartData} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <RechartsTooltip content={<ChartTooltip />} />
                        <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600, color: '#64748b' }} />
                        <Bar yAxisId="left" dataKey="disbursals" name="Disbursals" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={32} />
                        <Bar yAxisId="right" dataKey="amount" name="amount" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={32} opacity={0.7} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ),
            },
            {
              key: 'payout',
              label: <span style={{ fontWeight: 700 }}>Payout Configuration</span>,
              children: loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 32 }}>
                  {slabs.length > 0 && (
                    <div className="pro-card" style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Active Payout Rates</div>
                      {slabs.map((s: any, i: number) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f0fdf4', borderRadius: 10, marginBottom: 6, border: '1px solid #bbf7d0' }}>
                          <div>
                            <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>{s.bankName}</span>
                            <span style={{ color: '#64748b', fontSize: 11, marginLeft: 8 }}>· {s.productCategory}</span>
                          </div>
                          <Tag color="success" style={{ fontWeight: 800, fontSize: 13 }}>{Number(s.payoutRate).toFixed(2)}%</Tag>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="pro-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                      <Percent size={18} color="#6366f1" />
                      <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>Add Payout Rate</span>
                    </div>
                    <Form form={payoutForm} layout="vertical" onFinish={onSavePartnerPayout}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="bankName" label="Banking Partner" rules={[{ required: true }]}>
                            <Input placeholder="e.g. HDFC Bank" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="productCategory" label="Product Category" rules={[{ required: true }]}>
                            <Input placeholder="e.g. Personal Loan" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item name="payoutRate" label="Payout Rate (%)" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} max={10} min={0} step={0.01} placeholder="e.g. 1.25" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item name="minDisbursementAmount" label="Min Disbursement (₹)">
                            <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Button type="primary" htmlType="submit" icon={<Save size={14} />} style={{ background: '#6366f1' }}>
                          Save Payout Rate
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </Drawer>
  );
};

export default PartnerProfileDrawer;
