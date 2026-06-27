import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, Tag, Button, Modal, Form, Input, Select, DatePicker,
  Drawer, Statistic, Row, Col, Badge, Spin, Empty, Tooltip, Timeline,
  Card, Space, Typography, InputNumber,
} from 'antd';
import {
  Phone, PhoneCall, PhoneMissed, PhoneOff, Clock, CheckCircle,
  XCircle, RefreshCw, User, FileText, AlertTriangle,
} from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import apiClient from '../../../shared/services/apiClient';

dayjs.extend(relativeTime);

const { Text, Title } = Typography;

/* ── types ───────────────────────────────────────────────────────────────── */
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  mobile: string;
  loanAmount: number | null;
  loanType: string | null;
  status: string;
  totalAttempts: number;
  lastCalledAt: string | null;
  nextCallbackAt: string | null;
  lastDisposition: string | null;
  notes: string | null;
  priority: 'OVERDUE' | 'TODAY' | 'UPCOMING' | 'FRESH';
  createdAt: string;
}

interface CallLog {
  id: string;
  disposition: string;
  notes: string | null;
  durationSeconds: number | null;
  attemptNumber: number;
  calledAt: string;
  telecallerEmail: string;
}

/* ── disposition config ──────────────────────────────────────────────────── */
const DISPOSITION_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  INTERESTED:     { label: 'Interested',     color: 'green',  icon: <CheckCircle size={12} /> },
  CALLBACK:       { label: 'Callback',       color: 'blue',   icon: <Clock size={12} /> },
  BUSY:           { label: 'Busy',           color: 'orange', icon: <PhoneCall size={12} /> },
  NO_ANSWER:      { label: 'No Answer',      color: 'default',icon: <PhoneMissed size={12} /> },
  NOT_INTERESTED: { label: 'Not Interested', color: 'red',    icon: <XCircle size={12} /> },
  WRONG_NUMBER:   { label: 'Wrong Number',   color: 'purple', icon: <PhoneOff size={12} /> },
  DND:            { label: 'DND',            color: 'volcano',icon: <PhoneOff size={12} /> },
};

const PRIORITY_CONFIG = {
  OVERDUE:  { color: '#dc2626', bg: '#fef2f2', label: 'Overdue Callback' },
  TODAY:    { color: '#d97706', bg: '#fffbeb', label: 'Callback Today' },
  UPCOMING: { color: '#2563eb', bg: '#eff6ff', label: 'Scheduled' },
  FRESH:    { color: '#6b7280', bg: '#f9fafb', label: 'New Lead' },
};

const fmt = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(1)}Cr` :
  n >= 1e5 ? `₹${(n / 1e5).toFixed(1)}L`  :
  `₹${n.toLocaleString('en-IN')}`;

/* ── component ───────────────────────────────────────────────────────────── */
const TelecallerDashboard: React.FC = () => {
  const user = useSelector((s: RootState) => s.auth.user);
  const [leads, setLeads]           = useState<Lead[]>([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(0);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Disposition modal
  const [dispLead, setDispLead]         = useState<Lead | null>(null);
  const [dispLoading, setDispLoading]   = useState(false);
  const [dispForm]                       = Form.useForm();

  // Call history drawer
  const [historyLead, setHistoryLead]   = useState<Lead | null>(null);
  const [callHistory, setCallHistory]   = useState<CallLog[]>([]);
  const [histLoading, setHistLoading]   = useState(false);

  // Today's stats
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCalls    = leads.filter(l => l.lastCalledAt?.slice(0, 10) === todayStr).length;
  const overdue       = leads.filter(l => l.priority === 'OVERDUE').length;
  const interested    = leads.filter(l => l.lastDisposition === 'INTERESTED').length;
  const callbacksDue  = leads.filter(l => l.priority === 'OVERDUE' || l.priority === 'TODAY').length;

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const res = await apiClient.get('/calls/my-queue', { params: { page, size: 30 } });
      const data = res.data?.data;
      setLeads(data?.items ?? []);
      setTotal(data?.total ?? 0);
    } catch { /* degrade gracefully */ }
    finally { setLoading(false); setRefreshing(false); }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const openHistory = async (lead: Lead) => {
    setHistoryLead(lead);
    setHistLoading(true);
    try {
      const res = await apiClient.get(`/calls/history/${lead.id}`);
      setCallHistory(res.data?.data ?? []);
    } catch { setCallHistory([]); }
    finally { setHistLoading(false); }
  };

  const submitDisposition = async () => {
    if (!dispLead) return;
    try {
      const values = await dispForm.validateFields();
      setDispLoading(true);
      await apiClient.post('/calls/log', {
        leadId: dispLead.id,
        disposition: values.disposition,
        notes: values.notes,
        durationSeconds: values.durationSeconds,
        nextCallbackAt: values.nextCallbackAt ? values.nextCallbackAt.toISOString() : undefined,
      });
      setDispLead(null);
      dispForm.resetFields();
      load(true);
    } catch { /* validation or network error */ }
    finally { setDispLoading(false); }
  };

  const columns = [
    {
      title: 'Priority',
      width: 130,
      render: (_: unknown, r: Lead) => {
        const cfg = PRIORITY_CONFIG[r.priority];
        return (
          <span style={{ fontSize: 11, fontWeight: 600, color: cfg.color, background: cfg.bg, padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap' }}>
            {cfg.label}
          </span>
        );
      },
      sorter: (a: Lead, b: Lead) => {
        const order = { OVERDUE: 0, TODAY: 1, UPCOMING: 2, FRESH: 3 };
        return order[a.priority] - order[b.priority];
      },
      defaultSortOrder: 'ascend' as const,
    },
    {
      title: 'Customer',
      render: (_: unknown, r: Lead) => (
        <div>
          <div style={{ fontWeight: 600, color: '#0B1E3D' }}>{r.firstName} {r.lastName}</div>
          <div style={{ fontSize: 12, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <Phone size={11} /> {r.mobile}
          </div>
        </div>
      ),
    },
    {
      title: 'Loan',
      render: (_: unknown, r: Lead) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.loanAmount ? fmt(Number(r.loanAmount)) : '—'}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>{r.loanType ?? 'Personal Loan'}</div>
        </div>
      ),
    },
    {
      title: 'Last Disposition',
      render: (_: unknown, r: Lead) => {
        if (!r.lastDisposition) return <span style={{ color: '#9ca3af', fontSize: 12 }}>Not called</span>;
        const cfg = DISPOSITION_CONFIG[r.lastDisposition];
        return <Tag color={cfg?.color} icon={cfg?.icon}>{cfg?.label ?? r.lastDisposition}</Tag>;
      },
    },
    {
      title: 'Attempts',
      dataIndex: 'totalAttempts',
      width: 80,
      render: (n: number) => <Badge count={n} showZero color={n === 0 ? '#d1d5db' : n >= 5 ? '#dc2626' : '#0B1E3D'} />,
    },
    {
      title: 'Callback',
      render: (_: unknown, r: Lead) => {
        if (!r.nextCallbackAt) return <span style={{ color: '#9ca3af', fontSize: 12 }}>—</span>;
        const isOverdue = new Date(r.nextCallbackAt) < new Date();
        return (
          <Tooltip title={dayjs(r.nextCallbackAt).format('DD MMM YYYY h:mm A')}>
            <span style={{ fontSize: 12, color: isOverdue ? '#dc2626' : '#374151', display: 'flex', alignItems: 'center', gap: 4 }}>
              {isOverdue && <AlertTriangle size={11} color="#dc2626" />}
              {dayjs(r.nextCallbackAt).fromNow()}
            </span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Actions',
      width: 160,
      render: (_: unknown, r: Lead) => (
        <Space>
          <Button
            type="primary" size="small" icon={<Phone size={12} />}
            onClick={() => { setDispLead(r); dispForm.resetFields(); }}
            style={{ background: '#0B1E3D', borderColor: '#0B1E3D' }}
          >
            Log Call
          </Button>
          <Button size="small" icon={<FileText size={12} />} onClick={() => openHistory(r)}>
            History
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#F5F4F1', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0, color: '#0B1E3D' }}>My Call Queue</Title>
          <Text type="secondary" style={{ fontSize: 13 }}>Welcome, {user?.email} — {dayjs().format('dddd, DD MMM YYYY')}</Text>
        </div>
        <Button icon={<RefreshCw size={14} />} onClick={() => load(true)} loading={refreshing}>
          Refresh
        </Button>
      </div>

      {/* Stats row */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {[
          { label: "Today's Calls", value: todayCalls, color: '#0B1E3D', icon: <PhoneCall size={18} /> },
          { label: 'Callbacks Due', value: callbacksDue, color: '#d97706', icon: <Clock size={18} /> },
          { label: 'Overdue',       value: overdue,       color: '#dc2626', icon: <AlertTriangle size={18} /> },
          { label: 'Interested',    value: interested,    color: '#15803d', icon: <CheckCircle size={18} /> },
        ].map(({ label, value, color, icon }) => (
          <Col xs={12} sm={6} key={label}>
            <Card bordered={false} style={{ borderRadius: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ color, background: `${color}15`, padding: 10, borderRadius: 4 }}>{icon}</div>
                <Statistic title={<span style={{ fontSize: 12 }}>{label}</span>} value={value} valueStyle={{ fontSize: 22, color, fontWeight: 700 }} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Queue table */}
      <Card bordered={false} style={{ borderRadius: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong style={{ color: '#0B1E3D' }}>Leads Queue <Badge count={total} color="#0B1E3D" /></Text>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></div>
        ) : leads.length === 0 ? (
          <Empty description="No leads assigned to you yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Table
            dataSource={leads}
            columns={columns}
            rowKey="id"
            size="middle"
            pagination={{
              current: page + 1,
              pageSize: 30,
              total,
              onChange: (p) => setPage(p - 1),
              showTotal: (t) => `${t} leads`,
            }}
            onRow={(r: Lead) => ({
              style: { background: r.priority === 'OVERDUE' ? '#fff5f5' : r.priority === 'TODAY' ? '#fffdf0' : undefined },
            })}
          />
        )}
      </Card>

      {/* ── Disposition Modal ── */}
      <Modal
        open={!!dispLead}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Phone size={16} color="#0B1E3D" />
            <span>Log Call — {dispLead?.firstName} {dispLead?.lastName}</span>
          </div>
        }
        onCancel={() => { setDispLead(null); dispForm.resetFields(); }}
        onOk={submitDisposition}
        okText="Save Outcome"
        confirmLoading={dispLoading}
        okButtonProps={{ style: { background: '#0B1E3D', borderColor: '#0B1E3D' } }}
        width={480}
        destroyOnClose
      >
        {dispLead && (
          <div style={{ marginBottom: 16, padding: '10px 14px', background: '#f8fafc', borderRadius: 4, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#374151' }}>
              <span><User size={12} style={{ marginRight: 5 }} />{dispLead.firstName} {dispLead.lastName}</span>
              <span><Phone size={12} style={{ marginRight: 5 }} />{dispLead.mobile}</span>
              <span>Attempt #{(dispLead.totalAttempts ?? 0) + 1}</span>
            </div>
          </div>
        )}
        <Form form={dispForm} layout="vertical">
          <Form.Item name="disposition" label="Call Outcome" rules={[{ required: true, message: 'Select outcome' }]}>
            <Select placeholder="What happened?" size="large">
              {Object.entries(DISPOSITION_CONFIG).map(([key, cfg]) => (
                <Select.Option key={key} value={key}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag color={cfg.color} style={{ margin: 0 }}>{cfg.label}</Tag>
                  </span>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item noStyle shouldUpdate={(p, c) => p.disposition !== c.disposition}>
            {({ getFieldValue }) =>
              getFieldValue('disposition') === 'CALLBACK' && (
                <Form.Item name="nextCallbackAt" label="Schedule Callback" rules={[{ required: true, message: 'Pick callback time' }]}>
                  <DatePicker showTime style={{ width: '100%' }} format="DD MMM YYYY h:mm A" disabledDate={d => d.isBefore(dayjs(), 'day')} />
                </Form.Item>
              )
            }
          </Form.Item>

          <Form.Item name="durationSeconds" label="Call Duration (seconds)">
            <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g. 90" />
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={3} placeholder="What did the customer say? Any follow-up details…" maxLength={500} showCount />
          </Form.Item>
        </Form>
      </Modal>

      {/* ── Call History Drawer ── */}
      <Drawer
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileText size={16} />
            Call History — {historyLead?.firstName} {historyLead?.lastName}
          </span>
        }
        open={!!historyLead}
        onClose={() => { setHistoryLead(null); setCallHistory([]); }}
        width={420}
      >
        {histLoading ? (
          <div style={{ textAlign: 'center', paddingTop: 60 }}><Spin /></div>
        ) : callHistory.length === 0 ? (
          <Empty description="No calls logged yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <Timeline
            items={callHistory.map(log => {
              const cfg = DISPOSITION_CONFIG[log.disposition];
              return {
                color: cfg?.color === 'green' ? 'green' : cfg?.color === 'red' ? 'red' : 'blue',
                children: (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Tag color={cfg?.color}>{cfg?.label ?? log.disposition}</Tag>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>Attempt #{log.attemptNumber}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
                      {dayjs(log.calledAt).format('DD MMM YYYY, h:mm A')}
                      {log.durationSeconds && <span style={{ marginLeft: 8 }}>· {log.durationSeconds}s</span>}
                    </div>
                    {log.notes && (
                      <div style={{ marginTop: 6, fontSize: 13, color: '#374151', background: '#f9fafb', padding: '6px 10px', borderRadius: 3 }}>
                        {log.notes}
                      </div>
                    )}
                  </div>
                ),
              };
            })}
          />
        )}
      </Drawer>
    </div>
  );
};

export default TelecallerDashboard;
