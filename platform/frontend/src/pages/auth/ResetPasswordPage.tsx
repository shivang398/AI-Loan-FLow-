import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Result, App } from 'antd';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../../shared/services/apiClient';

const { Title } = Typography;

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <Card style={{ width: 420, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,.10)' }}>
          <Result
            status="error"
            title="Invalid Link"
            subTitle="This password reset link is invalid or has expired."
            extra={<Link to="/forgot-password"><Button type="primary" style={{ borderRadius: 10 }}>Request a new link</Button></Link>}
          />
        </Card>
      </div>
    );
  }

  const onFinish = async (values: { newPassword: string }) => {
    setLoading(true);
    try {
      await apiClient.post('/auth/reset-password', { token, newPassword: values.newPassword });
      message.success('Password reset successfully!');
      navigate('/login');
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || 'Reset failed. The link may have expired.';
      message.error(String(msg).substring(0, 120));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <Card style={{ width: 420, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,.10)', padding: '8px 0' }}>
        <div style={{ padding: '0 24px 24px' }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 28 }}>Set New Password</Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, min: 8, message: 'Password must be at least 8 characters' }]}
            >
              <Input.Password size="large" style={{ borderRadius: 10 }} placeholder="Min 8 characters" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) return Promise.resolve();
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password size="large" style={{ borderRadius: 10 }} placeholder="Repeat password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large" style={{ borderRadius: 10, marginTop: 4 }}>
              Reset Password
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
