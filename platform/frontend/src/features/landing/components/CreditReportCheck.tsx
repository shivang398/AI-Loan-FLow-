import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, App } from 'antd';
import { AlertCircle, Download, FileSearch, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { C, SANS } from '../theme';
import { SectionHeading, GoldCorners } from './Royal';

interface CheckForm { name: string; mobile: string; consent: boolean }
interface Result { id: string; status: 'SUCCESS' | 'NOT_FOUND'; score: number | null; downloadToken: string | null }

const scoreBand = (s: number) =>
  s >= 750 ? { label: 'Excellent', color: '#1a7f4b' } : s >= 700 ? { label: 'Good', color: '#1656b8' }
  : s >= 650 ? { label: 'Average', color: '#8f6300' } : { label: 'Needs work', color: '#c0392b' };

/** Landing page: a visitor fetches their own CRIF report (soft pull — does not affect the score). */
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
      const { data } = await axios.post('/api/public/credit-report', { name: v.name, mobile: v.mobile, consent: v.consent === true });
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
    <section id="credit-report" style={{ background: C.parchment, padding: 'clamp(72px, 9vw, 112px) 0' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading
          eyebrow="Free credit report"
          title="Check your credit score"
          intro="Get your CRIF High Mark credit report in seconds. It is a soft check, so it does not affect your score."
        />

        <div style={{ position: 'relative', background: C.ivory, border: `1px solid ${C.line}`, padding: 'clamp(20px, 4vw, 36px)' }}>
          <GoldCorners />
          <Form<CheckForm> form={form} layout="vertical" onFinish={submit} requiredMark={false} style={{ fontFamily: SANS }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 16px' }}>
              <Form.Item name="name" label="Full name (as on PAN)" rules={[{ required: true, min: 2, message: 'Enter your full name' }]}>
                <Input size="large" placeholder="e.g. Rahul Sharma" maxLength={100} autoComplete="name" />
              </Form.Item>
              <Form.Item
                name="mobile" label="Mobile number"
                normalize={(val: string) => (val ?? '').replace(/\D/g, '').slice(0, 10)}
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }]}
              >
                <Input size="large" placeholder="10-digit mobile" inputMode="numeric" prefix={<span style={{ color: C.muted }}>+91</span>} autoComplete="tel-national" />
              </Form.Item>
            </div>
            <Form.Item
              name="consent" valuePropName="checked"
              rules={[{ validator: (_, val) => (val ? Promise.resolve() : Promise.reject(new Error('Please give your consent to continue'))) }]}
            >
              <Checkbox>
                <span style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.5 }}>
                  {consentText || 'I consent to Real Money obtaining my credit information from authorised Credit Information Companies for my loan application.'}
                </span>
              </Checkbox>
            </Form.Item>
            <button type="submit" disabled={loading} className="lp-btn lp-btn-gold" style={{ height: 48, padding: '0 28px', display: 'inline-flex', alignItems: 'center', gap: 8, opacity: loading ? 0.7 : 1 }}>
              <FileSearch size={16} /> {loading ? 'Fetching your report…' : 'Get my credit report'}
            </button>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
              <ShieldCheck size={14} /> Your report is stored encrypted and deleted automatically after 6 months.
            </div>
          </Form>

          {result && (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.line}` }}>
              {result.status === 'SUCCESS' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, color: C.muted }}>{name}'s credit score</div>
                    {result.score !== null ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        <span style={{ fontSize: 44, fontWeight: 700, color: C.navy, lineHeight: 1.1 }}>{result.score}</span>
                        <span style={{ fontWeight: 600, color: scoreBand(result.score).color }}>{scoreBand(result.score).label}</span>
                      </div>
                    ) : <div style={{ fontWeight: 600, color: C.navy }}>Report ready</div>}
                  </div>
                  <button type="button" onClick={() => download(result)} disabled={downloading} className="lp-btn lp-btn-gold" style={{ height: 44, padding: '0 22px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <Download size={15} /> {downloading ? 'Downloading…' : 'Download PDF'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#FFF8E6', border: '1px solid #F1D48A', padding: '16px 18px' }}>
                  <AlertCircle size={22} color="#9A6B00" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ color: C.ink, fontSize: 14, lineHeight: 1.6 }}>
                    <div style={{ fontWeight: 700, color: C.navy, fontSize: 16, marginBottom: 4 }}>You do not have any credit history yet</div>
                    The credit bureau has no loans or credit cards on record for <b>{name}</b> with this mobile number. Please check:
                    <ul style={{ margin: '6px 0 6px 18px', padding: 0 }}>
                      <li>your name is exactly as on your PAN card</li>
                      <li>this is the mobile number linked to your bank accounts or loans</li>
                    </ul>
                    If both are correct, you can still <a href="#apply">apply for a loan</a> — our team will help you get started.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreditReportCheck;
