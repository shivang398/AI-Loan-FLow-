import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, App } from 'antd';
import { AlertCircle, Download, FileSearch, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { C, DISPLAY, SANS } from '../theme';
import { GoldCorners } from './Royal';

interface CheckForm { name: string; mobile: string; pan?: string; consent: boolean }
interface Result { id: string; status: 'SUCCESS' | 'NOT_FOUND'; score: number | null; downloadToken: string | null }

const scoreBand = (s: number) =>
  s >= 750 ? { label: 'Excellent', color: '#1a7f4b' } : s >= 700 ? { label: 'Good', color: '#1656b8' }
  : s >= 650 ? { label: 'Average', color: '#8f6300' } : { label: 'Needs work', color: '#c0392b' };

/** Landing-page hero card: a visitor fetches their own CIBIL report (soft pull — does not affect the score). */
const CreditReportCheck: React.FC = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm<CheckForm>();
  const [consentText, setConsentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('/api/public/credit-report/consent').then(r => setConsentText(r.data.data.text)).catch(() => {});
  }, []);

  const download = async (r: Result) => {
    if (!r.downloadToken) return;
    setDownloading(true);
    try {
      const res = await axios.get(`/api/public/credit-report/${r.id}/pdf`, { params: { token: r.downloadToken }, responseType: 'blob' });
      const fileName = /filename="([^"]+)"/.exec(res.headers['content-disposition'] ?? '')?.[1] ?? 'credit-report.pdf';
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch (err: any) {
      message.error(err?.response?.status === 403 ? 'This download link has expired — please fetch the report again.' : 'Could not download the report');
    } finally {
      setDownloading(false);
    }
  };

  const submit = async (v: CheckForm) => {
    setLoading(true);
    setResult(null);
    try {
      // The bureau can take up to 30 s
      const { data } = await axios.post('/api/public/credit-report', { name: v.name, mobile: v.mobile, pan: v.pan || undefined, consent: v.consent === true }, { timeout: 60_000 });
      setResult(data.data);
      setName(v.name);
      if (data.data.status === 'SUCCESS') download(data.data);
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Could not fetch your credit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="credit-report" style={{ position: 'relative', background: C.ivory, padding: 'clamp(26px, 3vw, 36px)', borderTop: `3px solid ${C.gold}`, boxShadow: '0 30px 70px rgba(0,0,0,0.35)', scrollMarginTop: 90 }}>
      <GoldCorners inset={8} size={14} />
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 30, color: C.navy, margin: 0, lineHeight: 1.15 }}>Check your credit score</h2>
      <p style={{ fontFamily: SANS, fontSize: 14, color: C.muted, margin: '6px 0 20px' }}>Free CIBIL report · soft check, does not affect your score</p>

      <Form<CheckForm> form={form} layout="vertical" onFinish={submit} requiredMark={false} style={{ fontFamily: SANS }}>
        <Form.Item name="name" label="Full name (as on PAN)" rules={[{ required: true, min: 2, message: 'Enter your full name' }]} style={{ marginBottom: 14 }}>
          <Input size="large" placeholder="e.g. Rahul Sharma" maxLength={100} autoComplete="name" />
        </Form.Item>
        <Form.Item
          name="mobile" label="Mobile number" style={{ marginBottom: 14 }}
          normalize={(val: string) => (val ?? '').replace(/\D/g, '').slice(0, 10)}
          rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }]}
        >
          <Input size="large" placeholder="10-digit mobile" inputMode="numeric" prefix={<span style={{ color: C.muted }}>+91</span>} autoComplete="tel-national" />
        </Form.Item>
        <Form.Item name="pan" label="PAN number" style={{ marginBottom: 14 }} normalize={(v: string) => (v ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)} rules={[{ required: true, message: 'Enter your PAN number' }, { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: 'Enter a valid PAN (e.g. ABCDE1234F)' }]}>
          <Input size="large" placeholder="ABCDE1234F" maxLength={10} autoComplete="off" style={{ textTransform: 'uppercase' }} />
        </Form.Item>
        <Form.Item
          name="consent" valuePropName="checked" style={{ marginBottom: 18 }}
          rules={[{ validator: (_, val) => (val ? Promise.resolve() : Promise.reject(new Error('Please give your consent to continue'))) }]}
        >
          <Checkbox>
            {/* The full consent text, in a short scrolling box so the card stays compact */}
            <span style={{ display: 'block', maxHeight: 84, overflowY: 'auto', fontSize: 11.5, color: C.ink, lineHeight: 1.5, paddingRight: 4 }}>
              {consentText || 'I consent to Real Money obtaining my credit information from authorised Credit Information Companies for my loan application.'}
            </span>
          </Checkbox>
        </Form.Item>
        <button type="submit" disabled={loading} className="lp-btn lp-btn-gold" style={{ width: '100%', height: 52, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
          <FileSearch size={16} /> {loading ? 'Fetching your report…' : 'Get my credit report'}
        </button>
        <p style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, lineHeight: 1.55, color: C.muted, margin: '14px 0 0' }}>
          <ShieldCheck size={15} color={C.goldDeep} style={{ flexShrink: 0, marginTop: 1 }} />
          Your report is stored encrypted and deleted automatically after 6 months.
        </p>
      </Form>

      {result && (
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.line}`, fontFamily: SANS }}>
          {result.status === 'SUCCESS' ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
              <div>
                <div style={{ fontSize: 13, color: C.muted }}>{name}'s credit score</div>
                {result.score !== null ? (
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontSize: 40, fontWeight: 700, color: C.navy, lineHeight: 1.1 }}>{result.score}</span>
                    <span style={{ fontWeight: 600, color: scoreBand(result.score).color }}>{scoreBand(result.score).label}</span>
                  </div>
                ) : <div style={{ fontWeight: 600, color: C.navy }}>Report ready</div>}
              </div>
              <button type="button" onClick={() => download(result)} disabled={downloading} className="lp-btn lp-btn-gold" style={{ height: 44, padding: '0 20px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Download size={15} /> {downloading ? 'Downloading…' : 'Download PDF'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#FFF8E6', border: '1px solid #F1D48A', padding: '14px 16px' }}>
              <AlertCircle size={20} color="#9A6B00" style={{ flexShrink: 0 }} />
              <span style={{ fontWeight: 700, color: C.navy, fontSize: 15 }}>No credit history is present.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreditReportCheck;
