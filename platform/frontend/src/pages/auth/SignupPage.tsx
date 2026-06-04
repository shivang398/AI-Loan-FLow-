import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Form, Alert, message } from 'antd';
import { Lock, Mail, TrendingUp, Users, Zap, UserPlus, IndianRupee } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupSchema, SignupFormValues } from '../../schemas/authSchemas';
import { setLoading, setError } from '../../store/slices/authSlice';
import api from '../../shared/services/apiClient';
import { RootState } from '../../store';

const RM_RED  = '#CC1B1B';
const RM_BLUE = '#0F2B9F';
const RM_NAVY = '#071560';

/* Same globe SVG as LoginPage */
const GlobeMark: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    <path d="M10 32 C10 18 20 8 32 8 C44 8 54 18 54 32" stroke={RM_BLUE} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M10 32 C10 46 20 56 32 56 C44 56 54 46 54 32" stroke={RM_RED}  strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
    <path d="M7 26 Q32 33 57 26" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M7 38 Q32 31 57 38" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <text x="20" y="30" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="12" fill="white">R</text>
    <text x="31" y="43" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="12" fill="white">M</text>
  </svg>
);

const SignupPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
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

  const perks = [
    { icon: IndianRupee, title: 'Up to 2% per disbursal', desc: 'Industry-best commission structure' },
    { icon: TrendingUp,  title: 'Real-time pipeline view', desc: 'Track every lead from submit to close' },
    { icon: Users,       title: 'Dedicated RM support',   desc: 'Your own Relationship Manager' },
    { icon: Zap,         title: 'Instant eligibility',    desc: 'AI-powered FOIR check in seconds' },
  ];

  return (
    <div className="login-page">

      {/* ── Left Panel ── */}
      <div className="login-page-illustration">
        <svg style={{ position: 'absolute', top: '10%', right: '-80px', opacity: 0.08, pointerEvents: 'none' }} width="400" height="400" viewBox="0 0 400 400" fill="none">
          <ellipse cx="300" cy="200" rx="200" ry="180" stroke="white" strokeWidth="50" />
        </svg>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
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

          <div style={{ marginBottom: 6 }}>
            <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 900, fontSize: 28, color: 'white' }}>REAL </span>
            <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 900, fontSize: 28, color: 'rgba(255,255,255,0.70)' }}>MONEY</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 36px' }}>
            Channel Partner Programme
          </p>

          <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 10px', fontFamily: '"Plus Jakarta Sans",sans-serif' }}>
            Become a Channel<br />Partner Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '0.9375rem', lineHeight: 1.7, margin: '0 0 32px' }}>
            Join Real Money's network of certified partners and grow your lending business.
          </p>

          {/* Perk grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 14, padding: '14px 16px',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, marginBottom: 10,
                  background: 'rgba(204,27,27,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color="#FFAAAA" />
                </div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.8125rem', marginBottom: 4 }}>{title}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Domain note */}
          <div style={{
            marginTop: 20, padding: '12px 16px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 12, textAlign: 'left',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: 'rgba(255,255,255,0.80)' }}>Note:</strong> Registration requires an
              {' '}<strong style={{ color: '#FFAAAA' }}>@realmoneygroups.in</strong> or{' '}
              <strong style={{ color: '#FFAAAA' }}>@realfinserv.com</strong> email address.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="login-form-panel">
        <div style={{ width: '100%', maxWidth: 440 }}>

          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#F0F2FA', borderRadius: 100,
              padding: '5px 14px', marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: RM_RED }} />
              <span style={{ color: RM_RED, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Partner Registration
              </span>
            </div>
            <h1 style={{
              fontSize: '2rem', fontWeight: 800,
              color: 'var(--text-primary)',
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
                    placeholder="admin@realmoneygroups.in"
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
              style={{ marginBottom: 28 }}
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
              style={{
                height: 50, borderRadius: 12, fontWeight: 700, fontSize: 15,
                letterSpacing: '0.01em',
                background: `linear-gradient(135deg, ${RM_NAVY}, ${RM_BLUE} 50%, ${RM_RED})`,
                border: 'none',
                boxShadow: `0 4px 18px rgba(15,43,159,0.35)`,
              }}
            >
              Create Partner Account
            </Button>
          </Form>

          <div style={{ marginTop: 28, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', margin: 0 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: RM_BLUE, fontWeight: 600, textDecoration: 'none' }}>
                Sign in here
              </Link>
            </p>
          </div>

          <div style={{
            marginTop: 28, paddingTop: 20,
            borderTop: '1px solid var(--surface-3)',
            textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', margin: 0 }}>
              Need admin or manager access?{' '}
              <a href="mailto:admin@realmoneygroups.in" style={{ color: RM_RED, fontWeight: 600, textDecoration: 'none' }}>
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
