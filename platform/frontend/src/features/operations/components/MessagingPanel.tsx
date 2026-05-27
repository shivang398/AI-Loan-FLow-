import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Avatar, Typography, Badge, Spin } from 'antd';
import { Send, CheckCheck, Paperclip, MoreVertical, Search, Phone, Info, Smile, AtSign } from 'lucide-react';
import { useWebSocket } from '../../../hooks/useWebSocket';
import api from '../../../shared/services/apiClient';

const { Text, Title } = Typography;

interface Message {
  id: string;
  messageBody?: string;
  body?: string;
  senderType: string;
  createdAt?: string;
  timestamp?: string;
}

interface Props {
  conversationId: string;
  defaultChannel?: 'INTERNAL' | 'WHATSAPP';
  contactName?: string;
}

/* Simulated replies for when no live backend is reachable */
const SIM_REPLIES = [
  'Sure, I will upload it shortly.',
  'Documents have been sent. Please review.',
  'Can you clarify what else is needed?',
  'Client has confirmed — all docs ready by 2 PM.',
  'Uploading everything now.',
  'Thank you for the quick update!',
];

function getBody(msg: Message): string {
  return msg.messageBody ?? msg.body ?? '';
}

function getTime(msg: Message): string {
  const iso = msg.createdAt ?? msg.timestamp;
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

const MessagingPanel: React.FC<Props> = ({
  conversationId,
  defaultChannel = 'INTERNAL',
  contactName = 'Connector',
}) => {
  const [messages, setMessages]     = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading]       = useState(true);
  const [simTyping, setSimTyping]   = useState(false);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const simTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wsEndpoint = `${window.location.origin}/ws-messaging`;
  const { lastMessage, isConnected, sendMessage } = useWebSocket(
    wsEndpoint,
    `/topic/conversations/${conversationId}`,
  );

  /* Load existing messages from API */
  useEffect(() => {
    setLoading(true);
    api.get(`/messaging/conversations/${conversationId}/messages`)
      .then(res => {
        const data: Message[] = res.data?.data ?? [];
        if (data.length > 0) {
          setMessages(data);
        } else {
          /* Seed with demo messages so the panel is never blank */
          setMessages([
            { id: 'demo-1', messageBody: 'Hi, could you please provide the missing salary slip?', senderType: 'OPERATIONS', createdAt: new Date(Date.now() - 600_000).toISOString() },
            { id: 'demo-2', messageBody: 'Sure, will upload it in 5 mins.', senderType: 'CONNECTOR',   createdAt: new Date(Date.now() - 540_000).toISOString() },
            { id: 'demo-3', messageBody: 'Please also attach the last 3 months bank statement.', senderType: 'OPERATIONS', createdAt: new Date(Date.now() - 480_000).toISOString() },
            { id: 'demo-4', messageBody: 'Uploading everything now.', senderType: 'CONNECTOR', createdAt: new Date(Date.now() - 420_000).toISOString() },
          ]);
        }
      })
      .catch(() => {
        /* API unreachable — use demo data */
        setMessages([
          { id: 'demo-1', messageBody: 'Hi, could you please provide the missing salary slip?', senderType: 'OPERATIONS', createdAt: new Date(Date.now() - 600_000).toISOString() },
          { id: 'demo-2', messageBody: 'Sure, will upload it in 5 mins.', senderType: 'CONNECTOR',   createdAt: new Date(Date.now() - 540_000).toISOString() },
          { id: 'demo-3', messageBody: 'Please also attach the last 3 months bank statement.', senderType: 'OPERATIONS', createdAt: new Date(Date.now() - 480_000).toISOString() },
          { id: 'demo-4', messageBody: 'Uploading everything now.', senderType: 'CONNECTOR', createdAt: new Date(Date.now() - 420_000).toISOString() },
        ]);
      })
      .finally(() => setLoading(false));
  }, [conversationId]);

  /* Push new WebSocket messages into local state */
  useEffect(() => {
    if (lastMessage) {
      setMessages(prev => [...prev, lastMessage as Message]);
    }
  }, [lastMessage]);

  /* Auto-scroll */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, simTyping]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const now = new Date().toISOString();
    const optimisticMsg: Message = {
      id: `local-${Date.now()}`,
      messageBody: inputValue.trim(),
      senderType: 'OPERATIONS',
      createdAt: now,
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setInputValue('');

    if (isConnected) {
      /* Send over STOMP to ChatController → MessagingService → broadcast */
      sendMessage('/app/chat.send', {
        conversationId,
        body: inputValue.trim(),
        channel: defaultChannel,
      });
    } else {
      /* Simulate a reply when not connected to backend */
      const td = 700 + Math.random() * 600;
      const rd = td + 1400 + Math.random() * 1800;
      setTimeout(() => setSimTyping(true), td);
      simTimer.current = setTimeout(() => {
        setSimTyping(false);
        const reply: Message = {
          id: `sim-${Date.now()}`,
          messageBody: SIM_REPLIES[Math.floor(Math.random() * SIM_REPLIES.length)],
          senderType: 'CONNECTOR',
          createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, reply]);
      }, rd);
    }
  }, [inputValue, isConnected, sendMessage, conversationId, defaultChannel]);

  /* Cleanup simulation timer */
  useEffect(() => () => { if (simTimer.current) clearTimeout(simTimer.current); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', background: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Badge dot status={isConnected ? 'success' : 'default'} offset={[-3, 36]}>
            <Avatar size={44} style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', fontWeight: 800, fontSize: 16 }}>
              {contactName[0]}
            </Avatar>
          </Badge>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 800, color: '#1e293b', letterSpacing: '-0.01em' }}>
              {contactName}
            </Title>
            <Text style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {isConnected ? `Online · ${defaultChannel === 'WHATSAPP' ? 'via WhatsApp' : 'Internal'}` : 'Simulation mode'}
            </Text>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {[<Phone size={17} />, <Search size={17} />, <Info size={17} />, <MoreVertical size={17} />].map((icon, i) => (
            <Button key={i} type="text" icon={icon} style={{ color: '#94a3b8', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          ))}
        </div>
      </div>

      {/* Date divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px 8px' }}>
        <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
        <Text style={{ fontSize: 10, fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Today</Text>
        <div style={{ flex: 1, height: 1, background: '#f1f5f9' }} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '8px 24px 16px', display: 'flex', flexDirection: 'column', gap: 12, background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin />
          </div>
        ) : (
          messages.map(msg => {
            const isOps = msg.senderType === 'OPERATIONS';
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isOps ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                {!isOps && (
                  <Avatar size={28} style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>
                    {contactName[0]}
                  </Avatar>
                )}
                <div style={{ maxWidth: '72%' }}>
                  <div style={{ padding: '10px 16px', background: isOps ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#ffffff', color: isOps ? '#ffffff' : '#1e293b', borderRadius: isOps ? '18px 18px 4px 18px' : '18px 18px 18px 4px', border: isOps ? 'none' : '1px solid #f1f5f9', boxShadow: isOps ? '0 4px 14px rgba(79,70,229,0.25)' : '0 2px 8px rgba(0,0,0,0.06)', fontSize: 14, lineHeight: 1.5 }}>
                    {getBody(msg)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, padding: '0 4px', justifyContent: isOps ? 'flex-end' : 'flex-start' }}>
                    <Text style={{ fontSize: 10, fontWeight: 600, color: '#cbd5e1' }}>{getTime(msg)}</Text>
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
          })
        )}
        {simTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8 }}>
            <Avatar size={28} style={{ background: '#dbeafe', color: '#2563eb', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{contactName[0]}</Avatar>
            <div style={{ padding: '10px 16px', background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 5 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: 'mpDot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px 16px', background: '#ffffff', borderTop: '1px solid #f1f5f9', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f8fafc', borderRadius: 14, border: '1.5px solid #e2e8f0', padding: '6px 10px', transition: 'border-color 200ms' }}
          onFocus={() => {}} onBlur={() => {}}
        >
          <Button type="text" icon={<Smile size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Type a message…"
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontWeight: 500, background: 'transparent', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}
          />
          <Button type="text" icon={<Paperclip size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
          <Button type="text" icon={<AtSign size={18} />} style={{ color: '#94a3b8', width: 32, height: 32, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} />
          <Button
            type="primary"
            icon={<Send size={15} />}
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', border: 'none', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes mpDot {
          0%,60%,100% { transform:translateY(0);opacity:.4 }
          30% { transform:translateY(-5px);opacity:1 }
        }
      `}</style>
    </div>
  );
};

export default MessagingPanel;
