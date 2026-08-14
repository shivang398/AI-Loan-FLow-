import React, { useState } from 'react';
import { Typography, Form, Input, Button, Divider, Checkbox, Row, Col, Alert } from 'antd';
import { ShieldCheck, Zap, ArrowRight, Download, MessageSquareText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import apiClient from '../../../shared/services/apiClient';
import { RM_BLUE, RM_RED, RM_NAVY, SCORE_BANDS, ScoreGauge, ScoreRangeReference } from './creditShared';

const { Text } = Typography;

// Equifax via Recordent uses a real RBI-style consent journey (OTP sent to the
// customer's phone), not a checkbox — so this page is a two-phase single form:
// phase 'details' collects name/mobile/PAN and sends the OTP; phase 'otp' reveals
// an inline OTP field to verify + fetch the report.
const EquifaxCheckPage: React.FC = () => {
  const currentUser = useSelector((s: RootState) => s.auth.user);
  const [phase, setPhase]            = useState<'details' | 'otp'>('details');
  const [loading, setLoading]        = useState(false);
  const [otpLoading, setOtpLoading]  = useState(false);
  const [pdfLoading, setPdfLoading]  = useState(false);
  const [summary, setSummary]        = useState<any>(null);
  const [lastValues, setLastValues]  = useState<any>(null);
  const [requestId, setRequestId]    = useState<string | null>(null);
  const [demoMode, setDemoMode]      = useState(false);
  const [otp, setOtp]                = useState('');
  const [error, setError]            = useState<string | null>(null);

  const handleSendOtp = async (values: any) => {
    setLoading(true); setSummary(null); setError(null); setLastValues(values);
    try {
      const res = await apiClient.post('/eligibility/equifax/send-otp', {
        mobileNumber: values.mobileNumber,
        name: values.name,
        panNumber: values.panNumber || undefined,
        consent: values.consent,
      }, { timeout: 45000 });
      const data = res.data?.data || res.data;
      setRequestId(data.requestId);
      setDemoMode(!!data.demoMode);
      setOtp('');
      setPhase('otp');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!lastValues || !requestId) return;
    if (!otp) { setError('Please enter the OTP.'); return; }
    setOtpLoading(true); setError(null);
    try {
      const res = await apiClient.post('/eligibility/equifax/verify-otp', {
        requestId,
        otp,
        mobileNumber: lastValues.mobileNumber,
        name: lastValues.name,
        panNumber: lastValues.panNumber || undefined,
      }, { timeout: 45000 });
      setSummary(res.data?.data || res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!lastValues) return;
    await handleSendOtp(lastValues);
  };

  const handleChangeDetails = () => {
    setPhase('details'); setRequestId(null); setOtp(''); setError(null);
  };

  const handleDownloadPdf = async () => {
    if (!lastValues || !summary) return;
    setPdfLoading(true);
    try {
      const response = await apiClient.post(
        '/eligibility/equifax/report',
        { mobileNumber: lastValues.mobileNumber, reportData: summary },
        { responseType: 'blob', timeout: 120000 }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeName = (summary.fullName || 'Customer').replace(/\s+/g, '_');
      link.setAttribute('download', `Equifax_CreditReport_${safeName}_${lastValues.mobileNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      setError('PDF download failed. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  const isNH = summary && (summary.cibilScore <= 5 || summary.scoreBand === 'NO_HISTORY');
  const band = summary
    ? (isNH ? SCORE_BANDS['NO_HISTORY'] : (SCORE_BANDS[summary.scoreBand] || SCORE_BANDS['FAIR']))
    : null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--rm-blue-light)',
            border: '1px solid var(--surface-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ShieldCheck size={16} color={RM_BLUE} />
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em',
            fontFamily: 'Inter, sans-serif',
          }}>
            Credit Intelligence
          </span>
        </div>
        <h1 className="page-header-title">Equifax Credit Check</h1>
        <span className="page-header-subtitle">
          Institutional credit check via Equifax &ensp;
          <Zap size={11} style={{ verticalAlign: 'middle', color: '#8A6020' }} />
          &thinsp;Customer OTP Verified
        </span>
      </div>

      {/* ── Input Form ── */}
      {!summary && phase === 'details' && (
        <div className="pro-card" style={{ padding: '28px 32px' }}>
          <Form layout="vertical" onFinish={handleSendOtp} size="large" autoComplete="off" initialValues={lastValues ?? undefined}>
            <Row gutter={20}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Customer Full Name"
                  rules={[{ required: true, message: 'Please enter customer name' }]}
                >
                  <Input placeholder="Rahul Sunil Sharma" style={{ borderRadius: 2, height: 44 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="mobileNumber"
                  label="Mobile Number"
                  rules={[{ required: true, message: 'Please enter mobile number' }]}
                >
                  <Input placeholder="9876543210" style={{ borderRadius: 2, height: 44 }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="panNumber"
                  label="PAN Number (recommended — improves match accuracy)"
                  normalize={(value) => (value ?? '').toUpperCase()}
                  rules={[{ pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: 'Enter a valid PAN (e.g. ABCDE1234F)' }]}
                >
                  <Input
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    style={{ borderRadius: 2, height: 44, fontFamily: 'monospace' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Alert
              style={{
                borderRadius: 0, border: 'none',
                borderLeft: `3px solid ${RM_BLUE}`,
                background: 'var(--rm-blue-light)',
                marginBottom: 20, padding: '10px 14px',
              }}
              message={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MessageSquareText size={13} color={RM_BLUE} />
                  <Text style={{ color: RM_NAVY, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    The customer will receive an OTP by SMS to confirm consent before the report is fetched.
                  </Text>
                </div>
              }
            />

            <Form.Item
              name="consent"
              valuePropName="checked"
              rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject(new Error('Consent is mandatory to proceed')) }]}
              style={{ marginBottom: 20 }}
            >
              <Checkbox style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>
                I confirm I have obtained explicit consent from the customer to pull their credit information per RBI and CIC regulatory guidelines.
              </Checkbox>
            </Form.Item>

            <Divider style={{ margin: '16px 0 20px', borderColor: 'var(--surface-3)' }} />

            {error && (
              <Alert
                type="error"
                message={error}
                style={{ borderRadius: 0, border: 'none', borderLeft: `3px solid ${RM_RED}`, background: '#FFF0F0', marginBottom: 16 }}
                showIcon
              />
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{
                  height: 42, paddingLeft: 28, paddingRight: 28,
                  borderRadius: 2, fontWeight: 700, fontSize: 13,
                  background: RM_BLUE, borderColor: RM_BLUE,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  letterSpacing: '0.02em',
                }}
              >
                Send OTP <ArrowRight size={15} />
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* ── OTP Verification ── */}
      {!summary && phase === 'otp' && (
        <div className="pro-card" style={{ padding: '28px 32px' }}>
          {demoMode && (
            <Alert
              type="warning"
              showIcon
              message="Demo Mode — Equifax credentials not configured. Use OTP 123456 to continue with illustrative data."
              style={{ borderRadius: 0, border: 'none', borderLeft: '3px solid #D4A017', background: '#FBF4E0', marginBottom: 20 }}
            />
          )}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              OTP sent to {lastValues?.mobileNumber}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Ask the customer for the OTP they received by SMS, then enter it below to verify consent and fetch the report.
            </div>
          </div>

          <Row gutter={20} align="bottom">
            <Col xs={24} md={12}>
              <Form.Item label="One-Time Password" style={{ marginBottom: 20 }}>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={6}
                  placeholder="6-digit OTP"
                  size="large"
                  style={{ borderRadius: 2, height: 44, fontFamily: 'monospace', letterSpacing: '0.3em', textAlign: 'center' }}
                />
              </Form.Item>
            </Col>
          </Row>

          {error && (
            <Alert
              type="error"
              message={error}
              style={{ borderRadius: 0, border: 'none', borderLeft: `3px solid ${RM_RED}`, background: '#FFF0F0', marginBottom: 16 }}
              showIcon
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <Button type="link" onClick={handleResendOtp} loading={loading} style={{ padding: 0, fontSize: 12.5, fontWeight: 600 }}>
                Resend OTP
              </Button>
              <Button type="link" onClick={handleChangeDetails} style={{ padding: 0, fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Change Details
              </Button>
            </div>
            <Button
              type="primary"
              onClick={handleVerifyOtp}
              loading={otpLoading}
              style={{
                height: 42, paddingLeft: 28, paddingRight: 28,
                borderRadius: 2, fontWeight: 700, fontSize: 13,
                background: RM_BLUE, borderColor: RM_BLUE,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                letterSpacing: '0.02em',
              }}
            >
              Verify & Fetch Report <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {summary && band && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="animate-fade-in-up">

          {summary.demoMode && (
            <Alert
              type="warning"
              showIcon
              message="Demo Mode — Equifax credentials not configured. All data shown below is illustrative only."
              style={{ borderRadius: 0, border: 'none', borderLeft: '3px solid #D4A017', background: '#FBF4E0' }}
            />
          )}

          {/* Score hero */}
          <div className="pro-card" style={{ overflow: 'hidden', padding: 0 }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>

              {/* Left: gauge */}
              <div style={{
                flexShrink: 0, width: 240,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '28px 20px',
                background: band.bg,
                borderRight: `1px solid ${band.border}`,
              }}>
                {isNH ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 52, fontWeight: 700, color: '#3A4F80',
                      fontFamily: '"Playfair Display", Georgia, serif',
                    }}>NH</div>
                    <div style={{ fontSize: 9, color: '#7A8FB0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                      No Credit History · 300–900
                    </div>
                  </div>
                ) : (
                  <ScoreGauge score={summary.cibilScore} />
                )}
                <div style={{
                  marginTop: 12, padding: '4px 16px',
                  background: band.color, color: '#fff',
                  fontWeight: 700, fontSize: 11,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {band.label}
                </div>
                <Text style={{
                  fontSize: 11, color: band.color,
                  textAlign: 'center', marginTop: 10,
                  maxWidth: 190, lineHeight: 1.5,
                  fontFamily: 'Inter, sans-serif', fontWeight: 500,
                }}>
                  {band.desc}
                </Text>
              </div>

              {/* Right: details */}
              <div style={{ flex: 1, padding: '24px 28px' }}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{
                    fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    fontFamily: 'Inter, sans-serif', marginBottom: 4,
                  }}>
                    Customer Profile · Equifax
                  </div>
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: 'var(--text-primary)',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    letterSpacing: '-0.01em',
                  }}>
                    {summary.fullName}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3, fontFamily: 'Inter, sans-serif' }}>
                    Score Date: {summary.scoreDate} &nbsp;·&nbsp; Report ID: {summary.reportId}
                  </div>
                </div>

                {/* Personal info grid */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px 20px', marginBottom: 20,
                  paddingBottom: 20, borderBottom: '1px solid var(--surface-2)',
                }}>
                  {[
                    { label: 'Date of Birth',   value: summary.dob },
                    { label: 'Gender',          value: summary.gender },
                    { label: 'Occupation',      value: summary.occupationType },
                    { label: 'Net Income',      value: summary.income },
                    { label: 'Enquiries (24m)', value: `${summary.enquirySummary?.[0]?.past24Months ?? summary.enquiryCount}` },
                    { label: 'Address',         value: summary.address },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{
                        fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                        fontFamily: 'Inter, sans-serif', marginBottom: 2,
                      }}>
                        {label}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                        {value || '—'}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Account summary chips */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Total Accounts', value: summary.totalAccounts,  color: RM_BLUE,   bg: 'var(--rm-blue-light)' },
                    { label: 'Active',         value: summary.activeAccounts, color: '#0891B2', bg: '#E0F7FA' },
                    { label: 'Closed',         value: summary.closedAccounts, color: '#3A4F80', bg: 'var(--surface-2)' },
                    {
                      label: 'Overdue',
                      value: summary.overdueAccounts,
                      color: summary.overdueAccounts > 0 ? RM_RED    : '#1A7A4A',
                      bg:    summary.overdueAccounts > 0 ? '#FFF0F0' : '#F0FAF4',
                    },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} style={{
                      padding: '10px 18px', background: bg,
                      border: `1px solid ${color}22`,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90,
                    }}>
                      <div style={{
                        fontSize: 22, fontWeight: 700, color,
                        fontFamily: '"Playfair Display", Georgia, serif', lineHeight: 1,
                      }}>
                        {value}
                      </div>
                      <div style={{
                        fontSize: 9.5, fontWeight: 700, color,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        fontFamily: 'Inter, sans-serif', marginTop: 4,
                      }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account Summary */}
          <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--surface-3)', fontSize: 9.5, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: 'Inter, sans-serif' }}>
              Account(s)
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: 'var(--surface-2)' }}>
                    {['Account Type', 'Accounts', 'High Cr/Sanc Amt', 'Balances', 'Date Opened'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 9.5, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--surface-2)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>All Accounts</td>
                    <td style={{ padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
                      <div>TOTAL: <b>{summary.totalAccounts}</b></div>
                      <div style={{ color: summary.overdueAccounts > 0 ? RM_RED : 'var(--text-muted)' }}>OVERDUE: <b>{summary.overdueAccounts}</b></div>
                      <div style={{ color: 'var(--text-muted)' }}>ZERO BALANCE: <b>{summary.zeroBalanceAccounts ?? summary.closedAccounts}</b></div>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>
                      {summary.totalSanctioned > 0 ? `₹${Number(summary.totalSanctioned).toLocaleString('en-IN')}` : '—'}
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
                      <div>CURRENT: <b>{summary.totalBalance > 0 ? `₹${Number(summary.totalBalance).toLocaleString('en-IN')}` : '—'}</b></div>
                      <div style={{ color: summary.totalOverdue > 0 ? RM_RED : 'var(--text-muted)' }}>OVERDUE: <b>{summary.totalOverdue > 0 ? `₹${Number(summary.totalOverdue).toLocaleString('en-IN')}` : '—'}</b></div>
                    </td>
                    <td style={{ padding: '10px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
                      <div>RECENT: <b>{summary.recentOpenDate || '—'}</b></div>
                      <div style={{ color: 'var(--text-muted)' }}>OLDEST: <b>{summary.oldestOpenDate || '—'}</b></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Enquiry Summary by Purpose */}
            {summary.enquirySummary?.length > 0 && (
              <>
                <div style={{ padding: '10px 20px', borderTop: '1px solid var(--surface-3)', borderBottom: '1px solid var(--surface-3)', fontSize: 9.5, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: 'Inter, sans-serif' }}>
                  Enquiries
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: 'var(--surface-2)' }}>
                        {['Enquiry Purpose', 'Total', 'Past 30 Days', 'Past 12 Months', 'Past 24 Months', 'Recent'].map(h => (
                          <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 9.5, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {summary.enquirySummary.map((eq: any, i: number) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--surface-2)', background: i % 2 === 0 ? 'var(--surface-1)' : 'var(--surface-0)' }}>
                          <td style={{ padding: '8px 14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{eq.purpose}</td>
                          <td style={{ padding: '8px 14px', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{eq.total}</td>
                          <td style={{ padding: '8px 14px', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{eq.past30Days}</td>
                          <td style={{ padding: '8px 14px', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{eq.past12Months}</td>
                          <td style={{ padding: '8px 14px', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{eq.past24Months}</td>
                          <td style={{ padding: '8px 14px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: 11 }}>{eq.recent || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Account Detail Cards */}
          {summary.accounts?.length > 0 && (
            <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--surface-3)', fontSize: 9.5, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: 'Inter, sans-serif' }}>
                Account(s)
              </div>
              {summary.accounts.map((acct: any, i: number) => {
                const inr = (v: number | null) => v && v > 0 ? `₹${Number(v).toLocaleString('en-IN')}` : '';
                const isOverdue = acct.amountOverdue > 0;
                const statusLabel = isOverdue ? 'OVERDUE' : acct.dateClosed ? 'CLOSED' : 'ACTIVE';
                const statusColor = isOverdue ? RM_RED : acct.dateClosed ? '#3A4F80' : '#1A7A4A';
                return (
                  <div key={i} style={{ borderBottom: '2px solid var(--surface-3)' }}>
                    {/* 4-col grid: ACCOUNT | DATES | AMOUNTS | STATUS */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0 }}>
                      {/* ACCOUNT */}
                      <div style={{ padding: '14px 16px', borderRight: '1px solid var(--surface-2)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Account</div>
                        {[
                          ['Member Name', acct.memberName || 'NOT DISCLOSED'],
                          ['Account Number', acct.accountNumber],
                          ['Type', acct.accountType],
                          ['Ownership', acct.ownershipType],
                          ['Collateral Value', acct.collateralValue],
                          ['Collateral Type', acct.collateralType],
                        ].map(([label, val]) => val ? (
                          <div key={label} style={{ marginBottom: 5 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{label}: </span>
                            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{val}</span>
                          </div>
                        ) : null)}
                      </div>
                      {/* DATES */}
                      <div style={{ padding: '14px 16px', borderRight: '1px solid var(--surface-2)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Dates</div>
                        {[
                          ['Opened', acct.dateOpened],
                          ['Last Payment', acct.lastPaymentDate],
                          ['Closed', acct.dateClosed],
                          ['Reported', acct.reportedDate],
                        ].map(([label, val]) => val ? (
                          <div key={label} style={{ marginBottom: 5 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{label}: </span>
                            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{val}</span>
                          </div>
                        ) : null)}
                      </div>
                      {/* AMOUNTS */}
                      <div style={{ padding: '14px 16px', borderRight: '1px solid var(--surface-2)' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Amounts</div>
                        {[
                          ['High Cr/Sanctioned', inr(acct.sanctionedAmount)],
                          ['Current Balance', inr(acct.currentBalance)],
                          ['Credit Limit', inr(acct.creditLimit)],
                          ['Overdue', acct.amountOverdue > 0 ? inr(acct.amountOverdue) : null],
                          ['EMI', inr(acct.emiAmount)],
                          ['Pmt Freq', acct.emiFrequency],
                          ['Repayment Tenure', acct.repaymentTenure],
                          ['Interest Rate', acct.interestRate],
                        ].map(([label, val]) => val ? (
                          <div key={label} style={{ marginBottom: 5 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{label}: </span>
                            <span style={{ fontSize: 11, color: label === 'Overdue' ? RM_RED : 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{val}</span>
                          </div>
                        ) : null)}
                      </div>
                      {/* STATUS */}
                      <div style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>Status</div>
                        <div style={{ marginBottom: 8 }}>
                          <span style={{ padding: '3px 10px', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: isOverdue ? '#FFF0F0' : acct.dateClosed ? 'var(--surface-2)' : '#F0FAF4', color: statusColor, fontFamily: 'Inter, sans-serif' }}>
                            {statusLabel}
                          </span>
                        </div>
                        {[
                          ['Suit Filed', acct.suitFiled === 'Y' ? 'Yes' : null],
                          ['Written Off', inr(acct.writtenOffTotal)],
                          ['Asset Classification', acct.assetClassification],
                        ].map(([label, val]) => val ? (
                          <div key={label} style={{ marginBottom: 5 }}>
                            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{label}: </span>
                            <span style={{ fontSize: 11, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{val}</span>
                          </div>
                        ) : null)}
                      </div>
                    </div>

                    {/* DPD Grid */}
                    {acct.dpdHistory?.length > 0 && (
                      <div style={{ padding: '10px 16px', background: '#EEF2FF', borderTop: '1px solid #C7D2FE' }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                          Days Past Due / Asset Classification (Up to {acct.dpdHistory.length} Months; Left to Right)
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 0' }}>
                          {acct.dpdHistory.map((d: any, j: number) => {
                            const n = d.dpdNumeric;
                            const isNpa = n !== null && n >= 90;
                            const isOk  = n !== null && n === 0;
                            const cellColor = isNpa ? RM_RED : isOk ? '#1A7A4A' : n !== null ? '#A87C3A' : 'var(--text-muted)';
                            return (
                              <div key={j} style={{ width: 52, textAlign: 'center', marginBottom: 2 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: cellColor, fontFamily: 'monospace' }}>{d.dpd}</div>
                                <div style={{ fontSize: 9, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{d.month}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Enquiry History */}
          {summary.enquiries?.length > 0 && (
            <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '12px 20px', borderBottom: '1px solid var(--surface-3)',
                fontSize: 9.5, fontWeight: 700, color: RM_BLUE,
                textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: 'Inter, sans-serif',
              }}>
                Enquiries ({summary.enquiryCount ?? summary.enquiries.length})
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-2)' }}>
                      {['Member', 'Enquiry Date', 'Enquiry Purpose', 'Enquiry Amount'].map(h => (
                        <th key={h} style={{ color: RM_BLUE, padding: '10px 14px', textAlign: 'left', fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Inter, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.enquiries.map((eq: any, i: number) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface-1)' : 'var(--surface-0)', borderBottom: '1px solid var(--surface-2)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{eq.memberName || '—'}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>{eq.date || '—'}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{eq.purpose || '—'}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{eq.amount > 0 ? `₹${Number(eq.amount).toLocaleString('en-IN')}` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <ScoreRangeReference scoreBand={summary.scoreBand} />

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, paddingBottom: 8 }}>
            {(['ADMIN', 'CREDIT_BUREAU'] as string[]).includes(currentUser?.role ?? '') && (
              <Button
                type="primary"
                loading={pdfLoading}
                onClick={handleDownloadPdf}
                style={{
                  height: 40, borderRadius: 2,
                  background: RM_NAVY, borderColor: RM_NAVY,
                  fontWeight: 700, fontSize: 13,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  letterSpacing: '0.02em',
                }}
              >
                {!pdfLoading && <Download size={15} />} Download PDF Report
              </Button>
            )}
            <Button
              onClick={() => { setSummary(null); setLastValues(null); setRequestId(null); setOtp(''); setError(null); setPhase('details'); }}
              style={{
                height: 40, borderRadius: 2,
                fontWeight: 600, fontSize: 13,
                border: '1px solid var(--surface-3)',
                color: 'var(--text-secondary)',
              }}
            >
              Run Another Check
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquifaxCheckPage;
