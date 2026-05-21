import React, { useState } from 'react';
import {
  Typography,
  Button,
  Tag,
  Space,
  Drawer,
  Tabs,
  Timeline,
  Input,
  notification,
  Avatar,
  Table,
  Card,
  Tooltip,
} from 'antd';
import {
  Search,
  CheckCircle2,
  FileText,
  Activity,
  Filter,
  RefreshCw,
  Eye,
  MessageSquare,
  ClipboardCheck,
  TrendingUp,
  ShieldAlert,
  MessageCircle,
  Send,
  Paperclip,
  CheckCheck,
  MoreVertical,
  Phone,
  Info,
  Smile,
  AtSign,
} from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useWebSocket } from '../../../hooks/useWebSocket';

const { Text, Title } = Typography;

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface QueueItem {
  key: string;
  id: string;
  customer: string;
  amount: string;
  status: string;
  sla: string;
  risk: string;
  connector: string;
  phone: string;
}

interface Message {
  id: string;
  body: string;
  senderType: 'OPERATIONS' | 'CONNECTOR';
  timestamp: string;
}

// ─────────────────────────────────────────────
// Inline Chat Panel (professional WhatsApp-style)
// ─────────────────────────────────────────────
const ChatPanel: React.FC<{ item: QueueItem | null }> = ({ item }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', body: 'Hi, could you please provide the missing salary slip for verification?', senderType: 'OPERATIONS', timestamp: '10:00 AM' },
    { id: '2', body: 'Sure, I will upload it within 5 minutes.', senderType: 'CONNECTOR', timestamp: '10:05 AM' },
    { id: '3', body: 'Thank you! Please also include the last 3 months bank statement.', senderType: 'OPERATIONS', timestamp: '10:07 AM' },
    { id: '4', body: 'Uploading all documents now.', senderType: 'CONNECTOR', timestamp: '10:12 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { isConnected, sendMessage } = useWebSocket(
    `${window.location.origin}/ws-messaging`,
    item ? `/topic/conversations/${item.id}` : ''
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, item]);

  const handleSend = () => {
    if (!inputValue.trim() || !item) return;
    sendMessage('/app/chat.send', { conversationId: item.id, body: inputValue, senderType: 'OPERATIONS', channel: 'WHATSAPP' });
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      body: inputValue,
      senderType: 'OPERATIONS',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputValue('');
  };

  if (!item) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-50/50 p-8 text-center">
        <div className="w-24 h-24 rounded-[2rem] bg-white shadow-xl shadow-slate-100 flex items-center justify-center mb-6">
          <MessageCircle size={40} className="text-slate-200" />
        </div>
        <Title level={4} className="m-0 font-black text-slate-300 tracking-tight">No Conversation Selected</Title>
        <Text className="text-slate-300 mt-2 text-sm font-medium">Click a row in the queue to open its chat.</Text>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    DOC_PENDING: '#f97316',
    IN_REVIEW: '#3b82f6',
    QUERY_RAISED: '#ef4444',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div
        className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white"
        style={{ minHeight: 72 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              size={44}
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', fontWeight: 800, fontSize: 16 }}
            >
              {item.customer[0]}
            </Avatar>
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
              style={{ background: isConnected ? '#10b981' : '#94a3b8' }}
            />
          </div>
          <div>
            <Text className="block font-black text-slate-800 text-base leading-tight">{item.customer}</Text>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: isConnected ? '#10b981' : '#94a3b8' }}
              />
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {isConnected ? 'Online · via WhatsApp' : 'Connecting...'}
              </Text>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tag
            style={{
              background: `${statusColors[item.status]}15`,
              color: statusColors[item.status],
              border: 'none',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 10,
              letterSpacing: '0.08em',
            }}
          >
            {item.id}
          </Tag>
          <Tooltip title="Call">
            <Button type="text" icon={<Phone size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10 }} />
          </Tooltip>
          <Tooltip title="Application Info">
            <Button type="text" icon={<Info size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10 }} />
          </Tooltip>
          <Button type="text" icon={<MoreVertical size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10 }} />
        </div>
      </div>

      {/* Date divider */}
      <div className="flex items-center gap-3 px-6 pt-4">
        <div className="flex-1 h-px bg-slate-100" />
        <Text className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Today</Text>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
        style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}
      >
        {messages.map((msg) => {
          const isOps = msg.senderType === 'OPERATIONS';
          return (
            <div key={msg.id} className={`flex ${isOps ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!isOps && (
                <Avatar size={28} style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                  {item.customer[0]}
                </Avatar>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div
                  className="px-4 py-2.5 shadow-sm"
                  style={{
                    background: isOps ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#ffffff',
                    color: isOps ? '#ffffff' : '#1e293b',
                    borderRadius: isOps ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    border: isOps ? 'none' : '1px solid #f1f5f9',
                    boxShadow: isOps ? '0 4px 15px rgba(79,70,229,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <Text style={{ color: 'inherit', fontSize: 14, lineHeight: 1.5, display: 'block' }}>
                    {msg.body}
                  </Text>
                </div>
                <div className={`flex items-center gap-1 mt-1 ${isOps ? 'justify-end' : 'justify-start'} px-1`}>
                  <Text className="text-[10px] font-bold text-slate-300">{msg.timestamp}</Text>
                  {isOps && <CheckCheck size={11} className="text-indigo-300" />}
                </div>
              </div>
              {isOps && (
                <Avatar size={28} style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>
                  OP
                </Avatar>
              )}
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="px-4 pb-4 pt-2 bg-white border-t border-slate-100">
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{
            background: '#f8fafc',
            borderRadius: 16,
            border: '1.5px solid #e2e8f0',
            transition: 'border-color 0.2s',
          }}
          onFocus={() => {}}
        >
          <Button type="text" icon={<Smile size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, flexShrink: 0 }} />
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            variant="borderless"
            style={{ flex: 1, fontSize: 14, fontWeight: 500, padding: 0, background: 'transparent' }}
          />
          <Button type="text" icon={<Paperclip size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, flexShrink: 0 }} />
          <Button type="text" icon={<AtSign size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, flexShrink: 0 }} />
          <Button
            type="primary"
            icon={<Send size={15} />}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              background: 'linear-gradient(135deg, #4f46e5, #6366f1)',
              border: 'none',
              borderRadius: 10,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Operations Dashboard
// ─────────────────────────────────────────────
const OperationsDashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);
  const [drawerItem, setDrawerItem] = useState<QueueItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const rowData: QueueItem[] = [
    { key: '1', id: 'APP-99218', customer: 'Arjun Mehta',  amount: '₹10,00,000', status: 'DOC_PENDING',  sla: '2h 15m', risk: 'LOW',    connector: 'Rahul Sunil',  phone: '+91 98765 43210' },
    { key: '2', id: 'APP-99219', customer: 'Saira Bano',   amount: '₹5,50,000',  status: 'IN_REVIEW',    sla: '45m',    risk: 'MEDIUM', connector: 'Deepak Raj',   phone: '+91 98765 43211' },
    { key: '3', id: 'APP-99220', customer: 'Rahul Das',    amount: '₹12,00,000', status: 'QUERY_RAISED', sla: '5h 10m', risk: 'LOW',    connector: 'Sanjay Dutt',  phone: '+91 98765 43212' },
    { key: '4', id: 'APP-99221', customer: 'John Doe',     amount: '₹2,00,000',  status: 'DOC_PENDING',  sla: '15m',    risk: 'HIGH',   connector: 'Vikram Batra', phone: '+91 98765 43213' },
  ];

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    DOC_PENDING:  { color: '#c2410c', bg: '#fff7ed', label: 'Docs Pending' },
    IN_REVIEW:    { color: '#1d4ed8', bg: '#eff6ff', label: 'In Review' },
    QUERY_RAISED: { color: '#b91c1c', bg: '#fef2f2', label: 'Query Raised' },
  };

  const riskConfig: Record<string, { color: string; bg: string }> = {
    LOW:    { color: '#059669', bg: '#ecfdf5' },
    MEDIUM: { color: '#d97706', bg: '#fffbeb' },
    HIGH:   { color: '#dc2626', bg: '#fef2f2' },
  };

  const columns = [
    {
      title: 'APPLICATION',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => (
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#4f46e5', fontSize: 13 }}>
          {text}
        </span>
      ),
    },
    {
      title: 'APPLICANT',
      dataIndex: 'customer',
      key: 'customer',
      render: (text: string) => (
        <Space size={10}>
          <Avatar size={32} style={{ background: '#eff6ff', color: '#4f46e5', fontWeight: 800, fontSize: 12 }}>{text[0]}</Avatar>
          <Text style={{ fontWeight: 700, color: '#1e293b' }}>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => <Text style={{ fontWeight: 900, color: '#0f172a', fontFamily: 'JetBrains Mono, monospace' }}>{text}</Text>,
    },
    {
      title: 'STAGE',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const s = statusConfig[status] || statusConfig.IN_REVIEW;
        return (
          <span
            style={{
              background: s.bg, color: s.color, border: 'none', borderRadius: 999,
              fontWeight: 800, fontSize: 10, letterSpacing: '0.08em', padding: '4px 12px',
              textTransform: 'uppercase',
            }}
          >
            {s.label}
          </span>
        );
      },
    },
    {
      title: 'RISK',
      dataIndex: 'risk',
      key: 'risk',
      render: (risk: string) => {
        const r = riskConfig[risk] || riskConfig.LOW;
        return (
          <span
            style={{
              background: r.bg, color: r.color, borderRadius: 999,
              fontWeight: 800, fontSize: 10, letterSpacing: '0.08em', padding: '4px 10px',
              textTransform: 'uppercase',
            }}
          >
            {risk}
          </span>
        );
      },
    },
    {
      title: 'SLA',
      dataIndex: 'sla',
      key: 'sla',
      render: (text: string) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 12, color: '#ef4444' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          {text}
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      render: (_: any, record: QueueItem) => (
        <Space size={4}>
          <Tooltip title="Open Chat">
            <Button
              type="text"
              icon={<MessageCircle size={16} />}
              onClick={(e) => { e.stopPropagation(); setSelectedItem(record); }}
              style={{
                color: selectedItem?.key === record.key ? '#4f46e5' : '#94a3b8',
                background: selectedItem?.key === record.key ? '#eef2ff' : 'transparent',
                width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            />
          </Tooltip>
          <Tooltip title="Review File">
            <Button
              type="text"
              icon={<Eye size={16} />}
              onClick={(e) => { e.stopPropagation(); setDrawerItem(record); setIsDrawerOpen(true); }}
              style={{ color: '#94a3b8', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleApprove = () => {
    notification.success({
      message: 'Application Approved',
      description: 'The loan application has been moved to the disbursement queue.',
      style: { borderRadius: 16, border: '1px solid #d1fae5' },
    });
    setIsDrawerOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: 'calc(100vh - 152px)' }}>
      {/* ── Top KPI Bar ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: 20,
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: 20,
          padding: '20px 28px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          flexShrink: 0,
        }}
      >
        {/* Title block */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={20} color="#4f46e5" />
            </div>
            <Text style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Operations · Live Queue
            </Text>
          </div>
          <Title level={3} style={{ margin: 0, fontWeight: 900, letterSpacing: '-0.03em', color: '#0f172a' }}>
            Queue Intelligence
          </Title>
        </div>

        {/* KPI: SLA */}
        <div style={{ background: '#fef2f2', borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={18} color="#ef4444" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: '#dc2626', lineHeight: 1 }}>04</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SLA Breaches</Text>
          </div>
        </div>

        {/* KPI: Efficiency */}
        <div style={{ background: '#ecfdf5', borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={18} color="#10b981" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: '#059669', lineHeight: 1 }}>84%</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Efficiency</Text>
          </div>
        </div>

        {/* KPI: TAT */}
        <div style={{ background: '#eff6ff', borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardCheck size={18} color="#3b82f6" />
          </div>
          <div>
            <Text style={{ display: 'block', fontWeight: 900, fontSize: 20, color: '#2563eb', lineHeight: 1 }}>2.4h</Text>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Avg TAT</Text>
          </div>
        </div>
      </div>

      {/* ── Main Split Panel ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 20, flex: 1, minHeight: 0 }}>

        {/* LEFT: Queue Table */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Table toolbar */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid #f8fafc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: 6, background: '#f8fafc', padding: 4, borderRadius: 12 }}>
              {['Active Queue', 'Pending', 'Resolved'].map((t, i) => (
                <button
                  key={t}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: i === 0 ? '#4f46e5' : 'transparent',
                    color: i === 0 ? '#fff' : '#94a3b8',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <Space size={8}>
              <Input
                placeholder="Search..."
                prefix={<Search size={14} style={{ color: '#cbd5e1' }} />}
                style={{ width: 200, borderRadius: 10, border: '1px solid #f1f5f9', background: '#f8fafc', height: 36, fontSize: 13 }}
              />
              <Button
                icon={<Filter size={15} />}
                style={{ height: 36, borderRadius: 10, border: '1px solid #f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
              />
              <Button
                icon={<RefreshCw size={15} />}
                style={{ height: 36, borderRadius: 10, border: '1px solid #f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
              />
            </Space>
          </div>

          {/* Table */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <Table
              columns={columns}
              dataSource={rowData}
              pagination={false}
              rowKey="key"
              onRow={(record) => ({
                onClick: () => setSelectedItem(record),
                style: {
                  cursor: 'pointer',
                  background: selectedItem?.key === record.key ? '#eef2ff' : 'transparent',
                  transition: 'background 0.2s',
                },
              })}
              className="ops-queue-table"
            />
          </div>
        </div>

        {/* RIGHT: Chat Panel */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Chat panel header tab */}
          <div
            style={{
              padding: '14px 20px',
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexShrink: 0,
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={14} color="#4f46e5" />
            </div>
            <Text style={{ fontWeight: 800, color: '#1e293b', fontSize: 13, letterSpacing: '-0.01em' }}>Case Chat</Text>
            {selectedItem && (
              <span
                style={{
                  marginLeft: 'auto', background: '#eef2ff', color: '#4f46e5',
                  borderRadius: 999, padding: '2px 10px', fontSize: 10, fontWeight: 800, letterSpacing: '0.06em',
                }}
              >
                {selectedItem.id}
              </span>
            )}
          </div>

          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <ChatPanel item={selectedItem} />
          </div>
        </div>
      </div>

      {/* ── Review Drawer ── */}
      <Drawer
        title={null}
        placement="right"
        width={640}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        styles={{ body: { padding: 0 } }}
        style={{ borderRadius: '24px 0 0 24px' }}
      >
        {drawerItem && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f8fafc' }}>
            {/* Drawer Header */}
            <div style={{ background: '#fff', padding: '32px 36px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ background: '#eef2ff', color: '#4f46e5', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Workflow Review
                    </span>
                    <span style={{ color: '#cbd5e1', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {drawerItem.status}
                    </span>
                  </div>
                  <Title level={2} style={{ margin: 0, fontWeight: 900, letterSpacing: '-0.04em', color: '#0f172a', fontFamily: 'JetBrains Mono, monospace' }}>
                    {drawerItem.id}
                  </Title>
                </div>
                <Avatar size={56} style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', fontWeight: 900, fontSize: 22, boxShadow: '0 8px 20px rgba(79,70,229,0.3)' }}>
                  {drawerItem.customer[0]}
                </Avatar>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
                {[
                  { label: 'Applicant', value: drawerItem.customer },
                  { label: 'Connector', value: drawerItem.connector },
                  { label: 'SLA Aging', value: drawerItem.sla, color: '#ef4444' },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <Text style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                      {label}
                    </Text>
                    <Text style={{ fontWeight: 700, color: color || '#1e293b' }}>{value}</Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Content */}
            <div style={{ flex: 1, padding: '28px 36px', overflowY: 'auto' }}>
              <Tabs
                defaultActiveKey="1"
                className="custom-tabs-premium"
                items={[
                  {
                    key: '1',
                    label: 'File Information',
                    children: (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16 }}>
                        <Card style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                          <Title level={5} style={{ fontWeight: 900, marginBottom: 20, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FileText size={16} color="#4f46e5" /> Financial Summary
                          </Title>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
                            {[
                              { label: 'Requested Amount', value: drawerItem.amount },
                              { label: 'Tenure', value: '60 Months' },
                              { label: 'Income Proof', value: 'Last 3 Months Salary Slips' },
                              { label: 'CIBIL Score', value: '782 (Excellent)', color: '#059669' },
                            ].map(({ label, value, color }) => (
                              <div key={label}>
                                <Text style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                                  {label}
                                </Text>
                                <Text style={{ fontWeight: 700, color: color || '#1e293b' }}>{value}</Text>
                              </div>
                            ))}
                          </div>
                        </Card>

                        <Card style={{ borderRadius: 16, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                          <Title level={5} style={{ fontWeight: 900, marginBottom: 20, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <CheckCircle2 size={16} color="#10b981" /> Compliance Audit
                          </Title>
                          <Timeline
                            items={[
                              { color: 'green', children: <Text style={{ fontWeight: 700, color: '#1e293b' }}>PAN Card Verified (API Integrated)</Text> },
                              { color: 'green', children: <Text style={{ fontWeight: 700, color: '#1e293b' }}>Aadhaar e-KYC Completed</Text> },
                              { color: 'orange', children: <Text style={{ fontWeight: 700, color: '#1e293b' }}>Employment Verification Pending</Text> },
                              { color: 'gray',   children: <Text style={{ fontWeight: 600, color: '#94a3b8' }}>Final Credit Approval</Text> },
                            ]}
                          />
                        </Card>
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    label: 'Documents',
                    children: (
                      <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8', fontWeight: 600 }}>
                        Document Viewer Integrated
                      </div>
                    ),
                  },
                ]}
              />
            </div>

            {/* Drawer Footer */}
            <div style={{ background: '#fff', padding: '24px 36px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 16 }}>
              <Button
                style={{ flex: 1, height: 52, borderRadius: 14, fontWeight: 800, border: '1.5px solid #e2e8f0', color: '#94a3b8', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Raise Query
              </Button>
              <Button
                type="primary"
                onClick={handleApprove}
                style={{ flex: 1, height: 52, borderRadius: 14, fontWeight: 800, background: '#059669', border: 'none', boxShadow: '0 4px 16px rgba(5,150,105,0.3)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}
              >
                Approve Application
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      <style>{`
        .ops-queue-table .ant-table-thead > tr > th {
          background: #fafafa !important;
          font-size: 10px !important;
          font-weight: 800 !important;
          color: #94a3b8 !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          padding: 12px 16px !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .ops-queue-table .ant-table-tbody > tr > td {
          padding: 14px 16px !important;
          border-bottom: 1px solid #f8fafc !important;
          transition: background 0.15s !important;
        }
        .ops-queue-table .ant-table-tbody > tr:hover > td {
          background: #fafafe !important;
        }
        .ops-queue-table .ant-table { border-radius: 0 !important; }
        .custom-tabs-premium .ant-tabs-nav::before { display: none; }
        .custom-tabs-premium .ant-tabs-tab { padding: 10px 0 !important; margin-right: 32px !important; }
        .custom-tabs-premium .ant-tabs-tab-active .ant-tabs-tab-btn { color: #4f46e5 !important; font-weight: 900 !important; }
        .custom-tabs-premium .ant-tabs-ink-bar { background: #4f46e5; height: 3px !important; border-radius: 10px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
};

export default OperationsDashboard;
