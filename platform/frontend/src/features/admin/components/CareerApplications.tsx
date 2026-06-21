import React, { useState, useEffect, useCallback } from 'react';
import { Table, Select, Button, Drawer, App, Tooltip } from 'antd';
import { Download, RefreshCw, FileText, Phone, Mail, Briefcase, Clock } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import api from '../../../shared/services/apiClient';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';

const STATUS_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  NEW:         { color: '#0B1E3D', bg: 'rgba(196,153,58,0.10)', border: 'rgba(196,153,58,0.30)' },
  REVIEWING:   { color: '#1D4ED8', bg: '#EFF6FF',               border: '#BFDBFE' },
  SHORTLISTED: { color: '#15803D', bg: '#F0FAF4',               border: '#A3D9B8' },
  REJECTED:    { color: '#DC2626', bg: '#FEF2F2',               border: '#FCA5A5' },
};

const STATUS_OPTIONS = [
  { value: 'NEW',         label: 'New' },
  { value: 'REVIEWING',   label: 'Reviewing' },
  { value: 'SHORTLISTED', label: 'Shortlisted' },
  { value: 'REJECTED',    label: 'Rejected' },
];

interface Application {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  experience?: string;
  coverNote?: string;
  cvUrl?: string;
  status: string;
  createdAt: string;
}

const StatusTag: React.FC<{ status: string }> = ({ status }) => {
  const s = STATUS_COLORS[status] ?? STATUS_COLORS.NEW;
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, padding: '2px 10px', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
      {status}
    </span>
  );
};

const CareerApplications: React.FC = () => {
  const { message } = App.useApp();
  const [items, setItems] = useState<Application[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Application | null>(null);
  const [updating, setUpdating] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = { page, size: 20 };
      if (statusFilter) params.status = statusFilter;
      const res = await api.get('/careers', { params });
      const d = res.data?.data ?? {};
      setItems(d.items ?? []);
      setTotal(d.total ?? 0);
    } catch {
      message.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true);
    try {
      await api.patch(`/careers/${id}/status`, { status });
      message.success('Status updated');
      setSelected(prev => prev ? { ...prev, status } : null);
      setItems(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch {
      message.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const downloadCv = async (id: string) => {
    setCvLoading(true);
    try {
      const res = await api.get(`/careers/${id}/cv`);
      const url = res.data?.data?.url;
      if (url) window.open(url, '_blank');
    } catch {
      message.error('CV not available');
    } finally {
      setCvLoading(false);
    }
  };

  const columns: ColumnsType<Application> = [
    {
      title: 'Applicant',
      key: 'name',
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: NAVY }}>{r.name}</div>
          <div style={{ fontSize: 11, color: '#7A92B5', marginTop: 2 }}>{r.email}</div>
        </div>
      ),
    },
    {
      title: 'Role Applied',
      dataIndex: 'role',
      key: 'role',
      render: v => <span style={{ fontSize: 13, color: '#3A5278', fontWeight: 500 }}>{v}</span>,
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      render: v => v ? <span style={{ fontSize: 12, color: '#7A92B5' }}>{v}</span> : <span style={{ color: '#C0CBDB', fontSize: 12 }}>—</span>,
      width: 120,
    },
    {
      title: 'CV',
      key: 'cv',
      width: 60,
      align: 'center',
      render: (_, r) => r.cvUrl ? (
        <Tooltip title="Download CV">
          <Button type="text" size="small" icon={<FileText size={14} color={GOLD} />}
            onClick={e => { e.stopPropagation(); downloadCv(r.id); }} loading={cvLoading} />
        </Tooltip>
      ) : <span style={{ color: '#C0CBDB', fontSize: 12 }}>—</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: v => <StatusTag status={v} />,
    },
    {
      title: 'Applied On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 110,
      render: v => <span style={{ fontSize: 12, color: '#7A92B5' }}>{new Date(v).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: NAVY, letterSpacing: '-0.02em' }}>Career Applications</div>
          <div style={{ fontSize: 13, color: '#7A92B5', marginTop: 3 }}>{total} total application{total !== 1 ? 's' : ''}</div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Select
            allowClear
            placeholder="Filter by status"
            value={statusFilter}
            onChange={v => { setStatusFilter(v); setPage(1); }}
            options={STATUS_OPTIONS}
            style={{ width: 160 }}
          />
          <Button icon={<RefreshCw size={14} />} onClick={fetch} loading={loading}>Refresh</Button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #D4DCE8' }}>
        <Table<Application>
          columns={columns}
          dataSource={items}
          rowKey="id"
          loading={loading}
          size="middle"
          onRow={r => ({ onClick: () => setSelected(r), style: { cursor: 'pointer' } })}
          pagination={{
            current: page,
            pageSize: 20,
            total,
            onChange: p => setPage(p),
            showTotal: (t, [s, e]) => `${s}–${e} of ${t}`,
            size: 'small',
          }}
          locale={{ emptyText: <div style={{ padding: 40, color: '#7A92B5', textAlign: 'center' }}>No applications yet</div> }}
        />
      </div>

      {/* Detail Drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        width={440}
        title={
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 16, color: NAVY }}>
            Application Detail
          </div>
        }
        styles={{ header: { borderBottom: '1px solid #E8EDF5' }, body: { padding: 0 } }}
      >
        {selected && (
          <div>
            {/* Applicant header */}
            <div style={{ background: NAVY, padding: '20px 24px' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(196,153,58,0.15)', border: '1px solid rgba(196,153,58,0.30)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <span style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: 16, color: '#E8C870' }}>
                  {selected.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: 17, color: '#fff' }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: GOLD, marginTop: 4, fontWeight: 600 }}>{selected.role}</div>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Contact */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Contact</div>
                {[
                  [Mail,     selected.email],
                  [Phone,    `+91 ${selected.mobile}`],
                ].map(([Icon, val]: any) => (
                  <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Icon size={14} color="#7A92B5" />
                    <span style={{ fontSize: 13, color: '#3A5278' }}>{val}</span>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Details</div>
                {[
                  [Briefcase, 'Experience', selected.experience ?? '—'],
                  [Clock,     'Applied On',  new Date(selected.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })],
                ].map(([Icon, label, val]: any) => (
                  <div key={label} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <Icon size={14} color="#7A92B5" style={{ marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                      <div style={{ fontSize: 13, color: '#3A5278', marginTop: 2 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cover Note */}
              {selected.coverNote && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Cover Note</div>
                  <p style={{ fontSize: 13, color: '#3A5278', lineHeight: 1.7, margin: 0, background: '#F5F7FA', padding: '12px 14px', border: '1px solid #E8EDF5' }}>
                    {selected.coverNote}
                  </p>
                </div>
              )}

              {/* CV download */}
              {selected.cvUrl && (
                <Button
                  icon={<Download size={14} />}
                  onClick={() => downloadCv(selected.id)}
                  loading={cvLoading}
                  style={{ borderColor: GOLD, color: GOLD, fontWeight: 600 }}
                >
                  Download CV
                </Button>
              )}

              {/* Status update */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#7A92B5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Update Status</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      disabled={updating || selected.status === opt.value}
                      onClick={() => updateStatus(selected.id, opt.value)}
                      style={{
                        padding: '6px 14px', border: `1.5px solid ${selected.status === opt.value ? NAVY : '#D4DCE8'}`,
                        background: selected.status === opt.value ? NAVY : '#fff',
                        color: selected.status === opt.value ? '#fff' : '#3A5278',
                        fontSize: 12, fontWeight: 600, cursor: updating ? 'not-allowed' : selected.status === opt.value ? 'default' : 'pointer',
                        fontFamily: 'Inter, sans-serif', transition: 'all 0.14s',
                        opacity: updating && selected.status !== opt.value ? 0.5 : 1,
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CareerApplications;
