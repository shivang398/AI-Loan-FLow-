import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  loanType: string;
  loanAmount: string;
  consent: boolean;
}

const INITIAL: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  panNumber: '',
  loanType: 'personal',
  loanAmount: '500000',
  consent: false,
};

const LOAN_TYPES = [
  { value: 'personal', label: 'Personal Loan' },
  { value: 'education', label: 'Education Loan' },
  { value: 'business', label: 'Business Loan' },
];

const inputStyle: React.CSSProperties = {
  padding: '11px 14px',
  borderRadius: 10,
  border: '1.5px solid #e2e8f0',
  fontSize: 13,
  color: '#0f172a',
  background: '#f8fafc',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 200ms',
};

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#334155',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  marginBottom: 5,
  display: 'block',
};

const FieldInput: React.FC<{
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
}> = ({ label, placeholder, value, onChange, type = 'text', hint }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <label style={labelStyle}>{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={inputStyle}
      onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
      onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
    />
    {hint && <span style={{ fontSize: 10, color: '#94a3b8', marginTop: 3 }}>{hint}</span>}
  </div>
);

const validate = (form: FormState): string => {
  if (!form.firstName.trim()) return 'First name is required.';
  if (!form.lastName.trim()) return 'Last name is required.';
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required.';
  if (!/^[0-9]{10}$/.test(form.mobile)) return 'Mobile must be 10 digits.';
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase())) return 'Invalid PAN (e.g. ABCDE1234F).';
  if (!form.consent) return 'Please agree to be contacted.';
  return '';
};

const HeroForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof FormState) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const err = validate(form);
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await axios.post('/api/customers', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        panNumber: form.panNumber.toUpperCase(),
        loanType: form.loanType,
        loanAmount: parseFloat(form.loanAmount) || null,
      });
      setSuccess(true);
      setForm(INITIAL);
    } catch (ex: any) {
      const msg = ex?.response?.data?.message || ex?.response?.data?.error || 'Submission failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 24,
      padding: '28px 26px',
      boxShadow: '0 32px 80px rgba(10,31,68,.28), 0 0 0 1px rgba(212,175,55,.12)',
      border: '1px solid rgba(212,175,55,.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(to right, #D4AF37, #f5d16a, #D4AF37)' }} />

      {success ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={32} color="#16a34a" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>Application Submitted!</h3>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px', lineHeight: 1.6 }}>
            Our loan advisor will contact you within 24 hours.
          </p>
          <button
            onClick={() => setSuccess(false)}
            style={{ padding: '10px 28px', borderRadius: 12, border: '1.5px solid #0A1F44', background: 'transparent', fontSize: 13, fontWeight: 700, color: '#0A1F44', cursor: 'pointer' }}
          >
            Apply Again
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Sparkles size={15} color="#D4AF37" />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Free Advisory</span>
            </div>
            <h3 style={{ margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 20, color: '#0A1F44', lineHeight: 1.2 }}>
              Apply for Your Loan
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748B' }}>
              Get the best offer in minutes — zero fees
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Row 1: First + Last Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <FieldInput label="First Name" placeholder="Rahul" value={form.firstName} onChange={set('firstName')} />
              <FieldInput label="Last Name" placeholder="Sharma" value={form.lastName} onChange={set('lastName')} />
            </div>

            {/* Row 2: Email + Mobile */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <FieldInput label="Email" placeholder="rahul@example.com" value={form.email} onChange={set('email')} type="email" />
              <FieldInput label="Mobile" placeholder="9876543210" value={form.mobile} onChange={set('mobile')} type="tel" hint="10-digit, no country code" />
            </div>

            {/* Row 3: PAN + Loan Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <FieldInput label="PAN Number" placeholder="ABCDE1234F" value={form.panNumber} onChange={v => set('panNumber')(v.toUpperCase())} hint="Required for credit check" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Loan Type</label>
                <select
                  value={form.loanType}
                  onChange={e => set('loanType')(e.target.value)}
                  style={{ ...inputStyle, appearance: 'none' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                >
                  {LOAN_TYPES.map(lt => (
                    <option key={lt.value} value={lt.value}>{lt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Loan Amount */}
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle}>Loan Amount (₹)</label>
              <input
                type="number"
                value={form.loanAmount}
                onChange={e => set('loanAmount')(e.target.value)}
                placeholder="500000"
                min={50000}
                max={10000000}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
              />
            </div>

            {/* Consent */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 14 }}>
              <input
                type="checkbox"
                id="hero-consent"
                checked={form.consent}
                onChange={e => setForm(f => ({ ...f, consent: e.target.checked }))}
                style={{ marginTop: 2, accentColor: '#D4AF37', cursor: 'pointer' }}
              />
              <label htmlFor="hero-consent" style={{ fontSize: 11.5, color: '#64748B', cursor: 'pointer', lineHeight: 1.4 }}>
                I agree to be contacted via call / WhatsApp / SMS
              </label>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 12, fontSize: 12, color: '#b91c1c', fontWeight: 600 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0A1F44, #1a3a6e)',
                color: 'white', fontSize: 14, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.01em', transition: 'all 200ms',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(10,31,68,.25)',
              }}
            >
              {loading ? 'Submitting…' : 'Get My Best Offer →'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
            <ShieldCheck size={12} color="#10B981" />
            <span style={{ fontSize: 10.5, color: '#94A3B8' }}>Your data is encrypted &amp; never shared without consent</span>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroForm;
