import React, { useState } from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Button,
  Result,
  Divider,
  Checkbox,
  Row,
  Col,
  Alert,
} from 'antd';
import {
  ShieldCheck,
  BarChart3,
  Files,
  Zap,
  Lock,
  ArrowRight,
  TrendingUp,
  Download,
  IndianRupee,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
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
  const currentUser = useSelector((s: RootState) => s.auth.user);
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
          consent: lastValues.consent,
        },
        { responseType: 'blob', timeout: 120000 }
      );
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CIBIL_Report_${lastValues.mobileNumber}.pdf`);
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
            <Form.Item name="name" label="Customer Full Name" rules={[{ required: true, message: 'Please enter customer name' }]}>
              <Input size="large" placeholder="Rahul Sunil Sharma" className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-bold" />
            </Form.Item>

            <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true, message: 'Please enter mobile number' }]}>
              <Input size="large" placeholder="9876543210" className="h-16 rounded-2xl border-slate-100 bg-slate-50 font-bold" />
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
            {currentUser?.role === 'ADMIN' && (
              <Button
                type="primary"
                size="large"
                loading={pdfLoading}
                onClick={handleDownloadPdf}
                style={{ height: 56, borderRadius: 16, background: '#0f172a', border: 'none', fontWeight: 800, fontSize: 14, paddingLeft: 32, paddingRight: 32, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {!pdfLoading && <Download size={18} />} Download Full PDF Report
              </Button>
            )}
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

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatInr = (val: number | string | null | undefined): string => {
  const n = typeof val === 'string' ? parseFloat(val) : (val ?? 0);
  if (isNaN(n)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(n);
};

// ── Main component ────────────────────────────────────────────────────────────

export const FoirCalculatorPage: React.FC = () => {
  const [applicantType, setApplicantType] = useState<AppType>('SALARIED');
  const [income,   setIncome]   = useState('');
  const [existEmi, setExistEmi] = useState('');
  const [loan,     setLoan]     = useState('');
  const [tenure,   setTenure]   = useState('60');
  const [rate,     setRate]     = useState('10.5');
  const [error,    setError]    = useState<string | null>(null);

  const FOIR_LIMITS: Record<AppType, [number, number]> = {
    SALARIED:                   [50, 55],
    GOVT_SALARIED:              [60, 65],
    SELF_EMPLOYED:              [55, 65],
    SELF_EMPLOYED_PROFESSIONAL: [60, 70],
    NRI:                        [50, 55],
    PENSIONER:                  [40, 50],
  };
  const [eligLim, bdLim] = FOIR_LIMITS[applicantType] ?? [50, 55];

  const netIncome   = parseFloat(income)   || 0;
  const totalEmi    = parseFloat(existEmi) || 0;
  const loanAmt     = parseFloat(loan)     || 0;
  const tenureMo    = parseInt(tenure)     || 60;
  const interestRate = parseFloat(rate)    || 10.5;

  // ── Core calculations (pure frontend — instant, no API needed) ─────────────
  const currentFoir    = netIncome > 0 ? (totalEmi / netIncome) * 100 : 0;
  const maxAllowedEmi  = (eligLim / 100) * netIncome;
  const availableEmi   = Math.max(maxAllowedEmi - totalEmi, 0);

  // Max personal loan = PV of available EMI capacity
  const monthlyRate    = interestRate / 12 / 100;
  const maxLoan = availableEmi > 0 && monthlyRate > 0
    ? availableEmi * (1 - Math.pow(1 + monthlyRate, -tenureMo)) / monthlyRate
    : 0;

  // EMI for the entered loan amount
  const proposedEmi = loanAmt > 0 && monthlyRate > 0
    ? loanAmt * monthlyRate * Math.pow(1 + monthlyRate, tenureMo) / (Math.pow(1 + monthlyRate, tenureMo) - 1)
    : 0;

  const foirAfterLoan  = netIncome > 0 ? ((totalEmi + proposedEmi) / netIncome) * 100 : 0;
  const totalInterest  = proposedEmi > 0 ? (proposedEmi * tenureMo) - loanAmt : 0;

  const foirColor = (f: number) => f <= eligLim ? '#059669' : f <= bdLim ? '#d97706' : '#dc2626';
  const foirLabel = (f: number) => f <= eligLim ? 'Eligible' : f <= bdLim ? 'Borderline' : 'Over Limit';

  const canCalculate = netIncome > 0;

  return (
    <div className="max-w-5xl mx-auto py-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100">
            <BarChart3 size={28} />
          </div>
          <Text className="text-slate-400 text-xs font-black uppercase tracking-[0.25em]">Eligibility Engine</Text>
        </div>
        <Title level={1} className="m-0 font-black tracking-tighter text-slate-800">FOIR Calculator</Title>
        <Text className="text-slate-500 font-medium">Fixed Obligation to Income Ratio — Personal loan eligibility</Text>
      </div>

      <Row gutter={[20, 20]}>

        {/* ── LEFT: Inputs ── */}
        <Col xs={24} lg={10}>
          <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 28 } }}>

            {/* Applicant type */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>
                Applicant Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {([
                  { type: 'SALARIED' as AppType,                   label: '👔 Salaried' },
                  { type: 'GOVT_SALARIED' as AppType,              label: '🏛️ Govt / PSU' },
                  { type: 'SELF_EMPLOYED' as AppType,              label: '🏢 Self-Employed' },
                  { type: 'SELF_EMPLOYED_PROFESSIONAL' as AppType, label: '⚕️ Professional' },
                  { type: 'NRI' as AppType,                        label: '✈️ NRI' },
                  { type: 'PENSIONER' as AppType,                  label: '👴 Pensioner' },
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
                FOIR limit: {eligLim}% eligible · {bdLim}% borderline (RBI/IBA norms)
              </div>
            </div>

            {/* Monthly Income */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                Net Monthly Income
              </label>
              <Input
                prefix={<IndianRupee size={14} />}
                type="number"
                value={income}
                onChange={e => setIncome(e.target.value)}
                placeholder="e.g. 75000"
                className="h-12 rounded-xl border-slate-200 bg-slate-50"
              />
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>Take-home / net salary after all deductions</div>
            </div>

            {/* Existing EMI */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                Existing Total EMI / Month
              </label>
              <Input
                prefix={<IndianRupee size={14} />}
                type="number"
                value={existEmi}
                onChange={e => setExistEmi(e.target.value)}
                placeholder="e.g. 12000"
                className="h-12 rounded-xl border-slate-200 bg-slate-50"
              />
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>Total of all running loan EMIs (home, car, personal, credit card, etc.)</div>
            </div>

            {/* Live current FOIR badge */}
            {netIncome > 0 && (
              <div style={{ padding: '12px 16px', borderRadius: 12, background: '#eef2ff', border: '1px solid rgba(79,70,229,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b' }}>Current FOIR</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Existing EMI ÷ Income</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: foirColor(currentFoir) }}>{currentFoir.toFixed(1)}%</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: foirColor(currentFoir) }}>{foirLabel(currentFoir)}</div>
                </div>
              </div>
            )}

            <Divider style={{ margin: '0 0 20px 0' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8' }}>PERSONAL LOAN CHECK</span>
            </Divider>

            {/* Loan amount */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>
                Personal Loan Amount
              </label>
              <Input
                prefix={<IndianRupee size={14} />}
                type="number"
                value={loan}
                onChange={e => setLoan(e.target.value)}
                placeholder="e.g. 500000"
                className="h-12 rounded-xl border-slate-200 bg-slate-50"
              />
            </div>

            <Row gutter={10} style={{ marginBottom: 12 }}>
              <Col span={12}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Tenure (months)</label>
                <Input
                  type="number" value={tenure} onChange={e => setTenure(e.target.value)}
                  suffix="mo" min={12} max={360}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50"
                />
              </Col>
              <Col span={12}>
                <label style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: 5 }}>Rate (% p.a.)</label>
                <Input
                  type="number" value={rate} onChange={e => setRate(e.target.value)}
                  suffix="%" step={0.1} min={1} max={36}
                  className="h-12 rounded-xl border-slate-200 bg-slate-50"
                />
              </Col>
            </Row>

            {error && (
              <Alert type="error" message={error} className="rounded-xl mb-4" showIcon closable onClose={() => setError(null)} />
            )}

            {!canCalculate && (
              <div style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', padding: '12px 0' }}>
                Enter your net monthly income to see results
              </div>
            )}
          </Card>
        </Col>

        {/* ── RIGHT: Results (live, no button needed) ── */}
        <Col xs={24} lg={14}>
          {!canCalculate ? (
            <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100 text-center" styles={{ body: { padding: 60 } }}>
              <div style={{ width: 80, height: 80, background: '#f8fafc', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <TrendingUp size={36} color="#c7d2fe" />
              </div>
              <Title level={4} className="font-black text-slate-700 mb-2">Enter income to begin</Title>
              <Text className="text-slate-400 font-medium">Results update live as you type.</Text>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* ── FOIR Summary Card ── */}
              <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>FOIR Summary</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Current FOIR',       value: `${currentFoir.toFixed(1)}%`,   color: foirColor(currentFoir),  sub: 'Existing burden' },
                    { label: 'FOIR After Loan',     value: loanAmt > 0 ? `${foirAfterLoan.toFixed(1)}%` : '—', color: loanAmt > 0 ? foirColor(foirAfterLoan) : '#94a3b8', sub: loanAmt > 0 ? foirLabel(foirAfterLoan) : 'Enter loan amount' },
                    { label: 'Eligible Limit',      value: `${eligLim}%`,                  color: '#4f46e5',               sub: 'As per RBI norms' },
                  ].map(m => (
                    <div key={m.label} style={{ background: '#f8fafc', borderRadius: 14, padding: '14px 16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: m.color }}>{m.value}</div>
                      <div style={{ fontSize: 11, color: m.color, fontWeight: 700, marginTop: 2 }}>{m.sub}</div>
                    </div>
                  ))}
                </div>

                {/* FOIR bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 6 }}>
                    <span>0%</span><span>{eligLim}% limit</span><span>100%</span>
                  </div>
                  <div style={{ position: 'relative', height: 12, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(currentFoir, 100)}%`, background: foirColor(currentFoir), borderRadius: 999, transition: 'width 0.4s ease' }} />
                    {loanAmt > 0 && proposedEmi > 0 && (
                      <div style={{ position: 'absolute', left: `${Math.min(currentFoir, 100)}%`, top: 0, height: '100%', width: `${Math.min(foirAfterLoan - currentFoir, 100 - currentFoir)}%`, background: '#818cf8', opacity: 0.7, transition: 'width 0.4s ease' }} />
                    )}
                    <div style={{ position: 'absolute', left: `${eligLim}%`, top: 0, width: 2, height: '100%', background: '#4f46e5' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: foirColor(currentFoir), display: 'inline-block' }} />Existing EMI</span>
                    {loanAmt > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#818cf8', display: 'inline-block' }} />New Loan EMI</span>}
                  </div>
                </div>
              </Card>

              {/* ── Max Eligible Loan Card ── */}
              <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Personal Loan Eligibility</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: '#f0fdf4', borderRadius: 14, padding: '16px', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Max Eligible Loan</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#15803d' }}>{formatInr(Math.round(maxLoan))}</div>
                    <div style={{ fontSize: 11, color: '#15803d', marginTop: 2 }}>at {eligLim}% FOIR · {tenureMo}mo · {interestRate}%</div>
                  </div>
                  <div style={{ background: '#eff6ff', borderRadius: 14, padding: '16px', border: '1px solid #bfdbfe' }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Max Monthly EMI</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: '#1d4ed8' }}>{formatInr(Math.round(availableEmi))}</div>
                    <div style={{ fontSize: 11, color: '#1d4ed8', marginTop: 2 }}>Available after existing obligations</div>
                  </div>
                </div>
              </Card>

              {/* ── Loan Check Card (if loan amount entered) ── */}
              {loanAmt > 0 && (
                <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Loan of {formatInr(loanAmt)}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', borderRadius: 999,
                      background: foirAfterLoan <= eligLim ? '#d1fae5' : foirAfterLoan <= bdLim ? '#fef3c7' : '#fee2e2',
                      color: foirColor(foirAfterLoan), fontWeight: 800, fontSize: 12 }}>
                      {foirAfterLoan <= eligLim ? '✓ Eligible' : foirAfterLoan <= bdLim ? '~ Borderline' : '✗ Not Eligible'}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'Monthly EMI',     value: formatInr(Math.round(proposedEmi)),    sub: `over ${tenureMo} months` },
                      { label: 'Total Interest',  value: formatInr(Math.round(totalInterest)),  sub: 'cost of borrowing' },
                      { label: 'Total Payable',   value: formatInr(Math.round(loanAmt + totalInterest)), sub: 'principal + interest' },
                    ].map(m => (
                      <div key={m.label} style={{ background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{m.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>{m.value}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{m.sub}</div>
                      </div>
                    ))}
                  </div>
                  {foirAfterLoan > eligLim && (
                    <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#fff7ed', border: '1px solid #fed7aa' }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#c2410c' }}>
                        ⚠ This loan pushes FOIR to {foirAfterLoan.toFixed(1)}% — above the {eligLim}% eligible limit.
                        Max eligible loan for this tenure and rate is {formatInr(Math.round(maxLoan))}.
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* ── Income breakdown ── */}
              <Card className="rounded-[2rem] border-none shadow-xl shadow-slate-100" styles={{ body: { padding: 24 } }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Monthly Income Breakdown</div>
                {[
                  { label: 'Net Monthly Income',   amount: netIncome,                                      color: '#4f46e5', pct: 100 },
                  { label: 'Existing EMIs',         amount: totalEmi,                                       color: '#d97706', pct: netIncome > 0 ? (totalEmi / netIncome) * 100 : 0 },
                  { label: 'New Loan EMI',          amount: proposedEmi > 0 ? Math.round(proposedEmi) : 0, color: '#818cf8', pct: netIncome > 0 ? (proposedEmi / netIncome) * 100 : 0 },
                  { label: 'Remaining Balance',     amount: netIncome - totalEmi - (proposedEmi || 0),      color: '#059669', pct: netIncome > 0 ? ((netIncome - totalEmi - (proposedEmi || 0)) / netIncome) * 100 : 0 },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                      <span>{row.label}</span>
                      <span style={{ color: row.amount < 0 ? '#dc2626' : '#0f172a' }}>{formatInr(row.amount)}</span>
                    </div>
                    <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.min(Math.max(row.pct, 0), 100)}%`, background: row.amount < 0 ? '#dc2626' : row.color, borderRadius: 999, transition: 'width 0.3s ease' }} />
                    </div>
                  </div>
                ))}
              </Card>

            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
