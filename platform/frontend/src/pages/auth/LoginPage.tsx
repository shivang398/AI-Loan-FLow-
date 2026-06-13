import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Checkbox, Form, Alert } from 'antd';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginFormValues } from '../../schemas/authSchemas';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';
import api from '../../shared/services/apiClient';
import { RootState } from '../../store';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';

/* Typographic brand mark */
const BrandMark: React.FC = () => (
  <div style={{
    width: 72, height: 72,
    background: 'rgba(196,153,58,0.10)',
    border: '1px solid rgba(196,153,58,0.30)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
  }}>
    <span style={{
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700, fontSize: 28,
      color: GOLD, letterSpacing: '-0.04em',
      lineHeight: 1,
    }}>
      RM
    </span>
  </div>
);

const TRUST_STATS = [
  { value: '22+', label: 'Years of Trust' },
  { value: '₹10Cr+', label: 'Monthly Business' },
  { value: '50+', label: 'Lender Partners' },
];

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
      const response = await api.post('auth/login', formData);
      const data  = response.data?.data;
      const token = data?.token;
      const role  = data?.role;
      const email = data?.email || formData.email;
      if (!token || !role) throw new Error('Invalid login response from server');
      dispatch(setCredentials({ user: { id: data?.id || email, email, role }, token }));
      const paths: Record<string, string> = {
        RM: '/rm/dashboard', TEAM_LEADER: '/tl/dashboard',
        OPERATIONS: '/ops/dashboard', CONNECTOR: '/connector/dashboard',
        PARTNER_MANAGER: '/pm/partners', ADMIN: '/dashboard',
      };
      navigate(paths[role] ?? '/dashboard', { replace: true });
    } catch (err: any) {
      const serverMsg = err.response?.data?.message;
      const displayMsg = serverMsg && serverMsg.length < 120 ? serverMsg : 'An error occurred. Please try again.';
      dispatch(setError(displayMsg));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="login-page">

      {/* ── Left panel — brand authority ── */}
      <div className="login-page-illustration">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 400 }}>

          {/* Brand mark */}
          <BrandMark />

          {/* Brand name */}
          <div style={{ marginBottom: 6 }}>
            <span style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800, fontSize: 32,
              color: '#FFFFFF', letterSpacing: '-0.01em',
            }}>
              Real Money
            </span>
          </div>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: 40,
          }}>
            Advisory Platform
          </div>

          {/* Quote / value prop */}
          <div style={{
            paddingLeft: 16,
            borderLeft: `3px solid rgba(196,153,58,0.50)`,
            marginBottom: 44,
          }}>
            <p style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 600, fontSize: 18,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6, margin: 0,
              fontStyle: 'italic',
            }}>
              "Simplifying personal loans<br />
              for India's professionals."
            </p>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: 0,
            border: '1px solid rgba(196,153,58,0.18)',
            background: 'rgba(196,153,58,0.04)',
            marginBottom: 44,
          }}>
            {TRUST_STATS.map((s, i) => (
              <div key={s.label} style={{
                flex: 1, padding: '18px 0', textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(196,153,58,0.14)' : 'none',
              }}>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700, fontSize: 20,
                  color: GOLD, lineHeight: 1,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 9.5, fontWeight: 600,
                  color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase', letterSpacing: '0.09em',
                  marginTop: 6, fontFamily: 'Inter, sans-serif',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust items */}
          {[
            'RBI-Compliant Corporate DSA',
            'Zero advisory fees — always',
            'Authorised partner of 50+ banks & NBFCs',
          ].map(item => (
            <div key={item} style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
            }}>
              <div style={{
                width: 16, height: 16,
                background: 'rgba(196,153,58,0.14)',
                border: '1px solid rgba(196,153,58,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: 6, height: 1, background: GOLD }} />
              </div>
              <span style={{
                fontSize: 13, color: 'rgba(255,255,255,0.50)',
                fontFamily: 'Inter, sans-serif', fontWeight: 400,
              }}>
                {item}
              </span>
            </div>
          ))}

          {/* Status indicator */}
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 6, height: 6,
              borderRadius: '50%',
              background: '#1A7A4A',
              boxShadow: '0 0 0 3px rgba(26,122,74,0.20)',
            }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* ── Right panel — sign-in form ── */}
      <div className="login-form-panel">
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Form header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#EBF0F7',
              padding: '4px 12px', marginBottom: 20,
              borderLeft: `3px solid ${NAVY}`,
            }}>
              <ShieldCheck size={12} color={NAVY} />
              <span style={{
                color: NAVY, fontSize: 10.5, fontWeight: 700,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}>
                Secure Staff Portal
              </span>
            </div>

            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '2rem', fontWeight: 700,
              color: NAVY, letterSpacing: '-0.02em',
              margin: '0 0 8px', lineHeight: 1.2,
            }}>
              Welcome back
            </h1>
            <p style={{
              color: 'var(--text-muted)', fontSize: 14,
              margin: 0, fontWeight: 400,
              fontFamily: 'Inter, sans-serif',
            }}>
              Sign in to access the platform.
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              style={{
                marginBottom: 20,
                borderRadius: 0,
                border: 'none',
                borderLeft: '3px solid #8B1A1A',
                background: '#FEF2F2',
              }}
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
                    prefix={<Mail size={15} style={{ color: 'var(--text-muted)', marginRight: 6 }} />}
                    placeholder="admin@realmoneygroups.in"
                    autoComplete="off"
                    style={{ height: 46, borderRadius: 2 }}
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={errors.password ? 'error' : ''}
              help={errors.password?.message}
              style={{ marginBottom: 14 }}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    prefix={<Lock size={15} style={{ color: 'var(--text-muted)', marginRight: 6 }} />}
                    placeholder="••••••••"
                    style={{ height: 46, borderRadius: 2 }}
                  />
                )}
              />
            </Form.Item>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
              <Controller
                name="remember"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    checked={value}
                    onChange={onChange}
                    style={{ color: 'var(--text-secondary)', fontSize: 13 }}
                  >
                    Remember me
                  </Checkbox>
                )}
              />
              <a href="/forgot-password" style={{
                color: NAVY, fontSize: 13, fontWeight: 600,
                textDecoration: 'none', letterSpacing: '0.01em',
              }}>
                Forgot password?
              </a>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                height: 48,
                borderRadius: 2,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '0.03em',
                background: NAVY,
                border: `1px solid ${NAVY}`,
                boxShadow: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Sign In to Dashboard
            </Button>
          </Form>

          {/* Contact note */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 12.5, margin: 0 }}>
              Don't have access?{' '}
              <a
                href="mailto:admin@realmoneygroups.in"
                style={{ color: NAVY, fontWeight: 600, textDecoration: 'none' }}
              >
                Contact your administrator
              </a>
            </p>
          </div>

          {/* Compliance strip */}
          <div style={{
            marginTop: 32,
            paddingTop: 20,
            borderTop: '1px solid var(--surface-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}>
            {['ISO 27001', 'SOC 2 Type II', '256-bit TLS'].map(badge => (
              <span key={badge} style={{
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontFamily: 'Inter, sans-serif',
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
