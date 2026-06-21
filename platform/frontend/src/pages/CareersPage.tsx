import React, { useState } from 'react';
import { Input, Select, Alert, App as AntdApp, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { RealMoneyLogoWhite } from '../shared/components/RealMoneyLogo';

const NAVY  = '#0B1E3D';
const GOLD  = '#C4993A';
const GOLD_L = '#E8C870';

const antTheme = {
  token: { colorPrimary: NAVY, borderRadius: 2, fontFamily: 'Inter, sans-serif' },
  components: {
    Input:  { activeBorderColor: GOLD, hoverBorderColor: NAVY },
    Select: { optionSelectedBg: 'rgba(196,153,58,0.08)' },
  },
};

const inp: React.CSSProperties = {
  height: 46, borderRadius: 2, fontSize: 14, fontFamily: 'Inter, sans-serif',
};

interface AppForm { name: string; email: string; mobile: string; role: string; experience: string; message: string; }
const EMPTY: AppForm = { name: '', email: '', mobile: '', role: '', experience: '', message: '' };

const CareersInner: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<AppForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');

  const set = (k: keyof AppForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.mobile.trim()) {
      setErr('Please fill in all required fields.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setErr('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!form.email.includes('@')) {
      setErr('Enter a valid email address.');
      return;
    }
    setErr('');
    setLoading(true);
    try {
      await axios.post('/api/careers/apply', {
        name:       form.name.trim(),
        email:      form.email.trim(),
        mobile:     form.mobile,
        role:       form.role.trim() || 'General Application',
        experience: form.experience || undefined,
        coverNote:  form.message.trim() || undefined,
      });
      setSuccess(true);
    } catch (ex: any) {
      const msg = ex?.response?.data?.message || 'Submission failed. Please try again.';
      setErr(String(msg).substring(0, 160));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA', fontFamily: 'Inter, sans-serif' }}>

      {/* Nav */}
      <div style={{ background: NAVY, height: 64, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 500, padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
          <ArrowLeft size={15} /> Back to Home
        </button>
        <RealMoneyLogoWhite markSize={32} fontSize={14} subtitle="Careers" id="careers-logo" />
        <button onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}
          onMouseEnter={e => (e.currentTarget.style.color = GOLD_L)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
          Staff Login →
        </button>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, #060F20 0%, ${NAVY} 55%, #0E2545 100%)`, padding: '72px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(196,153,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,153,58,0.03) 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', background: 'rgba(196,153,58,0.12)', border: '1px solid rgba(196,153,58,0.30)', color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 16px', marginBottom: 20 }}>
            We're Hiring
          </span>
          <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,46px)', color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Build the Future of<br />
            <span style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Lending in India
            </span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', margin: '0 auto', maxWidth: 460, lineHeight: 1.75 }}>
            Send us your details and our HR team will get back to you within 5 business days.
          </p>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '56px 24px 80px' }}>
        {success ? (
          <div style={{ background: '#fff', border: '1px solid #D4DCE8', padding: '56px 40px', textAlign: 'center' }}>
            <CheckCircle2 size={48} color="#15803D" style={{ marginBottom: 20 }} />
            <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: NAVY, marginBottom: 10 }}>
              Application Received!
            </div>
            <p style={{ fontSize: 14, color: '#7A92B5', lineHeight: 1.75, margin: '0 0 28px' }}>
              Our HR team will review your profile and reach out within 5 business days.
            </p>
            <button
              onClick={() => { setSuccess(false); setForm(EMPTY); }}
              style={{ background: 'none', border: `1.5px solid ${NAVY}`, color: NAVY, padding: '10px 28px', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
              Submit Another Application
            </button>
          </div>
        ) : (
          <ConfigProvider theme={antTheme}>
            <div style={{ background: '#fff', border: '1px solid #D4DCE8' }}>
              <div style={{ background: NAVY, padding: '20px 28px', borderBottom: `3px solid ${GOLD}` }}>
                <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 17, color: '#fff' }}>
                  Apply Now
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                  Fill in your details — we'll reach out for next steps
                </div>
              </div>

              <form onSubmit={submit} noValidate style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {err && <Alert type="error" message={err} showIcon style={{ borderRadius: 2 }} />}

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
                    Full Name <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <Input value={form.name} onChange={e => set('name', e.target.value)} placeholder="As on your resume" style={inp} />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
                    Email Address <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" style={inp} />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
                    Mobile Number <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <Input
                    prefix="+91"
                    value={form.mobile}
                    onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98765 43210"
                    maxLength={10}
                    style={inp}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
                    Role / Position Applying For
                  </label>
                  <Input value={form.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Loan Officer, Developer, Sales…" style={inp} />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
                    Years of Experience
                  </label>
                  <Select
                    value={form.experience || undefined}
                    onChange={v => set('experience', v)}
                    style={{ width: '100%', height: 46 }}
                    placeholder="Select range"
                    options={['0–1 years', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map(v => ({ value: v, label: v }))}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 7 }}>
                    Cover Note
                  </label>
                  <Input.TextArea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Tell us a little about yourself and why you'd like to join Real Money…"
                    rows={4}
                    maxLength={500}
                    style={{ borderRadius: 2, fontFamily: 'Inter, sans-serif', fontSize: 13 }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', height: 50, background: loading ? '#7A92B5' : NAVY, border: 'none',
                    color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                    fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                    marginTop: 4,
                  }}>
                  {loading ? 'Submitting…' : <><Send size={15} /> Submit Application</>}
                </button>

                <p style={{ textAlign: 'center', fontSize: 11, color: '#7A92B5', margin: 0 }}>
                  We'll contact you within 5 business days · No spam
                </p>
              </form>
            </div>
          </ConfigProvider>
        )}
      </div>
    </div>
  );
};

const CareersPage: React.FC = () => (
  <AntdApp>
    <CareersInner />
  </AntdApp>
);

export default CareersPage;
