import React, { useCallback, useEffect, useState } from 'react';
import { Table, Button, Form, Input, Checkbox, App, Select, DatePicker } from 'antd';
import { Download, FileSearch, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { Dayjs } from 'dayjs';
import type { RootState } from '../../store';
import type { ColumnsType } from 'antd/es/table';
import api from '../../shared/services/apiClient';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const MUTED = '#7A92B5';
const BORDER = '#D4DCE8';

interface CreditReportRow {
  id: string;
  name: string;
  mobileLast4: string;
  mobile?: string | null;   // full number (pulls since it was stored); older rows have only the last 4
  status: 'SUCCESS' | 'NOT_FOUND' | 'UNAVAILABLE';
  errorCode: string | null;
  score: number | null;
  source: 'LIVE' | 'MOCK';
  requestedByName: string | null;
  requestedByRole: string;
  createdAt: string;
  expiresAt: string;
}

const STATUS: Record<CreditReportRow['status'], { label: string; color: string }> = {
  SUCCESS:     { label: 'Report ready',      color: '#15803D' },
  NOT_FOUND:   { label: 'No credit history', color: '#6B7280' },
  UNAVAILABLE: { label: 'Bureau unavailable', color: '#DC2626' },
};

// Short reason under a failed pull (codes from the backend's CRIF adapter)
const FAILURE_REASON: Record<string, string> = {
  AUTH_OR_CONFIGURATION_FAILED: 'Access details rejected (API key / client ID / workflow ID)',
  INVALID_PROVIDER_REQUEST: 'Request rejected by the bureau',
  RATE_LIMITED: 'Bureau rate limit',
  NETWORK_OR_TIMEOUT: 'Bureau timed out',
  PROVIDER_UNAVAILABLE: 'Bureau returned an error',
};

// Score bands shown in the PDF (CRIF range 300-900)
const scoreColour = (s: number) => (s >= 750 ? '#1a7f4b' : s >= 700 ? '#1656b8' : s >= 650 ? '#8f6300' : '#c0392b');

const PORTALS: Record<string, string> = {
  PUBLIC: 'Landing page', ADMIN: 'Admin', RM: 'RM', OPERATIONS: 'Operations', CONNECTOR: 'Connector',
};

interface Filters { portal?: string; status?: string; q?: string; range?: [Dayjs, Dayjs] | null }

const filterParams = (f: Filters) => ({
  portal: f.portal || undefined,
  status: f.status || undefined,
  q: f.q?.trim() || undefined,
  from: f.range?.[0]?.format('YYYY-MM-DD'),
  to: f.range?.[1]?.format('YYYY-MM-DD'),
});

const fmtDate = (iso: string) => new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

interface PullForm { name: string; mobile: string; consent: boolean }

const CreditReportPage: React.FC = () => {
  const { message, modal } = App.useApp();
  const [form] = Form.useForm<PullForm>();
  const [rows, setRows] = useState<CreditReportRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [consentText, setConsentText] = useState('');
  const isAdmin = useSelector((s: RootState) => s.auth.user?.role) === 'ADMIN';
  const [filters, setFilters] = useState<Filters>({});
  const [exporting, setExporting] = useState(false);

  const load = useCallback(async (p = page) => {
    setLoading(true);
    try {
      const { data } = await api.get('/credit-reports', { params: { page: p, size: 20, ...filterParams(filters) } });
      setRows(data.data.items);
      setTotal(data.data.total);
    } catch {
      message.error('Could not load credit reports');
    } finally {
      setLoading(false);
    }
  }, [page, filters, message]);

  useEffect(() => { load(page); }, [page, load]);
  useEffect(() => {
    api.get('/credit-reports/consent').then(r => setConsentText(r.data.data.text)).catch(() => {});
  }, []);

  const download = async (row: CreditReportRow) => {
    setDownloading(row.id);
    try {
      const res = await api.get(`/credit-reports/${row.id}/pdf`, { responseType: 'blob' });
      const name = /filename="([^"]+)"/.exec(res.headers['content-disposition'] ?? '')?.[1] ?? `credit-report-${row.id}.pdf`;
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      message.error('Could not download the report');
    } finally {
      setDownloading(null);
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const res = await api.get('/credit-reports/export', { params: filterParams(filters), responseType: 'blob' });
      const name = /filename="([^"]+)"/.exec(res.headers['content-disposition'] ?? '')?.[1] ?? 'credit-reports.csv';
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      message.error('Could not export the credit reports');
    } finally {
      setExporting(false);
    }
  };

  const setFilter = (patch: Partial<Filters>) => { setFilters(f => ({ ...f, ...patch })); setPage(0); };

  const pull = async (values: PullForm, force = false) => {
    setPulling(true);
    try {
      // The bureau can take up to 30 s; allow longer than the default 30 s client timeout
      const { data } = await api.post('/credit-reports', { name: values.name, mobile: values.mobile, consent: values.consent === true, force }, { timeout: 60_000 });
      const row: CreditReportRow = data.data;
      if (row.status === 'SUCCESS') message.success(`Report fetched${row.score !== null ? ` — score ${row.score}` : ''}`);
      else if (row.status === 'NOT_FOUND') {
        modal.warning({ title: 'No credit history is present.' });
      } else message.info(data.message);
      form.resetFields();
      setPage(0);
      load(0);
      if (row.status === 'SUCCESS') download(row);
    } catch (err: any) {
      const status = err?.response?.status;
      const recent: CreditReportRow | undefined = err?.response?.data?.data;
      if (status === 409 && recent) {
        modal.confirm({
          title: 'A report was pulled recently',
          content: `${recent.name}'s report was pulled on ${fmtDate(recent.createdAt)}. Download that one, or pull a fresh report (a new bureau charge)?`,
          okText: 'Download existing',
          cancelText: 'Pull fresh report',
          // Cancel = a paid bureau call, so Esc / clicking outside must not trigger it
          keyboard: false,
          maskClosable: false,
          onOk: () => download(recent),
          onCancel: () => pull(values, true),
        });
      } else {
        message.error(err?.response?.data?.message ?? 'Could not fetch the credit report');
        if (status === 502) load(0);
      }
    } finally {
      setPulling(false);
    }
  };

  const columns: ColumnsType<CreditReportRow> = [
    {
      title: 'Customer', key: 'name',
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 600, color: NAVY }}>{r.name}</div>
          <div style={{ fontSize: 12, color: MUTED }}>Mobile {r.mobile ? `+91 ${r.mobile}` : `••••••${r.mobileLast4}`}</div>
        </div>
      ),
    },
    {
      title: 'Score', dataIndex: 'score', width: 90,
      render: (s: number | null) => s === null ? <span style={{ color: MUTED }}>—</span> : <span style={{ fontWeight: 700, color: scoreColour(s) }}>{s}</span>,
    },
    {
      title: 'Status', dataIndex: 'status', width: 210,
      render: (s: CreditReportRow['status'], r) => (
        <span style={{ color: STATUS[s].color, fontWeight: 600, fontSize: 13 }}>
          {STATUS[s].label}{r.source === 'MOCK' && <span style={{ color: MUTED, fontWeight: 400 }}> (test data)</span>}
          {s === 'UNAVAILABLE' && r.errorCode && (
            <div style={{ color: MUTED, fontWeight: 400, fontSize: 12 }}>{FAILURE_REASON[r.errorCode] ?? r.errorCode}</div>
          )}
        </span>
      ),
    },
    {
      title: 'Pulled by', dataIndex: 'requestedByName',
      render: (v: string | null, r) => (
        <div style={{ fontSize: 13 }}>
          <div>{v ?? '—'}</div>
          {isAdmin && <div style={{ fontSize: 12, color: MUTED }}>{PORTALS[r.requestedByRole] ?? r.requestedByRole}</div>}
        </div>
      ),
    },
    { title: 'Pulled on', dataIndex: 'createdAt', width: 170, render: (v: string) => <span style={{ fontSize: 13 }}>{fmtDate(v)}</span> },
    {
      title: '', key: 'pdf', width: 130, align: 'right',
      render: (_, r) => r.status === 'SUCCESS' && (
        <Button size="small" icon={<Download size={13} />} loading={downloading === r.id} onClick={() => download(r)}>PDF</Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: NAVY, letterSpacing: '-0.02em' }}>
        Credit Report
      </div>
      <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>
        Soft pull from CRIF High Mark — does not affect the customer's score. Reports are deleted automatically after 180 days (6 months).
      </div>

      <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderTop: `3px solid ${GOLD}`, padding: 20, marginBottom: 20 }}>
        <Form<PullForm> form={form} layout="vertical" onFinish={v => pull(v)} requiredMark={false}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 16px' }}>
            <Form.Item name="name" label="Full name (as on PAN)" rules={[{ required: true, min: 2, message: 'Enter the customer\'s full name' }]}>
              <Input placeholder="e.g. Rahul Sharma" maxLength={100} autoComplete="off" />
            </Form.Item>
            <Form.Item
              name="mobile" label="Mobile number"
              normalize={(v: string) => (v ?? '').replace(/\D/g, '').slice(0, 10)}
              rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' }]}
            >
              <Input placeholder="10-digit mobile" inputMode="numeric" prefix={<span style={{ color: MUTED }}>+91</span>} autoComplete="off" />
            </Form.Item>
          </div>
          <Form.Item
            name="consent" valuePropName="checked"
            rules={[{ validator: (_, v) => (v ? Promise.resolve() : Promise.reject(new Error('The customer\'s consent is required'))) }]}
          >
            <Checkbox>
              <span style={{ fontSize: 13 }}>
                The customer has given consent to the following:{' '}
                <span style={{ color: MUTED }}>{consentText || 'consent to obtain their credit information for their loan application.'}</span>
              </span>
            </Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={pulling} icon={<FileSearch size={15} />}>
            Fetch credit report
          </Button>
        </Form>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontWeight: 600, color: NAVY }}>{isAdmin ? 'All pulled reports — every portal and the landing page' : 'Reports you pulled'}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {isAdmin && <Button size="small" icon={<FileSpreadsheet size={13} />} loading={exporting} onClick={exportCsv}>Export CSV</Button>}
          <Button size="small" icon={<RefreshCw size={13} />} onClick={() => load(page)}>Refresh</Button>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        <Input.Search allowClear placeholder="Search name or mobile" style={{ width: 220 }} onSearch={q => setFilter({ q })} />
        {isAdmin && (
          <Select allowClear placeholder="All portals" style={{ width: 160 }} value={filters.portal} onChange={portal => setFilter({ portal })}
            options={Object.entries(PORTALS).map(([value, label]) => ({ value, label }))} />
        )}
        <Select allowClear placeholder="All statuses" style={{ width: 170 }} value={filters.status} onChange={status => setFilter({ status })}
          options={Object.entries(STATUS).map(([value, v]) => ({ value, label: v.label }))} />
        <DatePicker.RangePicker value={filters.range ?? null} onChange={range => setFilter({ range: range as [Dayjs, Dayjs] | null })} format="DD MMM YYYY" />
      </div>
      <div style={{ background: '#fff', border: `1px solid ${BORDER}` }}>
        <Table<CreditReportRow>
          columns={columns}
          dataSource={rows}
          rowKey="id"
          loading={loading}
          size="middle"
          scroll={{ x: 760 }}
          pagination={{ current: page + 1, pageSize: 20, total, showSizeChanger: false, onChange: p => setPage(p - 1) }}
          locale={{ emptyText: <div style={{ padding: 40, color: MUTED, textAlign: 'center' }}>No credit reports pulled yet</div> }}
        />
      </div>
    </div>
  );
};

export default CreditReportPage;
