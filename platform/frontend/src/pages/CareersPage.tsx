import React, { useState } from 'react';
import { Input, Select, Alert, App as AntdApp, ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Clock, Briefcase, ChevronRight, CheckCircle2, Send } from 'lucide-react';
import { RealMoneyLogoWhite } from '../shared/components/RealMoneyLogo';

const NAVY   = '#0B1E3D';
const GOLD   = '#C4993A';
const GOLD_L = '#E8C870';

const OPENINGS = [
  {
    id: 1,
    title: 'Senior Loan Processing Officer',
    dept: 'Operations',
    location: 'Jaipur, Rajasthan',
    type: 'Full-time',
    exp: '3–6 years',
    desc: 'Own the end-to-end processing of personal and business loan files from submission to disbursement. Coordinate with lenders, verify KYC documents, and ensure files are sanctioned within TAT.',
    skills: ['Loan processing', 'KYC verification', 'Lender coordination', 'MS Excel'],
  },
  {
    id: 2,
    title: 'Relationship Manager – Channel Partners',
    dept: 'Sales',
    location: 'Jaipur / Remote',
    type: 'Full-time',
    exp: '2–5 years',
    desc: 'Onboard and manage a portfolio of DSA channel partners. Drive loan origination through partner activation, training, and performance monitoring. Own monthly disbursement targets.',
    skills: ['DSA management', 'Lead generation', 'Target-driven', 'NBFC knowledge'],
  },
  {
    id: 3,
    title: 'Credit Analyst',
    dept: 'Risk & Credit',
    location: 'Jaipur, Rajasthan',
    type: 'Full-time',
    exp: '2–4 years',
    desc: 'Assess creditworthiness of loan applicants by analysing income documents, CIBIL reports, bank statements, and FOIR. Recommend loan structures and flag risk factors to seniors.',
    skills: ['CIBIL / credit bureau', 'Financial analysis', 'FOIR calculation', 'Attention to detail'],
  },
  {
    id: 4,
    title: 'Full-Stack Developer (Node.js + React)',
    dept: 'Technology',
    location: 'Remote / Jaipur',
    type: 'Full-time',
    exp: '2–5 years',
    desc: 'Build and maintain our loan distribution platform. Work across the stack — REST APIs in Node.js/TypeScript and React dashboards. Collaborate with product and ops teams to ship features that directly impact loan volumes.',
    skills: ['Node.js', 'React', 'TypeScript', 'MySQL / Prisma'],
  },
  {
    id: 5,
    title: 'Customer Support Executive',
    dept: 'Customer Success',
    location: 'Jaipur, Rajasthan',
    type: 'Full-time',
    exp: '0–2 years',
    desc: 'First point of contact for borrowers and partners. Handle inbound queries, track application status, and coordinate with ops for resolution. Freshers welcome.',
    skills: ['Communication', 'CRM tools', 'Problem-solving', 'Hindi & English'],
  },
  {
    id: 6,
    title: 'Compliance & Legal Executive',
    dept: 'Compliance',
    location: 'Jaipur, Rajasthan',
    type: 'Full-time',
    exp: '2–4 years',
    desc: 'Ensure all lending operations comply with RBI guidelines and lender-specific policies. Review agreements, maintain audit documentation, and support the team on regulatory queries.',
    skills: ['RBI / NBFC regulations', 'Contract review', 'Documentation', 'LLB preferred'],
  },
];

const DEPTS = ['All', ...Array.from(new Set(OPENINGS.map(o => o.dept)))];

const antTheme = {
  token: { colorPrimary: NAVY, borderRadius: 2, fontFamily: 'Inter, sans-serif' },
  components: { Input: { activeBorderColor: GOLD, hoverBorderColor: NAVY }, Select: { optionSelectedBg: `rgba(196,153,58,0.08)` } },
};

const inp: React.CSSProperties = {
  height: 44, borderRadius: 2,
  fontSize: 13, fontFamily: 'Inter, sans-serif',
};

interface AppForm { name: string; email: string; mobile: string; role: string; experience: string; message: string; }
const EMPTY: AppForm = { name: '', email: '', mobile: '', role: '', experience: '', message: '' };

const CareersInner: React.FC = () => {
  const navigate = useNavigate();
  const [dept, setDept] = useState('All');
  const [selected, setSelected] = useState<typeof OPENINGS[0] | null>(null);
  const [form, setForm] = useState<AppForm>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');

  const visible = dept === 'All' ? OPENINGS : OPENINGS.filter(o => o.dept === dept);
  const set = (k: keyof AppForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile) { setErr('Please fill in all required fields.'); return; }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { setErr('Enter a valid 10-digit Indian mobile number.'); return; }
    if (!form.email.includes('@')) { setErr('Enter a valid email address.'); return; }
    setErr('');
    setLoading(true);
    try {
      await axios.post('/api/careers/apply', {
        name:       form.name,
        email:      form.email,
        mobile:     form.mobile,
        role:       form.role || selected?.title || 'General',
        experience: form.experience || undefined,
        coverNote:  form.message  || undefined,
      });
      setSuccess(true);
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Submission failed. Please try again.';
      setErr(String(msg).substring(0, 160));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F5F7FA', fontFamily: 'Inter, sans-serif' }}>

      {/* Nav */}
      <div style={{ background: NAVY, height: 64, padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 500, padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
          <ArrowLeft size={15} /> Back to Home
        </button>
        <RealMoneyLogoWhite markSize={32} fontSize={14} subtitle="Careers" id="careers-logo" />
        <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}
          onMouseEnter={e => (e.currentTarget.style.color = GOLD_L)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}>
          Staff Login →
        </button>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, #060F20 0%, ${NAVY} 55%, #0E2545 100%)`, padding: '72px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(196,153,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(196,153,58,0.03) 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', background: `rgba(196,153,58,0.12)`, border: `1px solid rgba(196,153,58,0.30)`, color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 16px', marginBottom: 20 }}>
            We're Hiring
          </span>
          <h1 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,48px)', color: '#fff', margin: '0 0 16px', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Build the Future of<br />
            <span style={{ background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Lending in India
            </span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)', margin: '0 auto', maxWidth: 480, lineHeight: 1.75 }}>
            Join a fast-growing DSA platform that has disbursed ₹50 Cr+ and is building the technology layer that makes credit accessible to every Indian.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
            {[['22+', 'Years in Business'], ['50+', 'Lender Partners'], [String(OPENINGS.length), 'Open Roles']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: '"Playfair Display", serif', color: GOLD_L }}>{v}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: 32, alignItems: 'start' }}>

          {/* Openings */}
          <div>
            {/* Department filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#7A92B5', marginRight: 4 }}>Filter:</span>
              {DEPTS.map(d => (
                <button key={d} onClick={() => setDept(d)} style={{
                  padding: '5px 14px', border: `1.5px solid ${dept === d ? NAVY : '#D4DCE8'}`,
                  background: dept === d ? NAVY : '#fff',
                  color: dept === d ? '#fff' : '#3A5278',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.14s',
                }}>{d}</button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {visible.map(job => (
                <div key={job.id} onClick={() => { setSelected(job); setForm(f => ({ ...f, role: job.title })); setSuccess(false); setErr(''); }}
                  style={{
                    background: '#fff', border: `1.5px solid ${selected?.id === job.id ? GOLD : '#D4DCE8'}`,
                    padding: '20px 24px', cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: selected?.id === job.id ? `0 0 0 3px rgba(196,153,58,0.10)` : 'none',
                  }}
                  onMouseEnter={e => { if (selected?.id !== job.id) (e.currentTarget as HTMLElement).style.borderColor = '#7A92B5'; }}
                  onMouseLeave={e => { if (selected?.id !== job.id) (e.currentTarget as HTMLElement).style.borderColor = '#D4DCE8'; }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 17, color: NAVY, marginBottom: 6 }}>{job.title}</div>
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        {[
                          [Briefcase, job.dept],
                          [MapPin, job.location],
                          [Clock, job.exp],
                        ].map(([Icon, text]: any) => (
                          <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#7A92B5', fontWeight: 500 }}>
                            <Icon size={12} /> {text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: GOLD, background: `rgba(196,153,58,0.10)`, border: `1px solid rgba(196,153,58,0.25)`, padding: '3px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{job.type}</span>
                      <ChevronRight size={16} color="#7A92B5" />
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: '#3A5278', margin: '12px 0 0', lineHeight: 1.65 }}>{job.desc}</p>

                  <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
                    {job.skills.map(s => (
                      <span key={s} style={{ fontSize: 11, fontWeight: 600, color: '#3A5278', background: '#F5F7FA', border: '1px solid #D4DCE8', padding: '2px 10px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          {selected && (
            <div style={{ background: '#fff', border: `1px solid #D4DCE8`, position: 'sticky', top: 80 }}>
              <div style={{ background: NAVY, padding: '20px 24px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: `rgba(255,255,255,0.45)`, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Applying for</div>
                <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 16, color: '#fff', lineHeight: 1.3 }}>{selected.title}</div>
                <div style={{ fontSize: 12, color: GOLD, marginTop: 4, fontWeight: 600 }}>{selected.dept} · {selected.location}</div>
              </div>

              <div style={{ padding: 24 }}>
                {success ? (
                  <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <CheckCircle2 size={44} color="#15803D" style={{ marginBottom: 16 }} />
                    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 18, color: NAVY, marginBottom: 8 }}>Application Received!</div>
                    <p style={{ fontSize: 13, color: '#7A92B5', lineHeight: 1.7, margin: '0 0 20px' }}>
                      Our HR team will review your application and reach out within 5 business days.
                    </p>
                    <button onClick={() => { setSuccess(false); setForm(EMPTY); setSelected(null); }} style={{ background: 'none', border: `1px solid ${NAVY}`, color: NAVY, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                      View More Openings
                    </button>
                  </div>
                ) : (
                  <ConfigProvider theme={antTheme}>
                    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {err && <Alert type="error" message={err} showIcon style={{ borderRadius: 2, marginBottom: 4 }} />}

                      {[
                        { key: 'name', label: 'Full Name *', placeholder: 'Your full name' },
                        { key: 'email', label: 'Email Address *', placeholder: 'you@email.com', type: 'email' },
                      ].map(f => (
                        <div key={f.key}>
                          <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>{f.label}</label>
                          <Input value={form[f.key as keyof AppForm]} onChange={e => set(f.key as keyof AppForm, e.target.value)}
                            placeholder={f.placeholder} type={f.type || 'text'} style={inp} />
                        </div>
                      ))}

                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>Mobile Number *</label>
                        <Input prefix="+91" value={form.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98765 43210" maxLength={10} style={inp} />
                      </div>

                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>Years of Experience</label>
                        <Select value={form.experience} onChange={v => set('experience', v)} style={{ width: '100%', height: 44 }} placeholder="Select range"
                          options={['0–1 years', '1–3 years', '3–5 years', '5–10 years', '10+ years'].map(v => ({ value: v, label: v }))} />
                      </div>

                      <div>
                        <label style={{ fontSize: 11, fontWeight: 700, color: '#3A5278', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}>Cover Note</label>
                        <Input.TextArea value={form.message} onChange={e => set('message', e.target.value)}
                          placeholder="Briefly tell us why you're a great fit for this role..."
                          rows={3} maxLength={500} style={{ borderRadius: 2, fontFamily: 'Inter, sans-serif', fontSize: 13 }} />
                      </div>

                      <button type="submit" disabled={loading} style={{
                        width: '100%', height: 46, background: loading ? '#7A92B5' : NAVY, border: 'none',
                        color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        marginTop: 4,
                      }}>
                        {loading ? 'Submitting…' : <><Send size={15} /> Submit Application</>}
                      </button>

                      <p style={{ textAlign: 'center', fontSize: 11, color: '#7A92B5', margin: 0 }}>
                        We'll contact you within 5 business days
                      </p>
                    </form>
                  </ConfigProvider>
                )}
              </div>
            </div>
          )}
        </div>
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
