import React, { useState } from 'react';
import {
  Form, Input, InputNumber, Select, Button, App as AntdApp, ConfigProvider, Card, Space,
} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
  token: { colorPrimary: '#0A1F44', colorLink: '#D4AF37', borderRadius: 8, fontFamily: 'Inter, sans-serif' },
};

const PartnerRegistrationInner: React.FC = () => {
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PartnerRegistrationData>({
    resolver: zodResolver(partnerRegistrationSchema),
    defaultValues: { interestedProducts: [], yearsOfExperience: 0 },
  });

  const onSubmit = async (data: PartnerRegistrationData) => {
    setLoading(true);
    try {
      const result = await registerPartner(data);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      }
    } catch {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: 'linear-gradient(135deg, #0A1F44 0%, #1a3a6e 100%)' }}
    >
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8 flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm font-medium bg-transparent border-none cursor-pointer"
          style={{ color: '#CBD5E1' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-sm font-medium bg-transparent border-none cursor-pointer"
          style={{ color: '#D4AF37', fontWeight: 700 }}
        >
          Already have an account? <span style={{ textDecoration: 'underline' }}>Login →</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#D4AF37' }}>
              <IndianRupee size={24} color="#0A1F44" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-2xl font-extrabold" style={{ color: '#FFFFFF', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Real Money
              </div>
              <div className="text-sm" style={{ color: '#D4AF37' }}>Channel Partner Registration</div>
            </div>
          </div>
          <p style={{ color: '#94A3B8' }}>Join our network and start earning industry-best commissions</p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle2 size={64} color="#10B981" className="mx-auto mb-6" />
              <h2
                className="text-2xl font-extrabold mb-3"
                style={{ color: '#FFFFFF', fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Registration Successful!
              </h2>
              <p style={{ color: '#94A3B8' }}>
                Thank you for registering! Our team will contact you within 24 hours to onboard you as a channel partner.
              </p>
              <p className="text-sm mt-4" style={{ color: '#64748B' }}>
                Redirecting to home page in 3 seconds...
              </p>
              <button
                onClick={() => navigate('/login')}
                style={{ marginTop: 16, background: '#D4AF37', border: 'none', borderRadius: 8, padding: '10px 24px', color: '#0A1F44', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
              >
                Go to Platform Login →
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card style={{ borderRadius: 16, border: 'none' }}>
                <Form layout="vertical" size="large" onFinish={handleSubmit(onSubmit)} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    {/* Name */}
                    <Form.Item
                      label="Full Name"
                      validateStatus={errors.name ? 'error' : ''}
                      help={errors.name?.message}
                    >
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Your full name" />}
                      />
                    </Form.Item>

                    {/* Email */}
                    <Form.Item
                      label="Email Address"
                      validateStatus={errors.email ? 'error' : ''}
                      help={errors.email?.message}
                    >
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="you@email.com" type="email" />}
                      />
                    </Form.Item>

                    {/* Mobile */}
                    <Form.Item
                      label="Mobile Number"
                      validateStatus={errors.mobile ? 'error' : ''}
                      help={errors.mobile?.message}
                    >
                      <Controller
                        name="mobile"
                        control={control}
                        render={({ field }) => (
                          <Space.Compact style={{ width: '100%' }}>
                              <Input value="+91" disabled style={{ width: 52, background: '#F8FAFC', color: '#334155', fontWeight: 600 }} />
                              <Input {...field} placeholder="98765 43210" maxLength={10} style={{ flex: 1 }} />
                            </Space.Compact>
                        )}
                      />
                    </Form.Item>

                    {/* Business Name */}
                    <Form.Item
                      label="Business / Firm Name"
                      validateStatus={errors.businessName ? 'error' : ''}
                      help={errors.businessName?.message}
                    >
                      <Controller
                        name="businessName"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Your firm name" />}
                      />
                    </Form.Item>

                    {/* City */}
                    <Form.Item
                      label="City"
                      validateStatus={errors.city ? 'error' : ''}
                      help={errors.city?.message}
                    >
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder="Jaipur" />}
                      />
                    </Form.Item>

                    {/* Years of Experience */}
                    <Form.Item
                      label="Years of Experience"
                      validateStatus={errors.yearsOfExperience ? 'error' : ''}
                      help={errors.yearsOfExperience?.message}
                    >
                      <Controller
                        name="yearsOfExperience"
                        control={control}
                        render={({ field }) => (
                          <InputNumber
                            {...field}
                            style={{ width: '100%' }}
                            min={0}
                            max={50}
                            placeholder="5"
                            suffix="years"
                          />
                        )}
                      />
                    </Form.Item>
                  </div>

                  {/* Interested Products (full width) */}
                  <Form.Item
                    label="Interested Loan Products"
                    validateStatus={errors.interestedProducts ? 'error' : ''}
                    help={errors.interestedProducts?.message}
                  >
                    <Controller
                      name="interestedProducts"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          mode="multiple"
                          options={LOAN_PRODUCTS}
                          placeholder="Select loan products you want to source"
                          allowClear
                        />
                      )}
                    />
                  </Form.Item>

                  {/* Message */}
                  <Form.Item label="Message (optional)">
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <Input.TextArea
                          {...field}
                          rows={3}
                          placeholder="Tell us about your client base and any specific requirements..."
                          maxLength={500}
                          showCount
                        />
                      )}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    style={{
                      background: '#0A1F44',
                      borderColor: '#0A1F44',
                      borderRadius: 8,
                      fontWeight: 700,
                      height: 52,
                      fontSize: 16,
                    }}
                  >
                    Submit Registration
                  </Button>

                  <p className="text-xs text-center mt-3" style={{ color: '#94A3B8' }}>
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
