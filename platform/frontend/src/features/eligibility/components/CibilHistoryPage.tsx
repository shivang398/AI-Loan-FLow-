import React, { useState, useEffect, useCallback } from 'react';
import {
  Row, Col, Card, Statistic, Button, Input, Select, DatePicker,
  Space, Tag, Table, Spin, Empty, Segmented,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Search, Download, RefreshCw, ShieldCheck } from 'lucide-react';
import dayjs from 'dayjs';
import apiClient from '../../../shared/services/apiClient';

const { RangePicker } = DatePicker;

type DatePreset = 'today' | 'yesterday' | 'last7' | 'last30' | 'custom';

interface HistoryRecord {
  id: string;
  fullName: string;
  mobileNumber: string;
  panNumber: string;
  cibilScore: number;
  scoreBand: string;
  demoMode: boolean;
  requestedBy: string;
  createdAt: string;
}

interface Stats {
  total: number;
  avgScore: number;
  bandCounts: Record<string, number>;
  liveChecks: number;
}

const BAND_CONFIG: Record<string, { label: string; color: string; bg: string; tagColor: string }> = {
  EXCELLENT:  { label: 'Excellent',   color: '#1A7A4A', bg: '#F0FAF4', tagColor: 'success' },
  GOOD:       { label: 'Good',        color: '#2563EB', bg: '#EFF6FF', tagColor: 'processing' },
  FAIR:       { label: 'Fair',        color: '#B45309', bg: '#FFFBEB', tagColor: 'warning' },
  POOR:       { label: 'Poor',        color: '#CC1A1A', bg: '#FEF2F2', tagColor: 'error' },
  NO_HISTORY: { label: 'No History',  color: '#64748B', bg: '#F8FAFC', tagColor: 'default' },
  UNKNOWN:    { label: 'Unknown',     color: '#64748B', bg: '#F8FAFC', tagColor: 'default' },
};

const scoreColor = (score: number) =>
  score >= 750 ? '#1A7A4A' : score >= 650 ? '#B45309' : '#CC1A1A';

const presetRange = (preset: DatePreset): [dayjs.Dayjs, dayjs.Dayjs] | null => {
  const now = dayjs();
  switch (preset) {
    case 'today':     return [now.startOf('day'), now.endOf('day')];
    case 'yesterday': return [now.subtract(1, 'day').startOf('day'), now.subtract(1, 'day').endOf('day')];
    case 'last7':     return [now.subtract(6, 'day').startOf('day'), now.endOf('day')];
    case 'last30':    return [now.subtract(29, 'day').startOf('day'), now.endOf('day')];
    default:          return null;
  }
};

const CibilHistoryPage: React.FC = () => {
  const [preset, setPreset]             = useState<DatePreset>('today');
  const [customRange, setCustomRange]   = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [search, setSearch]             = useState('');
  const [demoFilter, setDemoFilter]     = useState<'all' | 'live' | 'demo'>('all');
  const [loading, setLoading]           = useState(false);
  const [records, setRecords]           = useState<HistoryRecord[]>([]);
  const [stats, setStats]               = useState<Stats | null>(null);
  const [total, setTotal]               = useState(0);
  const [page, setPage]                 = useState(1);
  const pageSize                        = 20;

  const getDateRange = useCallback((): [string, string] => {
    const range = preset === 'custom' ? customRange : presetRange(preset);
    if (!range) return [dayjs().startOf('day').toISOString(), dayjs().toISOString()];
    return [range[0].toISOString(), range[1].toISOString()];
  }, [preset, customRange]);

  const fetchData = useCallback(async (pg = 1) => {
    setLoading(true);
    try {
      const [from, to] = getDateRange();
      const params: any = { from, to, page: pg - 1, size: pageSize };
      if (demoFilter === 'live')  params.demoMode = 'false';
      if (demoFilter === 'demo')  params.demoMode = 'true';
      if (search.trim())          params.search   = search.trim();
      const res = await apiClient.get('/eligibility/cibil/history', { params });
      const data = res.data?.data;
      setRecords(data?.items ?? []);
      setTotal(data?.total ?? 0);
      setStats(data?.stats ?? null);
    } catch { /* silent */ }
    finally  { setLoading(false); }
  }, [getDateRange, demoFilter, search]);

  useEffect(() => { setPage(1); fetchData(1); }, [preset, customRange, demoFilter]);

  const handleSearch = () => { setPage(1); fetchData(1); };

  const handleExport = () => {
    if (!records.length) return;
    const headers = ['Full Name', 'Mobile', 'PAN', 'CIBIL Score', 'Score Band', 'Type', 'Requested By', 'Date & Time'];
    const rows = records.map(r => [
      r.fullName, r.mobileNumber, r.panNumber, r.cibilScore,
      r.scoreBand, r.demoMode ? 'DEMO' : 'LIVE',
      r.requestedBy, new Date(r.createdAt).toLocaleString('en-IN'),
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href  = url;
    link.download = `cibil_history_${dayjs().format('YYYY-MM-DD')}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const columns: ColumnsType<HistoryRecord> = [
    {
      title: 'Customer Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (v) => <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}>{v}</span>,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      render: (v) => <span style={{ fontFamily: 'monospace', fontSize: 13 }}>{v}</span>,
    },
    {
      title: 'PAN',
      dataIndex: 'panNumber',
      key: 'panNumber',
      render: (v) => <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-muted)' }}>{v}</span>,
    },
    {
      title: 'CIBIL Score',
      dataIndex: 'cibilScore',
      key: 'cibilScore',
      sorter: (a, b) => a.cibilScore - b.cibilScore,
      render: (v) => (
        <span style={{ fontWeight: 800, fontSize: 18, color: scoreColor(v), fontFamily: 'Inter, sans-serif' }}>{v}</span>
      ),
    },
    {
      title: 'Band',
      dataIndex: 'scoreBand',
      key: 'scoreBand',
      render: (v) => {
        const cfg = BAND_CONFIG[v] ?? BAND_CONFIG.UNKNOWN;
        return <Tag color={cfg.tagColor} style={{ fontWeight: 700, fontSize: 11 }}>{cfg.label.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'demoMode',
      key: 'demoMode',
      render: (v) => v
        ? <Tag color="warning" style={{ fontWeight: 700, fontSize: 10 }}>DEMO</Tag>
        : <Tag color="success" style={{ fontWeight: 700, fontSize: 10 }}>LIVE</Tag>,
    },
    {
      title: 'Pulled By',
      dataIndex: 'requestedBy',
      key: 'requestedBy',
      render: (v) => <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{v}</span>,
    },
    {
      title: 'Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (v) => (
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
            {new Date(v).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {new Date(v).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>
      ),
    },
  ];

  const presetLabel: Record<DatePreset, string> = {
    today: 'Today', yesterday: 'Yesterday', last7: 'Last 7 Days', last30: 'Last 30 Days', custom: 'Custom',
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
            Eligibility Engine
          </div>
          <h1 className="page-header-title" style={{ margin: 0 }}>CIBIL Pull History</h1>
          <span className="page-header-subtitle">Complete log of all soft credit checks — searchable, filterable, exportable.</span>
        </div>
        <Space>
          <Button icon={<RefreshCw size={14} />} onClick={() => fetchData(page)} loading={loading}>Refresh</Button>
          <Button icon={<Download size={14} />} type="primary" onClick={handleExport} disabled={!records.length}>
            Export CSV
          </Button>
        </Space>
      </div>

      {/* Date Filters */}
      <div className="pro-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <Segmented
            value={preset}
            onChange={(v) => { setPreset(v as DatePreset); if (v !== 'custom') setCustomRange(null); }}
            options={(['today', 'yesterday', 'last7', 'last30', 'custom'] as DatePreset[]).map(p => ({
              label: presetLabel[p], value: p,
            }))}
          />
          {preset === 'custom' && (
            <RangePicker
              value={customRange}
              onChange={(dates) => setCustomRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
              disabledDate={(d) => d.isAfter(dayjs())}
              format="DD MMM YYYY"
              allowClear
            />
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <Select
              value={demoFilter}
              onChange={setDemoFilter}
              style={{ width: 120 }}
              options={[
                { value: 'all',  label: 'All Types' },
                { value: 'live', label: 'Live Only' },
                { value: 'demo', label: 'Demo Only' },
              ]}
            />
            <Input
              placeholder="Search name, email, mobile..."
              prefix={<Search size={14} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onPressEnter={handleSearch}
              allowClear
              onClear={() => { setSearch(''); setTimeout(() => fetchData(1), 50); }}
              style={{ width: 240 }}
            />
            <Button type="primary" onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {stats && (
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card variant="borderless" className="pro-card" style={{ textAlign: 'center' }}>
              <Statistic
                title={<span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Total Pulls</span>}
                value={stats.total}
                valueStyle={{ fontWeight: 800, color: '#0B2DA4', fontSize: 32 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card variant="borderless" className="pro-card" style={{ textAlign: 'center' }}>
              <Statistic
                title={<span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Avg Score</span>}
                value={stats.total > 0 ? stats.avgScore : '—'}
                valueStyle={{ fontWeight: 800, color: stats.total > 0 ? scoreColor(stats.avgScore) : 'var(--text-muted)', fontSize: 32 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card variant="borderless" className="pro-card" style={{ textAlign: 'center' }}>
              <Statistic
                title={<span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Live Pulls</span>}
                value={stats.liveChecks}
                valueStyle={{ fontWeight: 800, color: '#1A7A4A', fontSize: 32 }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card variant="borderless" className="pro-card" style={{ textAlign: 'center' }}>
              <Statistic
                title={<span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>Demo Pulls</span>}
                value={stats.total - stats.liveChecks}
                valueStyle={{ fontWeight: 800, color: '#B45309', fontSize: 32 }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Score Band Breakdown */}
      {stats && stats.total > 0 && (
        <div className="pro-card" style={{ padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
            Score Band Distribution
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
            {[
              { band: 'EXCELLENT', extra: [] },
              { band: 'GOOD',      extra: [] },
              { band: 'FAIR',      extra: [] },
              { band: 'POOR',      extra: [] },
              { band: 'NO_HISTORY', extra: [] },
            ].map(({ band }) => {
              const cfg   = BAND_CONFIG[band] ?? BAND_CONFIG.UNKNOWN;
              const count = stats.bandCounts?.[band] ?? 0;
              const pct   = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              return (
                <div key={band} style={{ padding: '12px 16px', background: cfg.bg, borderRadius: 6, border: `1px solid ${cfg.color}22` }}>
                  <div style={{ fontWeight: 800, fontSize: 24, color: cfg.color, fontFamily: 'Inter, sans-serif' }}>{count}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{cfg.label}</div>
                  <div style={{ marginTop: 8, height: 4, background: '#E2E8F0', borderRadius: 2 }}>
                    <div style={{ width: `${pct}%`, height: 4, background: cfg.color, borderRadius: 2, transition: 'width 500ms ease' }} />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full History Table */}
      <div className="pro-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--surface-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={16} color="var(--brand-500)" />
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', fontFamily: '"Playfair Display", Georgia, serif' }}>
            {presetLabel[preset]} Pulls
          </span>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{total} records</span>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><Spin size="large" /></div>
        ) : records.length === 0 ? (
          <div style={{ padding: 60 }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span style={{ color: 'var(--text-muted)' }}>No CIBIL checks found for this period.</span>}
            />
          </div>
        ) : (
          <Table
            dataSource={records}
            columns={columns}
            rowKey="id"
            size="middle"
            pagination={{
              current: page,
              pageSize,
              total,
              showTotal: (t) => `${t} checks`,
              showSizeChanger: false,
              onChange: (p) => { setPage(p); fetchData(p); },
            }}
            scroll={{ x: 900 }}
            rowClassName={() => 'cibil-history-row'}
          />
        )}
      </div>
    </div>
  );
};

export default CibilHistoryPage;
