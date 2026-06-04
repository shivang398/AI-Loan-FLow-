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

const RM_RED   = '#CC1B1B';
const RM_BLUE  = '#0F2B9F';
const RM_NAVY  = '#071560';

/* Brand globe mark — inline SVG, no external dependency */
const GlobeMark: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    {/* Blue arc top-left */}
    <path d="M10 32 C10 18 20 8 32 8 C44 8 54 18 54 32" stroke={RM_BLUE} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    {/* Red arc bottom-right */}
    <path d="M10 32 C10 46 20 56 32 56 C44 56 54 46 54 32" stroke={RM_RED} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    {/* Horizontal swoosh lines */}
    <path d="M7 26 Q32 33 57 26" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M7 38 Q32 31 57 38" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* R */}
    <text x="20" y="30" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="12" fill="white">R</text>
    {/* M */}
    <text x="31" y="43" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="12" fill="white">M</text>
  </svg>
);

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated && user) {
      const paths: Record<string, string> = {
        RM: '/rm/dashboard', TEAM_LEADER: '/tl/dashboard',
        OPERATIONS: '/ops/dashboard', CONNECTOR: '/connector/dashboard',
        PARTNER_MANAGER: '/pm/partners',
      };
      navigate(paths[user.role] ?? '/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onLogin = async (formData: LoginFormValues) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response   = await api.post('auth/login', formData);
      const data       = response.data?.data;
      const token      = data?.token;
      const role       = data?.role;
      const email      = data?.email || formData.email;
      if (!token || !role) throw new Error('Invalid login response from server');
      dispatch(setCredentials({ user: { id: data?.id || email, email, role }, token }));
      const paths: Record<string, string> = {
        RM: '/rm/dashboard', TEAM_LEADER: '/tl/dashboard',
        OPERATIONS: '/ops/dashboard', CONNECTOR: '/connector/dashboard',
        PARTNER_MANAGER: '/pm/partners', ADMIN: '/dashboard',
      };
      navigate(paths[role] ?? '/dashboard', { replace: true });
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Invalid email or password. Please try again.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const features = [
    { icon: TrendingUp, text: 'Real-time credit distribution analytics' },
    { icon: Users,      text: 'Hierarchical multi-role access management' },
    { icon: Zap,        text: 'Automated eligibility & compliance checks' },
  ];

  return (
    <div className="login-page">

      {/* ── Left Panel ── */}
      <div className="login-page-illustration">
        {/* Extra swoosh arcs behind content */}
        <svg style={{ position: 'absolute', top: '10%', right: '-80px', opacity: 0.08, pointerEvents: 'none' }} width="400" height="400" viewBox="0 0 400 400" fill="none">
          <ellipse cx="300" cy="200" rx="200" ry="180" stroke="white" strokeWidth="50" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 420 }}>
          {/* Logo mark */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <div style={{
              width: 88, height: 88, borderRadius: 24,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 16px 48px rgba(0,0,0,0.30)',
            }}>
              <GlobeMark size={64} />
            </div>
          </div>

          {/* Brand name */}
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-0.02em', color: 'white' }}>
              REAL{' '}
            </span>
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 900, fontSize: 30, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.70)' }}>
              MONEY
            </span>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.48)', fontSize: '0.9rem',
            lineHeight: 1.7, margin: '0 0 44px', fontWeight: 400,
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            Advisory Platform
          </p>

          {/* Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}>
            {features.map(({ icon: Icon, text }, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 14, padding: '13px 18px',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(204,27,27,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="#FFAAAA" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.9375rem', fontWeight: 500 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Status badge */}
          <div style={{
            marginTop: 44,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 100, padding: '8px 18px',
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            <span style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.8125rem', fontWeight: 500 }}>
              All systems operational · 99.98% uptime
            </span>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="login-form-panel">
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#F0F2FA', borderRadius: 100,
              padding: '5px 14px', marginBottom: 20,
            }}>
              <ShieldCheck size={13} color={RM_BLUE} />
              <span style={{ color: RM_BLUE, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Secure Access
              </span>
            </div>

            <h1 style={{
              fontSize: '2rem', fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2,
            }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', margin: 0, fontWeight: 400 }}>
              Sign in to your Real Money dashboard
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
          <Form layout="vertical" onFinish={handleSubmit(onLogin)} size="large" autoComplete="off">
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
                    placeholder="admin@realmoneygroups.in"
                    autoComplete="off"
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
              <a href="/forgot-password" style={{ color: RM_RED, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                height: 50, borderRadius: 12, fontWeight: 700, fontSize: 15,
                letterSpacing: '0.01em',
                background: `linear-gradient(135deg, ${RM_NAVY}, ${RM_BLUE} 50%, ${RM_RED})`,
                border: 'none',
                boxShadow: `0 4px 18px rgba(15,43,159,0.35)`,
              }}
            >
              Sign In to Dashboard
            </Button>
          </Form>

          {/* Footer */}
          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: 0 }}>
              Don't have access?{' '}
              <a href="mailto:admin@realmoneygroups.in" style={{ color: RM_BLUE, fontWeight: 600, textDecoration: 'none' }}>
                Contact administrator
              </a>
            </p>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop: 36, paddingTop: 22,
            borderTop: '1px solid var(--surface-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
          }}>
            {['ISO 27001', 'SOC 2', '256-bit TLS'].map(badge => (
              <span key={badge} style={{
                fontSize: '0.6875rem', fontWeight: 700,
                color: 'var(--text-muted)',
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
