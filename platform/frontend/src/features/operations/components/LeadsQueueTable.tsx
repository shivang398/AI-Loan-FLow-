import React, { useState } from 'react';
import { Typography, Button, Space, Input, Table, Tooltip, Spin } from 'antd';
import { Search, RefreshCw, Eye, History, PhoneCall } from 'lucide-react';
import { Lead } from '../types';
import { formatAmount, formatLoanType, formatElapsed } from '../../../shared/utils/formatters';
import { LEAD_STATUS_STYLES } from '../../../shared/constants/statusStyles';

const { Text } = Typography;

interface Props {
  leads: Lead[];
  loading: boolean;
  onRefresh: () => void;
  onViewDetail: (lead: Lead) => void;
  onViewHistory: (lead: Lead) => void;
  onAssign: (lead: Lead) => void;
}

const LeadsQueueTable: React.FC<Props> = ({ leads, loading, onRefresh, onViewDetail, onViewHistory, onAssign }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'NEW' | 'IN_REVIEW' | 'QUERY_RAISED' | 'RESOLVED'>('ALL');

  const filtered = leads.filter(l => {
    const term = search.toLowerCase();
    const matchSearch = !term || `${l.firstName} ${l.lastName} ${l.email} ${l.mobile}`.toLowerCase().includes(term);
    const matchTab = activeTab === 'ALL' || l.status === activeTab;
    return matchSearch && matchTab;
  });

  const columns: any[] = [
    {
      title: 'CUSTOMER',
      key: 'customer',
      flex: 2,
      render: (_: any, record: Lead) => (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
          <Text style={{ fontWeight: 800, color: '#0f172a', fontSize: 13 }}>
            {record.firstName} {record.lastName}
          </Text>
          <Text style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>{record.mobile}</Text>
        </div>
      ),
    },
    {
      title: 'LOAN',
      key: 'loan',
      render: (_: any, record: Lead) => (
        <div>
          <Text style={{ fontWeight: 900, color: '#0f172a', fontFamily: 'JetBrains Mono, monospace', display: 'block', fontSize: 13 }}>
            {formatAmount(record.loanAmount)}
          </Text>
          <Text style={{ fontSize: 11, color: '#94a3b8' }}>{formatLoanType(record.loanType)}</Text>
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const s = LEAD_STATUS_STYLES[status] ?? LEAD_STATUS_STYLES.NEW;
        return (
          <span style={{ background: s.bg, color: s.color, borderRadius: 999, fontWeight: 800, fontSize: 10, letterSpacing: '0.08em', padding: '4px 10px', textTransform: 'uppercase' as const }}>
            {s.label}
          </span>
        );
      },
    },
    {
      title: 'ASSIGNED TO',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (email: string) => (
        <Text style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>{email || 'Unassigned'}</Text>
      ),
    },
    {
      title: 'AGE',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (ts: string) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700, fontSize: 12, color: '#f59e0b' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
          {formatElapsed(ts)}
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 110,
      render: (_: any, record: Lead) => (
        <Space size={4}>
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<Eye size={15} />}
              onClick={e => { e.stopPropagation(); onViewDetail(record); }}
              style={{ color: '#94a3b8', width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Tooltip>
          <Tooltip title="Loan History">
            <Button
              type="text"
              icon={<History size={15} />}
              onClick={e => { e.stopPropagation(); onViewHistory(record); }}
              style={{ color: '#6366f1', width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Tooltip>
          <Tooltip title="Assign to Telecaller">
            <Button
              type="text"
              icon={<PhoneCall size={15} />}
              onClick={e => { e.stopPropagation(); onAssign(record); }}
              style={{ color: '#06b6d4', width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const tabs = [
    { key: 'ALL',          label: 'All',           count: leads.length },
    { key: 'NEW',          label: 'New',           count: leads.filter(l => l.status === 'NEW').length },
    { key: 'IN_REVIEW',    label: 'Being Checked', count: leads.filter(l => l.status === 'IN_REVIEW').length },
    { key: 'QUERY_RAISED', label: 'Info Needed',   count: leads.filter(l => l.status === 'QUERY_RAISED').length },
    { key: 'RESOLVED',     label: 'Done',          count: leads.filter(l => l.status === 'RESOLVED').length },
  ];

  return (
    <div style={{ background: '#ffffff', borderRadius: 20, border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4, background: '#f8fafc', padding: 3, borderRadius: 10 }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              style={{
                padding: '5px 14px', borderRadius: 7, border: 'none',
                background: activeTab === t.key ? '#4f46e5' : 'transparent',
                color: activeTab === t.key ? '#fff' : '#94a3b8',
                fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {t.label}
              {t.count > 0 && (
                <span style={{ background: activeTab === t.key ? 'rgba(255,255,255,0.25)' : '#e2e8f0', borderRadius: 999, padding: '1px 6px', fontSize: 10, fontWeight: 800 }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <Space size={8}>
          <Input
            prefix={<Search size={14} style={{ color: '#94a3b8' }} />}
            placeholder="Search name, mobile, email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 200, borderRadius: 10, border: '1px solid #f1f5f9', background: '#f8fafc', height: 34, fontSize: 13 }}
          />
          <Tooltip title="Refresh">
            <Button icon={<RefreshCw size={14} />} onClick={onRefresh} loading={loading} style={{ height: 34, borderRadius: 10, border: '1px solid #f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center' }} />
          </Tooltip>
        </Space>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filtered.map(l => ({ ...l, key: l.id }))}
            pagination={false}
            rowKey="id"
            locale={{ emptyText: loading ? 'Loading leads...' : 'No leads yet. Customers will appear here after registration.' }}
            onRow={record => ({
              onClick: () => onViewDetail(record as Lead),
              style: { cursor: 'pointer', transition: 'background 0.15s' },
            })}
            className="ops-queue-table"
          />
        </Spin>
      </div>
    </div>
  );
};

export default LeadsQueueTable;
