import React, { useState, useEffect } from 'react';
import { Tag, Spin, Empty, Row, Col } from 'antd';
import {
  TrendingUp, Wallet, Zap, BarChart3, ShieldCheck, Calculator,
  BookOpen, MessageSquare, ArrowRight, FileText,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import apiClient from '../../../shared/services/apiClient';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(n);

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  APPROVED:      { bg: '#f0fdf4', color: '#16a34a' },
  DISBURSED:     { bg: '#f0fdf4', color: '#16a34a' },
  DOC_PENDING:   { bg: '#fff7ed', color: '#c2410c' },
  IN_REVIEW:     { bg: '#eff6ff', color: '#2563eb' },
  UNDER_REVIEW:  { bg: '#eff6ff', color: '#2563eb' },
  REJECTED:      { bg: '#fef2f2', color: '#dc2626' },
  PENDING:       { bg: '#fefce8', color: '#854d0e' },
};

interface Loan { id: string; customerName?: string; loanAmount?: number; bankName?: string; status?: string; createdAt?: string; }
interface Earning { totalAmount?: number; amountPaid?: number; status?: string; }

const QuickAction: React.FC<{ icon: React.ReactElement<{ size?: number; color?: string }>; label: string; sub: string; accent: string; onClick: () => void }> = ({
  icon, label, sub, accent, onClick,
}) => (
  <button
    onClick={onClick}
    style={{
      background: 'white', border: '1px solid var(--surface-3)', borderRadius: 16,
      padding: '18px 20px', cursor: 'pointer', textAlign: 'left', width: '100%',
      display: 'flex', alignItems: 'center', gap: 14, transition: 'all 200ms',
      boxShadow: 'var(--shadow-sm)',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
  >
    <div style={{ width: 44, height: 44, borderRadius: 12, background: accent + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {React.cloneElement(icon, { size: 20, color: accent })}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--text-primary)' }}>{label}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{sub}</div>
    </div>
    <ArrowRight size={16} color="var(--text-muted)" />
  </button>
);

const ConnectorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [loans, setLoans] = useState<Loan[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [leads, setLeads] = useState<number>(0);
  const [loadingLoans, setLoadingLoans] = useState(true);
  const [connectorId, setConnectorId] = useState<string | null>(null);

  // Fetch connector profile to get ID
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get('/connectors/me');
        const id = res.data?.data?.id || res.data?.id;
        if (id) setConnectorId(id);
      } catch { /* connector may not have a profile yet */ }
    };
    fetchProfile();
  }, []);

  // Fetch recent loans
  useEffect(() => {
    const fetchLoans = async () => {
      setLoadingLoans(true);
      try {
        const params = connectorId ? { connectorId } : {};
        const res = await apiClient.get('/loans', { params });
        const list: Loan[] = res.data?.data || res.data || [];
        setLoans(list.slice(0, 5));
      } catch { setLoans([]); }
      finally { setLoadingLoans(false); }
    };
    fetchLoans();
  }, [connectorId]);

  // Fetch earnings
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const params = connectorId ? { connectorId } : {};
        const res = await apiClient.get('/commissions/transactions', { params });
        const list: Earning[] = res.data?.data || res.data || [];
        setEarnings(list);
      } catch { setEarnings([]); }
    };
    fetchEarnings();
  }, [connectorId]);

  // Fetch leads count
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await apiClient.get('/eligibility/submissions');
        setLeads((res.data?.data || []).length);
      } catch { setLeads(0); }
    };
    fetchLeads();
  }, []);

  const totalEarnings = earnings.reduce((s, e) => s + (e.amountPaid || 0), 0);
  const pendingEarnings = earnings.reduce((s, e) => s + (e.status === 'PENDING' ? (e.totalAmount || 0) : 0), 0);
  const activeLoans = loans.filter(l => l.status && !['REJECTED', 'DISBURSED'].includes(l.status)).length;

  const name = user?.email?.split('@')[0] || 'Connector';
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>

      {/* ── Header ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
          Partner Portal
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
          Welcome back, {displayName}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '4px 0 0' }}>
          {activeLoans > 0
            ? <><span style={{ fontWeight: 700, color: '#3b82f6' }}>{activeLoans} active file{activeLoans > 1 ? 's' : ''}</span> requiring attention</>
            : 'Your partner dashboard — all tools in one place.'}
        </p>
      </div>

      {/* ── Stats ── */}
      <Row gutter={[16, 16]}>
        {[
          { label: 'Total Earned', value: fmt(totalEarnings), sub: 'All time payouts', color: '#4f46e5', bg: '#ede9fe' },
          { label: 'Pending Commission', value: fmt(pendingEarnings), sub: 'Awaiting release', color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Active Cases', value: String(activeLoans), sub: 'Loans in progress', color: '#3b82f6', bg: '#eff6ff' },
          { label: 'CRM Leads', value: String(leads), sub: 'Landing page submissions', color: '#10b981', bg: '#ecfdf5' },
        ].map(stat => (
          <Col xs={12} md={6} key={stat.label}>
            <div style={{
              background: 'white', borderRadius: 16, padding: '18px 20px',
              border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: stat.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
              }}>
                <Wallet size={16} color={stat.color} />
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

      {/* ── Earnings Hero Card ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(15,23,42,0.2)',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 160, height: 160, borderRadius: '50%', background: 'rgba(99,102,241,0.12)', filter: 'blur(60px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            Total Commissions Paid
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
            {fmt(totalEarnings)}
          </div>
          {pendingEarnings > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(250,204,21,0.15)', padding: '4px 10px', borderRadius: 100 }}>
                <TrendingUp size={12} color="#fbbf24" />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#fbbf24' }}>
                  {fmt(pendingEarnings)} pending
                </span>
              </div>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }}>
            <button
              onClick={() => navigate('/connector/earnings')}
              style={{ height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
            >
              View Earnings Report
            </button>
            <button
              onClick={() => navigate('/connector/check-eligibility')}
              style={{ height: 48, borderRadius: 14, background: '#4f46e5', border: 'none', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 12px rgba(79,70,229,0.35)' }}
            >
              Check Eligibility Leads
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 14 }}>
          Tools & Actions
        </h3>
        <Row gutter={[12, 12]}>
          {[
            { icon: <Zap />, label: 'Check Eligibility', sub: 'View & manage CRM leads', accent: '#4f46e5', path: '/connector/check-eligibility' },
            { icon: <ShieldCheck />, label: 'CIBIL Check', sub: 'Generate bureau PDF report', accent: '#3b82f6', path: '/connector/cibil' },
            { icon: <BarChart3 />, label: 'FOIR Calculator', sub: 'Bank-specific eligibility', accent: '#10b981', path: '/connector/foir' },
            { icon: <Calculator />, label: 'EMI Calculator', sub: 'All loan types & banks', accent: '#f59e0b', path: '/connector/emi-calculator' },
            { icon: <FileText />, label: 'Statement Analyzer', sub: 'PDF bank statement analysis', accent: '#8b5cf6', path: '/connector/bsa' },
            { icon: <BookOpen />, label: 'Policies', sub: 'Bank & office guidelines', accent: '#06b6d4', path: '/connector/policies' },
          ].map(a => (
            <Col xs={24} sm={12} key={a.path}>
              <QuickAction {...a} onClick={() => navigate(a.path)} />
            </Col>
          ))}
        </Row>
      </div>

      {/* ── Recent Loan Applications ── */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Recent Applications</h3>
          <button
            onClick={() => navigate('/connector/check-eligibility')}
            style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
          >
            See All Leads →
          </button>
        </div>

        {loadingLoans ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
        ) : loans.length === 0 ? (
          <div style={{ background: 'white', borderRadius: 20, padding: 40, border: '1px solid var(--surface-3)', textAlign: 'center' }}>
            <Empty
              description={<span style={{ color: 'var(--text-muted)' }}>No loan applications yet.<br />Use <strong>Check Eligibility</strong> to find and onboard leads.</span>}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {loans.map((loan) => {
              const initials = (loan.customerName || 'UN').slice(0, 2).toUpperCase();
              const statusStyle = STATUS_STYLE[loan.status || ''] || { bg: '#f8fafc', color: '#64748b' };
              return (
                <div
                  key={loan.id}
                  style={{
                    background: 'white', padding: '16px 20px', borderRadius: 20,
                    border: '1px solid var(--surface-2)', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                    cursor: 'pointer', transition: 'transform 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, background: '#eff6ff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 800, color: '#2563eb',
                    }}>
                      {initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14 }}>
                        {loan.customerName || 'Customer'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500, marginTop: 2 }}>
                        {loan.bankName || 'Pending Bank'} · {loan.loanAmount ? fmt(loan.loanAmount) : '—'}
                      </div>
                    </div>
                  </div>
                  <Tag
                    style={{
                      margin: 0, borderRadius: 100, border: 'none', fontSize: 10, fontWeight: 800,
                      background: statusStyle.bg, color: statusStyle.color,
                    }}
                  >
                    {(loan.status || 'PENDING').replace(/_/g, ' ')}
                  </Tag>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Support Card ── */}
      <div style={{ background: '#0f172a', borderRadius: 24, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={24} color="#10b981" />
          </div>
          <div>
            <div style={{ fontWeight: 800, color: 'white', fontSize: 14 }}>Team Meeting</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Connect with your team in real-time</div>
          </div>
        </div>
        <button
          onClick={() => navigate('/connector/team-meeting')}
          style={{ padding: '8px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
        >
          Join Meeting
        </button>
      </div>
    </div>
  );
};

export default ConnectorDashboard;
