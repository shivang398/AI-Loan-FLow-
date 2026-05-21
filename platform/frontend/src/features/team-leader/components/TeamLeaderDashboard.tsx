import React from 'react';
import { Row, Col, Progress, Avatar, Space, Tag } from 'antd';
import {
  Target,
  TrendingUp,
  Clock,
  MessageSquare,
  ArrowUpRight,
  ShieldAlert,
  Zap
} from 'lucide-react';

const teamData = [
  { name: 'Amit S.', leads: 45, conversion: 68 },
  { name: 'Priya V.', leads: 52, conversion: 75 },
  { name: 'Rahul D.', leads: 38, conversion: 55 },
  { name: 'Sneha R.', leads: 65, conversion: 82 },
  { name: 'Vikram S.', leads: 48, conversion: 70 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const TeamLeaderDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="page-header-title">Team Leader Hub</h1>
            <span className="page-header-subtitle">Managing 12 Connectors · Regional Sector: North-West</span>
          </div>
          <Space>
             <Button icon={<MessageSquare size={16} />} style={{ borderRadius: 10 }}>Broadcast Message</Button>
             <Button type="primary" style={{ borderRadius: 10 }}>Team Performance Report</Button>
          </Space>
        </div>
      </div>

      {/* KPI Cards */}
      <Row gutter={[20, 20]}>
        {[
          { label: 'Team Active Leads', value: '254', trend: '+14%', icon: Target, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Conversion Rate', value: '72.4%', trend: '+5.2%', icon: TrendingUp, color: '#10b981', bg: '#f0fdf4' },
          { label: 'Avg. Response Time', value: '18m', trend: '-2m', icon: Clock, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Top Performer', value: 'Sneha R.', trend: '82%', icon: Zap, color: '#8b5cf6', bg: '#faf5ff' },
        ].map((k, i) => (
          <Col key={i} xs={24} sm={12} xl={6}>
            <div className="stat-card" style={{ '--card-accent': k.color } as any}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <k.icon size={20} color={k.color} />
                </div>
                <Tag color="blue" style={{ border: 'none', borderRadius: 100, fontWeight: 700 }}>{k.trend}</Tag>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{k.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]}>
        {/* Team Leaderboard */}
        <Col xs={24} lg={16}>
          <div className="pro-card" style={{ height: '100%' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--surface-2)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>Connector Performance</span>
              <span style={{ color: 'var(--brand-500)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>View All</span>
            </div>
            <div style={{ padding: '0 24px' }}>
              {teamData.map((m, i) => (
                <div key={i} style={{ 
                  display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0',
                  borderBottom: i === teamData.length - 1 ? 'none' : '1px solid var(--surface-1)'
                }}>
                  <Avatar style={{ background: COLORS[i], fontWeight: 700 }}>{m.name[0]}</Avatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.leads} Leads in pipeline</div>
                  </div>
                  <div style={{ width: 140 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>Conv. Rate</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: COLORS[i] }}>{m.conversion}%</span>
                    </div>
                    <Progress percent={m.conversion} showInfo={false} strokeColor={COLORS[i]} strokeWidth={6} />
                  </div>
                  <Button type="text" icon={<ArrowUpRight size={16} />} />
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Alerts & Critical Actions */}
        <Col xs={24} lg={8}>
          <div className="pro-card" style={{ height: '100%', background: '#fff1f2', border: '1px solid #fecdd3' }}>
             <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e11d48', marginBottom: 16 }}>
                   <ShieldAlert size={20} />
                   <span style={{ fontWeight: 800, fontSize: 16 }}>Critical Alerts</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                   {[
                     { text: '3 Leads SLA Breached', time: 'North Sector', severity: 'High' },
                     { text: 'KYC Document Missing', time: 'Rahul Das', severity: 'Medium' },
                     { text: 'High Drop-off Rate', time: 'Amit S.', severity: 'High' },
                   ].map((a, i) => (
                     <div key={i} style={{ background: 'white', padding: 12, borderRadius: 12, boxShadow: '0 2px 4px rgba(225,29,72,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                           <span style={{ fontWeight: 700, fontSize: 13, color: '#334155' }}>{a.text}</span>
                           <Tag color={a.severity === 'High' ? 'red' : 'orange'} style={{ fontSize: 10, borderRadius: 100, border: 'none' }}>{a.severity}</Tag>
                        </div>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>{a.time}</span>
                     </div>
                   ))}
                </div>
                <Button block type="primary" danger style={{ marginTop: 24, height: 44, borderRadius: 10, fontWeight: 700 }}>
                   Resolve All SLA Breaches
                </Button>
             </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Button = ({ children, type, danger, style, icon, block }: any) => (
  <button style={{
    background: type === 'primary' ? (danger ? '#e11d48' : '#3b82f6') : 'white',
    color: type === 'primary' ? 'white' : '#475569',
    border: type === 'primary' ? 'none' : '1px solid #e2e8f0',
    borderRadius: 8,
    padding: '8px 16px',
    fontWeight: 600,
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: 'pointer',
    width: block ? '100%' : 'auto',
    boxShadow: type === 'primary' ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
    ...style
  }}>
    {icon} {children}
  </button>
);

export default TeamLeaderDashboard;
