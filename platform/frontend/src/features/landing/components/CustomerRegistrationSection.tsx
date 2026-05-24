import React, { useState } from 'react';
import axios from 'axios';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  aadhaarNumber: string;
}

const INITIAL: FormState = { firstName: '', lastName: '', email: '', mobile: '', panNumber: '', aadhaarNumber: '' };

const field = (label: string, placeholder: string, value: string, onChange: (v: string) => void, type = 'text', hint?: string) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0',
        fontSize: 14, color: '#0f172a', background: '#f8fafc', outline: 'none',
        fontFamily: 'Inter, sans-serif', transition: 'border-color 200ms',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
      onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
    />
    {hint && <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{hint}</span>}
  </div>
);

const CustomerRegistrationSection: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (key: keyof FormState) => (v: string) => setForm(f => ({ ...f, [key]: v }));

  const validate = (): string => {
    if (!form.firstName.trim()) return 'First name is required.';
    if (!form.lastName.trim()) return 'Last name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required.';
    if (!/^[0-9]{10}$/.test(form.mobile)) return 'Mobile number must be exactly 10 digits.';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.panNumber.toUpperCase())) return 'Invalid PAN format (e.g. ABCDE1234F).';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      await axios.post('/api/customers', { ...form, panNumber: form.panNumber.toUpperCase() });
      setSuccess(true);
      setForm(INITIAL);
    } catch (ex: any) {
      const msg = ex?.response?.data?.message || ex?.response?.data?.error || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="customer-register" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FEF9EC', borderRadius: 100, padding: '6px 18px', border: '1px solid #D4AF3740', marginBottom: 16 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#D4AF37' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Get Started Today</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#0A1F44', margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Register as a Customer
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
            Apply for a personal loan in minutes. Submit your details and our team will reach out within 24 hours.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'white', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 8px 40px rgba(10,31,68,0.08)', padding: '40px 44px' }}>

          {success ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>
                ✓
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', margin: '0 0 10px' }}>Registration Successful!</h3>
              <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 28px', lineHeight: 1.6 }}>
                Thank you! Our loan advisor will contact you within 24 hours to guide you through the next steps.
              </p>
              <button
                onClick={() => setSuccess(false)}
                style={{ padding: '12px 32px', borderRadius: 14, border: '1.5px solid #0A1F44', background: 'transparent', fontSize: 14, fontWeight: 700, color: '#0A1F44', cursor: 'pointer' }}
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                {field('First Name', 'Rahul', form.firstName, set('firstName'))}
                {field('Last Name', 'Sharma', form.lastName, set('lastName'))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                {field('Email Address', 'rahul@example.com', form.email, set('email'), 'email')}
                {field('Mobile Number', '9876543210', form.mobile, set('mobile'), 'tel', '10-digit number without country code')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                {field('PAN Number', 'ABCDE1234F', form.panNumber, v => set('panNumber')(v.toUpperCase()), 'text', 'Required for credit check')}
                {field('Aadhaar Number', '1234 5678 9012', form.aadhaarNumber, set('aadhaarNumber'), 'text', 'Optional')}
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#b91c1c', fontWeight: 600 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '16px', borderRadius: 14, border: 'none',
                  background: loading ? '#94a3b8' : 'linear-gradient(135deg,#0A1F44,#1e3a6e)',
                  color: 'white', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '-0.01em', transition: 'all 200ms',
                  boxShadow: loading ? 'none' : '0 8px 24px rgba(10,31,68,0.25)',
                }}
              >
                {loading ? 'Submitting…' : 'Submit Application →'}
              </button>

              <p style={{ textAlign: 'center', fontSize: 11.5, color: '#94a3b8', marginTop: 14, fontWeight: 500 }}>
                By submitting you agree to our Terms & Privacy Policy. Your data is encrypted and secure.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerRegistrationSection;
