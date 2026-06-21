import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, RotateCcw } from 'lucide-react';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';

const LOAN_TYPES = [
  { value: 'personal', label: 'Personal Loan' },
  { value: 'home', label: 'Home Loan' },
  { value: 'business', label: 'Business Loan' },
  { value: 'education', label: 'Education Loan' },
];

const EMP_TYPES = [
  { value: 'SALARIED', label: 'Salaried' },
  { value: 'SELF_EMPLOYED', label: 'Self-Employed' },
];

interface Result {
  eligible: boolean;
  status: 'ELIGIBLE' | 'BORDERLINE' | 'NOT_ELIGIBLE';
  maxAmount: number;
  foir: number;
  maxEmi: number;
}

function calcEligibility(income: number, existingEmi: number): Result {
  const maxEmi = Math.max(0, income * 0.5 - existingEmi);
  const maxAmount = Math.round(maxEmi * 60);
  const foir = Math.round((existingEmi / income) * 100);
  const status = foir < 40 ? 'ELIGIBLE' : foir < 55 ? 'BORDERLINE' : 'NOT_ELIGIBLE';
  return { eligible: maxAmount > 0 && foir < 55, status, maxAmount, foir, maxEmi };
}

const fmt = (n: number) =>
  n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr`
  : n >= 100000  ? `₹${(n / 100000).toFixed(1)} L`
  : `₹${n.toLocaleString('en-IN')}`;

const inp: React.CSSProperties = {
  width: '100%', height: 46, padding: '0 14px',
  border: `1.5px solid #D4DCE8`, borderRadius: 3,
  fontSize: 14, fontFamily: 'Inter, sans-serif',
  color: NAVY, background: '#FAFBFD', outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.15s',
};

const EligibilityWidget: React.FC = () => {
  const [form, setForm] = useState({ income: '', existingEmi: '', loanType: 'personal', empType: 'SALARIED' });
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const check = () => {
    const income = Number(form.income.replace(/,/g, ''));
    const emi    = Number(form.existingEmi.replace(/,/g, '') || '0');
    if (!income || income < 15000) { setError('Enter a monthly income of at least ₹15,000'); return; }
    setError('');
    setResult(calcEligibility(income, emi));
  };

  const reset = () => { setResult(null); setForm({ income: '', existingEmi: '', loanType: 'personal', empType: 'SALARIED' }); setError(''); };

  const statusMeta = {
    ELIGIBLE:     { icon: CheckCircle2, color: '#15803D', bg: '#F0FAF4', border: '#A3D9B8', label: 'Eligible' },
    BORDERLINE:   { icon: AlertCircle,  color: '#B45309', bg: '#FFFBEB', border: '#FCD34D', label: 'Borderline' },
    NOT_ELIGIBLE: { icon: XCircle,      color: '#DC2626', bg: '#FEF2F2', border: '#FCA5A5', label: 'Not Eligible' },
  };

  return (
    <section id="eligibility" style={{ background: '#F5F7FA', padding: '96px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block', background: `rgba(196,153,58,0.10)`,
            border: `1px solid rgba(196,153,58,0.30)`, color: GOLD,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.10em',
            textTransform: 'uppercase', padding: '4px 16px', marginBottom: 18,
          }}>
            Instant Check — No Credit Impact
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700, fontSize: 'clamp(26px,3vw,38px)',
            color: NAVY, margin: '0 0 14px', letterSpacing: '-0.02em',
          }}>
            Check Your Loan Eligibility
          </h2>
          <p style={{ color: '#3A5278', fontSize: 16, margin: 0, maxWidth: 460, marginInline: 'auto' }}>
            Get an instant estimate of how much you can borrow — in under 30 seconds.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start', maxWidth: 880, margin: '0 auto' }}>

          {/* Form */}
          <div style={{ background: '#fff', border: `1px solid #D4DCE8`, padding: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24, borderLeft: `3px solid ${GOLD}`, paddingLeft: 12 }}>
              Your Details
            </div>

            {/* Loan type */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>Loan Type</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {LOAN_TYPES.map(t => (
                  <button key={t.value} onClick={() => set('loanType', t.value)} style={{
                    padding: '6px 14px', border: `1.5px solid ${form.loanType === t.value ? GOLD : '#D4DCE8'}`,
                    background: form.loanType === t.value ? `rgba(196,153,58,0.08)` : '#fff',
                    color: form.loanType === t.value ? GOLD : '#3A5278',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                  }}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Employment */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>Employment Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {EMP_TYPES.map(t => (
                  <button key={t.value} onClick={() => set('empType', t.value)} style={{
                    flex: 1, padding: '8px 0', border: `1.5px solid ${form.empType === t.value ? NAVY : '#D4DCE8'}`,
                    background: form.empType === t.value ? NAVY : '#fff',
                    color: form.empType === t.value ? '#fff' : '#3A5278',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                  }}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Income */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>Monthly Net Income</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#7A92B5', fontWeight: 600, fontSize: 14 }}>₹</span>
                <input value={form.income} onChange={e => set('income', e.target.value)} placeholder="50,000"
                  style={{ ...inp, paddingLeft: 28 }}
                  onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                  onBlur={e => (e.currentTarget.style.borderColor = '#D4DCE8')} />
              </div>
            </div>

            {/* Existing EMI */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 8 }}>Existing Monthly EMIs <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(enter 0 if none)</span></label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#7A92B5', fontWeight: 600, fontSize: 14 }}>₹</span>
                <input value={form.existingEmi} onChange={e => set('existingEmi', e.target.value)} placeholder="0"
                  style={{ ...inp, paddingLeft: 28 }}
                  onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                  onBlur={e => (e.currentTarget.style.borderColor = '#D4DCE8')} />
              </div>
            </div>

            {error && <p style={{ color: '#DC2626', fontSize: 12, fontWeight: 600, marginBottom: 16, margin: '0 0 16px' }}>{error}</p>}

            <button onClick={check} style={{
              width: '100%', height: 48, background: NAVY, border: 'none',
              color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', letterSpacing: '0.03em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#1A3256')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = NAVY)}>
              Check Eligibility <ChevronRight size={16} />
            </button>

            <p style={{ textAlign: 'center', fontSize: 11, color: '#7A92B5', marginTop: 12, marginBottom: 0 }}>
              Soft check only · No impact on CIBIL score
            </p>
          </div>

          {/* Result panel */}
          <div style={{ minHeight: 340 }}>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ height: '100%', background: '#fff', border: `1px solid #D4DCE8`, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, background: `rgba(196,153,58,0.08)`, border: `1px solid rgba(196,153,58,0.20)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 24 }}>📊</span>
                  </div>
                  <p style={{ color: '#7A92B5', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                    Fill in your details on the left to see your estimated loan eligibility instantly.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ background: '#fff', border: `1px solid #D4DCE8` }}>

                  {/* Status banner */}
                  {(() => {
                    const m = statusMeta[result.status];
                    const Icon = m.icon;
                    return (
                      <div style={{ padding: '20px 24px', background: m.bg, borderBottom: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Icon size={22} color={m.color} />
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: m.color }}>{m.label}</div>
                          <div style={{ fontSize: 12, color: '#7A92B5', marginTop: 2 }}>
                            {result.status === 'ELIGIBLE' ? 'You meet our lending criteria' : result.status === 'BORDERLINE' ? 'Eligible with conditions' : 'Consider reducing existing obligations'}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div style={{ padding: 24 }}>
                    {/* Max amount */}
                    <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #E8EDF5', marginBottom: 20 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Max Eligible Amount</div>
                      <div style={{
                        fontSize: 36, fontWeight: 800,
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: result.eligible ? NAVY : '#DC2626',
                        letterSpacing: '-0.02em',
                      }}>
                        {result.eligible ? fmt(result.maxAmount) : '—'}
                      </div>
                      {result.eligible && <div style={{ fontSize: 12, color: '#7A92B5', marginTop: 4 }}>Over 60-month tenure</div>}
                    </div>

                    {/* Stats grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                      {[
                        { label: 'FOIR', value: `${result.foir}%`, sub: 'Fixed obligation ratio', warn: result.foir >= 40 },
                        { label: 'Max Monthly EMI', value: fmt(result.maxEmi), sub: 'Available capacity', warn: false },
                      ].map(s => (
                        <div key={s.label} style={{ padding: '14px 16px', background: '#F5F7FA', border: '1px solid #E8EDF5' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: s.warn ? '#B45309' : NAVY, fontFamily: 'Inter, sans-serif' }}>{s.value}</div>
                          <div style={{ fontSize: 11, color: '#7A92B5', marginTop: 3 }}>{s.sub}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => { const el = document.querySelector('#customer-register'); el?.scrollIntoView({ behavior: 'smooth' }); }} style={{
                        flex: 1, height: 42, background: GOLD, border: 'none',
                        color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        Apply Now
                      </button>
                      <button onClick={reset} style={{
                        height: 42, width: 42, background: '#fff', border: '1px solid #D4DCE8',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <RotateCcw size={15} color="#7A92B5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityWidget;
