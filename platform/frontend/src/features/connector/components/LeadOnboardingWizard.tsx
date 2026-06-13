import React, { useState } from 'react';
import {
  Steps,
  Button,
  Form,
  Input,
  Card,
  Typography,
  Result,
  InputNumber,
  Tag,
  App,
} from 'antd';
import {
  User,
  FileText,
  IndianRupee,
  CheckCircle,
  Upload as UploadIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

const { Title, Text } = Typography;

const LeadOnboardingWizard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const next = () => {
    form.validateFields().then(() => setCurrent(c => c + 1)).catch(() => {});
  };
  const prev = () => setCurrent(c => c - 1);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      await apiClient.post('/customers', {
        firstName:        (values.fullName || '').split(' ')[0] || values.fullName,
        lastName:         (values.fullName || '').split(' ').slice(1).join(' ') || '-',
        email:            values.email || '',
        mobile:           (values.mobile || '').replace(/\D/g, '').slice(-10),
        panNumber:        (values.pan || '').toUpperCase(),
        loanType:         'PERSONAL',
        loanAmount:       values.loanAmount || null,
        netMonthlySalary: values.income || null,
        companyName:      values.employer || '',
      });
      setSubmitted(true);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Submission failed. Please try again.';
      message.error(String(msg).substring(0, 120));
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    {
      title: 'Details',
      icon: <User size={18} />,
      content: (
        <div className="space-y-4">
          <Form.Item name="fullName" label="Customer Full Name" rules={[{ required: true }]}>
            <Input size="large" placeholder="As per PAN card" className="rounded-xl" />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile Number" rules={[{ required: true }]}>
            <Input size="large" prefix="+91" placeholder="98765 43210" className="rounded-xl" />
          </Form.Item>
          <Form.Item name="email" label="Email Address">
            <Input size="large" placeholder="customer@example.com" className="rounded-xl" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'KYC',
      icon: <FileText size={18} />,
      content: (
        <div className="space-y-6">
          <Form.Item name="pan" label="PAN Number" rules={[{ required: true }]}>
            <Input size="large" placeholder="ABCDE1234F" className="rounded-xl uppercase" />
          </Form.Item>
          <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-blue-400 transition-colors">
            <UploadIcon size={32} className="mx-auto text-slate-300 mb-2" />
            <Text className="block font-medium">Upload PAN Copy</Text>
            <Text className="text-xs text-slate-400">PDF, JPG or PNG (Max 5MB)</Text>
            <Button type="primary" size="small" className="mt-4 rounded-lg bg-blue-600">Select File</Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Income',
      icon: <IndianRupee size={18} />,
      content: (
        <div className="space-y-4">
          <Form.Item name="income" label="Monthly Net Income" rules={[{ required: true }]}>
            <InputNumber 
              size="large" 
              className="w-full rounded-xl" 
              formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\₹\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item name="employer" label="Employer Name">
            <Input size="large" placeholder="Company Name Pvt Ltd" className="rounded-xl" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Review',
      icon: <CheckCircle size={18} />,
      content: (
        <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <Text type="secondary">Customer:</Text>
            <Text strong>Arjun Mehta</Text>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <Text type="secondary">Amount Requested:</Text>
            <Text strong>₹10,00,000</Text>
          </div>
          <div className="flex justify-between">
            <Text type="secondary">Documents:</Text>
            <Tag color="success">2 Files Ready</Tag>
          </div>
        </div>
      ),
    }
  ];

  if (submitted) {
    return (
      <Result
        status="success"
        title="Application Submitted Successfully!"
        subTitle="The Operations team will review the documents within 4 working hours."
        extra={[
          <Button type="primary" key="dashboard" className="bg-blue-600 rounded-lg">Go to Dashboard</Button>,
          <Button key="new" onClick={() => { setSubmitted(false); setCurrent(0); form.resetFields(); }}>Add Another Lead</Button>,
        ]}
      />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-none rounded-3xl overflow-hidden">
      <div className="p-8 bg-blue-600 text-white mb-8">
        <Title level={3} className="m-0 text-white">Add New Lead</Title>
        <Text className="text-blue-100">Quickly onboard a new customer for a loan application.</Text>
      </div>
      
      <div className="px-8 pb-8">
        <Steps 
          current={current} 
          items={steps.map(item => ({ title: item.title, icon: item.icon }))}
          className="mb-10"
        />
        
        <Form form={form} layout="vertical">
          <div className="min-h-[250px]">
            {steps[current].content}
          </div>
        </Form>

        <div className="flex justify-between mt-10">
          <Button 
            onClick={prev} 
            disabled={current === 0}
            icon={<ChevronLeft size={18} />}
            className="rounded-xl border-none bg-slate-100 flex items-center"
          >
            Back
          </Button>
          <Button
            type="primary"
            onClick={current === steps.length - 1 ? handleSubmit : next}
            loading={submitting}
            className="rounded-xl bg-blue-600 px-8 flex items-center gap-2"
          >
            {current === steps.length - 1 ? 'Submit Application' : 'Next'}
            {current < steps.length - 1 && <ChevronRight size={18} />}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LeadOnboardingWizard;
