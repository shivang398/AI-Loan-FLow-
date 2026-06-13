import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Result } from 'antd';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import apiClient from '../../shared/services/apiClient';

const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email: values.email });
    } catch {
      // always show success — prevents email enumeration
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <Card style={{ width: 420, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,.10)', textAlign: 'center' }}>
          <Result
            status="success"
            title="Check your email"
            subTitle="If that email address is registered, a reset link has been sent."
            extra={<Link to="/login"><Button type="primary" style={{ borderRadius: 10 }}>Back to Login</Button></Link>}
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <Card style={{ width: 420, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,.10)', padding: '8px 0' }}>
        <div style={{ padding: '0 24px 24px' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 6 }}>Forgot Password</Title>
          <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 28 }}>
            Enter your work email and we'll send you a reset link.
          </Text>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
              <Input prefix={<Mail size={16} style={{ color: '#94a3b8' }} />} size="large" placeholder="you@realmoneygroups.in" style={{ borderRadius: 10 }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ borderRadius: 10, marginTop: 4 }}>
              Send Reset Link
            </Button>
          </Form>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link to="/login" style={{ color: '#64748b', fontSize: 14 }}>← Back to login</Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
