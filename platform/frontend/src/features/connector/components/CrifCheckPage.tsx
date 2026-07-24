import React, { useState } from 'react';
import { Typography, Form, Input, Button, Divider, Checkbox, Row, Col, Alert } from 'antd';
import { ShieldCheck, Zap, Lock, ArrowRight, Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import apiClient from '../../../shared/services/apiClient';
import { RM_BLUE, RM_RED, RM_NAVY, SCORE_BANDS, ScoreGauge, ScoreRangeReference } from './creditShared';

const { Text } = Typography;

const CrifCheckPage: React.FC = () => {
  const currentUser = useSelector((s: RootState) => s.auth.user);
  const [loading, setLoading]        = useState(false);
  const [pdfLoading, setPdfLoading]  = useState(false);
  const [summary, setSummary]        = useState<any>(null);
  const [lastValues, setLastValues]  = useState<any>(null);
  const [error, setError]            = useState<string | null>(null);

  const handleCheck = async (values: any) => {
    setLoading(true); setSummary(null); setError(null); setLastValues(values);
    try {
      const res = await apiClient.post('/eligibility/cibil/check', {
        mobileNumber: values.mobileNumber,
        name: values.name,
        consent: values.consent,
      });
      setSummary(res.data?.data || res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch CRIF data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!lastValues || !summary) return;
    setPdfLoading(true);
    try {
      const response = await apiClient.post(
        '/eligibility/cibil/report',
        { mobileNumber: lastValues.mobileNumber, reportData: summary },
        { responseType: 'blob', timeout: 120000 }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const safeName = (summary.fullName || 'Customer').replace(/\s+/g, '_');
      link.setAttribute('download', `CRIF_CreditReport_${safeName}_${lastValues.mobileNumber}.pdf`);
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
        <h1 className="page-header-title">CRIF Soft Pull</h1>
        <span className="page-header-subtitle">
          Zero-impact institutional credit check via CRIF High Mark &ensp;
          <Zap size={11} style={{ verticalAlign: 'middle', color: '#8A6020' }} />
          &thinsp;Instant Report
        </span>
      </div>

      {/* ── Input Form ── */}
      {!summary && (
        <div className="pro-card" style={{ padding: '28px 32px' }}>
          <Form layout="vertical" onFinish={handleCheck} size="large" autoComplete="off">
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
                  <Lock size={13} color={RM_BLUE} />
                  <Text style={{ color: RM_NAVY, fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    End-to-end encrypted. No impact on customer credit score.
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
                Check CRIF Score <ArrowRight size={15} />
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* ── Results ── */}
      {summary && band && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="animate-fade-in-up">

          {summary.demoMode && (
            <Alert
              type="warning"
              showIcon
              message="Demo Mode — CRIF API credentials not configured. All data shown below is illustrative only."
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
                    Customer Profile
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
                    { label: 'Enquiries (24m)', value: `${summary.enquiryCount}` },
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

          {/* Financial summary */}
          <Row gutter={12}>
            <Col span={12}>
              <div className="pro-card" style={{ padding: '20px 24px' }}>
                <div style={{
                  fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  fontFamily: 'Inter, sans-serif', marginBottom: 6,
                }}>
                  Total Outstanding Balance
                </div>
                <div style={{
                  fontSize: 28, fontWeight: 700, color: 'var(--text-primary)',
                  fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.02em',
                }}>
                  ₹{Number(summary.totalBalance).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  Across all active credit accounts
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="pro-card" style={{ padding: '20px 24px' }}>
                <div style={{
                  fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.10em',
                  fontFamily: 'Inter, sans-serif', marginBottom: 6,
                }}>
                  Total Overdue Amount
                </div>
                <div style={{
                  fontSize: 28, fontWeight: 700,
                  color: summary.totalOverdue > 0 ? RM_RED : '#1A7A4A',
                  fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '-0.02em',
                }}>
                  {summary.totalOverdue > 0 ? `₹${Number(summary.totalOverdue).toLocaleString('en-IN')}` : 'NIL'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  {summary.totalOverdue > 0 ? 'Payment(s) overdue — requires attention' : 'No overdue payments'}
                </div>
              </div>
            </Col>
          </Row>

          {/* Accounts table */}
          {summary.accounts?.length > 0 && (
            <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '12px 20px', borderBottom: '1px solid var(--surface-3)',
                fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.10em',
                fontFamily: 'Inter, sans-serif',
              }}>
                Credit Account Details
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: RM_NAVY }}>
                      {['Lender', 'Type', 'Account No.', 'Opened', 'Outstanding', 'Overdue', 'Status'].map(h => (
                        <th key={h} style={{
                          color: 'rgba(255,255,255,0.85)', padding: '10px 14px',
                          textAlign: 'left', fontSize: 9.5, fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.07em',
                          whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.accounts.map((acct: any, i: number) => {
                      const isOverdue = acct.amountOverdue > 0;
                      const inr = (v: number) => v ? `₹${Number(v).toLocaleString('en-IN')}` : '—';
                      return (
                        <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface-1)' : 'var(--surface-0)', borderBottom: '1px solid var(--surface-2)' }}>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>{acct.memberName}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}>{acct.accountType}</td>
                          <td style={{ padding: '10px 14px', fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: 12 }}>{acct.accountNumber}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>{acct.dateOpened || '—'}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{inr(acct.currentBalance)}</td>
                          <td style={{ padding: '10px 14px', fontWeight: 700, color: isOverdue ? RM_RED : '#1A7A4A', fontFamily: 'Inter, sans-serif' }}>
                            {isOverdue ? inr(acct.amountOverdue) : 'NIL'}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{
                              padding: '3px 10px', fontSize: 10, fontWeight: 700,
                              textTransform: 'uppercase', letterSpacing: '0.06em',
                              background: isOverdue ? '#FFF0F0' : acct.dateClosed ? 'var(--surface-2)' : '#F0FAF4',
                              color: isOverdue ? RM_RED : acct.dateClosed ? '#3A4F80' : '#1A7A4A',
                              fontFamily: 'Inter, sans-serif',
                            }}>
                              {isOverdue ? 'OVERDUE' : acct.dateClosed ? 'CLOSED' : 'ACTIVE'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Addresses */}
          {summary.addresses?.length > 0 && (
            <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '12px 20px', borderBottom: '1px solid var(--surface-3)',
                fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: 'Inter, sans-serif',
              }}>
                Address(es)
              </div>
              {summary.addresses.map((a: any, i: number) => (
                <div key={i} style={{ padding: '12px 20px', borderBottom: '1px solid var(--surface-2)', background: i % 2 === 0 ? 'var(--surface-1)' : 'var(--surface-0)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: RM_BLUE, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{a.category || 'Address'}</span>
                    {a.reportedDate && <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{a.reportedDate}</span>}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{a.address || '—'}</div>
                </div>
              ))}
            </div>
          )}

          {/* Enquiry History */}
          {summary.enquiries?.length > 0 && (
            <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{
                padding: '12px 20px', borderBottom: '1px solid var(--surface-3)',
                fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.10em', fontFamily: 'Inter, sans-serif',
              }}>
                Enquiry Details ({summary.enquiryCount ?? summary.enquiries.length})
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: RM_NAVY }}>
                      {['#', 'Member Name', 'Date', 'Purpose', 'Amount'].map(h => (
                        <th key={h} style={{ color: 'rgba(255,255,255,0.85)', padding: '10px 14px', textAlign: 'left', fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', fontFamily: 'Inter, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.enquiries.map((eq: any, i: number) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'var(--surface-1)' : 'var(--surface-0)', borderBottom: '1px solid var(--surface-2)' }}>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: 12 }}>{i + 1}</td>
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
              onClick={() => { setSummary(null); setLastValues(null); setError(null); }}
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

export default CrifCheckPage;
