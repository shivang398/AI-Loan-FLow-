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
import { RealMoneyMark } from '../../shared/components/RealMoneyLogo';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const GOLD_L = '#E8C870';

const TRUST_STATS = [
  { value: '22+',   label: 'Years of Trust' },
  { value: '₹10Cr+', label: 'Monthly Business' },
  { value: '50+',   label: 'Lender Partners' },
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
      <div className="login-page-illustration" style={{
        background: `linear-gradient(160deg, #060F20 0%, ${NAVY} 55%, #0E2545 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(196,153,58,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(196,153,58,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        {/* Circle accent */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 400, height: 400, borderRadius: '50%',
          border: `1px solid rgba(196,153,58,0.07)`, pointerEvents: 'none',
        }} />
        {/* Bottom gold glow */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`,
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 400 }}>

          {/* Real Money logo mark — large */}
          <div style={{ marginBottom: 28 }}>
            <RealMoneyMark size={88} id="login-mark" />
          </div>

          {/* Brand wordmark */}
          <div style={{ marginBottom: 4, display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800, fontSize: 34,
              background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_L} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
            }}>
              REAL&nbsp;
            </span>
            <span style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 800, fontSize: 34,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
            }}>
              MONEY
            </span>
          </div>

          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif', marginBottom: 40,
          }}>
            Advisory Platform
          </div>

          {/* Quote */}
          <div style={{
            paddingLeft: 16,
            borderLeft: `2px solid ${GOLD}70`,
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
            border: `1px solid rgba(196,153,58,0.22)`,
            background: 'rgba(196,153,58,0.04)',
            marginBottom: 44,
          }}>
            {TRUST_STATS.map((s, i) => (
              <div key={s.label} style={{
                flex: 1, padding: '18px 0', textAlign: 'center',
                borderRight: i < 2 ? `1px solid rgba(196,153,58,0.14)` : 'none',
              }}>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700, fontSize: 20,
                  color: GOLD_L, lineHeight: 1,
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
                background: `rgba(196,153,58,0.10)`,
                border: `1px solid rgba(196,153,58,0.30)`,
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
              background: '#15803D',
              boxShadow: '0 0 0 3px rgba(21,128,61,0.22)',
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
              background: '#EEF2FF',
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
                borderLeft: `3px solid ${GOLD}`,
                background: '#FFF0F0',
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
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 24,
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
                borderColor: NAVY,
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
            marginTop: 32, paddingTop: 20,
            borderTop: '1px solid var(--surface-3)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 24,
          }}>
            {['ISO 27001', 'SOC 2 Type II', '256-bit TLS'].map(badge => (
              <span key={badge} style={{
                fontSize: 10, fontWeight: 700,
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
