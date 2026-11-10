import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Button, Modal, Form, Input, Select, Segmented, DatePicker, App, Progress, Alert, Drawer } from 'antd';
import { Send, Megaphone, Users } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import type { Dayjs } from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import api from '../../../shared/services/apiClient';
import { LEAD_STATUS_STYLES } from '../../../shared/constants/statusStyles';
import WhatsAppTemplates, { Template, TemplatePreview } from './WhatsAppTemplates';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const MUTED = '#7A92B5';
const BORDER = '#D4DCE8';


interface CampaignStats { PENDING: number; SENT: number; DELIVERED: number; READ: number; FAILED: number; replied: number; leads: number }

interface Campaign {
  id: string;
  name: string;
  templateName: string;
  status: 'SENDING' | 'COMPLETED' | 'FAILED';
  totalRecipients: number;
  createdBy: string;
  createdAt: string;
  stats: CampaignStats | null;
}

interface Preview { count: number; truncated: boolean; invalid: number; optedOut: number; sample: { phone: string; name: string | null }[] }

const CAMPAIGN_STATUS: Record<Campaign['status'], { label: string; color: string; bg: string; border: string }> = {
  SENDING:   { label: 'Sending',   color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
  COMPLETED: { label: 'Completed', color: '#15803D', bg: '#F0FAF4', border: '#A3D9B8' },
  FAILED:    { label: 'Stopped',   color: '#DC2626', bg: '#FEF2F2', border: '#FCA5A5' },
};

const SOURCE_OPTIONS = [
  { value: 'WEBSITE', label: 'Website' },
  { value: 'WHATSAPP', label: 'WhatsApp' },
];

const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 100) : 0);

/** Receipts are cumulative: a READ message was also delivered and sent. */
function funnel(s: CampaignStats | null) {
  if (!s) return { sent: 0, delivered: 0, read: 0, failed: 0, pending: 0, replied: 0, leads: 0 };
  return {
    read: s.READ,
    delivered: s.DELIVERED + s.READ,
    sent: s.SENT + s.DELIVERED + s.READ,
    failed: s.FAILED,
    pending: s.PENDING,
    replied: s.replied,
    leads: s.leads,
  };
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{children}</div>
);

/** Broadcasts and Templates tabs of the WhatsApp page — they share the template list. */
const WhatsAppCampaigns: React.FC<{ view: 'campaigns' | 'templates' }> = ({ view: tab }) => {
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [, setParams] = useSearchParams();
  const setTab = (t: 'templates') => setParams({ tab: t });
  const [status, setStatus] = useState<{ provider: 'meta' | 'interakt'; configured: boolean; templatesSyncable: boolean } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [audienceType, setAudienceType] = useState<'LEADS' | 'NUMBERS'>('LEADS');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [detail, setDetail] = useState<(Campaign & { failures: { phone: string; name: string | null; errorMessage: string | null }[] }) | null>(null);

  const templateName = Form.useWatch('templateName', form);
  const approved = useMemo(() => templates.filter(t => t.status === 'APPROVED'), [templates]);
  const template = useMemo(() => approved.find(t => t.templateName === templateName), [approved, templateName]);

  const loadCampaigns = useCallback(async () => {
    try {
      const res = await api.get('/whatsapp/campaigns', { params: { size: 50 } });
      setCampaigns(res.data?.data?.items ?? []);
    } catch {
      message.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  }, [message]);

  const loadTemplates = useCallback(async () => {
    try {
      const res = await api.get('/whatsapp/templates');
      setTemplates(res.data?.data ?? []);
    } catch {
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  }, []);

  useEffect(() => {
    loadCampaigns();
    loadTemplates();
    api.get('/whatsapp/status').then(r => setStatus(r.data?.data ?? null)).catch(() => setStatus(null));
  }, [loadCampaigns, loadTemplates]);

  // Live progress while anything is still sending
  const anySending = campaigns.some(c => c.status === 'SENDING');
  useEffect(() => {
    const iv = setInterval(loadCampaigns, anySending ? 3_000 : 15_000);
    return () => clearInterval(iv);
  }, [anySending, loadCampaigns]);

  // Templates in review flip to approved/rejected via Meta's webhook — keep the list fresh
  const anyPending = templates.some(t => t.status === 'PENDING');
  useEffect(() => {
    if (!anyPending) return;
    const iv = setInterval(loadTemplates, 15_000);
    return () => clearInterval(iv);
  }, [anyPending, loadTemplates]);

  const syncTemplates = async () => {
    setSyncing(true);
    try {
      const res = await api.post('/whatsapp/templates/sync');
      setTemplates(res.data?.data ?? []);
      message.success('Template status refreshed from WhatsApp');
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Template sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const buildAudience = () => {
    const v = form.getFieldsValue();
    if (audienceType === 'NUMBERS') return { type: 'NUMBERS', numbers: v.numbers ?? '' };
    const range = v.createdRange as [Dayjs, Dayjs] | undefined;
    return {
      type: 'LEADS',
      ...(v.statuses?.length && { statuses: v.statuses }),
      ...(v.sources?.length && { sources: v.sources }),
      ...(range?.[0] && { createdFrom: range[0].format('YYYY-MM-DD') }),
      ...(range?.[1] && { createdTo: range[1].format('YYYY-MM-DD') }),
    };
  };

  const runPreview = async () => {
    if (audienceType === 'NUMBERS' && !form.getFieldValue('numbers')?.trim()) { message.warning('Paste at least one number'); return; }
    setPreviewing(true);
    try {
      const res = await api.post('/whatsapp/campaigns/preview', { audience: buildAudience() });
      setPreview(res.data?.data ?? null);
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Could not count the audience');
    } finally {
      setPreviewing(false);
    }
  };

  // Any audience change invalidates the count
  const onValuesChange = (changed: Record<string, unknown>) => {
    if (['statuses', 'sources', 'createdRange', 'numbers'].some(k => k in changed)) setPreview(null);
    if ('templateName' in changed) form.setFieldValue('params', []);
  };

  const submit = async () => {
    const values = await form.validateFields();
    if (!preview) { message.warning('Check the audience size before sending'); return; }
    const params: string[] = (values.params ?? []).slice(0, template?.paramCount ?? 0);
    modal.confirm({
      title: 'Send this campaign?',
      content: `"${values.templateName}" will be sent to ${preview.count.toLocaleString('en-IN')} WhatsApp number(s). This cannot be undone.`,
      okText: 'Send now',
      onOk: async () => {
        setCreating(true);
        try {
          await api.post('/whatsapp/campaigns', { name: values.name, templateName: values.templateName, params, audience: buildAudience() });
          message.success('Campaign started');
          setComposerOpen(false);
          form.resetFields();
          setPreview(null);
          loadCampaigns();
        } catch (err: any) {
          message.error(err?.response?.data?.message ?? 'Campaign could not be started');
        } finally {
          setCreating(false);
        }
      },
    });
  };

  const openDetail = async (c: Campaign) => {
    try {
      const res = await api.get(`/whatsapp/campaigns/${c.id}`);
      setDetail(res.data?.data ?? null);
    } catch {
      message.error('Could not load campaign');
    }
  };

  /** Template body with {{n}} replaced by the variables typed so far */
  const params: string[] = Form.useWatch('params', form) ?? [];
  const renderedPreview = template?.templateBody.replace(/\{\{(\d+)\}\}/g, (_, n) => {
    const v = params[Number(n) - 1];
    return v ? v.replace(/\{name\}/gi, preview?.sample[0]?.name?.split(' ')[0] || 'Rahul') : `{{${n}}}`;
  });

  const columns: ColumnsType<Campaign> = [
    {
      title: 'Campaign',
      key: 'name',
      render: (_, c) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{c.name}</div>
          <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{c.templateName} · {new Date(c.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 170,
      render: (_, c) => {
        const s = CAMPAIGN_STATUS[c.status];
        const f = funnel(c.stats);
        const done = c.totalRecipients - f.pending;
        return (
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: '2px 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
            {c.status === 'SENDING' && <Progress percent={pct(done, c.totalRecipients)} size="small" strokeColor={GOLD} style={{ marginTop: 6, marginBottom: 0 }} />}
          </div>
        );
      },
    },
    { title: 'Audience', dataIndex: 'totalRecipients', key: 'total', width: 90, align: 'right', render: v => <span style={{ fontWeight: 600, color: NAVY }}>{v.toLocaleString('en-IN')}</span> },
    ...(['delivered', 'read', 'replied', 'leads', 'failed'] as const).map(k => ({
      title: { delivered: 'Delivered', read: 'Read', replied: 'Replied', leads: 'Leads', failed: 'Failed' }[k],
      key: k,
      width: 96,
      align: 'right' as const,
      render: (_: unknown, c: Campaign) => {
        const f = funnel(c.stats);
        const n = f[k];
        return (
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: k === 'failed' && n > 0 ? '#DC2626' : k === 'leads' && n > 0 ? '#15803D' : NAVY }}>{n.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: 10, color: MUTED }}>{pct(n, c.totalRecipients)}%</div>
          </div>
        );
      },
    })),
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: NAVY, letterSpacing: '-0.02em' }}>{tab === 'templates' ? 'Message Templates' : 'Broadcasts'}</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3 }}>
            {tab === 'templates'
              ? (status?.provider === 'interakt' ? 'Register the templates approved in your Interakt account.' : 'Design messages and submit them to WhatsApp for approval.')
              : 'Send an approved template to CRM leads or a number list. Replies flow into the bot and Chats.'}
          </div>
        </div>
        {tab === 'campaigns' && (
          <Button type="primary" icon={<Megaphone size={14} />} onClick={() => setComposerOpen(true)} disabled={approved.length === 0}>New campaign</Button>
        )}
      </div>

      {status && !status.configured && (
        <Alert
          type="warning" showIcon style={{ marginBottom: 16, borderRadius: 2 }}
          message="WhatsApp is not connected"
          description={status.provider === 'interakt'
            ? 'Set INTERAKT_API_KEY on the server. Until then campaigns run in dry-run mode: messages are logged, not delivered.'
            : 'Set WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_BUSINESS_ACCOUNT_ID on the server. Until then campaigns run in dry-run mode: messages are logged, not delivered.'}
        />
      )}
      {tab === 'templates' ? (
        <WhatsAppTemplates
          templates={templates}
          loading={loadingTemplates}
          syncable={!!status?.templatesSyncable}
          provider={status?.provider ?? 'meta'}
          syncing={syncing}
          onSync={syncTemplates}
          onChanged={loadTemplates}
        />
      ) : (<>
      {approved.length === 0 && (
        <Alert
          type="info" showIcon style={{ marginBottom: 16, borderRadius: 2 }}
          message="No approved templates yet"
          description={<>WhatsApp only allows pre-approved templates for broadcasts. Create one in the <a onClick={() => setTab('templates')}>Templates</a> tab — it can be used here once WhatsApp approves it.</>}
        />
      )}

      <div style={{ background: '#fff', border: `1px solid ${BORDER}` }}>
        <Table<Campaign>
          columns={columns}
          dataSource={campaigns}
          rowKey="id"
          loading={loading}
          size="middle"
          scroll={{ x: 860 }}
          onRow={c => ({ onClick: () => openDetail(c), style: { cursor: 'pointer' } })}
          pagination={false}
          locale={{ emptyText: <div style={{ padding: 40, color: MUTED, textAlign: 'center' }}>No campaigns sent yet</div> }}
        />
      </div>
      </>)}

      {/* Composer */}
      <Modal
        open={composerOpen}
        onCancel={() => setComposerOpen(false)}
        width={640}
        title={<div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 17, color: NAVY }}>New campaign</div>}
        footer={[
          <Button key="cancel" onClick={() => setComposerOpen(false)}>Cancel</Button>,
          <Button key="send" type="primary" icon={<Send size={14} />} loading={creating} disabled={!preview || preview.count === 0} onClick={submit}>
            {preview ? `Send to ${preview.count.toLocaleString('en-IN')}` : 'Send'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onValuesChange={onValuesChange} requiredMark={false} style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Campaign name" rules={[{ required: true, message: 'Name the campaign' }]}>
            <Input placeholder="e.g. Diwali personal loan offer" maxLength={150} />
          </Form.Item>

          <Form.Item name="templateName" label="Template" rules={[{ required: true, message: 'Choose a template' }]}>
            <Select
              placeholder="Choose an approved template"
              options={approved.map(t => ({ value: t.templateName, label: `${t.templateName} · ${t.templateCategory.toLowerCase()} · ${t.language}` }))}
            />
          </Form.Item>

          {template && template.paramCount > 0 && (
            <div style={{ marginBottom: 16 }}>
              <Label>Template variables — use {'{name}'} for the recipient's first name</Label>
              {Array.from({ length: template.paramCount }, (_, i) => (
                <Form.Item key={i} name={['params', i]} rules={[{ required: true, message: `Fill in {{${i + 1}}}` }]} style={{ marginBottom: 8 }}>
                  <Input prefix={<span style={{ color: MUTED, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, marginRight: 4 }}>{`{{${i + 1}}}`}</span>} placeholder={i === 0 ? '{name}' : 'value'} />
                </Form.Item>
              ))}
            </div>
          )}

          {template && (
            <div style={{ marginBottom: 20 }}>
              <Label>Message preview</Label>
              <TemplatePreview header={template.headerText} body={renderedPreview ?? ''} footer={template.footerText} buttons={template.buttons} />
            </div>
          )}

          <Label>Audience</Label>
          <Segmented
            block
            value={audienceType}
            onChange={v => { setAudienceType(v as typeof audienceType); setPreview(null); }}
            options={[{ label: 'CRM leads', value: 'LEADS' }, { label: 'Paste numbers', value: 'NUMBERS' }]}
            style={{ marginBottom: 12 }}
          />
          {audienceType === 'LEADS' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              <Form.Item name="statuses" label="Lead status" style={{ marginBottom: 8 }}>
                <Select mode="multiple" allowClear placeholder="Any status" options={Object.entries(LEAD_STATUS_STYLES).map(([value, s]) => ({ value, label: s.label }))} />
              </Form.Item>
              <Form.Item name="sources" label="Source" style={{ marginBottom: 8 }}>
                <Select mode="multiple" allowClear placeholder="Any source" options={SOURCE_OPTIONS} />
              </Form.Item>
              <Form.Item name="createdRange" label="Created between" style={{ marginBottom: 8, gridColumn: '1 / -1' }}>
                <DatePicker.RangePicker style={{ width: '100%' }} format="DD MMM YYYY" />
              </Form.Item>
            </div>
          ) : (
            <Form.Item name="numbers" extra="One number per line. Optionally add a name after a comma: 9876543210, Rahul Sharma" style={{ marginBottom: 8 }}>
              <Input.TextArea rows={5} placeholder={'9876543210, Rahul Sharma\n9812345678'} />
            </Form.Item>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', background: 'var(--surface-1)', border: `1px solid ${BORDER}`, padding: '10px 12px' }}>
            <Button icon={<Users size={14} />} onClick={runPreview} loading={previewing}>Count recipients</Button>
            {preview ? (
              <span style={{ fontSize: 13, color: NAVY }}>
                <strong>{preview.count.toLocaleString('en-IN')}</strong> will receive it
                {(preview.optedOut > 0 || preview.invalid > 0) && (
                  <span style={{ color: MUTED }}> · {preview.optedOut} opted out, {preview.invalid} invalid skipped</span>
                )}
                {preview.truncated && <span style={{ color: '#B45309' }}> · capped at 10,000</span>}
              </span>
            ) : (
              <span style={{ fontSize: 12, color: MUTED }}>Count the audience before sending.</span>
            )}
          </div>
        </Form>
      </Modal>

      {/* Detail */}
      <Drawer
        open={!!detail}
        onClose={() => setDetail(null)}
        width={460}
        title={<div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 16, color: NAVY }}>{detail?.name}</div>}
      >
        {detail && (() => {
          const f = funnel(detail.stats);
          const rows: [string, number][] = [['Audience', detail.totalRecipients], ['Sent', f.sent], ['Delivered', f.delivered], ['Read', f.read], ['Replied', f.replied], ['Leads created', f.leads], ['Failed', f.failed]];
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <Label>Funnel</Label>
                {rows.map(([label, n]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ width: 100, fontSize: 12, color: '#3A5278' }}>{label}</span>
                    <Progress percent={pct(n, detail.totalRecipients)} showInfo={false} size="small" strokeColor={label === 'Failed' ? '#DC2626' : label === 'Leads created' ? '#15803D' : GOLD} style={{ flex: 1, margin: 0 }} />
                    <span style={{ width: 56, textAlign: 'right', fontSize: 12, fontWeight: 700, color: NAVY }}>{n.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: MUTED }}>Template <strong style={{ color: NAVY }}>{detail.templateName}</strong> · sent by {detail.createdBy}</div>
              {detail.failures.length > 0 && (
                <div>
                  <Label>Failed numbers</Label>
                  {detail.failures.map(r => (
                    <div key={r.phone} style={{ fontSize: 12, padding: '6px 0', borderBottom: '1px solid var(--surface-2)' }}>
                      <div style={{ color: NAVY, fontWeight: 600 }}>+{r.phone}{r.name ? ` · ${r.name}` : ''}</div>
                      <div style={{ color: '#DC2626' }}>{r.errorMessage}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </Drawer>
    </div>
  );
};

export default WhatsAppCampaigns;
