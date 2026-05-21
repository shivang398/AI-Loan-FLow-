import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Checkbox, Button, App as AntdApp } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { heroFormSchema, type HeroFormData } from '../schemas/landingSchemas';
import { captureLead } from '../api/landingApi';
import { ShieldCheck } from 'lucide-react';

const LOAN_TYPES = [
  { value: 'home',      label: 'Home Loan' },
  { value: 'personal',  label: 'Personal Loan' },
  { value: 'business',  label: 'Business Loan' },
  { value: 'lap',       label: 'Loan Against Property' },
  { value: 'car',       label: 'Car Loan' },
  { value: 'education', label: 'Education Loan' },
];

const HeroForm: React.FC = () => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: { loanAmount: 1000000, consent: false },
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
      borderRadius: 20,
      padding: '32px 28px',
      boxShadow: '0 24px 64px rgba(10,31,68,.24)',
      border: '1px solid rgba(255,255,255,.12)',
    }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 20, color: '#0A1F44' }}>
          Check Your Loan Eligibility
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748B' }}>
          Free advisory &nbsp;·&nbsp; No hidden charges &nbsp;·&nbsp; 50+ lenders
        </p>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} noValidate>
        {/* Full Name */}
        <Form.Item label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Full Name</span>}
          validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message} style={{ marginBottom: 16 }}>
          <Controller name="fullName" control={control} render={({ field }) => (
            <Input {...field} placeholder="Rajesh Kumar" size="large" style={{ borderRadius: 8 }} />
          )} />
        </Form.Item>

        {/* Mobile */}
        <Form.Item label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Mobile Number</span>}
          validateStatus={errors.mobile ? 'error' : ''} help={errors.mobile?.message} style={{ marginBottom: 16 }}>
          <Controller name="mobile" control={control} render={({ field }) => (
            <Input {...field} addonBefore="+91" placeholder="98765 43210" maxLength={10} size="large" style={{ borderRadius: 8 }} />
          )} />
        </Form.Item>

        {/* Row: Loan Type + Amount */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Form.Item label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Loan Type</span>}
            validateStatus={errors.loanType ? 'error' : ''} help={errors.loanType?.message} style={{ marginBottom: 16 }}>
            <Controller name="loanType" control={control} render={({ field }) => (
              <Select {...field} options={LOAN_TYPES} placeholder="Select type" size="large" style={{ borderRadius: 8 }} />
            )} />
          </Form.Item>
          <Form.Item label={<span style={{ fontWeight: 600, color: '#334155', fontSize: 13 }}>Loan Amount</span>}
            validateStatus={errors.loanAmount ? 'error' : ''} help={errors.loanAmount?.message} style={{ marginBottom: 16 }}>
            <Controller name="loanAmount" control={control} render={({ field }) => (
              <InputNumber
                {...field} prefix="₹" style={{ width: '100%', borderRadius: 8 }} size="large"
                min={50000} max={100000000} step={100000}
                formatter={v => v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                parser={v => parseFloat((v || '').replace(/,/g, '')) as never}
                placeholder="10,00,000"
              />
            )} />
          </Form.Item>
        </div>

        {/* Consent */}
        <Form.Item validateStatus={errors.consent ? 'error' : ''} help={errors.consent?.message} style={{ marginBottom: 18 }}>
          <Controller name="consent" control={control} render={({ field }) => (
            <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)}>
              <span style={{ fontSize: 12, color: '#64748B' }}>I agree to be contacted via call / WhatsApp / SMS</span>
            </Checkbox>
          )} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={loading}
          style={{ background: '#0A1F44', borderColor: '#0A1F44', borderRadius: 10, fontWeight: 700, height: 50, fontSize: 16 }}>
          Check My Eligibility →
        </Button>
      </Form>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        <ShieldCheck size={13} color="#10B981" />
        <span style={{ fontSize: 11, color: '#94A3B8' }}>Your data is encrypted & never shared without consent</span>
      </div>
    </div>
  );
};

export default HeroForm;
