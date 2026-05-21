import React from 'react';
import { Row, Col, Typography, Table, Tag, Space, Avatar, Progress } from 'antd';
import {
  CheckCircle,
  MessageSquare,
  AlertTriangle,
  MapPin,
  MoreVertical,
  Users,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

const { Text } = Typography;

const connectorStats = [
  { name: 'Arjun K.', performance: 85, files: 24, status: 'TOP_PERFORMER', initials: 'AK', color: '#3b82f6' },
  { name: 'Saira B.', performance: 72, files: 18, status: 'ACTIVE', initials: 'SB', color: '#10b981' },
  { name: 'John D.', performance: 45, files: 12, status: 'AT_RISK', initials: 'JD', color: '#f59e0b' },
  { name: 'Meera S.', performance: 92, files: 31, status: 'TOP_PERFORMER', initials: 'MS', color: '#8b5cf6' },
  { name: 'Rajesh G.', performance: 68, files: 15, status: 'ACTIVE', initials: 'RG', color: '#0ea5e9' },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9'];

const RegionalDashboard: React.FC = () => {
  const columns = [
    {
      title: 'Connector Profile',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space size={12}>
          <Avatar 
            style={{ 
              backgroundColor: record.color + '15', 
              color: record.color, 
              fontWeight: 700,
              border: `1px solid ${record.color}30`
            }}
          >
            {record.initials}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Text strong style={{ fontSize: 13, color: 'var(--text-primary)' }}>{text}</Text>
            <Text style={{ fontSize: 11, color: 'var(--text-muted)' }}>Lead Source: Direct Hub</Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Active Files',
      dataIndex: 'files',
      key: 'files',
      render: (val: number) => (
        <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{val}</span>
      )
    },
    {
      title: 'Success Rate',
      dataIndex: 'performance',
      key: 'performance',
      render: (val: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 140 }}>
          <Progress 
            percent={val} 
            size="small" 
            showInfo={false}
            strokeColor={val > 70 ? '#10b981' : val > 50 ? '#f59e0b' : '#ef4444'} 
            strokeWidth={6}
          />
          <span style={{ fontSize: 12, fontWeight: 800, color: val > 70 ? '#10b981' : 'var(--text-primary)', width: 40 }}>{val}%</span>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config: any = {
          'TOP_PERFORMER': { bg: '#f0fdf4', color: '#16a34a' },
          'ACTIVE': { bg: '#eff6ff', color: '#2563eb' },
          'AT_RISK': { bg: '#fef2f2', color: '#dc2626' }
        };
        const s = config[status] || config.ACTIVE;
        return (
          <Tag style={{ 
            backgroundColor: s.bg, color: s.color, 
            border: 'none', borderRadius: 100, 
            padding: '2px 10px', fontSize: 10, fontWeight: 700 
          }}>
            {status.replace('_', ' ')}
          </Tag>
        );
      }
    },
    {
      title: '',
      key: 'actions',
      render: () => <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreVertical size={16} /></button>
    }
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Premium Header */}
      <div style={{ 
        background: 'white', padding: '24px 32px', borderRadius: 24, 
        border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div style={{ 
            width: 64, height: 64, borderRadius: 20, 
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(59,130,246,0.3)'
          }}>
            <MapPin size={32} color="white" />
          </div>
          <div>
             <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#eff6ff', padding: '2px 8px', borderRadius: 6 }}>North Region Hub</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#16a34a' }}>Target Tracking Active</span>
             </div>
             <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Regional Performance Hub</h1>
             <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>Monitoring 42 Connectors · Regional Sector: North-West Cluster</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Regional Target</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>₹12.5Cr <span style={{ fontSize: 14, color: '#10b981', fontWeight: 700 }}>/ 15Cr</span></div>
           </div>
           <div style={{ width: 1, height: 48, background: 'var(--surface-3)' }} />
           <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg. Success</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#2563eb' }}>78.4%</div>
           </div>
        </div>
      </div>

      {/* KPI Row */}
      <Row gutter={[20, 20]}>
        {[
          { label: 'Files in Pipeline', value: '128', trend: '+12', up: true, icon: Users, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'SLA Breached', value: '03', trend: '-2', up: true, icon: AlertTriangle, color: '#ef4444', bg: '#fef2f2' },
          { label: 'Approved Today', value: '28', trend: '+5', up: true, icon: CheckCircle, color: '#10b981', bg: '#f0fdf4' },
          { label: 'Active Queries', value: '42', trend: '+8', up: false, icon: MessageSquare, color: '#f59e0b', bg: '#fffbeb' },
        ].map((k, i) => (
          <Col key={i} xs={24} sm={12} xl={6}>
            <div className="stat-card" style={{ '--card-accent': k.color } as any}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <k.icon size={22} color={k.color} />
                </div>
                <div style={{ 
                  padding: '4px 10px', borderRadius: 100, background: 'var(--surface-1)', 
                  fontSize: 11, fontWeight: 800, color: k.up ? '#16a34a' : '#dc2626' 
                }}>
                   {k.trend} this week
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 8 }}>{k.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Grid Row */}
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={15}>
          <div className="pro-card" style={{ height: '100%', padding: 0 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--surface-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
                <span style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>Connector Performance Hub</span>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>View Advanced Analytics →</button>
            </div>
            <Table 
              dataSource={connectorStats} 
              columns={columns} 
              pagination={false} 
              className="premium-table"
            />
          </div>
        </Col>
        <Col xs={24} lg={9}>
          <div className="pro-card" style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--text-primary)' }}>Regional Volume Split</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Distribution by active leads</div>
              </div>
              <button style={{ background: 'var(--surface-1)', border: 'none', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>This Month</button>
            </div>
            <div style={{ height: 320, minHeight: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={connectorStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 500}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <RechartsTooltip 
                    cursor={{fill: '#f8fafc'}} 
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)'}} 
                  />
                  <Bar dataKey="performance" radius={[6, 6, 0, 0]} barSize={28}>
                    {connectorStats.map((_entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ marginTop: 16, padding: '16px', background: 'var(--surface-1)', borderRadius: 16, border: '1px solid var(--surface-3)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                     <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Target size={18} color="#7c3aed" />
                     </div>
                     <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Region Target Progress</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>₹12.5Cr vs ₹15Cr Goal</div>
                     </div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 900, color: '#7c3aed' }}>83%</span>
               </div>
               <div style={{ height: 8, background: '#e2e8f0', borderRadius: 100, marginTop: 12, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '83%', background: 'linear-gradient(90deg, #7c3aed, #4f46e5)', borderRadius: 100 }} />
               </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegionalDashboard;
