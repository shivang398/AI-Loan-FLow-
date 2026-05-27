import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Checkbox, Form, Alert } from 'antd';
import { Lock, Mail, ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginFormValues } from '../../schemas/authSchemas';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';
import api from '../../shared/services/apiClient';
import { RootState } from '../../store';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Redirect already-authenticated users to their dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      let targetPath = '/dashboard';
      if (user.role === 'RM') targetPath = '/rm/dashboard';
      else if (user.role === 'TEAM_LEADER') targetPath = '/tl/dashboard';
      else if (user.role === 'OPERATIONS') targetPath = '/ops/dashboard';
      else if (user.role === 'CONNECTOR') targetPath = '/connector/dashboard';
      else if (user.role === 'PARTNER_MANAGER') targetPath = '/pm/partners';
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });


  const onLogin = async (formData: LoginFormValues) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await api.post('auth/login', formData);
      const responseData = response.data?.data;
      const token = responseData?.token;
      const role = responseData?.role;
      const email = responseData?.email || formData.email;
      
      if (!token || !role) throw new Error('Invalid login response from server');
      
      const user = { id: responseData?.id || email, email, role };

      dispatch(setCredentials({ user, token }));

      // Dynamic redirection based on role
      let targetPath = '/dashboard';
      if (role === 'RM') targetPath = '/rm/dashboard';
      else if (role === 'TEAM_LEADER') targetPath = '/tl/dashboard';
      else if (role === 'OPERATIONS') targetPath = '/ops/dashboard';
      else if (role === 'CONNECTOR') targetPath = '/connector/dashboard';
      else if (role === 'PARTNER_MANAGER') targetPath = '/pm/partners';
      else if (role === 'ADMIN') targetPath = '/dashboard';

      navigate(targetPath, { replace: true });
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Invalid email or password. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const features = [
    { icon: TrendingUp, text: 'Real-time credit distribution analytics' },
    { icon: Users, text: 'Hierarchical multi-role access management' },
    { icon: Zap, text: 'Automated eligibility & compliance checks' },
  ];

  return (
    <div className="login-page">
      {/* ── Left Panel: Illustration ── */}
      <div className="login-page-illustration">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 12px 40px rgba(59,130,246,0.5)',
            }}>
              <ShieldCheck size={36} color="white" />
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            color: 'white', fontSize: '2.25rem', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px',
          }}>
            Real Money<br />Advisory Platform
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '1.0625rem',
            lineHeight: 1.7, margin: '0 0 48px', fontWeight: 400,
          }}>
            Enterprise-grade multi-bank distribution OS for managing India's credit lending ecosystem.
          </p>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
            {features.map(({ icon: Icon, text }, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '14px 18px',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(59,130,246,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="#60a5fa" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem', fontWeight: 500 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Badge */}
          <div style={{
            marginTop: 48,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '8px 18px',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', fontWeight: 500 }}>
              All systems operational · 99.98% uptime
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="login-form-panel">
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#eff6ff', borderRadius: 100,
              padding: '5px 14px', marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
              <span style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Secure Access
              </span>
            </div>
            <h1 style={{
              fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)',
              letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2,
            }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', margin: 0, fontWeight: 400 }}>
              Sign in to access your financial dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              style={{ borderRadius: 12, marginBottom: 24, border: 'none', background: '#fef2f2' }}
            />
          )}

          {/* Form */}
          <Form layout="vertical" onFinish={handleSubmit(onLogin)} size="large">
            <Form.Item
              label="Email address"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
              style={{ marginBottom: 16 }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<Mail size={16} style={{ color: 'var(--text-muted)', marginRight: 6 }} />}
                    placeholder="you@company.com"
                    style={{ height: 48, borderRadius: 12 }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
              style={{ marginBottom: 12 }}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<Lock size={16} style={{ color: 'var(--text-muted)', marginRight: 6 }} />}
                    placeholder="••••••••"
                    style={{ height: 48, borderRadius: 12 }}
                  />
                )}
              />
            </Form.Item>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <Controller
                name="remember"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox checked={value} onChange={onChange} style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                    Remember me
                  </Checkbox>
                )}
              />
              <a
                href="/forgot-password"
                style={{ color: '#3b82f6', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ height: 50, borderRadius: 12, fontWeight: 700, fontSize: 15, letterSpacing: '0.01em' }}
            >
              Sign In to Dashboard
            </Button>
          </Form>

          {/* Footer */}
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: 0 }}>
              Don't have access?{' '}
              <a href="mailto:admin@realmoney.in" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                Contact administrator
              </a>
            </p>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop: 40, paddingTop: 24,
            borderTop: '1px solid var(--surface-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
          }}>
            {['ISO 27001', 'SOC 2', '256-bit TLS'].map(badge => (
              <span key={badge} style={{
                fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
