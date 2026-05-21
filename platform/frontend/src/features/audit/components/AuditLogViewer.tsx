import React from 'react';
import { Card, Timeline, Typography, Tag, Input, Select, Space, Button } from 'antd';
import { 
  History, 
  Search, 
  Filter, 
  User, 
  ShieldAlert, 
  FileEdit, 
  Settings,
  ArrowRight
} from 'lucide-react';

const { Title, Text } = Typography;

const AuditLogViewer: React.FC = () => {
  const auditLogs = [
    {
      id: 1,
      user: 'Amit Sharma',
      action: 'Updated Bank Policy',
      target: 'HDFC Personal Loan',
      timestamp: '10 mins ago',
      type: 'POLICY',
      severity: 'high'
    },
    {
      id: 2,
      user: 'Priya Verma',
      action: 'Created New Connector',
      target: 'ID: CONNECTOR-842',
      timestamp: '45 mins ago',
      type: 'USER',
      severity: 'medium'
    },
    {
      id: 3,
      user: 'System',
      action: 'Automated Score Evaluation',
      target: 'APP-99218',
      timestamp: '2 hours ago',
      type: 'SYSTEM',
      severity: 'low'
    },
    {
      id: 4,
      user: 'Rahul Das',
      action: 'Changed App Status',
      target: 'APP-44512 -> APPROVED',
      timestamp: '4 hours ago',
      type: 'LOAN',
      severity: 'medium'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      default: return 'processing';
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'POLICY': return <ShieldAlert size={16} className="text-red-500" />;
      case 'USER': return <User size={16} className="text-blue-500" />;
      case 'SYSTEM': return <Settings size={16} className="text-slate-500" />;
      default: return <FileEdit size={16} className="text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <Title level={2} className="m-0 font-bold text-slate-800">System Audit Logs</Title>
          <Text className="text-slate-500">Traceable history of all administrative and operational actions.</Text>
        </div>
        <Space>
          <Select defaultValue="all" className="w-32">
            <Select.Option value="all">All Events</Select.Option>
            <Select.Option value="policy">Policy Changes</Select.Option>
            <Select.Option value="user">User Actions</Select.Option>
          </Select>
          <Button icon={<Filter size={16} />}>Advanced Filters</Button>
        </Space>
      </div>

      <Card className="shadow-sm border-none overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-white mb-6">
          <Input 
            placeholder="Search audit trail..." 
            prefix={<Search size={18} className="text-slate-400 mr-2" />}
            className="max-w-md rounded-lg py-2"
          />
        </div>
        
        <Timeline
          className="px-6 py-4"
          items={auditLogs.map(log => ({
            dot: getIcon(log.type),
            children: (
              <div className="flex justify-between items-start pb-8">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <Text className="font-bold text-slate-800">{log.action}</Text>
                    <Tag color={getSeverityColor(log.severity)} className="rounded-full text-[10px] uppercase font-bold border-none px-2 py-0">
                      {log.severity}
                    </Tag>
                  </div>
                  <Text className="text-slate-500 block text-sm">
                    Initiated by <span className="font-medium text-blue-600">{log.user}</span> on <span className="font-medium text-slate-700">{log.target}</span>
                  </Text>
                  <Text className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                    <History size={12} /> {log.timestamp}
                  </Text>
                </div>
                <Button type="text" icon={<ArrowRight size={16} />} className="text-slate-400 hover:text-blue-600" />
              </div>
            )
          }))}
        />
      </Card>
    </div>
  );
};

export default AuditLogViewer;
