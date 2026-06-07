import React, { useState, useEffect } from 'react';
import { Tag, Spin, Empty, Row, Col } from 'antd';
import {
  TrendingUp, TrendingDown, Wallet, BarChart3, ShieldCheck, Calculator,
  BookOpen, MessageSquare, ArrowRight, FileText, Briefcase, Target,
  Activity, ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import apiClient from '../../../shared/services/apiClient';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(n);

const fmtCompact = (n: number) => {
  if (n >= 10_00_000) return `₹${(n / 10_00_000).toFixed(1)}L`;
  if (n >= 1_000)     return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n}`;
};

const STATUS_STYLE: Record<string, { bg: string; color: string; dot: string }> = {
  APPROVED:      { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  DISBURSED:     { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  DOC_PENDING:   { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
  IN_REVIEW:     { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  UNDER_REVIEW:  { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  REJECTED:      { bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' },
  PENDING:       { bg: '#fefce8', color: '#854d0e', dot: '#eab308' },
};

interface Loan { id: string; customerName?: string; loanAmount?: number; bankName?: string; status?: string; createdAt?: string; }
interface Earning { totalAmount?: number; amountPaid?: number; status?: string; }

const StatCard: React.FC<{
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  trend?: 'up' | 'down' | null;
}> = ({ label, value, sub, icon, color, bg, trend }) => (
  <div style={{
    background: 'white', borderRadius: 18, padding: '20px 22px',
    border: '1px solid var(--surface-3)',
    boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.03)',
    display: 'flex', flexDirection: 'column', gap: 14,
    transition: 'box-shadow 200ms',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12,
        background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      {trend && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3,
          background: trend === 'up' ? '#f0fdf4' : '#fef2f2',
          borderRadius: 100, padding: '2px 8px',
        }}>
          {trend === 'up'
            ? <TrendingUp size={11} color="#16a34a" />
            : <TrendingDown size={11} color="#dc2626" />}
          <span style={{ fontSize: 10, fontWeight: 700, color: trend === 'up' ? '#16a34a' : '#dc2626' }}>
            {trend === 'up' ? '+' : ''}
          </span>
        </div>
      )}
    </div>
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 900, color, letterSpacing: '-0.03em', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 5, fontWeight: 500 }}>{sub}</div>
    </div>
  </div>
);

const ToolCard: React.FC<{
  icon: React.ReactElement<{ size?: number; color?: string }>;
  label: string;
  sub: string;
  accent: string;
  onClick: () => void;
}> = ({ icon, label, sub, accent, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'white', border: '1px solid var(--surface-3)', borderRadius: 16,
      padding: '16px 18px', cursor: 'pointer', textAlign: 'left', width: '100%',
      display: 'flex', alignItems: 'center', gap: 14, transition: 'all 200ms',
      boxShadow: '0 1px 3px rgba(0,0,0,.04)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,.08)`;
      e.currentTarget.style.borderColor = accent + '40';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.04)';
      e.currentTarget.style.borderColor = 'var(--surface-3)';
    }}
  >
    <div style={{
      width: 42, height: 42, borderRadius: 12, background: accent + '12',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      border: `1px solid ${accent}20`,
    }}>
      {React.cloneElement(icon, { size: 19, color: accent })}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{sub}</div>
    </div>
    <ChevronRight size={15} color="var(--text-muted)" />
  </button>
);

const ConnectorDashboard: React.FC = () => {
  const navigate  = useNavigate();
  const { user }  = useSelector((state: RootState) => state.auth);

  const [loans,              setLoans]              = useState<Loan[]>([]);
  const [earnings,           setEarnings]           = useState<Earning[]>([]);
  const [leads,              setLeads]              = useState<number>(0);
  const [loadingLoans,       setLoadingLoans]       = useState(true);
  const [connectorProfileId, setConnectorProfileId] = useState<string | null>(null);

  // auth user id (UUID) — used for loans query
  const isUUID = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
  const authUserId = user?.id && isUUID(user.id) ? user.id : null;

  // connector profile id comes from /connectors/me — different from auth user id
  useEffect(() => {
    apiClient.get('/connectors/me')
      .then(res => {
        const profile = res.data?.data || res.data;
        setConnectorProfileId(profile?.id || null);
      })
      .catch(() => setConnectorProfileId(null));
  }, []);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoadingLoans(true);
      try {
        const params = authUserId ? { connectorId: authUserId } : {};
        const res  = await apiClient.get('/loans', { params });
        const list: Loan[] = res.data?.data || res.data || [];
        setLoans(list.slice(0, 6));
      } catch { setLoans([]); }
      finally   { setLoadingLoans(false); }
    };
    fetchLoans();
  }, [authUserId]);

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!connectorProfileId) return;
      try {
        const res  = await apiClient.get(`/transactions/connector/${connectorProfileId}`);
        const list: Earning[] = res.data?.data || res.data || [];
        setEarnings(list);
      } catch { setEarnings([]); }
    };
    fetchEarnings();
  }, [connectorProfileId]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await apiClient.get('/eligibility/submissions');
        setLeads((res.data?.data || []).length);
      } catch { setLeads(0); }
    };
    fetchLeads();
  }, []);

  const totalEarned   = earnings.reduce((s, e) => s + (e.amountPaid   || 0), 0);
  const pendingAmount = earnings.reduce((s, e) => s + (e.status === 'PENDING' ? (e.totalAmount || 0) : 0), 0);
  const activeLoans   = loans.filter(l => l.status && !['REJECTED', 'DISBURSED'].includes(l.status)).length;
  const disbursed     = loans.filter(l => l.status === 'DISBURSED').length;

  const name        = user?.email?.split('@')[0] || 'Connector';
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  const tools = [
    { icon: <ShieldCheck />, label: 'CIBIL Check',        sub: 'Generate bureau PDF report',   accent: '#3b82f6', path: '/connector/cibil' },
    { icon: <BarChart3 />,   label: 'Check Eligibility',  sub: 'Leads from eligibility form',   accent: '#10b981', path: '/connector/foir' },
    { icon: <Calculator />,  label: 'EMI Calculator',      sub: 'All loan types & banks',        accent: '#f59e0b', path: '/connector/emi-calculator' },
    { icon: <FileText />,    label: 'Statement Analyzer',  sub: 'PDF bank statement analysis',  accent: '#8b5cf6', path: '/connector/bsa' },
    { icon: <BookOpen />,    label: 'Policies',            sub: 'Bank & compliance guidelines', accent: '#06b6d4', path: '/connector/policies' },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 48 }}>

      {/* ── Page header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            Partner Portal
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.035em' }}>
            Welcome back, {displayName}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '5px 0 0', fontWeight: 500 }}>
            {activeLoans > 0
              ? <><span style={{ fontWeight: 700, color: '#3b82f6' }}>{activeLoans} active file{activeLoans !== 1 ? 's' : ''}</span> require attention</>
              : 'All your tools and pipeline in one place.'}
          </p>
        </div>
        <button
          onClick={() => navigate('/connector/team-meeting')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 18px', borderRadius: 12, border: '1px solid var(--surface-3)',
            background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 700,
            color: 'var(--text-secondary)', boxShadow: '0 1px 3px rgba(0,0,0,.04)',
            transition: 'all 200ms',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#10b981'; (e.currentTarget as HTMLElement).style.color = '#10b981'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
        >
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          <MessageSquare size={15} />
          Team Meeting
        </button>
      </div>

      {/* ── Stats row ── */}
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <StatCard
            label="Total Earned"
            value={fmtCompact(totalEarned)}
            sub={fmt(totalEarned) + ' lifetime'}
            icon={<Wallet size={18} color="#4f46e5" />}
            color="#4f46e5"
            bg="#ede9fe"
            trend={totalEarned > 0 ? 'up' : null}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <StatCard
            label="Pending Commission"
            value={fmtCompact(pendingAmount)}
            sub="Awaiting release"
            icon={<Activity size={18} color="#f59e0b" />}
            color="#d97706"
            bg="#fef3c7"
            trend={null}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <StatCard
            label="Active Cases"
            value={String(activeLoans)}
            sub={`${disbursed} disbursed this month`}
            icon={<Briefcase size={18} color="#3b82f6" />}
            color="#1d4ed8"
            bg="#dbeafe"
            trend={activeLoans > 0 ? 'up' : null}
          />
        </Col>
        <Col xs={12} sm={12} md={6}>
          <StatCard
            label="CRM Leads"
            value={String(leads)}
            sub="Landing page submissions"
            icon={<Target size={18} color="#10b981" />}
            color="#059669"
            bg="#d1fae5"
            trend={leads > 0 ? 'up' : null}
          />
        </Col>
      </Row>

      {/* ── Earnings hero + Quick actions (2-col on desktop) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

        {/* Earnings card */}
        <div style={{
          background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 22, padding: '28px 32px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 16px 40px rgba(15,23,42,0.18)',
        }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(99,102,241,.15)', filter: 'blur(48px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(16,185,129,.08)', filter: 'blur(40px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={15} color="rgba(255,255,255,.7)" />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Commission Wallet
              </span>
            </div>

            <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.35)', marginBottom: 6, letterSpacing: '0.04em' }}>
              TOTAL EARNED
            </div>
            <div style={{ fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {fmtCompact(totalEarned)}
            </div>

            {pendingAmount > 0 && (
              <div style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(250,204,21,.12)', border: '1px solid rgba(250,204,21,.2)', borderRadius: 100, padding: '5px 12px' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#facc15' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#facc15' }}>
                  {fmtCompact(pendingAmount)} pending release
                </span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 24 }}>
              <button
                onClick={() => navigate('/connector/earnings')}
                style={{
                  height: 44, borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.8)',
                  transition: 'all 200ms',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.06)'; }}
              >
                View Earnings
              </button>
              <button
                onClick={() => navigate('/connector/cibil')}
                style={{
                  height: 44, borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  background: 'linear-gradient(135deg,#4f46e5,#6366f1)', border: 'none', color: 'white',
                  boxShadow: '0 4px 14px rgba(79,70,229,.4)', transition: 'all 200ms',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(79,70,229,.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(79,70,229,.4)'; }}
              >
                CIBIL Check
              </button>
            </div>
          </div>
        </div>

        {/* Tools grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
              Tools & Actions
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tools.map(t => (
              <ToolCard key={t.path} {...t} onClick={() => navigate(t.path)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Applications ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Recent Applications
            </h3>
            <p style={{ fontSize: 11.5, color: 'var(--text-muted)', margin: '3px 0 0', fontWeight: 500 }}>
              Latest pipeline activity
            </p>
          </div>
          <button
            onClick={() => navigate('/connector/earnings')}
            style={{
              display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
              color: '#4f46e5', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: '4px 0',
            }}
          >
            View Earnings <ArrowRight size={13} />
          </button>
        </div>

        {loadingLoans ? (
          <div style={{ background: 'white', borderRadius: 18, padding: 40, border: '1px solid var(--surface-3)', display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        ) : loans.length === 0 ? (
          <div style={{ background: 'white', borderRadius: 18, padding: '40px 24px', border: '1px solid var(--surface-3)', textAlign: 'center' }}>
            <Empty
              description={<span style={{ color: 'var(--text-muted)', fontSize: 13 }}>No loan applications yet. Submit your first application to get started.</span>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--surface-3)', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
            {loans.map((loan, idx) => {
              const initials    = (loan.customerName || 'UN').slice(0, 2).toUpperCase();
              const statusStyle = STATUS_STYLE[loan.status || ''] || { bg: '#f8fafc', color: '#64748b', dot: '#94a3b8' };
              return (
                <div
                  key={loan.id}
                  style={{
                    padding: '14px 20px',
                    borderBottom: idx < loans.length - 1 ? '1px solid var(--surface-2)' : 'none',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', transition: 'background 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 11, background: '#eff6ff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800, color: '#2563eb', flexShrink: 0,
                    }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13.5 }}>
                        {loan.customerName || 'Customer'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginTop: 1 }}>
                        {loan.bankName || 'Pending Bank'} {loan.loanAmount ? `· ${fmt(loan.loanAmount)}` : ''}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag
                      style={{
                        margin: 0, borderRadius: 100, border: `1px solid ${statusStyle.dot}30`,
                        fontSize: 10, fontWeight: 700, padding: '1px 10px',
                        background: statusStyle.bg, color: statusStyle.color,
                        display: 'flex', alignItems: 'center', gap: 5,
                      }}
                    >
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: statusStyle.dot, flexShrink: 0 }} />
                      {(loan.status || 'PENDING').replace(/_/g, ' ')}
                    </Tag>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectorDashboard;
