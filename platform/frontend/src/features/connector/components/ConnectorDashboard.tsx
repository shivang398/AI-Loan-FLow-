import React from 'react';
import { Badge, Tag } from 'antd';
import {
  Plus,
  TrendingUp,
  MessageCircle,
  Bell,
  Wallet,
  LayoutDashboard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ConnectorDashboard: React.FC = () => {
  const navigate = useNavigate();

  const applications = [
    { id: '1', name: 'Arjun Mehta', amount: 1000000, bank: 'HDFC Bank', rate: 2.5, status: 'IN_REVIEW', date: '2h ago', initials: 'AM', color: '#3b82f6' },
    { id: '2', name: 'Saira Bano', amount: 550000, bank: 'IDFC First', rate: 3.0, status: 'DOC_PENDING', date: '5h ago', initials: 'SB', color: '#f59e0b' },
    { id: '3', name: 'Rahul Das', amount: 1200000, bank: 'ICICI Bank', rate: 1.75, status: 'APPROVED', date: 'Yesterday', initials: 'RD', color: '#10b981' },
    { id: '4', name: 'Meera Singh', amount: 820000, bank: 'Axis Bank', rate: 0.5, status: 'REJECTED', date: '2 days ago', initials: 'MS', color: '#ef4444' },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Partner Portal</div>
           <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>Welcome back, Connector</h1>
           <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>You have <span style={{ fontWeight: 700, color: '#3b82f6' }}>3 active files</span> requiring attention.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Badge count={2} size="small" offset={[-4, 4]}>
            <button style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid var(--surface-3)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <Bell size={20} />
            </button>
          </Badge>
          <button style={{ width: 44, height: 44, borderRadius: 12, border: '1px solid var(--surface-3)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <LayoutDashboard size={20} />
          </button>
        </div>
      </div>

      {/* Earnings Card */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1e293b, #0f172a)', 
        borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(15,23,42,0.2)'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -20, right: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', filter: 'blur(40px)' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Estimated Earnings (MTD)</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>₹42,500</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(34,197,94,0.15)', padding: '4px 10px', borderRadius: 100 }}>
                  <TrendingUp size={12} color="#4ade80" />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#4ade80' }}>+12.4%</span>
               </div>
               <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>vs last month</span>
            </div>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={24} color="#3b82f6" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
           <button 
             onClick={() => navigate('/connector/earnings')}
             style={{ height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 200ms' }}
           >
             View Earnings Report
           </button>
           <button style={{ height: 48, borderRadius: 14, background: '#3b82f6', border: 'none', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
             Withdraw Funds
           </button>
        </div>
      </div>

      {/* Action Area */}
      <button 
        onClick={() => navigate('/connector/onboard')}
        style={{ 
          height: 64, borderRadius: 20, background: 'white', border: '1px solid var(--surface-3)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          cursor: 'pointer', transition: 'all 200ms', boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ width: 32, height: 32, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Plus size={18} color="#2563eb" />
        </div>
        <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Start New Lead Onboarding</span>
      </button>

      {/* Recent Applications */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Recent Applications</h3>
          <button style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>See All</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {applications.map((app) => (
            <div key={app.id} style={{ 
              background: 'white', padding: '16px 20px', borderRadius: 20, 
              border: '1px solid var(--surface-2)', display: 'flex', 
              justifyContent: 'space-between', alignItems: 'center',
              cursor: 'pointer', transition: 'transform 200ms'
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                 <div style={{ width: 44, height: 44, borderRadius: 12, background: app.color + '10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: app.color }}>
                    {app.initials}
                 </div>
                 <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>{app.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>
                       <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>{app.bank}</span>
                       <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#cbd5e1' }} />
                       <span>₹{(app.amount / 100000).toFixed(1)}L</span>
                    </div>
                 </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#10b981' }}>
                      ₹{(app.amount * app.rate / 100).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Calculated Payout ({app.rate}%)</div>
                 </div>
                 <Tag style={{ 
                   margin: 0, borderRadius: 100, border: 'none', fontSize: 10, fontWeight: 800,
                   background: app.status === 'APPROVED' ? '#f0fdf4' : app.status === 'DOC_PENDING' ? '#fff7ed' : app.status === 'REJECTED' ? '#fef2f2' : '#eff6ff',
                   color: app.status === 'APPROVED' ? '#16a34a' : app.status === 'DOC_PENDING' ? '#c2410c' : app.status === 'REJECTED' ? '#dc2626' : '#2563eb'
                 }}>
                    {app.status.replace('_', ' ')}
                 </Tag>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Card */}
      <div style={{ 
        background: '#0f172a', borderRadius: 24, padding: 24, 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
         <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <MessageCircle size={24} color="#10b981" />
            </div>
            <div>
               <div style={{ fontWeight: 800, color: 'white', fontSize: 14 }}>Live Support</div>
               <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Chat with your Team Leader</div>
            </div>
         </div>
         <button style={{ padding: '8px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
            Open WhatsApp
         </button>
      </div>
    </div>
  );
};

export default ConnectorDashboard;
