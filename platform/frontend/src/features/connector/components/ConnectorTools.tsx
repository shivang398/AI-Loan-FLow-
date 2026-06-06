import React, { useState, useCallback } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Result,
  Checkbox,
  Alert,
} from 'antd';
import {
  ShieldCheck,
  Files,
  Zap,
  Lock,
  ArrowRight,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

const { Title, Text } = Typography;

// ── CIBIL score band config ───────────────────────────────────────────────────

const SCORE_BANDS: Record<string, { label: string; color: string; bg: string; border: string; desc: string }> = {
  EXCELLENT: { label: 'Excellent',       color: '#15803d', bg: '#f0fdf4', border: '#86efac', desc: 'Highly likely to be approved. Best interest rates available.' },
  GOOD:      { label: 'Good',            color: '#4d8f4a', bg: '#f0fdf4', border: '#a3e635', desc: 'Strong profile. Approval likely with standard terms.' },
  FAIR:      { label: 'Fair',            color: '#b45309', bg: '#fffbeb', border: '#fcd34d', desc: 'Moderate risk. May face conditional approval.' },
  POOR:      { label: 'Poor',            color: '#c2410c', bg: '#fff7ed', border: '#fdba74', desc: 'High risk. Approval uncertain. Higher interest rates.' },
  VERY_POOR: { label: 'Very Poor',       color: '#991b1b', bg: '#fff1f2', border: '#fca5a5', desc: 'Unlikely to be approved. Significant credit issues.' },
  NO_HISTORY:{ label: 'No History (NH)', color: '#64748b', bg: '#f8fafc', border: '#cbd5e1', desc: 'No sufficient credit history to compute a score. First loan applicant.' },
};

const scoreColor = (score: number) => {
  if (score >= 750) return '#15803d';
  if (score >= 700) return '#4d8f4a';
  if (score >= 650) return '#b45309';
  if (score >= 550) return '#c2410c';
  return '#991b1b';
};

// ── Mini score gauge ──────────────────────────────────────────────────────────

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const CIRCUM = Math.PI * 90;
  const clipped = Math.min(Math.max(score - 300, 0), 600); // range 300–900
  const pct = clipped / 600;
  const offset = CIRCUM * (1 - pct);
  const color = scoreColor(score);

  return (
    <svg viewBox="0 0 220 120" width={220} height={120} style={{ overflow: 'visible' }}>
      <path d="M 20,110 A 90,90 0 0,1 200,110" stroke="#e2e8f0" strokeWidth={18} fill="none" strokeLinecap="round" />
      <path
        d="M 20,110 A 90,90 0 0,1 200,110"
        stroke={color}
        strokeWidth={18}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={CIRCUM}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.4s ease' }}
      />
      <text x="110" y="98" textAnchor="middle" fontSize="36" fontWeight="900" fill={color}
        style={{ fontFamily: "'Segoe UI', sans-serif" }}>{score}</text>
      <text x="110" y="116" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="700"
        style={{ fontFamily: "'Segoe UI', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        CIBIL Score  ·  Range 300–900
      </text>
    </svg>
  );
};

// ── Main CIBIL check page ─────────────────────────────────────────────────────

export const CibilCheckPage: React.FC = () => {
  const [loading, setCibilLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [lastValues, setLastValues] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCibilCheck = async (values: any) => {
    setCibilLoading(true);
    setSummary(null);
    setError(null);
    setLastValues(values);
    const payload = {
      mobileNumber: values.mobileNumber,
      name: values.name,
      panNumber: values.panNumber,
      consent: values.consent,
    };
    try {
      const res = await apiClient.post('/eligibility/cibil/check', payload);
      setSummary(res.data?.data || res.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to fetch CIBIL data. Please try again.';
      setError(msg);
    } finally {
      setCibilLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!lastValues) return;
    setPdfLoading(true);
    try {
      const response = await apiClient.post(
        '/eligibility/cibil/report',
        {
          mobileNumber: lastValues.mobileNumber,
          name: lastValues.name,
          panNumber: lastValues.panNumber,
          consent: lastValues.consent,
        },
        { responseType: 'blob', timeout: 120000 }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CIBIL_Report_${lastValues.panNumber}.pdf`);
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

  // CIBIL returns riskScore=1 for NH (No History / New-to-Credit) customers
  const isNH = summary && (summary.cibilScore <= 5 || summary.scoreBand === 'NO_HISTORY');
  const band = summary
    ? (isNH ? SCORE_BANDS['NO_HISTORY'] : (SCORE_BANDS[summary.scoreBand] || SCORE_BANDS['FAIR']))
    : null;

  return (
    <div className="max-w-5xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
              <ShieldCheck size={28} />
            </div>
            <Text className="text-slate-400 text-xs font-black uppercase tracking-[0.25em]">Credit Intelligence</Text>
          </div>
          <Title level={1} className="m-0 font-black tracking-tighter text-slate-800">CIBIL Soft Pull</Title>
          <Text className="text-slate-500 font-medium text-lg">Zero-impact institutional credit check via secure API</Text>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <Zap size={18} className="text-amber-500 fill-amber-500" />
          <Text className="font-black text-slate-800 text-sm">INSTANT REPORT</Text>
        </div>
      </div>

      {/* Input form */}
      {!summary && (
        <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-100 p-8">
          <Form layout="vertical" onFinish={handleCibilCheck} className="custom-form-premium">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="name" label="Legal Full Name (As per PAN)" rules={[{ required: true, message: 'Please enter legal name' }]}>
                  <Input size="large" placeholder="Rahul Sunil Sharma" className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-bold" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="panNumber" label="Permanent Account Number (PAN)" rules={[{ required: true, message: 'Please enter PAN' }]}>
                  <Input size="large" placeholder="ABCDE1234F" className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-black tracking-widest uppercase" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="mobileNumber" label="Mobile Number (Linked to PAN/Aadhaar)" rules={[{ required: true, message: 'Please enter mobile number' }]}>
              <Input size="large" placeholder="+91 98765 43210" className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-bold" />
            </Form.Item>

            <Alert
              className="rounded-2xl border-none bg-blue-50/50 mb-8 p-4"
              message={
                <div className="flex items-center gap-3">
                  <Lock size={16} className="text-blue-600" />
                  <Text className="text-blue-800 text-xs font-bold">Encrypted End-to-End. No impact on customer credit score.</Text>
                </div>
              }
            />

            <Form.Item name="consent" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Consent is mandatory to proceed')) }]}>
              <Checkbox className="text-slate-400 font-bold text-xs leading-relaxed">
                I hereby confirm that I have obtained explicit consent from the customer to pull their credit information as per RBI and CIC regulatory guidelines.
              </Checkbox>
            </Form.Item>

            <Divider className="my-8 opacity-50" />

            {error && <Alert type="error" message={error} className="rounded-2xl mb-6" showIcon />}

            <Form.Item className="m-0 text-right">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
                className="h-16 px-12 rounded-2xl bg-rose-600 border-none font-black shadow-xl shadow-rose-100 flex items-center gap-3 ml-auto hover:bg-rose-500"
              >
                CHECK CIBIL SCORE <ArrowRight size={18} />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      {/* Results dashboard */}
      {summary && band && (
        <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* Demo mode warning */}
          {summary.demoMode && (
            <Alert
              type="warning"
              showIcon
              message="Demo Mode — CIBIL API credentials not configured. All data shown below is illustrative only."
              className="rounded-2xl"
            />
          )}

          {/* Score hero card */}
          <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-100" styles={{ body: { padding: 0 } }}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              {/* Left: gauge */}
              <div style={{
                flex: '0 0 260px', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '36px 24px',
                background: band.bg, borderRadius: '2.5rem 0 0 2.5rem',
                borderRight: `2px solid ${band.border}`,
              }}>
                {isNH ? (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{ fontSize: 56, fontWeight: 900, color: '#64748b' }}>NH</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 6 }}>
                      No Credit History · Range 300–900
                    </div>
                  </div>
                ) : (
                  <ScoreGauge score={summary.cibilScore} />
                )}
                <div style={{
                  marginTop: 10, padding: '6px 18px', borderRadius: 999,
                  background: band.color, color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '0.06em',
                }}>
                  {band.label.toUpperCase()}
                </div>
                <Text style={{ fontSize: 11, color: '#64748b', textAlign: 'center', marginTop: 8, maxWidth: 200 }}>
                  {band.desc}
                </Text>
              </div>

              {/* Right: details */}
              <div style={{ flex: 1, padding: '32px 36px' }}>
                <div style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Customer Profile</Text>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginTop: 4 }}>{summary.fullName}</div>
                  <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                    Score Date: {summary.scoreDate} · Report ID: {summary.reportId}
                  </div>
                </div>

                {/* Personal info grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 24px', marginBottom: 24 }}>
                  {[
                    { label: 'Date of Birth', value: summary.dob },
                    { label: 'Gender', value: summary.gender },
                    { label: 'Occupation', value: summary.occupationType },
                    { label: 'Net Income', value: summary.income },
                    { label: 'Enquiries (24m)', value: `${summary.enquiryCount}` },
                    { label: 'Address', value: summary.address },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', marginTop: 2 }}>{value || '—'}</div>
                    </div>
                  ))}
                </div>

                {/* Account summary chips */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Total Accounts', value: summary.totalAccounts, color: '#6366f1', bg: '#ede9fe' },
                    { label: 'Active', value: summary.activeAccounts, color: '#0891b2', bg: '#ecfeff' },
                    { label: 'Closed', value: summary.closedAccounts, color: '#64748b', bg: '#f1f5f9' },
                    { label: 'Overdue', value: summary.overdueAccounts, color: '#dc2626', bg: '#fee2e2' },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} style={{ padding: '8px 16px', borderRadius: 12, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
                      <div style={{ fontSize: 22, fontWeight: 900, color }}>{value}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Financial summary */}
          <Row gutter={12}>
            <Col span={12}>
              <Card className="rounded-[1.5rem] border border-slate-100 shadow-sm" styles={{ body: { padding: '20px 24px' } }}>
                <Text style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Outstanding Balance</Text>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', marginTop: 6 }}>
                  ₹{Number(summary.totalBalance).toLocaleString('en-IN')}
                </div>
                <Text style={{ fontSize: 12, color: '#94a3b8' }}>Across all active credit accounts</Text>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="rounded-[1.5rem] border border-slate-100 shadow-sm" styles={{ body: { padding: '20px 24px' } }}>
                <Text style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Overdue Amount</Text>
                <div style={{ fontSize: 26, fontWeight: 900, color: summary.totalOverdue > 0 ? '#dc2626' : '#15803d', marginTop: 6 }}>
                  {summary.totalOverdue > 0 ? `₹${Number(summary.totalOverdue).toLocaleString('en-IN')}` : 'NIL'}
                </div>
                <Text style={{ fontSize: 12, color: '#94a3b8' }}>{summary.totalOverdue > 0 ? 'Payment(s) overdue — requires attention' : 'No overdue payments'}</Text>
              </Card>
            </Col>
          </Row>

          {/* Accounts table */}
          {summary.accounts?.length > 0 && (
            <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
              <Text style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 16 }}>
                Credit Account Details
              </Text>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#0f172a' }}>
                      {['Lender', 'Type', 'Account No.', 'Opened', 'Balance', 'Overdue', 'Status'].map(h => (
                        <th key={h} style={{ color: '#fff', padding: '10px 12px', textAlign: 'left', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.accounts.map((acct: any, i: number) => {
                      const isOverdue = acct.amountOverdue > 0;
                      return (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#1e293b' }}>{acct.memberName}</td>
                          <td style={{ padding: '10px 12px', color: '#475569' }}>{acct.accountType}</td>
                          <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#64748b' }}>{acct.accountNumber}</td>
                          <td style={{ padding: '10px 12px', color: '#64748b' }}>{acct.dateOpened || '—'}</td>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>₹{Number(acct.currentBalance).toLocaleString('en-IN')}</td>
                          <td style={{ padding: '10px 12px', fontWeight: 700, color: isOverdue ? '#dc2626' : '#15803d' }}>
                            {isOverdue ? `₹${Number(acct.amountOverdue).toLocaleString('en-IN')}` : 'NIL'}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{
                              padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                              background: isOverdue ? '#fee2e2' : acct.dateClosed ? '#f1f5f9' : '#dcfce7',
                              color: isOverdue ? '#dc2626' : acct.dateClosed ? '#64748b' : '#15803d',
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
            </Card>
          )}

          {/* Score range reference */}
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
            <Text style={{ fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 14 }}>
              Score Range Reference
            </Text>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { range: '750–900', label: 'Excellent', color: '#15803d', bg: '#f0fdf4' },
                { range: '700–749', label: 'Good',      color: '#4d8f4a', bg: '#f7fef5' },
                { range: '650–699', label: 'Fair',      color: '#b45309', bg: '#fffbeb' },
                { range: '550–649', label: 'Poor',      color: '#c2410c', bg: '#fff7ed' },
                { range: '300–549', label: 'Very Poor', color: '#991b1b', bg: '#fff1f2' },
              ].map(({ range, label, color, bg }) => {
                const isActive = SCORE_BANDS[summary.scoreBand]?.label === label;
                return (
                  <div key={range} style={{
                    padding: '8px 16px', borderRadius: 12, background: isActive ? color : bg,
                    border: isActive ? `2px solid ${color}` : '2px solid transparent',
                    flex: 1, minWidth: 100, textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: isActive ? '#fff' : color }}>{range}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? '#fff' : color, opacity: 0.85 }}>{label}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <Button
              type="primary"
              size="large"
              loading={pdfLoading}
              onClick={handleDownloadPdf}
              style={{ height: 56, borderRadius: 16, background: '#0f172a', border: 'none', fontWeight: 800, fontSize: 14, paddingLeft: 32, paddingRight: 32, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {!pdfLoading && <Download size={18} />} Download Full PDF Report
            </Button>
            <Button
              size="large"
              onClick={() => { setSummary(null); setLastValues(null); setError(null); }}
              style={{ height: 56, borderRadius: 16, border: '2px solid #e2e8f0', fontWeight: 700, fontSize: 14, paddingLeft: 28, paddingRight: 28 }}
            >
              Run Another Check
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── AI Result display ─────────────────────────────────────────────────────────

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

// ── Bank Statement Analyzer (Excel only) ─────────────────────────────────────

export const BankStatementAnalyzerPage: React.FC = () => {
  const [file, setFile]               = useState<File | null>(null);
  const [loading, setLoading]         = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [password, setPassword]       = useState('');
  const [excelResult, setExcelResult] = useState<{ success: boolean; txnCount?: number; error?: string } | null>(null);
  const [dragOver, setDragOver]       = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.toLowerCase().endsWith('.pdf')) { setFile(f); setExcelResult(null); }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setExcelResult(null); }
  };
  const handleAnalyse = async () => {
    if (!file) return;
    setLoading(true); setExcelResult(null);
    const formData = new FormData();
    formData.append('file', file);
    const url = usePassword && password.trim() ? '/analyse/with-password' : '/analyse';
    if (usePassword && password.trim()) formData.append('password', password.trim());
    try {
      const res = await apiClient.post(url, formData, { responseType: 'blob' });
      const txnHeader = res.headers['x-transactions-found'];
      const disposition = res.headers['content-disposition'] || '';
      const nameMatch = disposition.match(/filename="?([^"]+)"?/);
      const filename = nameMatch?.[1] ?? 'BSA_Report.xlsx';
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([res.data]));
      link.download = filename;
      document.body.appendChild(link); link.click(); document.body.removeChild(link);
      setExcelResult({ success: true, txnCount: txnHeader ? parseInt(txnHeader) : undefined });
    } catch (err: any) {
      let msg = 'Analysis failed. Please try again.';
      if (err?.response?.data instanceof Blob) {
        try { const t = await err.response.data.text(); msg = JSON.parse(t).error || msg; } catch {}
      }
      setExcelResult({ success: false, error: msg });
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 0' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 48, height: 48, background: '#f0f9ff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #bae6fd' }}>
            <Files size={24} color="#0284c7" />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>Statement Analyser</div>
            <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Excel report — SBI, HDFC, ICICI, Axis, Kotak, PNB & more</div>
          </div>
        </div>
      </div>

      <Card style={{ borderRadius: 16, border: '1px solid #e2e8f0' }}>
        {excelResult?.success ? (
          <Result status="success"
            title={<Title level={3} style={{ margin: 0 }}>Report Downloaded</Title>}
            subTitle={excelResult.txnCount ? `${excelResult.txnCount} transactions analysed across 9 Excel sheets.` : 'Saved to your downloads folder.'}
            extra={<Button onClick={() => { setExcelResult(null); setFile(null); }} style={{ borderRadius: 12, fontWeight: 800 }}>Analyse Another</Button>}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('bsa-file-input')?.click()}
              style={{ border: `2px dashed ${dragOver ? '#3b82f6' : file ? '#10b981' : '#cbd5e1'}`, borderRadius: 14, padding: '32px 16px', textAlign: 'center', cursor: 'pointer', background: dragOver ? '#eff6ff' : file ? '#f0fdf4' : '#f8fafc', transition: 'all 0.2s' }}
            >
              <input id="bsa-file-input" type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileChange} />
              <Files size={28} color={file ? '#10b981' : '#94a3b8'} style={{ marginBottom: 8 }} />
              {file
                ? <><div style={{ fontWeight: 800, color: '#0f172a' }}>{file.name}</div><div style={{ fontSize: 12, color: '#10b981', fontWeight: 700 }}>{(file.size / 1024 / 1024).toFixed(2)} MB · click to change</div></>
                : <><div style={{ fontWeight: 700, color: '#475569' }}>Drag & drop PDF or click to browse</div><div style={{ fontSize: 12, color: '#94a3b8' }}>Max 50 MB</div></>
              }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Checkbox checked={usePassword} onChange={e => setUsePassword(e.target.checked)} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#475569', cursor: 'pointer' }} onClick={() => setUsePassword(!usePassword)}>PDF is password-protected</span>
            </div>
            {usePassword && <Input.Password style={{ borderRadius: 10, height: 44 }} placeholder="e.g. DDMMYYYY or last 4 digits of mobile" value={password} onChange={e => setPassword(e.target.value)} />}
            {excelResult?.error && <Alert type="error" message={excelResult.error} style={{ borderRadius: 10 }} showIcon />}
            <Button type="primary" block size="large" loading={loading} disabled={!file} onClick={handleAnalyse}
              style={{ height: 52, borderRadius: 14, fontWeight: 900, background: '#1e293b', border: 'none' }}>
              {loading ? 'Generating…' : 'GENERATE EXCEL REPORT'} {!loading && <ArrowRight size={16} />}
            </Button>
            <div style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
              Processed on-server · Never stored
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Types ─────────────────────────────────────────────────────────────────────

type AppType = 'SALARIED' | 'GOVT_SALARIED' | 'SELF_EMPLOYED' | 'SELF_EMPLOYED_PROFESSIONAL' | 'NRI' | 'PENSIONER';
type ObType  = 'HOME_LOAN_EMI' | 'CAR_LOAN_EMI' | 'PERSONAL_LOAN_EMI' | 'CREDIT_CARD_MINIMUM' | 'OTHER';

interface EmiRow { id: number; type: ObType; amount: string; }

interface FoirResultData {
  applicantName: string;
  applicantType: AppType;
  grossMonthlyIncome: number;
  netMonthlyIncome: number;
  existingObligations: Array<{ type: string; amount: number }>;
  totalExistingObligations: number;
  currentFoirPercent: number;
  foirAfterProposedLoan: number;
  foirEligibleLimit: number;
  foirBorderlineLimit: number;
  eligibilityStatus: 'ELIGIBLE' | 'BORDERLINE' | 'NOT_ELIGIBLE';
  eligibilityMessage: string;
  alreadyOverLeveraged: boolean;
  proposedLoanAmount: number;
  proposedTenureMonths: number;
  proposedInterestRate: number;
  proposedEmi: number;
  totalInterestPayable: number;
  totalAmountPayable: number;
  maxEligibleLoanAmount: number;
  maxAffordableEmi: number;
  monthlyBudgetBreakup: {
    income: number; existingEmiTotal: number; newEmiAmount: number;
    remainingBalance: number; existingEmiPercent: number;
    newEmiPercent: number; remainingPercent: number;
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

let _emiId = 0;
const nextId = () => ++_emiId;

const formatInr = (val: number | string | null | undefined): string => {
  const n = typeof val === 'string' ? parseFloat(val) : (val ?? 0);
  if (isNaN(n)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(n);
};

const calcEmiJS = (P: number, annualRate: number, months: number): number => {
  const r = annualRate / 1200;
  if (r === 0) return P / months;
  const pow = Math.pow(1 + r, months);
  return (P * r * pow) / (pow - 1);
};

const OB_LABELS: Record<ObType, string> = {
  HOME_LOAN_EMI:       'Home Loan EMI',
  CAR_LOAN_EMI:        'Car Loan EMI',
  PERSONAL_LOAN_EMI:   'Personal Loan EMI',
  CREDIT_CARD_MINIMUM: 'Credit Card Minimum',
  OTHER:               'Other Obligation',
};

// ── Gauge ─────────────────────────────────────────────────────────────────────

const FoirGauge: React.FC<{ foirPct: number; eligibleLimit: number; borderlineLimit: number }> = ({
  foirPct, eligibleLimit, borderlineLimit,
}) => {
  const CIRCUM = Math.PI * 80;
  const clipped = Math.min(Math.max(foirPct, 0), 100);
  const offset  = CIRCUM * (1 - clipped / 100);
  const color   = foirPct <= eligibleLimit ? '#059669' : foirPct <= borderlineLimit ? '#d97706' : '#dc2626';

  return (
    <svg viewBox="0 0 200 115" width={200} height={110} style={{ overflow: 'visible' }}>
      <path d="M 20,100 A 80,80 0 0,1 180,100" stroke="#e2e8f0" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path
        d="M 20,100 A 80,80 0 0,1 180,100"
        stroke={color}
        strokeWidth={16}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={CIRCUM}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.7s ease, stroke 0.3s ease' }}
      />
      <text x="100" y="92" textAnchor="middle" fontSize="26" fontWeight="900" fill={color}
        style={{ fontFamily: "'Segoe UI', sans-serif" }}>
        {foirPct.toFixed(1)}%
      </text>
      <text x="100" y="112" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="700"
        style={{ fontFamily: "'Segoe UI', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        FOIR After Loan
      </text>
    </svg>
  );
};

// ── Budget bar ────────────────────────────────────────────────────────────────

const BudgetBar: React.FC<{ label: string; amount: number; pct: number; color: string; negative?: boolean }> = ({
  label, amount, pct, color, negative
}) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 800, color: negative ? '#dc2626' : '#0f172a' }}>{formatInr(amount)}</span>
    </div>
    <div style={{ height: 8, borderRadius: 99, background: '#e2e8f0', overflow: 'hidden' }}>
      <div style={{
        width: `${Math.min(Math.max(pct, 0), 100)}%`, height: '100%', borderRadius: 99,
        background: color, transition: 'width 0.6s ease',
      }} />
    </div>
    <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'right', marginTop: 2 }}>{pct.toFixed(1)}% of income</div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

export const FoirCalculatorPage: React.FC = () => {
  const [applicantType, setApplicantType] = useState<AppType>('SALARIED');
  const [name,     setName]     = useState('');
  const [gross,    setGross]    = useState('');
  const [net,      setNet]      = useState('');
  const [loan,     setLoan]     = useState('');
  const [tenure,   setTenure]   = useState('');
  const [rate,     setRate]     = useState('');
  const [emis,     setEmis]     = useState<EmiRow[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [pdfLoad,  setPdfLoad]  = useState(false);
  const [result,   setResult]   = useState<FoirResultData | null>(null);
  const [error,    setError]    = useState<string | null>(null);

  // ── Live calculations ────────────────────────────────────────────────────
  const netIncome     = parseFloat(net)    || 0;
  const totalEmis     = emis.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0);
  const liveFoir      = netIncome > 0 ? (totalEmis / netIncome) * 100 : 0;
  const FOIR_LIMITS: Record<AppType, [number, number]> = {
    SALARIED: [50, 55],
    GOVT_SALARIED: [60, 65],
    SELF_EMPLOYED: [55, 65],
    SELF_EMPLOYED_PROFESSIONAL: [60, 70],
    NRI: [50, 55],
    PENSIONER: [40, 50],
  };
  const [eligLim, bdLim] = FOIR_LIMITS[applicantType] ?? [50, 55];
  const liveEmi       = (() => {
    const P = parseFloat(loan) || 0, n = parseInt(tenure) || 0, r = parseFloat(rate) || 0;
    return P > 0 && n >= 12 && r >= 1 ? calcEmiJS(P, r, n) : 0;
  })();
  const tenureYrs = Math.floor(parseInt(tenure) || 0) / 12 | 0;
  const tenureMns = (parseInt(tenure) || 0) % 12;

  // ── EMI row management ───────────────────────────────────────────────────
  const addEmi = () => setEmis(prev => [...prev, { id: nextId(), type: 'OTHER', amount: '' }]);
  const removeEmi = (id: number) => setEmis(prev => prev.filter(r => r.id !== id));
  const updateEmiType = (id: number, type: ObType) =>
    setEmis(prev => prev.map(r => r.id === id ? { ...r, type } : r));
  const updateEmiAmt  = (id: number, amount: string) =>
    setEmis(prev => prev.map(r => r.id === id ? { ...r, amount } : r));

  // ── Build request body ────────────────────────────────────────────────────
  const buildRequest = useCallback(() => ({
    applicantName:        name.trim() || 'Applicant',
    applicantType,
    grossMonthlyIncome:   parseFloat(gross) || 0,
    netMonthlyIncome:     netIncome,
    existingObligations:  emis.filter(r => parseFloat(r.amount) > 0)
                              .map(r => ({ type: r.type, amount: parseFloat(r.amount) })),
    proposedLoanAmount:   parseFloat(loan),
    proposedTenureMonths: parseInt(tenure),
    proposedInterestRate: parseFloat(rate),
  }), [name, applicantType, gross, net, emis, loan, tenure, rate, netIncome]);

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = (): string | null => {
    if (netIncome <= 0)              return 'Net monthly income must be greater than 0.';
    if (!parseFloat(loan))           return 'Proposed loan amount is required.';
    const n = parseInt(tenure);
    if (!n || n < 12 || n > 360)    return 'Tenure must be between 12 and 360 months.';
    const r = parseFloat(rate);
    if (!r || r < 1 || r > 36)      return 'Interest rate must be between 1% and 36% p.a.';
    return null;
  };

  // ── Calculate ─────────────────────────────────────────────────────────────
  const handleCalculate = async () => {
    setError(null);
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const res = await apiClient.post('/foir/calculate', buildRequest());
      if (res.data?.success) setResult(res.data.data);
      else setError(res.data?.message || 'Calculation failed.');
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || 'Request failed.');
    } finally {
      setLoading(false);
    }
  };

  // ── PDF download ──────────────────────────────────────────────────────────
  const handleDownloadPdf = async () => {
    setPdfLoad(true);
    try {
      const res = await apiClient.post('/foir/report', buildRequest(), { responseType: 'blob' });
      const disposition = res.headers['content-disposition'] || '';
      const nameMatch   = disposition.match(/filename="?([^"]+)"?/);
      const filename    = nameMatch?.[1] ?? 'FOIR_Report.pdf';
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e: any) {
      setError('PDF generation failed. Please try again.');
    } finally {
      setPdfLoad(false);
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setResult(null); setError(null); setName(''); setGross(''); setNet('');
    setLoan(''); setTenure(''); setRate(''); setEmis([]);
  };

  // ── Status helpers ────────────────────────────────────────────────────────
  const statusConfig = (status?: string) => {
    if (status === 'ELIGIBLE')     return { color: '#059669', bg: '#d1fae5', label: '✓ Eligible' };
    if (status === 'BORDERLINE')   return { color: '#d97706', bg: '#fef3c7', label: '~ Borderline' };
    return { color: '#dc2626', bg: '#fee2e2', label: '✗ Not Eligible' };
  };

  const r = result;
  const sc = statusConfig(r?.eligibilityStatus);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* ── Header ── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
              <BarChart3 size={28} />
            </div>
            <Text className="text-slate-400 text-xs font-black uppercase tracking-[0.25em]">Eligibility Engine</Text>
          </div>
          <Title level={1} className="m-0 font-black tracking-tighter text-slate-800">FOIR Calculator</Title>
          <Text className="text-slate-500 font-medium text-lg">Fixed Obligation to Income Ratio — Loan eligibility per Indian bank norms</Text>
        </div>
      </div>

      <Row gutter={[20, 20]}>

        {/* ══ LEFT: Input Form ══ */}
        <Col xs={24} lg={10}>
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 28 } }}>

            {/* Applicant name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                Applicant Name
              </label>
              <Input
                value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="h-12 rounded-xl border-slate-200 bg-slate-50 font-semibold"
              />
            </div>

            {/* Applicant type */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                Applicant Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {([
                  { type: 'SALARIED' as AppType, label: '👔 Salaried' },
                  { type: 'GOVT_SALARIED' as AppType, label: '🏛️ Govt / PSU' },
                  { type: 'SELF_EMPLOYED' as AppType, label: '🏢 Self-Employed' },
                  { type: 'SELF_EMPLOYED_PROFESSIONAL' as AppType, label: '⚕️ Professional' },
                  { type: 'NRI' as AppType, label: '✈️ NRI' },
                  { type: 'PENSIONER' as AppType, label: '👴 Pensioner' },
                ]).map(({ type: t, label }) => (
                  <button key={t} onClick={() => setApplicantType(t)}
                    style={{
                      padding: '10px 6px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                      border: applicantType === t ? '2px solid #4f46e5' : '2px solid #e2e8f0',
                      background: applicantType === t ? '#eef2ff' : '#f8fafc',
                      color: applicantType === t ? '#4f46e5' : '#64748b',
                      fontWeight: 700, fontSize: 11, transition: 'all 0.15s', lineHeight: 1.4,
                    }}>
                    {label}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 6 }}>
                FOIR limits: {eligLim}% eligible · {bdLim}% borderline (per RBI/IBA norms)
              </div>
            </div>

            {/* Income */}
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Income Details
            </div>
            {(() => {
              const INCOME_LABELS: Record<AppType, { gross: string; net: string; hint: string }> = {
                SALARIED:                { gross: 'Gross Monthly Salary (CTC/12)', net: 'Net Take-Home Salary', hint: 'After PF, TDS deductions' },
                GOVT_SALARIED:           { gross: 'Gross Monthly Salary (CTC/12)', net: 'Net Take-Home Salary', hint: 'After GPF, IT deductions · DA included' },
                SELF_EMPLOYED:           { gross: 'Avg Monthly Bank Credit (12-month avg)', net: 'Net Monthly Income (ITR / Declared)', hint: 'As per last 2 years ITR · banks typically take 2-yr avg' },
                SELF_EMPLOYED_PROFESSIONAL: { gross: 'Gross Monthly Professional Income', net: 'Net Monthly Income (ITR / Declared)', hint: 'CA / Doctor / Lawyer · Form 26AS cross-checked' },
                NRI:                     { gross: 'Foreign Monthly Income (INR equiv. at remittance rate)', net: 'Net Monthly Income after overseas deductions', hint: 'OFC / NRE credit average · typically 50% discount applied by banks' },
                PENSIONER:               { gross: 'Gross Monthly Pension (govt / EPS)', net: 'Net Pension (after deductions)', hint: 'Age-adjusted tenure · max retirement age 60–65 yrs' },
              };
              const lbl = INCOME_LABELS[applicantType];
              return (
                <>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>{lbl.gross}</label>
                    <Input prefix={<IndianRupee size={14} />} type="number" value={gross} onChange={e => setGross(e.target.value)}
                      placeholder="0" className="h-12 rounded-xl border-slate-200 bg-slate-50" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>{lbl.net}</label>
                    <Input prefix={<IndianRupee size={14} />} type="number" value={net} onChange={e => setNet(e.target.value)}
                      placeholder="0" className="h-12 rounded-xl border-slate-200 bg-slate-50" />
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>{lbl.hint}</div>
                  </div>
                </>
              );
            })()}

            {/* Existing EMIs */}
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Existing EMIs / Obligations
            </div>
            {emis.map(row => (
              <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 6, marginBottom: 8, alignItems: 'center' }}>
                <Select value={row.type} onChange={v => updateEmiType(row.id, v as ObType)} size="middle"
                  style={{ borderRadius: 10 }}>
                  {(Object.keys(OB_LABELS) as ObType[]).map(k => (
                    <Select.Option key={k} value={k}>{OB_LABELS[k]}</Select.Option>
                  ))}
                </Select>
                <Input prefix={<IndianRupee size={12} />} type="number" value={row.amount}
                  onChange={e => updateEmiAmt(row.id, e.target.value)}
                  placeholder="0" size="middle" style={{ borderRadius: 10 }} />
                <button onClick={() => removeEmi(row.id)}
                  style={{ width: 36, height: 36, border: '1px solid #fecaca', borderRadius: 8, background: '#fff5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Trash2 size={14} color="#dc2626" />
                </button>
              </div>
            ))}
            <button onClick={addEmi}
              style={{ width: '100%', padding: '10px', border: '1.5px dashed #c7d2fe', borderRadius: 10, background: '#f8fafc', color: '#4f46e5', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
              <Plus size={15} /> Add EMI / Obligation
            </button>

            {/* Minimum income warning */}
            {netIncome > 0 && netIncome < 15000 && (
              <div style={{ padding: '10px 14px', borderRadius: 10, background: '#fff7ed', border: '1px solid #fed7aa', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#c2410c' }}>
                  ⚠️ Income below ₹15,000/month — most Indian banks require minimum ₹15,000 net monthly income for personal loans (₹25,000 for home loans).
                </div>
              </div>
            )}

            {/* Live FOIR preview */}
            {netIncome > 0 && (
              <div style={{ padding: '12px 16px', borderRadius: 12, background: '#eef2ff', border: '1px solid rgba(79,70,229,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>Current FOIR (without new loan)</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                    {`≤${eligLim}% eligible · ≤${bdLim}% borderline`}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: liveFoir <= eligLim ? '#059669' : liveFoir <= bdLim ? '#d97706' : '#dc2626' }}>
                    {liveFoir.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: liveFoir <= eligLim ? '#059669' : liveFoir <= bdLim ? '#d97706' : '#dc2626' }}>
                    {liveFoir <= eligLim ? 'Eligible range' : liveFoir <= bdLim ? 'Borderline' : 'Over limit'}
                  </div>
                </div>
              </div>
            )}

            {/* Proposed loan */}
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Proposed Loan
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Loan Amount</label>
              <Input prefix={<IndianRupee size={14} />} type="number" value={loan} onChange={e => setLoan(e.target.value)}
                placeholder="0" className="h-12 rounded-xl border-slate-200 bg-slate-50" />
            </div>
            <Row gutter={10} style={{ marginBottom: 12 }}>
              <Col span={12}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Tenure (months)</label>
                <Input type="number" value={tenure} onChange={e => setTenure(e.target.value)} suffix="mo"
                  placeholder="60" min={12} max={360} className="h-12 rounded-xl border-slate-200 bg-slate-50" />
                {parseInt(tenure) > 0 && (
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>{tenureYrs}y {tenureMns}m</div>
                )}
              </Col>
              <Col span={12}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Rate (% p.a.)</label>
                <Input type="number" value={rate} onChange={e => setRate(e.target.value)} suffix="%"
                  placeholder="10.5" min={1} max={36} step={0.1} className="h-12 rounded-xl border-slate-200 bg-slate-50" />
              </Col>
            </Row>

            {/* Live EMI preview */}
            {liveEmi > 0 && (
              <div style={{ padding: '10px 14px', borderRadius: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#15803d' }}>Estimated Monthly EMI</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: '#15803d' }}>{formatInr(liveEmi)}</span>
              </div>
            )}

            {error && (
              <Alert type="error" message={error} className="rounded-xl mb-4" showIcon closable onClose={() => setError(null)} />
            )}

            <Button type="primary" block size="large" loading={loading} onClick={handleCalculate}
              className="h-14 rounded-2xl bg-emerald-600 border-none font-black shadow-xl shadow-emerald-100 hover:bg-emerald-500 flex items-center justify-center gap-2">
              {!loading && <><BarChart3 size={18} /> CALCULATE FOIR</>}
            </Button>
          </Card>
        </Col>

        {/* ══ RIGHT: Results ══ */}
        <Col xs={24} lg={14}>
          {!r ? (
            <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100 text-center" styles={{ body: { padding: 60 } }}>
              <div style={{ width: 80, height: 80, background: '#f8fafc', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <TrendingUp size={36} color="#c7d2fe" />
              </div>
              <Title level={4} className="font-black text-slate-700 mb-2">Enter details and calculate</Title>
              <Text className="text-slate-400 font-medium">Your FOIR analysis, eligibility status, and monthly budget breakdown will appear here.</Text>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Gauge card */}
              <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <FoirGauge foirPct={r.foirAfterProposedLoan} eligibleLimit={r.foirEligibleLimit} borderlineLimit={r.foirBorderlineLimit} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: sc.bg, marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: sc.color }} />
                      <span style={{ fontSize: 12, fontWeight: 800, color: sc.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{sc.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                      {[
                        { lbl: 'Current', val: `${r.currentFoirPercent}%` },
                        { lbl: 'After Loan', val: `${r.foirAfterProposedLoan}%` },
                        { lbl: 'Limit', val: `${r.foirEligibleLimit}%` },
                      ].map(m => (
                        <div key={m.lbl}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{m.lbl}</div>
                          <div style={{ fontSize: 15, fontWeight: 900, color: '#0f172a' }}>{m.val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: sc.color, background: sc.bg, padding: '8px 12px', borderRadius: 10, lineHeight: 1.5 }}>
                      {r.eligibilityMessage}
                    </div>
                    {r.alreadyOverLeveraged && (
                      <Alert type="error" showIcon icon={<AlertTriangle size={14} />}
                        message="Existing EMIs alone exceed the eligible FOIR limit." className="rounded-xl mt-2 text-xs" />
                    )}
                  </div>
                </div>
              </Card>

              {/* Metrics grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { lbl: 'Monthly EMI',        val: formatInr(r.proposedEmi),           sub: 'reducing balance method' },
                  { lbl: 'Max Eligible Loan',   val: formatInr(r.maxEligibleLoanAmount), sub: `at ${r.foirEligibleLimit}% FOIR limit` },
                  { lbl: 'Total Interest',      val: formatInr(r.totalInterestPayable),  sub: `over ${r.proposedTenureMonths} months` },
                  { lbl: 'Total Payable',       val: formatInr(r.totalAmountPayable),    sub: 'principal + interest' },
                ].map(m => (
                  <Card key={m.lbl} className="rounded-[1.25rem] border border-slate-100 shadow-sm" styles={{ body: { padding: 16 } }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{m.lbl}</div>
                    <div style={{ fontSize: 17, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>{m.val}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{m.sub}</div>
                  </Card>
                ))}
              </div>

              {/* Budget breakup */}
              <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Monthly Budget Breakup</div>
                <Row gutter={24}>
                  <Col span={14}>
                    <BudgetBar label="Net Monthly Income"  amount={r.monthlyBudgetBreakup.income}          pct={100}                                        color="linear-gradient(90deg,#4f46e5,#818cf8)" />
                    <BudgetBar label="Existing EMIs"       amount={r.monthlyBudgetBreakup.existingEmiTotal} pct={r.monthlyBudgetBreakup.existingEmiPercent} color="linear-gradient(90deg,#d97706,#fbbf24)" />
                    <BudgetBar label="New EMI (Proposed)"  amount={r.monthlyBudgetBreakup.newEmiAmount}    pct={r.monthlyBudgetBreakup.newEmiPercent}       color="linear-gradient(90deg,#4f46e5,#818cf8)" />
                    <BudgetBar label="Remaining Balance"   amount={r.monthlyBudgetBreakup.remainingBalance} pct={Math.max(r.monthlyBudgetBreakup.remainingPercent, 0)} color="linear-gradient(90deg,#059669,#34d399)" negative={r.monthlyBudgetBreakup.remainingBalance < 0} />
                  </Col>
                  <Col span={10}>
                    {r.existingObligations && r.existingObligations.length > 0 ? (
                      <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            <th style={{ background: '#0f172a', color: '#fff', padding: '7px 10px', textAlign: 'left', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', borderRadius: '6px 0 0 0' }}>Obligation</th>
                            <th style={{ background: '#0f172a', color: '#fff', padding: '7px 10px', textAlign: 'right', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', borderRadius: '0 6px 0 0' }}>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.existingObligations.map((ob, i) => (
                            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
                              <td style={{ padding: '7px 10px', borderBottom: '1px solid #e2e8f0', color: '#374151', fontWeight: 600 }}>
                                {ob.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </td>
                              <td style={{ padding: '7px 10px', borderBottom: '1px solid #e2e8f0', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatInr(ob.amount)}</td>
                            </tr>
                          ))}
                          <tr style={{ background: '#eef2ff' }}>
                            <td style={{ padding: '7px 10px', fontWeight: 800, color: '#4f46e5' }}>Total EMIs</td>
                            <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 900, color: '#4f46e5' }}>{formatInr(r.totalExistingObligations)}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <div style={{ padding: 12, background: '#f8fafc', borderRadius: 10, fontSize: 12, color: '#94a3b8', fontWeight: 600, textAlign: 'center' }}>No existing EMIs entered</div>
                    )}
                  </Col>
                </Row>
              </Card>

              {/* Actions */}
              <Row gutter={12}>
                <Col span={14}>
                  <Button block size="large" loading={pdfLoad} onClick={handleDownloadPdf}
                    style={{ height: 52, borderRadius: 14, border: '2px solid #4f46e5', color: '#4f46e5', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    {!pdfLoad && <Download size={18} />} Download PDF Report
                  </Button>
                </Col>
                <Col span={10}>
                  <Button block size="large" onClick={handleReset}
                    style={{ height: 52, borderRadius: 14, border: '1.5px solid #e2e8f0', color: '#64748b', fontWeight: 700, fontSize: 13 }}>
                    New Calculation
                  </Button>
                </Col>
              </Row>

            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
