import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, Typography, Badge } from 'antd';
import { Send, CheckCheck, Paperclip, MoreVertical, Search, Phone, Info, Smile, AtSign } from 'lucide-react';
import { useWebSocket } from '../../../hooks/useWebSocket';

const { Text, Title } = Typography;

interface Message {
  id: string;
  body: string;
  senderType: 'OPERATIONS' | 'CONNECTOR';
  timestamp: string;
}

interface Props {
  conversationId: string;
  defaultChannel?: 'INTERNAL' | 'WHATSAPP';
  contactName?: string;
}

const MessagingPanel: React.FC<Props> = ({ conversationId, defaultChannel = 'WHATSAPP', contactName = 'Arjun Mehta' }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', body: 'Hi, could you please provide the missing salary slip for case verification?', senderType: 'OPERATIONS', timestamp: '10:00 AM' },
    { id: '2', body: 'Sure, I will upload it in 5 mins.', senderType: 'CONNECTOR', timestamp: '10:05 AM' },
    { id: '3', body: 'Thank you! Please also attach the last 3 months bank statement.', senderType: 'OPERATIONS', timestamp: '10:07 AM' },
    { id: '4', body: 'Uploading everything now.', senderType: 'CONNECTOR', timestamp: '10:11 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { lastMessage, isConnected, sendMessage } = useWebSocket(
    `${window.location.origin}/ws-messaging`,
    `/topic/conversations/${conversationId}`
  );

  useEffect(() => {
    if (lastMessage) setMessages(prev => [...prev, lastMessage]);
  }, [lastMessage]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage('/app/chat.send', { conversationId, body: inputValue, senderType: 'OPERATIONS', channel: defaultChannel });
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      body: inputValue,
      senderType: 'OPERATIONS',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInputValue('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #f1f5f9',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Badge dot status={isConnected ? 'success' : 'error'} offset={[-3, 36]}>
            <Avatar
              size={44}
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', fontWeight: 800, fontSize: 16 }}
            >
              {contactName[0]}
            </Avatar>
          </Badge>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.01em' }}>
              {contactName}
            </Title>
            <Text style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {isConnected ? `Online · ${defaultChannel === 'WHATSAPP' ? 'via WhatsApp' : 'Internal'}` : 'Connecting...'}
            </Text>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button type="text" icon={<Phone size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          <Button type="text" icon={<Search size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          <Button type="text" icon={<Info size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          <Button type="text" icon={<MoreVertical size={17} />} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
        </div>
      </div>

      {/* Date divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px 8px' }}>
        <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
        <Text style={{ fontSize: 10, fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Today</Text>
        <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        }}
      >
        {messages.map((msg) => {
          const isOps = msg.senderType === 'OPERATIONS';
          return (
            <div
              key={msg.id}
              style={{ display: 'flex', justifyContent: isOps ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}
            >
              {!isOps && (
                <Avatar size={28} style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                  {contactName[0]}
                </Avatar>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div
                  style={{
                    padding: '10px 16px',
                    background: isOps ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#ffffff',
                    color: isOps ? '#ffffff' : '#1e293b',
                    borderRadius: isOps ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    border: isOps ? 'none' : '1px solid #f1f5f9',
                    boxShadow: isOps ? '0 4px 14px rgba(79,70,229,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {msg.body}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, padding: '0 4px', justifyContent: isOps ? 'flex-end' : 'flex-start' }}>
                  <Text style={{ fontSize: 10, fontWeight: 600, color: '#cbd5e1' }}>{msg.timestamp}</Text>
                  {isOps && <CheckCheck size={11} color="#a5b4fc" />}
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

      {/* Input */}
      <div style={{ padding: '12px 16px 16px', background: '#ffffff', borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#f8fafc',
            borderRadius: 14,
            border: '1.5px solid #e2e8f0',
            padding: '6px 10px',
          }}
        >
          <Button type="text" icon={<Smile size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            variant="borderless"
            style={{ flex: 1, fontSize: 14, fontWeight: 500, padding: 0, background: 'transparent' }}
          />
          <Button type="text" icon={<Paperclip size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
          <Button type="text" icon={<AtSign size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
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

export default MessagingPanel;
