import React, { useState } from 'react';
import { Form, Select, Slider, Radio, InputNumber, Button, Tag, Card, App as AntdApp } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { eligibilitySchema, type EligibilityFormData } from '../schemas/landingSchemas';
import { checkEligibility, type EligibilityResult } from '../api/landingApi';
import { formatINR, formatINRShort } from '../../../lib/formatIndianCurrency';
import FoirGauge from './FoirGauge';
import { BarChart2 } from 'lucide-react';

const LOAN_TYPES = [
  { value: 'home', label: 'Home Loan' }, { value: 'personal', label: 'Personal Loan' },
  { value: 'business', label: 'Business Loan' }, { value: 'lap', label: 'Loan Against Property' },
  { value: 'car', label: 'Car Loan' }, { value: 'education', label: 'Education Loan' },
];
const STATUS_CFG = {
  ELIGIBLE:     { color: 'success', label: 'Highly Eligible' },
  BORDERLINE:   { color: 'warning', label: 'Borderline Case' },
  NOT_ELIGIBLE: { color: 'error',   label: 'Currently Ineligible' },
} as const;

const EligibilityWidget: React.FC = () => {
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: { loanType: 'personal', loanAmount: 500000, monthlyIncome: 50000, employmentType: 'SALARIED', existingEmi: 0 },
  });
  const loanAmount    = watch('loanAmount');
  const monthlyIncome = watch('monthlyIncome');

  const onSubmit = async (data: EligibilityFormData) => {
    setLoading(true);
    try { setResult(await checkEligibility(data)); }
    catch { message.error('Unable to check eligibility. Please try again.'); }
    finally { setLoading(false); }
  };

  const sliderStyle = { trackStyle: { background: '#D4AF37' }, handleStyle: { borderColor: '#D4AF37', boxShadow: '0 0 0 2px rgba(212,175,55,.2)' } };

  return (
    <section id="eligibility" style={{ background: '#F8FAFC', padding: '88px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-block', background: 'rgba(10,31,68,.07)', color: '#0A1F44', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100, marginBottom: 12 }}>Quick Check</span>
          <h2 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#0A1F44', margin: '8px 0' }}>Check Loan Eligibility</h2>
          <p style={{ color: '#64748B', fontSize: 16 }}>Get an instant estimate based on your income profile</p>
        </div>

        <div className="grid-2">
          {/* Form */}
          <Card style={{ borderRadius: 20, border: '1.5px solid #E2E8F0', boxShadow: '0 4px 24px rgba(10,31,68,.06)' }}>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)} noValidate>
              <Form.Item label={<b>Loan Type</b>} validateStatus={errors.loanType ? 'error' : ''} help={errors.loanType?.message}>
                <Controller name="loanType" control={control} render={({ field }) => <Select {...field} options={LOAN_TYPES} size="large" />} />
              </Form.Item>
              <Form.Item label={<span><b>Loan Amount</b> <span style={{ color: '#D4AF37', fontWeight: 700 }}>{formatINRShort(loanAmount)}</span></span>}>
                <Controller name="loanAmount" control={control} render={({ field }) => (
                  <Slider min={50000} max={10000000} step={50000} value={field.value} onChange={field.onChange} tooltip={{ formatter: v => formatINRShort(v ?? 0) }} {...sliderStyle} />
                )} />
              </Form.Item>
              <Form.Item label={<span><b>Monthly Income</b> <span style={{ color: '#D4AF37', fontWeight: 700 }}>{formatINR(monthlyIncome)}</span></span>}>
                <Controller name="monthlyIncome" control={control} render={({ field }) => (
                  <Slider min={15000} max={1000000} step={5000} value={field.value} onChange={field.onChange} tooltip={{ formatter: v => formatINR(v ?? 0) }} {...sliderStyle} />
                )} />
              </Form.Item>
              <Form.Item label={<b>Employment Type</b>}>
                <Controller name="employmentType" control={control} render={({ field }) => (
                  <Radio.Group {...field}>
                    <Radio value="SALARIED">Salaried</Radio>
                    <Radio value="SELF_EMPLOYED">Self-Employed</Radio>
                  </Radio.Group>
                )} />
              </Form.Item>
              <Form.Item label={<b>Existing Monthly EMI (₹)</b>}>
                <Controller name="existingEmi" control={control} render={({ field }) => (
                  <InputNumber {...field} prefix="₹" style={{ width: '100%' }} min={0} max={1000000} step={1000} size="large"
                    formatter={v => v ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}
                    parser={v => parseFloat((v || '').replace(/,/g, '')) as never} />
                )} />
              </Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading}
                style={{ background: '#0A1F44', borderColor: '#0A1F44', borderRadius: 10, fontWeight: 700, height: 50 }}>
                Check Eligibility
              </Button>
            </Form>
          </Card>

          {/* Result */}
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .3 }}>
                <Card style={{ borderRadius: 20, border: '1.5px solid #E2E8F0', boxShadow: '0 4px 24px rgba(10,31,68,.06)', height: '100%' }}>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6, fontWeight: 500 }}>Max Eligible Amount</div>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 44, color: '#D4AF37', lineHeight: 1 }}>
                      {formatINRShort(result.maxEligibleAmount)}
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <Tag color={STATUS_CFG[result.status].color} style={{ fontSize: 13, padding: '4px 14px', borderRadius: 20 }}>
                        {STATUS_CFG[result.status].label}
                      </Tag>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <FoirGauge foir={result.foirPercentage} />
                  </div>
                  <div style={{ background: 'rgba(10,31,68,.05)', borderRadius: 12, padding: '16px', textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 28, color: '#0A1F44' }}>{result.matchingLenders}</div>
                    <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>Matching Lenders Found</div>
                  </div>
                  <Button type="primary" block size="large" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ background: '#D4AF37', borderColor: '#D4AF37', color: '#0A1F44', fontWeight: 700, borderRadius: 10, height: 48 }}>
                    View Detailed Offers
                  </Button>
                </Card>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, gap: 16 }}>
                <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(212,175,55,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart2 size={44} color="#D4AF37" strokeWidth={1.5} />
                </div>
                <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 15, lineHeight: 1.65, maxWidth: 280, margin: 0 }}>
                  Fill in your details and click <strong style={{ color: '#0A1F44' }}>Check Eligibility</strong> to see your personalised loan estimate
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default EligibilityWidget;
