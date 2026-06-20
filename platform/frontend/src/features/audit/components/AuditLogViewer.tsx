import React, { useEffect, useState } from 'react';
import { Card, Timeline, Typography, Tag, Input, Select, Space, Button, Spin, Empty } from 'antd';
import { History, Search, Filter, User, ShieldAlert, FileEdit, Settings, ArrowRight } from 'lucide-react';
import api from '../../../services/api';

const { Title, Text } = Typography;

interface AuditLog {
  id: string;
  action: string;
  actorEmail: string;
  entityType: string;
  entityId: string;
  details?: string;
  createdAt: string;
}

const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');
  const [page] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = { page: String(page), size: '50' };
        if (entityFilter !== 'all') params.entityType = entityFilter;
        const res = await api.get('/loans/audit-logs', { params });
        setLogs(res.data?.data?.items ?? res.data?.data ?? []);
      } catch {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [entityFilter, page]);

  const filtered = logs.filter((log) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      log.action?.toLowerCase().includes(s) ||
      log.actorEmail?.toLowerCase().includes(s) ||
      log.entityId?.toLowerCase().includes(s) ||
      log.details?.toLowerCase().includes(s)
    );
  });

  const getSeverityColor = (action: string) => {
    if (action?.includes('DELETE') || action?.includes('REJECTED')) return 'error';
    if (action?.includes('UPDATE') || action?.includes('STATUS')) return 'warning';
    return 'processing';
  };

  const getIcon = (entityType: string) => {
    switch (entityType) {
      case 'LOAN':   return <FileEdit size={16} className="text-blue-500" />;
      case 'USER':   return <User size={16} className="text-emerald-500" />;
      case 'POLICY': return <ShieldAlert size={16} className="text-red-500" />;
      default:       return <Settings size={16} className="text-slate-500" />;
    }
  };

  const formatTime = (iso: string) => {
    try { return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }); }
    catch { return iso; }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Title level={2} className="m-0 font-bold text-slate-800">System Audit Logs</Title>
          <Text className="text-slate-500">Traceable history of all administrative and operational actions.</Text>
        </div>
        <Space>
          <Select value={entityFilter} onChange={setEntityFilter} className="w-36">
            <Select.Option value="all">All Events</Select.Option>
            <Select.Option value="LOAN">Loan Actions</Select.Option>
            <Select.Option value="USER">User Actions</Select.Option>
            <Select.Option value="POLICY">Policy Changes</Select.Option>
          </Select>
          <Button icon={<Filter size={16} />}>Advanced Filters</Button>
        </Space>
      </div>

      <Card className="shadow-sm border-none overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-white mb-6">
          <Input
            placeholder="Search by action, user, or entity ID..."
            prefix={<Search size={18} className="text-slate-400 mr-2" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md rounded-lg py-2"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Spin size="large" /></div>
        ) : filtered.length === 0 ? (
          <Empty description="No audit logs found" className="py-12" />
        ) : (
          <Timeline
            className="px-6 py-4"
            items={filtered.map((log) => ({
              dot: getIcon(log.entityType),
              children: (
                <div className="flex justify-between items-start pb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Text className="font-bold text-slate-800">{log.action.replace(/_/g, ' ')}</Text>
                      <Tag color={getSeverityColor(log.action)} className="rounded-full text-[10px] uppercase font-bold border-none px-2 py-0">
                        {log.entityType}
                      </Tag>
                    </div>
                    <Text className="text-slate-500 block text-sm">
                      By <span className="font-medium text-blue-600">{log.actorEmail}</span>
                      {log.entityId && <> on <span className="font-medium text-slate-700">{log.entityId.slice(0, 8)}…</span></>}
                    </Text>
                    {log.details && <Text className="text-slate-400 text-xs block mt-0.5">{log.details}</Text>}
                    <Text className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                      <History size={12} /> {formatTime(log.createdAt)}
                    </Text>
                  </div>
                  <Button type="text" icon={<ArrowRight size={16} />} className="text-slate-400 hover:text-blue-600" />
                </div>
              ),
            }))}
          />
        )}
      </Card>
    </div>
  );
};

export default AuditLogViewer;
