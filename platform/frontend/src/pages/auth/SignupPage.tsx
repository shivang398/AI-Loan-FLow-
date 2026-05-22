import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Form, Alert, message } from 'antd';
import { Lock, Mail, ShieldCheck, TrendingUp, Users, Zap, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupSchema, SignupFormValues } from '../../schemas/authSchemas';
import { setLoading, setError } from '../../store/slices/authSlice';
import api from '../../shared/services/apiClient';
import { RootState } from '../../store';

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSignup = async (formData: SignupFormValues) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      await api.post('auth/register/partner', {
        email: formData.email,
        password: formData.password,
        role: 'CONNECTOR',
      });
      message.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.';
      dispatch(setError(msg));
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
      {/* ── Left Panel ── */}
      <div className="login-page-illustration">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 420 }}>
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

          <h1 style={{
            color: 'white', fontSize: '2.25rem', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 16px',
          }}>
            Become a Channel<br />Partner Today
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '1.0625rem',
            lineHeight: 1.7, margin: '0 0 48px', fontWeight: 400,
          }}>
            Join Real Money Advisory's network of certified channel partners and grow your lending business.
          </p>

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

          <div style={{ marginTop: 36, padding: '14px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: 'white' }}>Note:</strong> This registration is for Channel Partners (Connectors) only. For RM, Team Leader, or Operations access, contact your system administrator.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Form ── */}
      <div className="login-form-panel">
        <div style={{ width: '100%', maxWidth: 440 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f0fdf4', borderRadius: 100,
              padding: '5px 14px', marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Partner Registration
              </span>
            </div>
            <h1 style={{
              fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)',
              letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2,
            }}>
              Create your account
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', margin: 0, fontWeight: 400 }}>
              Register as a Real Money channel partner
            </p>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => dispatch(setError(null))}
              style={{ borderRadius: 12, marginBottom: 24, border: 'none', background: '#fef2f2' }}
            />
          )}

          <Form layout="vertical" onFinish={handleSubmit(onSignup)} size="large">
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
              style={{ marginBottom: 16 }}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<Lock size={16} style={{ color: 'var(--text-muted)', marginRight: 6 }} />}
                    placeholder="Min. 8 characters"
                    style={{ height: 48, borderRadius: 12 }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              validateStatus={errors.confirmPassword ? 'error' : ''}
              help={errors.confirmPassword?.message}
              style={{ marginBottom: 24 }}
            >
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<Lock size={16} style={{ color: 'var(--text-muted)', marginRight: 6 }} />}
                    placeholder="Re-enter password"
                    style={{ height: 48, borderRadius: 12 }}
                  />
                )}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={<UserPlus size={18} style={{ marginRight: 4 }} />}
              style={{ height: 50, borderRadius: 12, fontWeight: 700, fontSize: 15, letterSpacing: '0.01em' }}
            >
              Create Partner Account
            </Button>
          </Form>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', margin: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                Sign in here
              </Link>
            </p>
          </div>

          <div style={{
            marginTop: 32, paddingTop: 20,
            borderTop: '1px solid var(--surface-3)',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: 0 }}>
              Need admin or manager access?{' '}
              <a href="mailto:admin@realmoney.in" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none' }}>
                Contact administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
