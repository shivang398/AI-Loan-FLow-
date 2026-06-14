import React, { useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {
  App, Button, Input, Space, Tag, Avatar, Modal, Form, Select,
  Card, Statistic, Row, Col, Tabs, Table, InputNumber,
  Badge, Spin, Drawer
} from 'antd';
import {
  Search, Plus, Download,
  UserCheck, Briefcase, Users,
  Banknote, TrendingUp, Percent, Save, Edit2,
  Phone, Mail, MapPin, CalendarDays, Award, BarChart2, X
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import apiClient from '../../../shared/services/apiClient';

ModuleRegistry.registerModules([AllCommunityModule]);

const { Option } = Select;

/* ─── helpers ─── */
function getInitials(name: string) {
  return name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'CP';
}


function buildMonthlyChart(transactions: any[]) {
  if (!transactions.length) return [];
  const map: Record<string, { month: string; disbursals: number; amount: number }> = {};
  transactions.forEach(t => {
    const d = new Date(t.createdAt || Date.now());
    const key = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    if (!map[key]) map[key] = { month: key, disbursals: 0, amount: 0 };
    map[key].disbursals += 1;
    map[key].amount += Number(t.connectorCommission || t.totalPayout || 0);
  });
  return Object.values(map).slice(-6);
}

/* ─── Custom Tooltip for chart ─── */
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1e293b', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
          <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
            {entry.name === 'amount' ? `₹${Number(entry.value).toLocaleString()}` : `${entry.value} disbursals`}
          </span>
        </div>
      ))}
    </div>
  );
};

const ConnectorHub: React.FC = () => {
  const { message } = App.useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rms, setRms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectorsLoading, setConnectorsLoading] = useState(false);
  const [form] = Form.useForm();

  const [payoutSlabs, setPayoutSlabs] = useState<any[]>([]);
  const [connectors, setConnectors] = useState<any[]>([]);
  const [isSlabModalOpen, setIsSlabModalOpen] = useState(false);
  const [editingSlab, setEditingSlab] = useState<any>(null);
  const [slabForm] = Form.useForm();


  /* ─── Profile Drawer state ─── */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('profile');
  const [drawerPartner, setDrawerPartner] = useState<any>(null);
  const [drawerSlabs, setDrawerSlabs] = useState<any[]>([]);
  const [drawerChartData, setDrawerChartData] = useState<any[]>([]);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [payoutForm] = Form.useForm();

  const fetchRMs = async () => {
    try {
      const response = await apiClient.get('/connectors?roles=RM');
      setRms(response.data?.data?.items ?? response.data?.data ?? []);
    } catch (err) {
      console.error('Failed to fetch RMs', err);
    }
  };

  const fetchConnectors = useCallback(async () => {
    setConnectorsLoading(true);
    try {
      const res = await apiClient.get('/connectors?roles=CONNECTOR');
      const list = res.data?.data?.items ?? res.data?.data ?? [];
      setConnectors(list.map((c: any) => ({
        id: c.id,
        userId: c.userId,
        name: `${c.firstName || ''} ${c.lastName || ''}`.trim(),
        firstName: c.firstName,
        lastName: c.lastName,
        email: c.email || `${(c.firstName || 'partner').toLowerCase()}@partner.com`,
        phone: c.phone || '—',
        region: c.region || '—',
        status: c.status || 'ACTIVE',
        createdAt: c.createdAt,
        assignedRM: c.assignedRM || null,
      })));
    } catch (err) {
      console.error('Failed to fetch connectors', err);
    } finally {
      setConnectorsLoading(false);
    }
  }, []);

  const fetchSlabs = async () => {
    try {
      const slabsRes = await apiClient.get('/commissions/slabs');
      setPayoutSlabs(slabsRes.data?.data ?? []);
    } catch (err) {
      console.error('Failed to fetch slabs', err);
    }
  };

  useEffect(() => {
    fetchRMs();
    fetchConnectors();
    fetchSlabs();
  }, [fetchConnectors]);

  /* ─── Open profile drawer ─── */
  const openProfileDrawer = async (partner: any, tab = 'profile') => {
    setDrawerPartner(partner);
    setDrawerTab(tab);
    setIsDrawerOpen(true);
    setDrawerLoading(true);
    try {
      const [slabsRes, txRes] = await Promise.allSettled([
        apiClient.get(`/commissions/slabs/connector/${partner.id}`),
        apiClient.get(`/commissions/transactions/connector/${partner.id}`),
      ]);
      const slabs = slabsRes.status === 'fulfilled' ? (slabsRes.value.data?.data ?? []) : [];
      setDrawerSlabs(slabs);
      const txList = txRes.status === 'fulfilled' ? (txRes.value.data?.data?.items ?? txRes.value.data?.data ?? []) : [];
      const chart = buildMonthlyChart(txList);
      setDrawerChartData(chart);
    } finally {
      setDrawerLoading(false);
    }
  };

  /* ─── Column definitions ─── */
  const connectorColumns: any[] = [
    {
      field: 'name',
      headerName: 'Channel Partner Profile',
      flex: 2.5,
      cellRenderer: (params: any) => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 12 }}>
          <Avatar style={{ backgroundColor: '#eff6ff', color: '#3b82f6', fontWeight: 700, fontSize: 13, border: '1px solid #bfdbfe' }}>
            {getInitials(params.value || 'CP')}
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13 }}>{params.value || 'Unnamed Partner'}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              {params.data.email} · {params.data.region}
            </span>
          </div>
        </div>
      )
    },
    {
      field: 'phone',
      headerName: 'Contact',
      flex: 1.2,
      cellRenderer: (params: any) => (
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{params.value}</span>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellRenderer: (params: any) => (
        <Tag color={params.value === 'ACTIVE' ? 'success' : params.value === 'PENDING_APPROVAL' ? 'processing' : 'default'}>
          {params.value}
        </Tag>
      )
    },
    {
      headerName: 'Actions',
      width: 268,
      minWidth: 268,
      pinned: 'right',
      cellRenderer: (params: any) => {
        const handleStatusChange = async (newStatus: string) => {
          try {
            await apiClient.put(`/connectors/${params.data.id}/status`, { status: newStatus });
            if (params.data.userId) {
              await apiClient.put(`/auth/users/${params.data.userId}/status`, { status: newStatus });
            }
            message.success(`Partner status updated to ${newStatus}`);
            fetchConnectors();
          } catch (err: any) {
            message.error(err.response?.data?.message || err.message || 'Failed to update status');
          }
        };

        const btnBase: React.CSSProperties = { borderRadius: 6, fontSize: 11, fontWeight: 700, padding: '0 10px' };

        return (
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: 6 }}>
            <Button
              size="small"
              onClick={() => openProfileDrawer(params.data, 'profile')}
              style={{ ...btnBase, color: '#3b82f6', borderColor: '#bfdbfe' }}
            >
              Profile
            </Button>
            <Button
              size="small"
              icon={<Percent size={11} />}
              onClick={() => openProfileDrawer(params.data, 'payout')}
              style={{ ...btnBase, color: '#6366f1', borderColor: '#a5b4fc' }}
            >
              Payout
            </Button>
            {params.data.status === 'PENDING_APPROVAL' && (
              <Button type="primary" size="small" onClick={() => handleStatusChange('ACTIVE')}
                style={{ ...btnBase, background: '#10b981', border: 'none' }}>
                Approve
              </Button>
            )}
            {params.data.status === 'ACTIVE' && (
              <Button danger size="small" onClick={() => handleStatusChange('INACTIVE')}
                style={btnBase}>
                Suspend
              </Button>
            )}
            {params.data.status === 'INACTIVE' && (
              <Button size="small" onClick={() => handleStatusChange('ACTIVE')}
                style={{ ...btnBase, color: '#10b981', borderColor: '#bbf7d0' }}>
                Activate
              </Button>
            )}
          </div>
        );
      }
    }
  ];

  const slabColumns = [
    {
      title: 'Banking Partner', dataIndex: 'bankName', key: 'bankName',
      render: (text: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Banknote size={16} color="#64748b" />
          </div>
          <span style={{ fontWeight: 700, color: '#1e293b' }}>{text}</span>
        </div>
      )
    },
    {
      title: 'Product Category', dataIndex: 'productCategory', key: 'productCategory',
      render: (text: string) => <Tag style={{ borderRadius: 6, fontWeight: 600 }}>{text}</Tag>
    },
    {
      title: 'Payout Rate (%)', dataIndex: 'payoutRate', key: 'payoutRate',
      render: (rate: number) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Percent size={14} color="#3b82f6" />
          <span style={{ fontWeight: 800, color: '#2563eb', fontSize: 15 }}>{Number(rate).toFixed(2)}%</span>
        </div>
      )
    },
    {
      title: 'Min. Disbursement', dataIndex: 'minDisbursementAmount', key: 'minDisbursementAmount',
      render: (val: number) => <span style={{ color: '#64748b', fontWeight: 500 }}>₹{Number(val || 0).toLocaleString()}</span>
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => (
        <Badge status={status === 'ACTIVE' ? 'success' : 'processing'} text={<span style={{ fontWeight: 600, fontSize: 12 }}>{status}</span>} />
      )
    },
    {
      title: 'Actions', key: 'actions',
      render: (_: any, record: any) => (
        <Button type="text" icon={<Edit2 size={14} />} style={{ color: '#3b82f6' }} onClick={() => handleEditSlab(record)} />
      )
    }
  ];

  const handleEditSlab = (slab: any) => {
    setEditingSlab(slab);
    slabForm.setFieldsValue({ ...slab });
    setIsSlabModalOpen(true);
  };

  const handleSaveSlab = async (values: any) => {
    try {
      const payload = { ...editingSlab, ...values };
      const res = await apiClient.post('/commissions/slabs', payload);
      if (editingSlab?.id) {
        setPayoutSlabs(slabs => slabs.map(s => s.id === editingSlab.id ? res.data : s));
      } else {
        setPayoutSlabs(prev => [...prev, res.data]);
      }
      message.success(editingSlab?.id ? 'Payout slab updated.' : 'New payout slab created.');
      setIsSlabModalOpen(false);
    } catch {
      message.error('Failed to save slab.');
    }
  };

  const handleSavePartnerPayout = async (values: any) => {
    try {
      await apiClient.post('/commissions/slabs', {
        connectorId: drawerPartner.id,
        bankName: values.bankName,
        productCategory: values.productCategory,
        payoutRate: values.payoutRate,
        minDisbursementAmount: values.minDisbursementAmount || 0,
        status: 'ACTIVE',
      });
      message.success(`Payout rate saved for ${drawerPartner.name}`);
      const res = await apiClient.get(`/commissions/slabs/connector/${drawerPartner.id}`);
      setDrawerSlabs(res.data?.data ?? []);
      payoutForm.resetFields();
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Failed to save payout rate');
    }
  };

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      const authRes = await apiClient.post('/auth/register', {
        email: values.email,
        password: values.password,
        role: 'CONNECTOR'
      });
      const userId = authRes.data?.data?.userId;
      if (!userId) throw new Error('Registration did not return a userId');

      const connRes = await apiClient.post('/connectors', {
        userId,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone || '',
        region: values.region || '',
        email: values.email,
        role: 'CONNECTOR'
      });
      const connectorId = connRes.data?.data?.id;

      if (connectorId) {
        await Promise.all([
          apiClient.put(`/connectors/${connectorId}/status`, { status: 'ACTIVE' }),
          apiClient.put(`/auth/users/${userId}/status`, { status: 'ACTIVE' })
        ]);
      }

      if (connectorId && values.rmId) {
        await apiClient.post(`/connectors/${connectorId}/assign-manager`, {
          managerId: values.rmId, role: 'RM'
        });
      }

      setIsModalOpen(false);
      form.resetFields();
      fetchConnectors();
      message.success(`Channel partner ${values.firstName} ${values.lastName} onboarded successfully!`);
    } catch (err: any) {
      const resp = err.response?.data;
      const detail = resp?.errors?.length
        ? resp.errors.join(' ')
        : (resp?.message || err.message || 'Onboarding failed');
      message.error(detail);
    } finally {
      setLoading(false);
    }
  };

  const [sliderIndex, setSliderIndex] = useState(0);

  const joinDate = drawerPartner?.createdAt
    ? new Date(drawerPartner.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  const totalBusinessAmount = drawerChartData.reduce((s, d) => s + (d.amount || 0), 0);
  const totalDisbursals = drawerChartData.reduce((s, d) => s + (d.disbursals || 0), 0);

  const activeCount = connectors.filter(c => c.status === 'ACTIVE').length;
  const pendingCount = connectors.filter(c => c.status === 'PENDING_APPROVAL').length;
  const regionMap: Record<string, number> = {};
  connectors.forEach(c => { if (c.region && c.region !== '—') regionMap[c.region] = (regionMap[c.region] || 0) + 1; });
  const topRegion = Object.entries(regionMap).sort((a, b) => b[1] - a[1])[0];

  const slides = [
    {
      gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      accent: '#3b82f6',
      icon: <Users size={32} color="#3b82f6" />,
      label: 'NETWORK OVERVIEW',
      title: `${connectors.length} Channel Partners`,
      subtitle: `${activeCount} active · ${rms.length} dedicated RMs managing the network`,
      stat: `${Math.round((activeCount / Math.max(connectors.length, 1)) * 100)}%`,
      statLabel: 'activation rate',
      dots: [
        { value: activeCount, label: 'Active', color: '#10b981' },
        { value: pendingCount, label: 'Pending', color: '#f59e0b' },
        { value: rms.length, label: 'RMs', color: '#3b82f6' },
      ]
    },
    {
      gradient: 'linear-gradient(135deg, #1a1060 0%, #0f172a 100%)',
      accent: '#8b5cf6',
      icon: <TrendingUp size={32} color="#a78bfa" />,
      label: 'GROWTH PIPELINE',
      title: 'Partner Acquisition Funnel',
      subtitle: 'Track onboarding stages from registration to first disbursement',
      stat: pendingCount > 0 ? `${pendingCount}` : '0',
      statLabel: 'awaiting approval',
      dots: [
        { value: connectors.length, label: 'Registered', color: '#8b5cf6' },
        { value: activeCount, label: 'Approved', color: '#6366f1' },
        { value: pendingCount, label: 'In Review', color: '#f59e0b' },
      ]
    },
    {
      gradient: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
      accent: '#10b981',
      icon: <MapPin size={32} color="#34d399" />,
      label: 'REGIONAL COVERAGE',
      title: topRegion ? `${topRegion[0]} is Your Strongest Region` : 'Build Regional Coverage',
      subtitle: topRegion
        ? `${topRegion[1]} partner${topRegion[1] > 1 ? 's' : ''} operating in ${topRegion[0]} · Expand to under-served zones`
        : 'Assign regions when onboarding partners to track geographic coverage',
      stat: Object.keys(regionMap).length > 0 ? `${Object.keys(regionMap).length}` : '—',
      statLabel: 'regions covered',
      dots: Object.entries(regionMap).slice(0, 3).map(([k, v]) => ({ value: v, label: k, color: '#10b981' })),
    },
    {
      gradient: 'linear-gradient(135deg, #7c2d12 0%, #0f172a 100%)',
      accent: '#f97316',
      icon: <Banknote size={32} color="#fb923c" />,
      label: 'PAYOUT READINESS',
      title: 'Commission Engine Active',
      subtitle: 'Bank-wise payout slabs configured · Auto-calculates on each disbursement',
      stat: `${payoutSlabs.length}`,
      statLabel: 'payout slabs',
      dots: [
        { value: payoutSlabs.filter(s => s.status === 'ACTIVE').length, label: 'Active slabs', color: '#f97316' },
        { value: payoutSlabs.filter(s => s.status === 'PROMOTIONAL').length, label: 'Promo', color: '#fbbf24' },
        { value: rms.length, label: 'RM overseers', color: '#94a3b8' },
      ]
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setSliderIndex(i => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="page-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="page-header-title">Channel Partner Hub</h1>
          <span className="page-header-subtitle">Manage channel partners and configure bank-wise payout slabs</span>
        </div>
        <Space size={12}>
          <Button icon={<TrendingUp size={16} />}>Performance Analytics</Button>
          <Button type="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}
            style={{ height: 40, borderRadius: 12, fontWeight: 700 }}>
            Onboard New Partner
          </Button>
        </Space>
      </div>

      {/* ── Insight Slider ── */}
      <div className="insight-slider" style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: 168, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="insight-slider-inner"
            style={{
              position: 'absolute', inset: 0,
              background: slide.gradient,
              padding: '24px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              opacity: sliderIndex === i ? 1 : 0,
              transform: sliderIndex === i ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.55s ease, transform 0.55s ease',
              pointerEvents: sliderIndex === i ? 'auto' : 'none',
            }}
          >
            {/* Left: icon + text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, flex: 1, minWidth: 0 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18, flexShrink: 0,
                background: `${slide.accent}20`,
                border: `1px solid ${slide.accent}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {slide.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: slide.accent, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>
                  {slide.label}
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 6 }}>
                  {slide.title}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 500, lineHeight: 1.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {slide.subtitle}
                </div>
              </div>
            </div>

            {/* Right: big stat + mini dots */}
            <div className="insight-slider-stats" style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0, marginLeft: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 900, color: slide.accent, lineHeight: 1, letterSpacing: '-0.04em' }}>
                  {slide.stat}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
                  {slide.statLabel}
                </div>
              </div>
              {slide.dots.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {slide.dots.map((d, di) => (
                    <div key={di} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'white', minWidth: 16 }}>{d.value}</span>
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{d.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Slide navigation dots */}
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSliderIndex(i)}
              style={{
                width: sliderIndex === i ? 22 : 6,
                height: 6, borderRadius: 100, border: 'none', padding: 0, cursor: 'pointer',
                background: sliderIndex === i ? slides[sliderIndex].accent : 'rgba(255,255,255,0.25)',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>

      <Tabs defaultActiveKey="1" className="premium-tabs" items={[
        {
          key: '1',
          label: <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Users size={16} /> Partner Network</div>,
          children: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Row gutter={16}>
                <Col span={6}><Card className="pro-card"><Statistic title="Total Partners" value={connectors.length} prefix={<Users size={18} />} /></Card></Col>
                <Col span={6}><Card className="pro-card"><Statistic title="Active RMs" value={rms.length} prefix={<UserCheck size={18} />} /></Card></Col>
                <Col span={6}><Card className="pro-card"><Statistic title="Active Partners" value={connectors.filter(c => c.status === 'ACTIVE').length} prefix={<Briefcase size={18} />} valueStyle={{ color: '#10b981' }} /></Card></Col>
                <Col span={6}><Card className="pro-card"><Statistic title="Pending Approval" value={connectors.filter(c => c.status === 'PENDING_APPROVAL').length} prefix={<UserCheck size={18} />} valueStyle={{ color: '#f59e0b' }} /></Card></Col>
              </Row>
              <div className="pro-card" style={{ padding: 0 }}>
                <div className="page-toolbar" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Input placeholder="Search channel partners..." prefix={<Search size={18} />} style={{ maxWidth: 350, borderRadius: 10 }} />
                  <Button icon={<Download size={16} />}>Export List</Button>
                </div>
                {connectorsLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
                ) : (
                  <div className="ag-theme-alpine" style={{ height: 450, width: '100%' }}>
                    <AgGridReact
                      theme="legacy"
                      rowData={connectors}
                      columnDefs={connectorColumns}
                      rowHeight={64}
                      pagination={true}
                      onRowClicked={(e) => {
                        if ((e.event?.target as HTMLElement)?.closest('button')) return;
                        openProfileDrawer(e.data, 'profile');
                      }}
                      rowStyle={{ cursor: 'pointer' }}
                      overlayNoRowsTemplate="<span style='color:#94a3b8;font-size:14px'>No partners yet. Onboard your first channel partner using the button above.</span>"
                    />
                  </div>
                )}
              </div>
            </div>
          )
        },
        {
          key: '2',
          label: <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Banknote size={16} /> Bank Payout Slabs</div>,
          children: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Card variant="borderless" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ maxWidth: '60%' }}>
                    <h3 style={{ fontWeight: 800, color: '#1e40af', marginBottom: 8 }}>Global Payout Engine</h3>
                    <p style={{ color: '#3b82f6', fontSize: 13, margin: 0, fontWeight: 500 }}>
                      Configure global payout rates per banking partner. Click a partner row in the Partner Network tab to set individual overrides.
                    </p>
                  </div>
                  <Button type="primary" icon={<Save size={16} />} style={{ background: '#1e40af' }}>Update All Slabs</Button>
                </div>
              </Card>
              <div className="pro-card">
                <Table
                  columns={slabColumns}
                  dataSource={payoutSlabs}
                  rowKey="id"
                  pagination={false}
                  className="premium-table"
                  locale={{ emptyText: 'No payout slabs configured yet.' }}
                />
                <div style={{ marginTop: 20, padding: '16px', background: '#f8fafc', borderRadius: 12, border: '1px dashed #cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Percent size={20} color="#64748b" />
                    <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>
                      Add a new bank policy to the automated engine.
                      <Button type="link" onClick={() => handleEditSlab({})} style={{ padding: '0 4px', fontWeight: 700 }}>Add New Slab</Button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]} />

      {/* ── Channel Partner Profile Drawer ── */}
      <Drawer
        title={null}
        placement="right"
        width={700}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        closeIcon={null}
        destroyOnHidden
        styles={{ body: { padding: 0, background: '#f8fafc' }, header: { display: 'none' } }}
      >
        {drawerPartner && (
          <>
            {/* Drawer Header */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '28px 32px 24px', position: 'relative' }}>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}
              >
                <X size={16} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{
                  width: 68, height: 68, borderRadius: 20,
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 800, color: 'white',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                  flexShrink: 0,
                }}>
                  {getInitials(drawerPartner.name)}
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                    Channel Partner
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                    {drawerPartner.name}
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Tag color={drawerPartner.status === 'ACTIVE' ? 'success' : drawerPartner.status === 'PENDING_APPROVAL' ? 'processing' : 'default'} style={{ fontWeight: 700 }}>
                      {drawerPartner.status}
                    </Tag>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={11} /> {drawerPartner.region}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info Strip */}
            <div style={{ background: '#1e293b', padding: '14px 32px', display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {[
                { icon: <Mail size={13} />, value: drawerPartner.email },
                { icon: <Phone size={13} />, value: drawerPartner.phone },
                { icon: <CalendarDays size={13} />, value: `Joined ${joinDate}` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: 500 }}>
                  {item.icon}{item.value}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ padding: '0 32px' }}>
              <Tabs
                activeKey={drawerTab}
                onChange={setDrawerTab}
                className="premium-tabs"
                items={[
                  {
                    key: 'profile',
                    label: <span style={{ fontWeight: 700 }}>Business Performance</span>,
                    children: drawerLoading ? (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 32 }}>
                        {/* Summary Cards */}
                        <Row gutter={16}>
                          <Col span={8}>
                            <Card className="pro-card" style={{ background: 'linear-gradient(135deg,#eff6ff,#dbeafe)', border: 'none' }}>
                              <Statistic
                                title={<span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>6-Month Disbursals</span>}
                                value={totalDisbursals}
                                prefix={<Award size={16} style={{ color: '#3b82f6' }} />}
                                valueStyle={{ color: '#1d4ed8', fontWeight: 800 }}
                              />
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card className="pro-card" style={{ background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', border: 'none' }}>
                              <Statistic
                                title={<span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Commission Earned</span>}
                                value={totalBusinessAmount}
                                prefix="₹"
                                valueStyle={{ color: '#059669', fontWeight: 800 }}
                                formatter={(v) => Number(v).toLocaleString()}
                              />
                            </Card>
                          </Col>
                          <Col span={8}>
                            <Card className="pro-card" style={{ background: 'linear-gradient(135deg,#fefce8,#fef9c3)', border: 'none' }}>
                              <Statistic
                                title={<span style={{ fontSize: 11, fontWeight: 700, color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Per Month</span>}
                                value={Math.round(totalDisbursals / 6)}
                                suffix="disbursals"
                                valueStyle={{ color: '#a16207', fontWeight: 800, fontSize: 20 }}
                              />
                            </Card>
                          </Col>
                        </Row>

                        {/* Business Chart */}
                        <div className="pro-card" style={{ padding: '20px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <BarChart2 size={18} color="#6366f1" />
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>Monthly Business Volume</span>
                            <Tag color="blue" style={{ marginLeft: 'auto', fontWeight: 700 }}>Last 6 Months</Tag>
                          </div>
                          <div style={{ width: '100%', height: 220 }}>
                          <ResponsiveContainer width="100%" height={220} minWidth={1}>
                            <BarChart data={drawerChartData} barGap={4}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} />
                              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                              <RechartsTooltip content={<ChartTooltip />} />
                              <Legend wrapperStyle={{ fontSize: 11, fontWeight: 600, color: '#64748b' }} />
                              <Bar yAxisId="left" dataKey="disbursals" name="Disbursals" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={32} />
                              <Bar yAxisId="right" dataKey="amount" name="amount" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={32} opacity={0.7} />
                            </BarChart>
                          </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    )
                  },
                  {
                    key: 'payout',
                    label: <span style={{ fontWeight: 700 }}>Payout Configuration</span>,
                    children: drawerLoading ? (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 32 }}>
                        {drawerSlabs.length > 0 && (
                          <div className="pro-card" style={{ padding: '16px 20px' }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                              Active Payout Rates
                            </div>
                            {drawerSlabs.map((s: any, i: number) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f0fdf4', borderRadius: 10, marginBottom: 6, border: '1px solid #bbf7d0' }}>
                                <div>
                                  <span style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>{s.bankName}</span>
                                  <span style={{ color: '#64748b', fontSize: 11, marginLeft: 8 }}>· {s.productCategory}</span>
                                </div>
                                <Tag color="success" style={{ fontWeight: 800, fontSize: 13 }}>{Number(s.payoutRate).toFixed(2)}%</Tag>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pro-card" style={{ padding: '20px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <Percent size={18} color="#6366f1" />
                            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>Add Payout Rate</span>
                          </div>
                          <Form form={payoutForm} layout="vertical" onFinish={handleSavePartnerPayout}>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="bankName" label="Banking Partner" rules={[{ required: true }]}>
                                  <Input placeholder="e.g. HDFC Bank" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="productCategory" label="Product Category" rules={[{ required: true }]}>
                                  <Input placeholder="e.g. Personal Loan" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="payoutRate" label="Payout Rate (%)" rules={[{ required: true }]}>
                                  <InputNumber style={{ width: '100%' }} max={10} min={0} step={0.01} placeholder="e.g. 1.25" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="minDisbursementAmount" label="Min Disbursement (₹)">
                                  <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item style={{ marginBottom: 0 }}>
                              <Button type="primary" htmlType="submit" icon={<Save size={14} />} style={{ background: '#6366f1' }}>
                                Save Payout Rate
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </div>
                    )
                  }
                ]}
              />
            </div>
          </>
        )}
      </Drawer>

      {/* Partner Onboarding Modal */}
      <Modal
        title={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Briefcase size={20} /> Channel Partner Onboarding</div>}
        open={isModalOpen}
        onCancel={() => { setIsModalOpen(false); form.resetFields(); }}
        footer={null} width={600} centered destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleRegister} style={{ marginTop: 20 }}>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="firstName" label="First Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={12}><Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
          </Row>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="phone" label="Phone Number"><Input placeholder="+91 XXXXX XXXXX" /></Form.Item></Col>
            <Col span={12}>
              <Form.Item name="region" label="Region">
                <Select placeholder="Select Region" allowClear>
                  <Option value="North">North</Option>
                  <Option value="South">South</Option>
                  <Option value="East">East</Option>
                  <Option value="West">West</Option>
                  <Option value="Central">Central</Option>
                  <Option value="NATIONAL">National</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="rmId" label="Assign Dedicated RM">
            <Select placeholder="Select RM (optional)" allowClear>
              {rms.map((rm: any) => (
                <Option key={rm.id} value={rm.id}>{rm.firstName} {rm.lastName}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="password" label="Set Login Password" rules={[{ required: true, min: 8, message: 'Minimum 8 characters required' }]}>
            <Input.Password placeholder="Set a login password for the partner (min 8 chars)" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginTop: 8, marginBottom: 0 }}>
            <Space>
              <Button onClick={() => { setIsModalOpen(false); form.resetFields(); }}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading} style={{ padding: '0 32px' }}>Complete Onboarding</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>


      {/* Slab Edit Modal */}
      <Modal
        title={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Banknote size={20} /> {editingSlab?.id ? 'Edit' : 'Create'} Payout Slab</div>}
        open={isSlabModalOpen}
        onCancel={() => setIsSlabModalOpen(false)}
        footer={null} width={500} centered
      >
        <Form form={slabForm} layout="vertical" onFinish={handleSaveSlab} style={{ marginTop: 20 }}>
          <Form.Item name="bankName" label="Banking Partner" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="productCategory" label="Product Category" rules={[{ required: true }]}><Input /></Form.Item>
          <Row gutter={16}>
            <Col span={12}><Form.Item name="payoutRate" label="Payout Rate (%)" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} max={10} min={0} step={0.01} /></Form.Item></Col>
            <Col span={12}><Form.Item name="minDisbursementAmount" label="Min Disbursement (₹)"><InputNumber style={{ width: '100%' }} min={0} /></Form.Item></Col>
          </Row>
          <Form.Item name="status" label="Policy Status" initialValue="ACTIVE">
            <Select>
              <Option value="ACTIVE">ACTIVE</Option>
              <Option value="PROMOTIONAL">PROMOTIONAL</Option>
              <Option value="INACTIVE">INACTIVE</Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginTop: 24, marginBottom: 0 }}>
            <Space>
              <Button onClick={() => setIsSlabModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save Slab</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConnectorHub;
