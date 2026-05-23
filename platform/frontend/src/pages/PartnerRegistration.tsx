import React, { useState } from 'react';
import {
  Form, Input, InputNumber, Select, Button, App as AntdApp, ConfigProvider, Card, Space, Alert,
} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerRegistrationSchema, type PartnerRegistrationData } from '../features/landing/schemas/landingSchemas';
import { registerPartner } from '../features/landing/api/landingApi';

const LOAN_PRODUCTS = [
  { value: 'home', label: 'Home Loan' },
  { value: 'personal', label: 'Personal Loan' },
  { value: 'business', label: 'Business Loan' },
  { value: 'lap', label: 'Loan Against Property' },
  { value: 'car', label: 'Car Loan' },
  { value: 'education', label: 'Education Loan' },
];

const landingTheme = {
  token: {
    colorPrimary: '#0A1F44',
    colorLink: '#D4AF37',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
  },
};

const fieldStyle: React.CSSProperties = { height: 46, borderRadius: 8 };

const PartnerRegistrationInner: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerRegistrationData>({
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
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Registration failed. Please try again.';
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A1F44 0%, #1a3a6e 100%)',
        padding: '48px 16px',
      }}
    >
      {/* Top Nav */}
      <div style={{ maxWidth: 680, margin: '0 auto 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', cursor: 'pointer', color: '#CBD5E1', fontSize: 14, fontWeight: 500 }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#D4AF37', fontWeight: 700, fontSize: 14 }}
        >
          Already have an account? <span style={{ textDecoration: 'underline' }}>Login →</span>
        </button>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: '#D4AF37',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(212,175,55,0.35)',
            }}>
              <IndianRupee size={26} color="#0A1F44" strokeWidth={2.5} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Real Money
              </div>
              <div style={{ fontSize: 13, color: '#D4AF37', fontWeight: 600 }}>Channel Partner Registration</div>
            </div>
          </div>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>
            Join our network and start earning industry-best commissions
          </p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '60px 24px', background: 'white', borderRadius: 20 }}
            >
              <div style={{
                width: 80, height: 80, borderRadius: '50%', background: '#f0fdf4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <CheckCircle2 size={48} color="#10B981" />
              </div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
                Account Created Successfully!
              </h2>
              <p style={{ color: '#64748b', fontSize: 16, marginBottom: 8 }}>
                Your channel partner account is ready. Sign in with your email and the password you just set.
              </p>
              <div style={{
                background: '#f8fafc', borderRadius: 12, padding: '16px 24px',
                border: '1px solid #e2e8f0', display: 'inline-block', margin: '16px 0',
              }}>
                <p style={{ margin: 0, color: '#475569', fontSize: 14, fontWeight: 600 }}>
                  Our team will contact you within 24 hours to complete your KYC and activate payouts.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    background: '#0A1F44', border: 'none', borderRadius: 10,
                    padding: '12px 28px', color: 'white', fontWeight: 700,
                    cursor: 'pointer', fontSize: 15,
                  }}
                >
                  Go to Platform Login →
                </button>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: 'transparent', border: '1.5px solid #e2e8f0', borderRadius: 10,
                    padding: '12px 28px', color: '#475569', fontWeight: 600,
                    cursor: 'pointer', fontSize: 15,
                  }}
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <Card style={{ borderRadius: 20, border: 'none', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                {apiError && (
                  <Alert
                    type="error"
                    message={apiError}
                    showIcon
                    closable
                    onClose={() => setApiError(null)}
                    style={{ marginBottom: 24, borderRadius: 10 }}
                  />
                )}

                <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)} noValidate>

                  {/* ── Section: Personal & Business Info ── */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
                      Personal & Business Details
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 24px' }}>

                      <Form.Item label="Full Name" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
                        <Controller name="name" control={control}
                          render={({ field }) => <Input {...field} placeholder="Your full name" style={fieldStyle} />} />
                      </Form.Item>

                      <Form.Item label="Email Address" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
                        <Controller name="email" control={control}
                          render={({ field }) => <Input {...field} type="email" placeholder="you@email.com" style={fieldStyle} />} />
                      </Form.Item>

                      <Form.Item label="Mobile Number" validateStatus={errors.mobile ? 'error' : ''} help={errors.mobile?.message}>
                        <Controller name="mobile" control={control}
                          render={({ field }) => (
                            <Space.Compact style={{ width: '100%' }}>
                              <Input value="+91" disabled style={{ width: 56, background: '#F8FAFC', color: '#334155', fontWeight: 700, textAlign: 'center', height: 46 }} />
                              <Input {...field} placeholder="98765 43210" maxLength={10} style={{ flex: 1, height: 46 }} />
                            </Space.Compact>
                          )} />
                      </Form.Item>

                      <Form.Item label="Business / Firm Name" validateStatus={errors.businessName ? 'error' : ''} help={errors.businessName?.message}>
                        <Controller name="businessName" control={control}
                          render={({ field }) => <Input {...field} placeholder="Your firm name" style={fieldStyle} />} />
                      </Form.Item>

                      <Form.Item label="City" validateStatus={errors.city ? 'error' : ''} help={errors.city?.message}>
                        <Controller name="city" control={control}
                          render={({ field }) => <Input {...field} placeholder="e.g. Mumbai, Jaipur" style={fieldStyle} />} />
                      </Form.Item>

                      <Form.Item label="Years of Experience" validateStatus={errors.yearsOfExperience ? 'error' : ''} help={errors.yearsOfExperience?.message}>
                        <Controller name="yearsOfExperience" control={control}
                          render={({ field }) => (
                            <Space.Compact style={{ width: '100%' }}>
                              <InputNumber {...field} style={{ flex: 1, height: 46 }} min={0} max={50} placeholder="5" />
                              <Input value="years" disabled style={{ width: 58, height: 46, textAlign: 'center', background: '#F8FAFC', color: '#334155', fontWeight: 600 }} />
                            </Space.Compact>
                          )} />
                      </Form.Item>
                    </div>
                  </div>

                  {/* ── Loan Products ── */}
                  <Form.Item label="Interested Loan Products" validateStatus={errors.interestedProducts ? 'error' : ''} help={(errors.interestedProducts as any)?.message}>
                    <Controller name="interestedProducts" control={control}
                      render={({ field }) => (
                        <Select {...field} mode="multiple" options={LOAN_PRODUCTS} placeholder="Select the loan products you want to source" allowClear style={{ width: '100%' }} />
                      )} />
                  </Form.Item>

                  {/* ── Message ── */}
                  <Form.Item label="Message (optional)">
                    <Controller name="message" control={control}
                      render={({ field }) => (
                        <Input.TextArea {...field} rows={3} placeholder="Tell us about your client base and any specific requirements..." maxLength={500} showCount />
                      )} />
                  </Form.Item>

                  {/* ── Password Section ── */}
                  <div style={{
                    borderTop: '1px solid #e2e8f0', paddingTop: 24, marginTop: 8,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
                      Set Your Login Password
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0 24px' }}>
                      <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
                        <Controller name="password" control={control}
                          render={({ field }) => (
                            <Input.Password
                              {...field}
                              prefix={<Lock size={15} style={{ color: '#94a3b8', marginRight: 4 }} />}
                              placeholder="Min. 8 characters"
                              style={fieldStyle}
                              iconRender={visible => visible ? <Eye size={15} /> : <EyeOff size={15} />}
                            />
                          )} />
                      </Form.Item>

                      <Form.Item label="Confirm Password" validateStatus={errors.confirmPassword ? 'error' : ''} help={errors.confirmPassword?.message}>
                        <Controller name="confirmPassword" control={control}
                          render={({ field }) => (
                            <Input.Password
                              {...field}
                              prefix={<Lock size={15} style={{ color: '#94a3b8', marginRight: 4 }} />}
                              placeholder="Re-enter your password"
                              style={fieldStyle}
                              iconRender={visible => visible ? <Eye size={15} /> : <EyeOff size={15} />}
                            />
                          )} />
                      </Form.Item>
                    </div>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    style={{
                      background: 'linear-gradient(135deg, #0A1F44, #1a3a6e)',
                      border: 'none',
                      borderRadius: 10,
                      fontWeight: 700,
                      height: 52,
                      fontSize: 16,
                      marginTop: 8,
                      boxShadow: '0 8px 24px rgba(10,31,68,0.35)',
                    }}
                  >
                    {loading ? 'Creating your account...' : 'Create Partner Account'}
                  </Button>

                  <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 14, marginBottom: 0 }}>
                    By registering, you agree to our Terms of Service and Privacy Policy
                  </p>
                </Form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const PartnerRegistration: React.FC = () => (
  <ConfigProvider theme={landingTheme}>
    <AntdApp>
      <PartnerRegistrationInner />
    </AntdApp>
  </ConfigProvider>
);

export default PartnerRegistration;
