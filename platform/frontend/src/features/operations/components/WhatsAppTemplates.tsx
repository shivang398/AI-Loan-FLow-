import React, { useMemo, useRef, useState } from 'react';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { Table, Button, Modal, Form, Input, Select, App, Tooltip, Popconfirm } from 'antd';
import { Plus, Trash2, RefreshCw, ExternalLink, Phone, Reply, Variable } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import api from '../../../shared/services/apiClient';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const MUTED = '#7A92B5';
const BORDER = '#D4DCE8';

export interface TemplateButton { type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER'; text: string; url?: string; phone_number?: string }

export interface Template {
  id: string;
  templateName: string;
  templateBody: string;
  templateCategory: string;
  language: string;
  paramCount: number;
  status: string;
  rejectedReason: string | null;
  headerText: string | null;
  footerText: string | null;
  buttons: TemplateButton[] | null;
  createdAt: string;
}

const STATUS: Record<string, { label: string; color: string; bg: string; border: string }> = {
  APPROVED: { label: 'Approved',  color: '#15803D', bg: '#F0FAF4', border: '#A3D9B8' },
  PENDING:  { label: 'In review', color: '#B45309', bg: '#FFFBEB', border: '#FCD34D' },
  REJECTED: { label: 'Rejected',  color: '#DC2626', bg: '#FEF2F2', border: '#FCA5A5' },
  PAUSED:   { label: 'Paused',    color: '#6B7280', bg: '#F9FAFB', border: '#D1D5DB' },
  DISABLED: { label: 'Disabled',  color: '#6B7280', bg: '#F9FAFB', border: '#D1D5DB' },
};

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'en_US', label: 'English (US)' },
  { value: 'hi', label: 'Hindi' },
  { value: 'mr', label: 'Marathi' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'bn', label: 'Bengali' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ml', label: 'Malayalam' },
];

const BUTTON_TYPES = [
  { value: 'QUICK_REPLY', label: 'Quick reply' },
  { value: 'URL', label: 'Visit website' },
  { value: 'PHONE_NUMBER', label: 'Call phone' },
];

const ButtonIcon: React.FC<{ type: TemplateButton['type'] }> = ({ type }) =>
  type === 'URL' ? <ExternalLink size={13} /> : type === 'PHONE_NUMBER' ? <Phone size={13} /> : <Reply size={13} />;

/** WhatsApp *bold* / _italic_ in the preview bubble */
function formatWa(text: string) {
  return text.split(/(\*[^*\n]+\*|_[^_\n]+_)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <strong key={i}>{part.slice(1, -1)}</strong>;
    if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) return <em key={i}>{part.slice(1, -1)}</em>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

/** Phone-style preview of a template as the customer will see it */
export const TemplatePreview: React.FC<{ header?: string | null; body: string; footer?: string | null; buttons?: TemplateButton[] | null }> = ({ header, body, footer, buttons }) => (
  <div style={{ background: '#E7DDD3', padding: 16, minHeight: 220 }}>
    <div style={{ background: '#fff', maxWidth: 300, padding: '8px 10px 6px', borderRadius: 6, boxShadow: '0 1px 1px rgba(0,0,0,0.12)' }}>
      {header && <div style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 4 }}>{header}</div>}
      <div style={{ fontSize: 13.5, color: '#111', lineHeight: 1.45, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {body ? formatWa(body) : <span style={{ color: '#9CA3AF' }}>Your message appears here</span>}
      </div>
      {footer && <div style={{ fontSize: 12, color: '#8696A0', marginTop: 6 }}>{footer}</div>}
      <div style={{ fontSize: 10.5, color: '#8696A0', textAlign: 'right', marginTop: 2 }}>10:30 am</div>
    </div>
    {!!buttons?.length && (
      <div style={{ maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 3, marginTop: 3 }}>
        {buttons.map((b, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 6, padding: '8px 10px', textAlign: 'center', color: '#00A5F4', fontSize: 13.5, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 1px 1px rgba(0,0,0,0.12)' }}>
            <ButtonIcon type={b.type} /> {b.text || 'Button'}
          </div>
        ))}
      </div>
    )}
  </div>
);

const StatusTag: React.FC<{ t: Template }> = ({ t }) => {
  const s = STATUS[t.status] ?? STATUS.PENDING;
  const tag = (
    <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: '2px 10px', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
      {s.label}
    </span>
  );
  return t.rejectedReason ? <Tooltip title={`Reason: ${t.rejectedReason.replace(/_/g, ' ').toLowerCase()}`}>{tag}</Tooltip> : tag;
};

interface Props {
  templates: Template[];
  loading: boolean;
  syncable: boolean;
  provider: 'meta' | 'interakt';
  syncing: boolean;
  onSync: () => void;
  onChanged: () => void;
}

const WhatsAppTemplates: React.FC<Props> = ({ templates, loading, syncable, provider, syncing, onSync, onChanged }) => {
  // With Interakt, templates are approved in Interakt's dashboard; here they are only registered by name
  const viaInterakt = provider === 'interakt';
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viewing, setViewing] = useState<Template | null>(null);

  const header = Form.useWatch('headerText', form) ?? '';
  const body: string = Form.useWatch('body', form) ?? '';
  const footer = Form.useWatch('footerText', form) ?? '';
  const buttons: TemplateButton[] = Form.useWatch('buttons', form) ?? [];
  const examples: string[] = Form.useWatch('bodyExamples', form) ?? [];

  // Variables present in the body, in number order
  const varCount = useMemo(() => new Set(body.match(/\{\{\d+\}\}/g) ?? []).size, [body]);
  const previewBody = body.replace(/\{\{(\d+)\}\}/g, (m, n) => examples[Number(n) - 1] || m);

  const bodyRef = useRef<TextAreaRef>(null);

  /** Insert the next {{n}} at the cursor and leave the cursor just after it */
  const addVariable = () => {
    const el = bodyRef.current?.resizableTextArea?.textArea;
    const token = `{{${varCount + 1}}}`;
    const start = el?.selectionStart ?? body.length;
    const end = el?.selectionEnd ?? body.length;
    const before = body.slice(0, start);
    const insert = `${before && !/\s$/.test(before) ? ' ' : ''}${token}`;
    form.setFieldValue('body', before + insert + body.slice(end));
    const caret = start + insert.length;
    requestAnimationFrame(() => { el?.focus(); el?.setSelectionRange(caret, caret); });
  };

  const close = () => { setOpen(false); form.resetFields(); };

  const submit = async () => {
    const v = await form.validateFields();
    setSubmitting(true);
    try {
      await api.post('/whatsapp/templates', {
        name: v.name,
        language: v.language,
        category: v.category,
        headerText: v.headerText,
        body: v.body,
        bodyExamples: (v.bodyExamples ?? []).slice(0, varCount),
        footerText: v.footerText,
        buttons: (v.buttons ?? []).map((b: TemplateButton) => ({
          type: b.type, text: b.text,
          ...(b.type === 'URL' && { url: b.url }),
          ...(b.type === 'PHONE_NUMBER' && { phone_number: b.phone_number }),
        })),
      });
      message.success(viaInterakt ? 'Template added — it can be used in broadcasts' : 'Template submitted to WhatsApp for review');
      close();
      onChanged();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Template could not be submitted');
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (t: Template) => {
    try {
      await api.delete(`/whatsapp/templates/${t.id}`);
      message.success('Template deleted');
      onChanged();
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Could not delete template');
    }
  };

  const columns: ColumnsType<Template> = [
    {
      title: 'Template',
      key: 'name',
      render: (_, t) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: NAVY, fontFamily: 'JetBrains Mono, monospace' }}>{t.templateName}</div>
          <div style={{ fontSize: 12, color: MUTED, marginTop: 2, maxWidth: 520, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.templateBody}</div>
        </div>
      ),
    },
    { title: 'Category', dataIndex: 'templateCategory', key: 'cat', width: 110, render: v => <span style={{ fontSize: 12, color: '#3A5278', textTransform: 'capitalize' }}>{String(v).toLowerCase()}</span> },
    { title: 'Language', dataIndex: 'language', key: 'lang', width: 100, render: v => <span style={{ fontSize: 12, color: '#3A5278' }}>{LANGUAGES.find(l => l.value === v)?.label ?? v}</span> },
    { title: 'Status', key: 'status', width: 120, render: (_, t) => <StatusTag t={t} /> },
    {
      title: '',
      key: 'actions',
      width: 56,
      align: 'center',
      render: (_, t) => (
        <Popconfirm
          title="Delete this template?"
          description="It is also deleted from WhatsApp Manager. The name cannot be reused for 30 days."
          okText="Delete" okButtonProps={{ danger: true }}
          onConfirm={e => { e?.stopPropagation(); remove(t); }}
          onCancel={e => e?.stopPropagation()}
        >
          <Button type="text" size="small" icon={<Trash2 size={14} color="#DC2626" />} onClick={e => e.stopPropagation()} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: MUTED }}>
          {viaInterakt
            ? 'Messages are sent through Interakt. Create and get templates approved in your Interakt dashboard, then add each one here with exactly the same name, language and variables.'
            : 'New templates go to WhatsApp for review — usually a few minutes, up to 24 hours. Only approved templates can be sent.'}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button icon={<RefreshCw size={14} />} onClick={onSync} loading={syncing} disabled={!syncable}>Refresh status</Button>
          <Button type="primary" icon={<Plus size={14} />} onClick={() => setOpen(true)}>New template</Button>
        </div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${BORDER}` }}>
        <Table<Template>
          columns={columns}
          dataSource={templates}
          rowKey="id"
          loading={loading}
          size="middle"
          scroll={{ x: 700 }}
          pagination={false}
          onRow={t => ({ onClick: () => setViewing(t), style: { cursor: 'pointer' } })}
          locale={{ emptyText: <div style={{ padding: 40, color: MUTED, textAlign: 'center' }}>No templates yet — create your first one</div> }}
        />
      </div>

      {/* View */}
      <Modal
        open={!!viewing}
        onCancel={() => setViewing(null)}
        footer={null}
        width={420}
        title={<span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: NAVY }}>{viewing?.templateName}</span>}
      >
        {viewing && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><StatusTag t={viewing} /></div>
            {viewing.rejectedReason && (
              <div style={{ fontSize: 12, color: '#DC2626' }}>WhatsApp rejected this template: {viewing.rejectedReason.replace(/_/g, ' ').toLowerCase()}. Create a corrected copy under a new name.</div>
            )}
            <TemplatePreview header={viewing.headerText} body={viewing.templateBody} footer={viewing.footerText} buttons={viewing.buttons} />
          </div>
        )}
      </Modal>

      {/* Create */}
      <Modal
        open={open}
        onCancel={close}
        width={920}
        title={<div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 17, color: NAVY }}>New WhatsApp template</div>}
        footer={[
          <Button key="cancel" onClick={close}>Cancel</Button>,
          <Button key="submit" type="primary" loading={submitting} onClick={submit}>{viaInterakt ? 'Add template' : 'Submit for review'}</Button>,
        ]}
      >
        <style>{`
          .tpl-grid { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 24px; margin-top: 16px; }
          @media (max-width: 860px) { .tpl-grid { grid-template-columns: minmax(0, 1fr); } }
        `}</style>
        <div className="tpl-grid">
          <Form form={form} layout="vertical" requiredMark={false} initialValues={{ language: 'en', category: 'MARKETING', buttons: [] }}>
            <Form.Item
              name="name" label="Template name"
              extra="Lowercase letters, numbers and underscores, e.g. diwali_personal_loan"
              normalize={(v: string) => v?.toLowerCase().replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, '')}
              rules={[{ required: true, message: 'Name the template' }]}
            >
              <Input placeholder="diwali_personal_loan" maxLength={512} />
            </Form.Item>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item name="category" label="Category" extra="Offers & promotions are Marketing">
                <Select options={[{ value: 'MARKETING', label: 'Marketing' }, { value: 'UTILITY', label: 'Utility (account updates)' }]} />
              </Form.Item>
              <Form.Item name="language" label="Language">
                <Select options={LANGUAGES} showSearch optionFilterProp="label" />
              </Form.Item>
            </div>

            <Form.Item name="headerText" label="Header (optional)">
              <Input placeholder="e.g. Diwali Special Offer" maxLength={60} showCount />
            </Form.Item>

            <Form.Item
              name="body"
              label={
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span>Message</span>
                </div>
              }
              rules={[{ required: true, message: 'Write the message' }]}
              style={{ marginBottom: 8 }}
            >
              <Input.TextArea ref={bodyRef} rows={5} maxLength={1024} placeholder={'Hi {{1}}, get a personal loan up to {{2}} at special festive rates. Tap Apply now to get started.'} />
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <Button size="small" icon={<Variable size={13} />} onClick={addVariable}>Add variable</Button>
              <span style={{ fontSize: 12, color: MUTED, flex: 1 }}>Use *bold* and _italic_. Variables are filled per recipient when you send a campaign.</span>
              <span style={{ fontSize: 12, color: MUTED }}>{body.length} / 1024</span>
            </div>

            {varCount > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 6 }}>Sample values <span style={{ color: MUTED, fontWeight: 400 }}>— WhatsApp needs an example for each variable to review it</span></div>
                {Array.from({ length: varCount }, (_, i) => (
                  <Form.Item key={i} name={['bodyExamples', i]} rules={[{ required: true, message: `Sample for {{${i + 1}}}` }]} style={{ marginBottom: 8 }}>
                    <Input prefix={<span style={{ color: MUTED, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, marginRight: 4 }}>{`{{${i + 1}}}`}</span>} placeholder={i === 0 ? 'Rahul' : '₹10 lakh'} />
                  </Form.Item>
                ))}
              </div>
            )}

            <Form.Item name="footerText" label="Footer (optional)">
              <Input placeholder="Reply STOP to unsubscribe" maxLength={60} showCount />
            </Form.Item>

            <div style={{ fontSize: 12, fontWeight: 600, color: NAVY, marginBottom: 6 }}>Buttons (optional, up to 3)</div>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 8 }}>A quick reply such as <strong>Apply now</strong> starts the loan application in the bot when tapped.</div>
            <Form.List name="buttons">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => {
                    const type = buttons[field.name]?.type;
                    return (
                      <div key={field.key} style={{ border: `1px solid ${BORDER}`, padding: '10px 10px 2px', marginBottom: 8, background: 'var(--surface-1)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 32px', gap: 8 }}>
                          <Form.Item name={[field.name, 'type']} style={{ marginBottom: 8 }}>
                            <Select options={BUTTON_TYPES} />
                          </Form.Item>
                          <Form.Item name={[field.name, 'text']} rules={[{ required: true, message: 'Button text' }]} style={{ marginBottom: 8 }}>
                            <Input placeholder="Button text" maxLength={25} />
                          </Form.Item>
                          <Button type="text" icon={<Trash2 size={14} color={MUTED} />} onClick={() => remove(field.name)} />
                        </div>
                        {type === 'URL' && (
                          <Form.Item name={[field.name, 'url']} rules={[{ required: true, pattern: /^https:\/\/\S+$/, message: 'Link starting with https://' }]} style={{ marginBottom: 8 }}>
                            <Input placeholder="https://realmoneygroups.in" />
                          </Form.Item>
                        )}
                        {type === 'PHONE_NUMBER' && (
                          <Form.Item name={[field.name, 'phone_number']} rules={[{ required: true, pattern: /^\+[1-9]\d{7,14}$/, message: 'Number with country code, e.g. +919876543210' }]} style={{ marginBottom: 8 }}>
                            <Input placeholder="+919876543210" />
                          </Form.Item>
                        )}
                      </div>
                    );
                  })}
                  {fields.length < 3 && (
                    <Button icon={<Plus size={13} />} onClick={() => add({ type: 'QUICK_REPLY', text: fields.length === 0 ? 'Apply now' : '' })}>Add button</Button>
                  )}
                </>
              )}
            </Form.List>
          </Form>

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Preview</div>
            <div style={{ position: 'sticky', top: 0, border: `1px solid ${BORDER}` }}>
              <div style={{ background: '#075E54', color: '#fff', padding: '10px 12px', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: GOLD, color: NAVY, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>RM</div>
                Real Money
              </div>
              <TemplatePreview header={header} body={previewBody} footer={footer} buttons={buttons.filter(Boolean)} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WhatsAppTemplates;
