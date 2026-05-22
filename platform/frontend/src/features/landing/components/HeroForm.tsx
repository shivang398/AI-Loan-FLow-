import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Checkbox, Button, App as AntdApp } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { heroFormSchema, type HeroFormData } from '../schemas/landingSchemas';
import { captureLead } from '../api/landingApi';
import { ShieldCheck, Sparkles } from 'lucide-react';

const LOAN_TYPES = [
  { value: 'personal',  label: 'Personal Loan' },
  { value: 'education', label: 'Education Loan (via Saral Vidya)' },
  { value: 'business',  label: 'Business Loan (via Real Finserv)' },
];

const HeroForm: React.FC = () => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: { loanType: 'personal', loanAmount: 500000, consent: false },
  });

  const onSubmit = async (data: HeroFormData) => {
    setLoading(true);
    try {
      const res = await captureLead(data);
      if (res.success) {
        message.success('Thank you! Our advisor will call you within 30 minutes.');
        reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: 24,
      padding: '36px 30px',
      boxShadow: '0 32px 80px rgba(10,31,68,.28), 0 0 0 1px rgba(212,175,55,.12)',
      border: '1px solid rgba(212,175,55,.15)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(to right, #D4AF37, #f5d16a, #D4AF37)' }} />

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Sparkles size={16} color="#D4AF37" />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Free Advisory</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 22, color: '#0A1F44', lineHeight: 1.2 }}>
          Check Your Eligibility
        </h3>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748B' }}>
          Get your best personal loan offer in minutes — zero fees
        </p>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <Form.Item
          label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Full Name</span>}
          validateStatus={errors.fullName ? 'error' : ''}
          help={errors.fullName?.message}
          style={{ marginBottom: 16 }}
        >
          <Controller name="fullName" control={control} render={({ field }) => (
            <Input {...field} placeholder="Rajesh Kumar" size="large" style={{ borderRadius: 10, fontSize: 14 }} />
          )} />
        </Form.Item>

        {/* Mobile */}
        <Form.Item
          label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Mobile Number</span>}
          validateStatus={errors.mobile ? 'error' : ''}
          help={errors.mobile?.message}
          style={{ marginBottom: 16 }}
        >
          <Controller name="mobile" control={control} render={({ field }) => (
            <Input {...field} addonBefore="+91" placeholder="98765 43210" maxLength={10} size="large" style={{ borderRadius: 10 }} />
          )} />
        </Form.Item>

        {/* Row: Loan Type + Amount */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Form.Item
            label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Loan Type</span>}
            validateStatus={errors.loanType ? 'error' : ''}
            help={errors.loanType?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller name="loanType" control={control} render={({ field }) => (
              <Select {...field} options={LOAN_TYPES} placeholder="Select type" size="large" style={{ borderRadius: 10 }} />
            )} />
          </Form.Item>
          <Form.Item
            label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Loan Amount</span>}
            validateStatus={errors.loanAmount ? 'error' : ''}
            help={errors.loanAmount?.message}
            style={{ marginBottom: 16 }}
          >
            <Controller name="loanAmount" control={control} render={({ field }) => (
              <InputNumber
                {...field} prefix="₹" style={{ width: '100%', borderRadius: 10 }} size="large"
                min={50000} max={100000000} step={100000}
                formatter={v => v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                parser={v => parseFloat((v || '').replace(/,/g, '')) as never}
                placeholder="5,00,000"
              />
            )} />
          </Form.Item>
        </div>

        {/* Consent */}
        <Form.Item validateStatus={errors.consent ? 'error' : ''} help={errors.consent?.message} style={{ marginBottom: 20 }}>
          <Controller name="consent" control={control} render={({ field }) => (
            <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)}>
              <span style={{ fontSize: 12, color: '#64748B' }}>I agree to be contacted via call / WhatsApp / SMS</span>
            </Checkbox>
          )} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={loading}
          style={{ background: 'linear-gradient(135deg, #0A1F44, #1a3a6e)', borderColor: '#0A1F44', borderRadius: 12, fontWeight: 800, height: 52, fontSize: 16, boxShadow: '0 4px 20px rgba(10,31,68,.25)' }}>
          Get My Best Offer →
        </Button>
      </Form>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        <ShieldCheck size={13} color="#10B981" />
        <span style={{ fontSize: 11, color: '#94A3B8' }}>Your data is encrypted &amp; never shared without consent</span>
      </div>
    </div>
  );
};

export default HeroForm;
