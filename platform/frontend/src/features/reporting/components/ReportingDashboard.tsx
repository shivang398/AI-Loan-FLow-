import React, { useState, useEffect, useCallback } from 'react';
import apiClient from '../../../shared/services/apiClient';
import {
  App, Card, Typography, Table, Tag, Space, Button,
  Select, Form, Tabs, Row, Col, Statistic, Spin, Divider, Input, Badge
} from 'antd';
import {
  FileSpreadsheet, Download, Clock, Settings,
  Users, Briefcase, TrendingUp, Send, Mail,
  FileText, CheckCircle2, AlertCircle, Search, RefreshCw
} from 'lucide-react';

const { Title, Text } = Typography;

// ── Helpers ────────────────────────────────────────────────────────────────
const fmtAmt = (v: number) =>
  v ? `₹${Number(v).toLocaleString('en-IN')}` : '—';

const fmtLoanType = (t: string) =>
  ({ personal: 'Personal Loan', education: 'Education Loan', business: 'Business Loan' }[t] || t || '—');

// ── Lead interface (matches customer-service schema) ───────────────────────
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  panNumber: string;
  loanType: string;
  loanAmount: number;
  profession?: string;
  netMonthlySalary?: number;
  currentCity?: string;
  currentState?: string;
  existingEmi?: number;
  hasPriorPersonalLoan?: boolean;
  status: string;
  createdAt: string;
  // Connector-action fields (stored on lead or updated)
  bankStatementChecked?: boolean;
  cibilChecked?: boolean;
}

const ReportingDashboard: React.FC = () => {
  const { message } = App.useApp();
  const [isExporting, setIsExporting] = useState(false);
  const [emailForm] = Form.useForm();
  const [, setRmList] = useState<any[]>([]);
  const [rmReports, setRmReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    apiClient.get('/connectors?roles=RM').then(res => {
      setRmList(res.data?.data?.items ?? res.data?.data ?? []);
    }).catch(() => {});

    fetchReports();
    fetchLeads();

    if (sessionStorage.getItem('token')) {
      apiClient.get('/reports/email-config').then(res => {
        const cfg = res.data?.data;
        if (cfg) {
          emailForm.setFieldsValue({
            frequency: cfg.frequency || 'weekly',
            recipients: Array.isArray(cfg.recipients) ? cfg.recipients : [],
          });
        }
      }).catch(() => {});
    }
  }, []);

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const res = await apiClient.get('/reports/mis-uploads');
      setRmReports(res.data?.data?.items ?? res.data?.data ?? []);
    } catch {
      setRmReports([]);
    } finally {
      setLoadingReports(false);
    }
  };

  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const res = await apiClient.get('/customers/leads');
      setLeads(res.data?.data?.items ?? res.data?.data ?? []);
    } catch {
      setLeads([]);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  const handleSaveEmailConfig = async (values: any) => {
    setSavingEmail(true);
    try {
      await apiClient.put('/reports/email-config', {
        frequency: values.frequency,
        recipients: values.recipients || [],
      });
      message.success('Email schedule saved successfully.');
    } catch {
      message.error('Failed to save email configuration.');
    } finally {
      setSavingEmail(false);
    }
  };

  const handleSendTestEmail = async () => {
    const recipients = emailForm.getFieldValue('recipients') || [];
    if (!recipients.length) { message.warning('Please add at least one recipient email first.'); return; }
    setSendingTest(true);
    try {
      const res = await apiClient.post('/reports/send-test-email', { recipients });
      message.success(res.data?.message || 'Test email sent successfully.');
    } catch {
      message.error('Failed to send test email.');
    } finally {
      setSendingTest(false);
    }
  };

  const handleGenerateMaster = async () => {
    setIsExporting(true);
    try {
      const response = await apiClient.get('/reports/connector-summary/download', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'master_mis_report.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      message.success('Master MIS downloaded successfully.');
    } catch {
      message.error('Failed to generate MIS report.');
    } finally {
      setIsExporting(false);
    }
  };

  // Download leads as CSV
  const handleDownloadLeads = () => {
    const rows = filteredLeads.map(l => ([
      l.id,
      `${l.firstName} ${l.lastName}`,
      l.email,
      l.mobile,
      l.panNumber || '—',
      fmtLoanType(l.loanType),
      fmtAmt(l.loanAmount),
      l.profession || '—',
      l.netMonthlySalary ? `₹${l.netMonthlySalary}` : '—',
      `${l.currentCity || '—'}, ${l.currentState || '—'}`,
      l.existingEmi ? `₹${l.existingEmi}` : 'No',
      l.hasPriorPersonalLoan ? 'Yes' : 'No',
      l.bankStatementChecked ? '✓ Done' : 'Pending',
      l.cibilChecked ? '✓ Done' : 'Pending',
      l.status,
      l.createdAt ? new Date(l.createdAt).toLocaleDateString('en-IN') : '—',
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')));

    const headers = [
      'Lead ID', 'Full Name', 'Email', 'Mobile', 'PAN',
      'Loan Type', 'Loan Amount', 'Profession', 'Monthly Salary',
      'Location', 'Existing EMI', 'Prior Loan',
      'Bank Statement', 'CIBIL Check', 'Status', 'Date'
    ].join(',');

    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RealMoneyGroups_Leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`Downloaded ${filteredLeads.length} lead(s).`);
  };

  const totalVolume = rmReports.reduce((acc, curr) => acc + (curr.volume || 0), 0);

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchStatus = leadStatusFilter === 'ALL' || l.status === leadStatusFilter;
    const term = leadSearch.toLowerCase();
    const matchSearch = !term ||
      `${l.firstName} ${l.lastName} ${l.email} ${l.mobile} ${l.panNumber || ''}`.toLowerCase().includes(term);
    return matchStatus && matchSearch;
  });

  // MIS Columns
  const misColumns = [
    {
      title: 'Uploaded By (RM)',
      dataIndex: 'rmName',
      key: 'rmName',
      render: (text: string) => (
        <Space>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={16} color="#3b82f6" />
          </div>
          <Text strong>{text}</Text>
        </Space>
      )
    },
    { title: 'Source File', dataIndex: 'fileName', key: 'fileName', render: (t: string) => <Space><FileSpreadsheet size={16} color="#10b981" /><Text>{t || '—'}</Text></Space> },
    { title: 'Business Volume', dataIndex: 'volume', key: 'volume', render: (v: number) => <span style={{ fontWeight: 700, color: '#2563eb' }}>₹{(v || 0).toLocaleString()}</span> },
    { title: 'Upload Date', dataIndex: 'date', key: 'date' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === 'VERIFIED' ? 'success' : 'processing'}>{(s || 'PENDING_REVIEW').replace('_', ' ')}</Tag> },
    { title: 'Actions', key: 'actions', render: () => <Button type="text" icon={<Download size={16} />} style={{ color: '#2563eb' }} /> }
  ];

  // Leads Columns
  const leadsColumns = [
    {
      title: 'Applicant',
      key: 'name',
      width: 180,
      render: (_: any, r: Lead) => (
        <div>
          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13 }}>{r.firstName} {r.lastName}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.email}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.mobile}</div>
        </div>
      )
    },
    {
      title: 'Loan Details',
      key: 'loan',
      width: 150,
      render: (_: any, r: Lead) => (
        <div>
          <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 13 }}>{fmtAmt(r.loanAmount)}</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>{fmtLoanType(r.loanType)}</div>
        </div>
      )
    },
    {
      title: 'PAN',
      dataIndex: 'panNumber',
      key: 'pan',
      render: (v: string) => <span style={{ fontFamily: 'monospace', fontSize: 12, background: '#f8fafc', padding: '2px 6px', borderRadius: 4, border: '1px solid #e2e8f0' }}>{v || '—'}</span>
    },
    {
      title: 'Salary / EMI',
      key: 'finance',
      width: 130,
      render: (_: any, r: Lead) => (
        <div>
          <div style={{ fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{r.netMonthlySalary ? `₹${Number(r.netMonthlySalary).toLocaleString('en-IN')}` : '—'}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>EMI: {r.existingEmi ? `₹${r.existingEmi}` : 'Nil'}</div>
        </div>
      )
    },
    {
      title: 'Bank Statement',
      key: 'bank',
      width: 130,
      render: (_: any, r: Lead) => (
        r.bankStatementChecked
          ? <Tag icon={<CheckCircle2 size={12} />} color="success">Checked</Tag>
          : <Tag icon={<AlertCircle size={12} />} color="warning">Pending</Tag>
      )
    },
    {
      title: 'CIBIL Check',
      key: 'cibil',
      width: 120,
      render: (_: any, r: Lead) => (
        r.cibilChecked
          ? <Tag icon={<CheckCircle2 size={12} />} color="success">Done</Tag>
          : <Tag icon={<AlertCircle size={12} />} color="error">Not Done</Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (s: string) => {
        const map: Record<string, string> = { NEW: 'blue', IN_REVIEW: 'orange', RESOLVED: 'green', REJECTED: 'red' };
        return <Tag color={map[s] || 'default'}>{s?.replace('_', ' ') || '—'}</Tag>;
      }
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (v: string) => v ? new Date(v).toLocaleDateString('en-IN') : '—'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 800, color: '#0f172a' }}>MIS &amp; Lead Reports</Title>
          <Text style={{ color: '#64748b' }}>Download landing page leads, track bank statement &amp; CIBIL checks, consolidate RM business volume.</Text>
        </div>
      </div>

      <Tabs
        defaultActiveKey="leads"
        className="premium-tabs"
        items={[
          {
            key: 'leads',
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={16} />
                Landing Page Leads
                {leads.length > 0 && <Badge count={leads.length} style={{ background: '#2563eb' }} />}
              </div>
            ),
            children: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Summary cards */}
                <Row gutter={16}>
                  {[
                    { label: 'Total Leads', value: leads.length, color: '#2563eb' },
                    { label: 'New', value: leads.filter(l => l.status === 'NEW').length, color: '#f59e0b' },
                    { label: 'In Review', value: leads.filter(l => l.status === 'IN_REVIEW').length, color: '#8b5cf6' },
                    { label: 'Resolved', value: leads.filter(l => l.status === 'RESOLVED').length, color: '#10b981' },
                  ].map(s => (
                    <Col key={s.label} span={6}>
                      <Card className="pro-card shadow-sm" style={{ borderRadius: 14, border: 'none' }}>
                        <Statistic title={<span style={{ color: '#64748b', fontWeight: 600 }}>{s.label}</span>} value={s.value} valueStyle={{ fontWeight: 900, color: s.color }} />
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Card
                  className="pro-card shadow-sm"
                  style={{ borderRadius: 16, border: 'none' }}
                  title={<span style={{ fontWeight: 800, color: '#0f172a' }}>All Applications from Landing Page</span>}
                  extra={
                    <Space>
                      <Button icon={<RefreshCw size={14} />} onClick={fetchLeads} loading={loadingLeads}>Refresh</Button>
                      <Button
                        type="primary"
                        icon={<Download size={14} />}
                        onClick={handleDownloadLeads}
                        disabled={filteredLeads.length === 0}
                        style={{ background: '#10b981', border: 'none', fontWeight: 700 }}
                      >
                        Download CSV ({filteredLeads.length})
                      </Button>
                    </Space>
                  }
                >
                  {/* Filters */}
                  <Space style={{ marginBottom: 16 }} wrap>
                    <Input
                      placeholder="Search by name, mobile, email, PAN…"
                      prefix={<Search size={14} color="#94a3b8" />}
                      style={{ width: 280, borderRadius: 8 }}
                      value={leadSearch}
                      onChange={e => setLeadSearch(e.target.value)}
                      allowClear
                    />
                    <Select value={leadStatusFilter} onChange={setLeadStatusFilter} style={{ width: 150 }}>
                      <Select.Option value="ALL">All Status</Select.Option>
                      <Select.Option value="NEW">New</Select.Option>
                      <Select.Option value="IN_REVIEW">In Review</Select.Option>
                      <Select.Option value="RESOLVED">Resolved</Select.Option>
                      <Select.Option value="REJECTED">Rejected</Select.Option>
                    </Select>
                  </Space>

                  {loadingLeads ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
                  ) : (
                    <Table
                      rowKey="id"
                      dataSource={filteredLeads}
                      columns={leadsColumns}
                      pagination={{ pageSize: 15, showTotal: (t, r) => `${r[0]}–${r[1]} of ${t} leads` }}
                      scroll={{ x: 1100 }}
                      locale={{ emptyText: 'No leads yet. Applications from the landing page will appear here.' }}
                      size="middle"
                    />
                  )}
                </Card>
              </div>
            )
          },
          {
            key: 'master',
            label: <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Briefcase size={16} />Master MIS Consolidation</div>,
            children: (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card className="pro-card shadow-sm" style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', borderRadius: 16, border: 'none' }}>
                      <Statistic title={<span style={{ color: '#bfdbfe', fontWeight: 600 }}>Total Master Volume</span>} value={totalVolume} prefix="₹" valueStyle={{ color: '#fff', fontWeight: 900, fontSize: 28 }} />
                      <div style={{ marginTop: 12, color: '#bfdbfe', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <TrendingUp size={14} /> From {rmReports.length} RM report{rmReports.length !== 1 ? 's' : ''}
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card className="pro-card shadow-sm" style={{ borderRadius: 16, border: 'none' }}>
                      <Statistic title={<span style={{ color: '#64748b', fontWeight: 600 }}>Reports Submitted</span>} value={rmReports.length} prefix={<FileSpreadsheet size={18} color="#10b981" style={{ marginRight: 4 }} />} valueStyle={{ fontWeight: 800, color: '#0f172a' }} />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card className="pro-card shadow-sm" style={{ borderRadius: 16, border: 'none' }}>
                      <Statistic title={<span style={{ color: '#64748b', fontWeight: 600 }}>Pending Review</span>} value={rmReports.filter(r => r.status === 'PENDING_REVIEW').length} prefix={<Clock size={18} color="#f59e0b" style={{ marginRight: 4 }} />} valueStyle={{ fontWeight: 800, color: '#0f172a' }} />
                    </Card>
                  </Col>
                </Row>

                <Card
                  title={<span style={{ fontWeight: 800, color: '#0f172a' }}>RM Uploaded Reports</span>}
                  variant="borderless"
                  style={{ borderRadius: 16 }}
                  extra={
                    <Button type="primary" onClick={handleGenerateMaster} loading={isExporting} style={{ background: '#10b981', border: 'none', fontWeight: 700 }}>
                      <Download size={14} /> Generate Master MIS
                    </Button>
                  }
                >
                  {loadingReports
                    ? <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
                    : <Table rowKey="id" dataSource={rmReports} columns={misColumns} pagination={{ pageSize: 10 }} locale={{ emptyText: 'No RM MIS reports submitted yet.' }} />
                  }
                </Card>
              </div>
            )
          },
          {
            key: 'schedule',
            forceRender: true,
            label: <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Settings size={16} />Report Schedule</div>,
            children: (
              <div style={{ maxWidth: 520 }}>
                <Card title={<span style={{ fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}><Mail size={18} color="#2563eb" /> Automated Report Scheduling</span>} variant="borderless" style={{ borderRadius: 16 }}>
                  <Form form={emailForm} layout="vertical" onFinish={handleSaveEmailConfig}>
                    <Form.Item name="frequency" label="Schedule Frequency" rules={[{ required: true }]}>
                      <Select>
                        <Select.Option value="daily">Daily Lead Summary</Select.Option>
                        <Select.Option value="weekly">Weekly Business Summary</Select.Option>
                        <Select.Option value="monthly">Monthly Audit Report</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="recipients" label="Recipient Emails" rules={[{ required: true, message: 'Add at least one recipient' }]}>
                      <Select mode="tags" placeholder="Type email and press Enter" tokenSeparators={[',', ' ']} open={false} />
                    </Form.Item>
                    <Divider />
                    <Space>
                      <Button type="primary" htmlType="submit" loading={savingEmail} style={{ background: '#2563eb', fontWeight: 600 }}>Update Schedule</Button>
                      <Button icon={<Send size={14} />} loading={sendingTest} onClick={handleSendTestEmail} style={{ fontWeight: 600 }}>Send Test Email</Button>
                    </Space>
                  </Form>
                </Card>
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default ReportingDashboard;
