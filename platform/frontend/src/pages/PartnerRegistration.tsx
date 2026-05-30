import React, { useState } from 'react';
import { Input, InputNumber, Select, App as AntdApp, ConfigProvider, Alert } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff, TrendingUp, Shield, Users, Star, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerRegistrationSchema, type PartnerRegistrationData } from '../features/landing/schemas/landingSchemas';
import { registerPartner } from '../features/landing/api/landingApi';

const LOAN_PRODUCTS = [
  { value: 'personal',  label: 'Personal Loan' },
  { value: 'home',      label: 'Home Loan' },
  { value: 'business',  label: 'Business Loan' },
  { value: 'lap',       label: 'Loan Against Property' },
  { value: 'car',       label: 'Car Loan' },
  { value: 'education', label: 'Education Loan' },
];

const antTheme = {
  token: {
    colorPrimary: '#0A1F44',
    colorLink: '#D4AF37',
    borderRadius: 10,
    fontFamily: 'Inter, sans-serif',
  },
};

const PERKS = [
  { icon: TrendingUp, title: 'Industry-Best Commissions', desc: 'Earn up to 2% per disbursed loan' },
  { icon: Shield,     title: '50+ Lender Network',        desc: 'Banks & NBFCs empanelled across India' },
  { icon: Users,      title: 'Dedicated RM Support',      desc: 'Your own relationship manager' },
  { icon: Star,       title: '22 Years of Trust',         desc: 'Proven DSA network since 2002' },
];

// Exact same input/label style as the landing page customer form
const inp: React.CSSProperties = {
  padding: '10px 14px',
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
  height: 42,
};
const lbl: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 5,
  display: 'block',
};

const F = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 14 }}>
    <label style={lbl}>{label}</label>
    {children}
    {error && <span style={{ fontSize: 11, color: '#dc2626', marginTop: 4, fontWeight: 500 }}>{error}</span>}
  </div>
);

const PartnerRegistrationInner: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<PartnerRegistrationData>({
    resolver: zodResolver(partnerRegistrationSchema),
    defaultValues: { interestedProducts: [], yearsOfExperience: 0, password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: PartnerRegistrationData) => {
    setLoading(true);
    setApiError(null);
    try {
      const result = await registerPartner(data);
      if (result.success) setSuccess(true);
    } catch (err: any) {
      setApiError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Exact same page background as the landing page
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>

      {/* ── Navbar — identical dark navy as landing page hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #071729 0%, #0A1F44 100%)',
        height: 64, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      }}>
        <button onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 500, padding: 0 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
          <ArrowLeft size={15} /> Back to Home
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#D4AF37,#B8960C)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(212,175,55,0.35)' }}>
            <IndianRupee size={18} color="#0A1F44" strokeWidth={2.8} />
          </div>
          <div>
            <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 900, fontSize: 16, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>Real Money</div>
            <div style={{ fontSize: 9, color: '#D4AF37', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Partner Program</div>
          </div>
        </div>

        <button onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}
          onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
          Have an account? <strong style={{ textDecoration: 'underline' }}>Login →</strong>
        </button>
      </div>

      {/* ── Hero banner — same dark gradient as landing page hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #071729 0%, #0A1F44 60%, #0D2654 100%)',
        padding: '56px 24px 72px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <BadgeCheck size={13} color="#4ade80" />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em' }}>Free to Join · No Upfront Fees</span>
          </div>
          <h1 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 900, fontSize: 'clamp(26px,4vw,42px)', color: '#fff', margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Become a Real Money<br />
            <span style={{ color: '#93C5FD' }}>Channel Partner</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: '0 auto', maxWidth: 460, lineHeight: 1.7 }}>
            Join 1,000+ DSA partners earning consistent commissions from our 50+ bank &amp; NBFC network.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 32, alignItems: 'start' }}>

          {/* ── Left: Perks + info — matching landing page card style ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: '#fff', borderRadius: 14, padding: '16px 18px',
                border: '1px solid #E2E8F0', boxShadow: '0 1px 8px rgba(10,31,68,0.06)',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(212,175,55,0.1)', border: '1.5px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color="#D4AF37" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0A1F44', lineHeight: 1.2, fontFamily: '"Plus Jakarta Sans",sans-serif' }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>{desc}</div>
                </div>
              </div>
            ))}

            {/* Info card */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '18px 20px', border: '1px solid #E2E8F0', borderLeft: '3px solid #D4AF37', boxShadow: '0 1px 8px rgba(10,31,68,0.06)' }}>
              <div style={{ display: 'inline-block', background: '#FEF9EC', borderRadius: 100, padding: '3px 12px', marginBottom: 10, border: '1px solid #D4AF3730' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Why Partners Choose Us</span>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: 13, color: '#475569', lineHeight: 1.75 }}>
                With <strong style={{ color: '#0A1F44' }}>22+ years of experience</strong> and a monthly business of <strong style={{ color: '#0A1F44' }}>₹10 Cr+</strong>, we give partners the tools and network to build a sustainable income stream.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {['Fast & transparent payouts', 'Real-time commission tracking', 'Dedicated RM support'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: '#475569', fontWeight: 500 }}>
                    <CheckCircle2 size={14} color="#10B981" style={{ flexShrink: 0 }} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form card — exact same style as landing page customer form ── */}
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 8px 48px rgba(10,31,68,0.09)', textAlign: 'center', padding: '60px 40px' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', border: '2px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: '#0A1F44', margin: '0 0 10px', fontFamily: '"Plus Jakarta Sans",sans-serif' }}>Account Created!</h3>
                <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 20px', lineHeight: 1.6, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
                  Your channel partner account is ready. Our team will contact you within 24 hours to complete KYC and activate payouts.
                </p>
                <div style={{ background: '#FEF9EC', borderRadius: 12, padding: '14px 20px', border: '1px solid #D4AF3740', marginBottom: 24 }}>
                  <p style={{ margin: 0, fontSize: 13.5, color: '#92400e', fontWeight: 600 }}>Sign in now to access your partner dashboard.</p>
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/login')}
                    style={{ padding: '12px 32px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#0A1F44,#1e3a6e)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 20px rgba(10,31,68,0.22)' }}>
                    Go to Partner Login →
                  </button>
                  <button onClick={() => navigate('/')}
                    style={{ padding: '12px 28px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#fff', color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Back to Home
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e2e8f0', boxShadow: '0 8px 48px rgba(10,31,68,0.09)', overflow: 'hidden' }}>

                  {/* Card header — same as CustomerRegistrationSection */}
                  <div style={{ padding: '24px 32px 20px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FEF9EC', borderRadius: 100, padding: '5px 16px', border: '1px solid #D4AF3740', marginBottom: 12 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4AF37' }} />
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Channel Partner Registration</span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: 'clamp(1.3rem,2.5vw,1.6rem)', fontWeight: 900, color: '#0A1F44', fontFamily: '"Plus Jakarta Sans",sans-serif', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                      Create Your Partner Account
                    </h2>
                    <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                      Complete once — start earning commissions immediately after KYC
                    </p>
                  </div>

                  <div style={{ padding: '28px 32px 28px' }}>
                    {apiError && (
                      <Alert type="error" message={apiError} showIcon closable onClose={() => setApiError(null)}
                        style={{ marginBottom: 20, borderRadius: 10 }} />
                    )}

                    {/* ── Section label helper ── */}
                    {(() => {
                      const SL = ({ children }: { children: React.ReactNode }) => (
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#0A1F44', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, marginTop: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ width: 18, height: 2, background: '#D4AF37', borderRadius: 2, flexShrink: 0 }} />
                          {children}
                        </div>
                      );

                      return (
                        <ConfigProvider theme={antTheme}>
                          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>

                            <SL>Personal &amp; Business Details</SL>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>

                              <F label="Full Name" error={errors.name?.message}>
                                <Controller name="name" control={control}
                                  render={({ field }) => (
                                    <input {...field} placeholder="Your full name" autoComplete="off" style={inp}
                                      onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                      onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                                  )} />
                              </F>

                              <F label="Email Address" error={errors.email?.message}>
                                <Controller name="email" control={control}
                                  render={({ field }) => (
                                    <input {...field} type="email" placeholder="you@email.com" autoComplete="off" style={inp}
                                      onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                      onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                                  )} />
                              </F>

                              <F label="Mobile Number" error={errors.mobile?.message}>
                                <Controller name="mobile" control={control}
                                  render={({ field }) => (
                                    <div style={{ display: 'flex' }}>
                                      <div style={{ ...inp, width: 52, height: 42, borderRadius: '10px 0 0 10px', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: 12.5, flexShrink: 0, padding: 0 }}>+91</div>
                                      <input {...field} type="tel" placeholder="98765 43210" maxLength={10} autoComplete="off"
                                        style={{ ...inp, borderRadius: '0 10px 10px 0', flex: 1 }}
                                        onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                        onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                                    </div>
                                  )} />
                              </F>

                              <F label="Business / Firm Name" error={errors.businessName?.message}>
                                <Controller name="businessName" control={control}
                                  render={({ field }) => (
                                    <input {...field} placeholder="Your firm name" autoComplete="off" style={inp}
                                      onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                      onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                                  )} />
                              </F>

                              <F label="City" error={errors.city?.message}>
                                <Controller name="city" control={control}
                                  render={({ field }) => (
                                    <input {...field} placeholder="e.g. Jaipur, Mumbai" autoComplete="off" style={inp}
                                      onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                      onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                                  )} />
                              </F>

                              <F label="Years of Experience" error={errors.yearsOfExperience?.message}>
                                <Controller name="yearsOfExperience" control={control}
                                  render={({ field }) => (
                                    <div style={{ display: 'flex' }}>
                                      <InputNumber {...field} min={0} max={50} placeholder="0"
                                        style={{ flex: 1, height: 42, borderRadius: '10px 0 0 10px', borderRight: 'none', background: '#f8fafc', fontSize: 13 }} />
                                      <div style={{ ...inp, width: 46, height: 42, borderRadius: '0 10px 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: '#475569', fontWeight: 700, fontSize: 12, flexShrink: 0, padding: 0 }}>yrs</div>
                                    </div>
                                  )} />
                              </F>
                            </div>

                            <F label="Interested Loan Products" error={(errors.interestedProducts as any)?.message}>
                              <Controller name="interestedProducts" control={control}
                                render={({ field }) => (
                                  <Select {...field} mode="multiple" options={LOAN_PRODUCTS}
                                    placeholder="Select the loan products you want to source"
                                    allowClear style={{ width: '100%' }} />
                                )} />
                            </F>

                            <F label="Message (optional)">
                              <Controller name="message" control={control}
                                render={({ field }) => (
                                  <textarea {...field} rows={3} placeholder="Tell us about your client base and any specific requirements..."
                                    maxLength={500}
                                    style={{ ...inp, height: 'auto', resize: 'vertical', padding: '10px 14px', lineHeight: 1.6 }}
                                    onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                    onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')} />
                                )} />
                            </F>

                            {/* Password section */}
                            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 20, marginTop: 4 }}>
                              <SL>Set Your Login Password</SL>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                                <F label="Password" error={errors.password?.message}>
                                  <Controller name="password" control={control}
                                    render={({ field }) => (
                                      <Input.Password {...field}
                                        prefix={<Lock size={14} style={{ color: '#94a3b8' }} />}
                                        placeholder="Min. 8 characters"
                                        autoComplete="new-password"
                                        style={{ ...inp, padding: '0 12px' }}
                                        onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                        onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                                        iconRender={v => v ? <Eye size={14} /> : <EyeOff size={14} />} />
                                    )} />
                                </F>
                                <F label="Confirm Password" error={errors.confirmPassword?.message}>
                                  <Controller name="confirmPassword" control={control}
                                    render={({ field }) => (
                                      <Input.Password {...field}
                                        prefix={<Lock size={14} style={{ color: '#94a3b8' }} />}
                                        placeholder="Re-enter your password"
                                        autoComplete="new-password"
                                        style={{ ...inp, padding: '0 12px' }}
                                        onFocus={e => (e.currentTarget.style.borderColor = '#D4AF37')}
                                        onBlur={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
                                        iconRender={v => v ? <Eye size={14} /> : <EyeOff size={14} />} />
                                    )} />
                                </F>
                              </div>
                            </div>

                            {/* Submit — same button style as landing page Continue button */}
                            <button type="submit" disabled={loading}
                              style={{ width: '100%', padding: '14px 20px', borderRadius: 12, border: 'none', background: loading ? '#94a3b8' : 'linear-gradient(135deg,#0A1F44,#1e3a6e)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.01em', boxShadow: loading ? 'none' : '0 6px 20px rgba(10,31,68,0.22)', fontFamily: 'Inter, sans-serif' }}>
                              {loading ? 'Creating your account…' : 'Create Partner Account →'}
                            </button>

                            <p style={{ textAlign: 'center', fontSize: 11.5, color: '#94a3b8', marginTop: 14, marginBottom: 0, fontWeight: 500 }}>
                              By registering, you agree to our Terms of Service and Privacy Policy.
                            </p>
                          </form>
                        </ConfigProvider>
                      );
                    })()}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const PartnerRegistration: React.FC = () => (
  <AntdApp>
    <PartnerRegistrationInner />
  </AntdApp>
);

export default PartnerRegistration;
