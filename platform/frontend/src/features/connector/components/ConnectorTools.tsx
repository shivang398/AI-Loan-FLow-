import React, { useState } from 'react';
import { Alert, Button, Checkbox, Input } from 'antd';
import { Files } from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

const RM_BLUE = '#0B2DA4';
const RM_RED  = '#CC1A1A';

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
    <div style={{ maxWidth: 720, margin: '0 auto' }}>

      {/* ── Page Header ── */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--rm-blue-light)',
            border: '1px solid var(--surface-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Files size={16} color={RM_BLUE} />
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.12em',
            fontFamily: 'Inter, sans-serif',
          }}>
            Financial Analysis
          </span>
        </div>
        <h1 className="page-header-title">Statement Analyser</h1>
        <span className="page-header-subtitle">
          Excel report — SBI, HDFC, ICICI, Axis, Kotak, PNB &amp; more
        </span>
      </div>

      {/* Upload card */}
      <div className="pro-card" style={{ padding: '28px 32px' }}>
        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          style={{
            border: `2px dashed ${dragOver ? RM_BLUE : 'var(--surface-3)'}`,
            padding: '36px 24px', textAlign: 'center',
            background: dragOver ? 'var(--rm-blue-light)' : 'var(--surface-1)',
            transition: 'border-color 0.15s, background 0.15s',
            cursor: 'pointer',
            marginBottom: 20,
          }}
          onClick={() => document.getElementById('bsa-file-input')?.click()}
        >
          <Files size={32} color={dragOver ? RM_BLUE : 'var(--text-muted)'} style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
            {file ? file.name : 'Drop your bank statement PDF here'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            {file ? `${(file.size / 1024).toFixed(1)} KB` : 'or click to browse — PDF format only'}
          </div>
          <input
            id="bsa-file-input"
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        <Checkbox
          checked={usePassword}
          onChange={e => setUsePassword(e.target.checked)}
          style={{ marginBottom: usePassword ? 12 : 20, color: 'var(--text-secondary)', fontSize: 13 }}
        >
          Password-protected PDF
        </Checkbox>

        {usePassword && (
          <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="PDF password"
            style={{ borderRadius: 2, height: 42, marginBottom: 20 }}
          />
        )}

        {excelResult && (
          <Alert
            type={excelResult.success ? 'success' : 'error'}
            message={
              excelResult.success
                ? `Report generated — ${excelResult.txnCount ?? 'multiple'} transactions analysed`
                : excelResult.error
            }
            style={{
              borderRadius: 0, border: 'none',
              borderLeft: `3px solid ${excelResult.success ? '#1A7A4A' : RM_RED}`,
              background: excelResult.success ? '#F0FAF4' : '#FFF0F0',
              marginBottom: 16,
            }}
          />
        )}

        <Button
          type="primary"
          loading={loading}
          disabled={!file}
          onClick={handleAnalyse}
          style={{
            height: 42, borderRadius: 2, fontWeight: 700,
            fontSize: 13, width: '100%',
            background: RM_BLUE, borderColor: RM_BLUE,
            letterSpacing: '0.02em',
          }}
        >
          Generate Excel Report
        </Button>
      </div>
    </div>
  );
};
