import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Modal, Input, Form, Spin, Tooltip, notification,
} from 'antd';
import {
  Search, Send, Plus, Phone, MoreVertical, Check, CheckCheck,
  MessageCircle, Lock, RefreshCw, Paperclip, Smile, ArrowLeft,
  User, Hash, Wifi, WifiOff, ChevronDown,
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

/* ─── Types ─────────────────────────────────────────────────────── */
interface Conversation {
  id: string;
  conversationType: string;
  conversationStatus: string;
  loanApplicationId?: string;
  connectorId?: string;
  createdAt: string;
  updatedAt: string;
  /* UI-only enriched fields */
  _customerName?: string;
  _phone?: string;
  _lastMessage?: string;
  _unread?: number;
}

interface Message {
  id: string;
  messageBody: string;
  senderType: string;
  messageChannel: string;
  deliveryStatus: string;
  createdAt: string;
  conversation?: { id: string };
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function fmtTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now.getTime() - d.getTime()) / 1000;
  if (diff < 86400) return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  if (diff < 172800) return 'Yesterday';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function groupByDate(msgs: Message[]) {
  const groups: { label: string; msgs: Message[] }[] = [];
  msgs.forEach(m => {
    const d   = new Date(m.createdAt);
    const diff = Math.floor((Date.now() - d.getTime()) / 86_400_000);
    const label = diff === 0 ? 'Today' : diff === 1 ? 'Yesterday'
      : d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    const last = groups[groups.length - 1];
    if (last?.label === label) last.msgs.push(m); else groups.push({ label, msgs: [m] });
  });
  return groups;
}

const DELIVERY: Record<string, React.ReactNode> = {
  SENT:               <Check size={13} color="#94a3b8" />,
  SENT_TO_WHATSAPP:   <CheckCheck size={13} color="#34d399" />,
  DELIVERED:          <CheckCheck size={13} color="#34d399" />,
  READ:               <CheckCheck size={13} color="#22d3ee" />,
  FAILED:             <Check size={13} color="#f87171" />,
};

/* ─── Quick templates ────────────────────────────────────────────── */
const TEMPLATES = [
  { label: 'Docs Pending',  body: 'Hello! Your loan application requires additional documents. Kindly submit the pending documents at the earliest to avoid delays.' },
  { label: 'Approved',      body: 'Congratulations! Your loan application has been approved. Disbursement will be processed within 48 hours.' },
  { label: 'Under Review',  body: 'Your loan application is currently under review by our credit team. We will update you within 2 working days.' },
  { label: 'Query Raised',  body: 'We have raised a query on your loan application. Please check your email or contact your nearest branch for details.' },
  { label: 'EMI Reminder',  body: 'Friendly reminder: Your EMI of ₹ is due on the 5th of this month. Please ensure sufficient balance in your account.' },
];

/* ─── Sub-components ─────────────────────────────────────────────── */
const ConvItem: React.FC<{
  conv: Conversation; isActive: boolean; onClick: () => void;
}> = ({ conv, isActive, onClick }) => {
  const initials = (conv._customerName || 'C').slice(0, 2).toUpperCase();
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', padding: '12px 14px',
        background: isActive ? 'rgba(34,197,94,.08)' : 'transparent',
        border: 'none', cursor: 'pointer', transition: 'background 150ms',
        display: 'flex', alignItems: 'center', gap: 11,
        borderBottom: '1px solid rgba(0,0,0,.04)',
      }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = '#f0fdf4'; }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg,#22c55e,#16a34a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: 'white',
        }}>{initials}</div>
        <div style={{
          position: 'absolute', bottom: 1, right: 1, width: 11, height: 11,
          borderRadius: '50%', border: '2px solid white',
          background: conv.conversationStatus === 'ACTIVE' ? '#22c55e' : '#94a3b8',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: isActive ? '#15803d' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>
            {conv._customerName || 'Customer'}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 6 }}>
            {fmtTime(conv.updatedAt)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11.5, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            {conv._lastMessage || (conv.loanApplicationId ? `Loan: ${String(conv.loanApplicationId).slice(0, 8)}…` : 'Start a conversation')}
          </span>
          {(conv._unread ?? 0) > 0 && (
            <span style={{ background: '#22c55e', color: 'white', borderRadius: 100, fontSize: 10, fontWeight: 800, padding: '1px 6px', flexShrink: 0, marginLeft: 6 }}>
              {conv._unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

const MsgBubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const isOut = msg.senderType !== 'CUSTOMER';
  return (
    <div style={{ display: 'flex', justifyContent: isOut ? 'flex-end' : 'flex-start', marginBottom: 4 }}>
      <div style={{ maxWidth: '70%' }}>
        {!isOut && (
          <div style={{ fontSize: 10, fontWeight: 700, color: '#22c55e', marginBottom: 3, marginLeft: 2 }}>Customer</div>
        )}
        <div style={{
          padding: '9px 13px',
          borderRadius: isOut ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isOut ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'white',
          border: isOut ? 'none' : '1px solid #e2e8f0',
          boxShadow: isOut ? '0 4px 10px rgba(22,163,74,.2)' : '0 1px 3px rgba(0,0,0,.04)',
        }}>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: isOut ? 'white' : 'var(--text-primary)', fontWeight: 450 }}>
            {msg.messageBody}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3, justifyContent: isOut ? 'flex-end' : 'flex-start', paddingRight: isOut ? 3 : 0, paddingLeft: isOut ? 0 : 3 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{fmtTime(msg.createdAt)}</span>
          {isOut && (DELIVERY[msg.deliveryStatus] || DELIVERY.SENT)}
          {isOut && msg.messageChannel === 'WHATSAPP' && (
            <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e', background: '#f0fdf4', borderRadius: 100, padding: '0 4px' }}>WA</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Main page ──────────────────────────────────────────────────── */
const WhatsAppPage: React.FC = () => {
  const [conversations,  setConversations]  = useState<Conversation[]>([]);
  const [messages,       setMessages]       = useState<Message[]>([]);
  const [activeConvId,   setActiveConvId]   = useState<string | null>(null);
  const [inputText,      setInputText]      = useState('');
  const [searchQ,        setSearchQ]        = useState('');
  const [loadingConvs,   setLoadingConvs]   = useState(true);
  const [loadingMsgs,    setLoadingMsgs]    = useState(false);
  const [sending,        setSending]        = useState(false);
  const [showNewModal,   setShowNewModal]   = useState(false);
  const [showChat,       setShowChat]       = useState(false);
  const [wsConnected,    setWsConnected]    = useState(false);
  const [form]           = Form.useForm();
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLTextAreaElement>(null);
  const wsRef       = useRef<WebSocket | null>(null);

  const activeConv = conversations.find(c => c.id === activeConvId) ?? null;

  /* ── Load conversations ── */
  const loadConversations = useCallback(async () => {
    setLoadingConvs(true);
    try {
      const res = await apiClient.get('/messaging/conversations', { params: { type: 'EXTERNAL_CUSTOMER_OPS' } });
      const list: Conversation[] = (res.data?.data || res.data || []).map((c: Conversation) => ({
        ...c,
        _customerName: c._customerName || `Customer ${String(c.id).slice(0, 6).toUpperCase()}`,
      }));
      setConversations(list);
    } catch {
      setConversations([]);
    } finally {
      setLoadingConvs(false);
    }
  }, []);

  useEffect(() => { loadConversations(); }, [loadConversations]);

  /* ── Load messages when conversation opens ── */
  useEffect(() => {
    if (!activeConvId) return;
    setLoadingMsgs(true);
    setMessages([]);
    apiClient.get(`/messaging/conversations/${activeConvId}/messages`)
      .then(res => {
        const list: Message[] = res.data?.data || res.data || [];
        setMessages(list);
        const last = list[list.length - 1];
        if (last) {
          setConversations(prev => prev.map(c =>
            c.id === activeConvId ? { ...c, _lastMessage: last.messageBody, _unread: 0 } : c
          ));
        }
      })
      .catch(() => setMessages([]))
      .finally(() => setLoadingMsgs(false));
  }, [activeConvId]);

  /* ── WebSocket for real-time inbound messages ── */
  useEffect(() => {
    if (!activeConvId) return;
    const ws = new WebSocket(`ws://${window.location.hostname}:8087/ws-messaging/websocket`);
    wsRef.current = ws;
    ws.onopen = () => {
      setWsConnected(true);
      ws.send(JSON.stringify({ command: 'SUBSCRIBE', destination: `/topic/conversations/${activeConvId}` }));
    };
    ws.onmessage = (event) => {
      try {
        const msg: Message = JSON.parse(event.data);
        if (msg.id && msg.messageBody) {
          setMessages(prev => [...prev.filter(m => m.id !== msg.id), msg]);
          setConversations(prev => prev.map(c =>
            c.id === activeConvId ? { ...c, _lastMessage: msg.messageBody } : c
          ));
        }
      } catch { /* ignore parse errors */ }
    };
    ws.onclose = () => setWsConnected(false);
    return () => { ws.close(); wsRef.current = null; };
  }, [activeConvId]);

  /* ── Scroll to bottom on new messages ── */
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, loadingMsgs]);

  /* ── Send message ── */
  const handleSend = useCallback(async () => {
    if (!inputText.trim() || !activeConvId || sending) return;
    const body = inputText.trim();
    setInputText('');
    setSending(true);
    try {
      const res = await apiClient.post('/messaging/send', {
        conversationId: activeConvId,
        body,
        channel: 'WHATSAPP',
      });
      const msg: Message = res.data?.data || res.data;
      setMessages(prev => [...prev, msg]);
      setConversations(prev => prev.map(c =>
        c.id === activeConvId ? { ...c, _lastMessage: body } : c
      ));
    } catch {
      notification.error({ message: 'Failed to send message', description: 'Please check your connection and try again.', duration: 3 });
      setInputText(body);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }, [inputText, activeConvId, sending]);

  /* ── Create new conversation ── */
  const handleCreateConversation = useCallback(async (values: { customerName: string; phone: string; loanRef?: string }) => {
    try {
      const res = await apiClient.post('/messaging/conversations', {
        type: 'EXTERNAL_CUSTOMER_OPS',
        ...(values.loanRef ? { loanApplicationId: values.loanRef } : {}),
      });
      const conv: Conversation = {
        ...(res.data?.data || res.data),
        _customerName: values.customerName,
        _phone: values.phone,
      };
      setConversations(prev => [conv, ...prev]);
      setActiveConvId(conv.id);
      setShowChat(true);
      setShowNewModal(false);
      form.resetFields();
    } catch {
      notification.error({ message: 'Failed to create conversation', duration: 3 });
    }
  }, [form]);

  const handleRoomClick = (id: string) => {
    setActiveConvId(id);
    setShowChat(true);
  };

  const filtered = conversations.filter(c =>
    (c._customerName || '').toLowerCase().includes(searchQ.toLowerCase()) ||
    (c.loanApplicationId || '').toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <>
      <style>{`
        @keyframes waDot {
          0%,60%,100% { transform:translateY(0);opacity:.35 }
          30% { transform:translateY(-4px);opacity:1 }
        }
        .wa-shell { display:flex; height:calc(100vh - 210px); min-height:520px; }
        @media (max-width:768px) {
          .wa-shell { height:calc(100dvh - 140px); min-height:0; border-radius:16px !important; }
          .wa-sidebar { width:100% !important; }
          .wa-chat   { width:100% !important; }
          .wa-sidebar-hidden { display:none !important; }
          .wa-chat-hidden    { display:none !important; }
          .wa-back-btn       { display:flex !important; }
        }
      `}</style>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Operations · Customer Communication
            </div>
            <h1 style={{ fontSize: 'clamp(1.25rem,4vw,1.6rem)', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
              WhatsApp
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {wsConnected && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', borderRadius: 100, padding: '4px 12px' }}>
                <Wifi size={11} color="#22c55e" />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Live</span>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            )}
            {!wsConnected && activeConvId && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(148,163,184,.08)', border: '1px solid rgba(148,163,184,.2)', borderRadius: 100, padding: '4px 12px' }}>
                <WifiOff size={11} color="#94a3b8" />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Polling</span>
              </div>
            )}
            <button
              onClick={() => setShowNewModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,.3)', transition: 'all 200ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 18px rgba(34,197,94,.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(34,197,94,.3)'; }}
            >
              <Plus size={16} /> New Chat
            </button>
          </div>
        </div>
      </div>

      {/* ── Shell ── */}
      <div
        className="wa-shell"
        style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--surface-3)', boxShadow: '0 4px 24px rgba(0,0,0,.06)', background: 'white' }}
      >

        {/* ─── Sidebar ─── */}
        <div
          className={`wa-sidebar${showChat ? ' wa-sidebar-hidden' : ''}`}
          style={{ width: 320, flexShrink: 0, borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', background: 'white' }}
        >
          {/* Sidebar header */}
          <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid #f1f5f9', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={15} color="white" />
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Chats
                </h2>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Tooltip title="Refresh">
                  <button onClick={loadConversations} style={{ width: 30, height: 30, borderRadius: 9, border: '1px solid var(--surface-3)', background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <RefreshCw size={13} />
                  </button>
                </Tooltip>
                <Tooltip title="New chat">
                  <button onClick={() => setShowNewModal(true)} style={{ width: 30, height: 30, borderRadius: 9, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Plus size={14} color="white" />
                  </button>
                </Tooltip>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#f8fafc', borderRadius: 10, padding: '7px 10px', border: '1px solid #e2e8f0' }}>
              <Search size={13} color="var(--text-muted)" />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search by name or loan ID…"
                style={{ border: 'none', background: 'transparent', flex: 1, fontSize: 12.5, color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loadingConvs ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <MessageCircle size={24} color="white" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>No chats yet</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                  Start a new WhatsApp conversation with a customer.
                </div>
                <button
                  onClick={() => setShowNewModal(true)}
                  style={{ padding: '8px 18px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                >
                  + New Chat
                </button>
              </div>
            ) : (
              filtered.map(c => (
                <ConvItem key={c.id} conv={c} isActive={activeConvId === c.id} onClick={() => handleRoomClick(c.id)} />
              ))
            )}
          </div>

          {/* Bottom info strip */}
          <div style={{ padding: '10px 14px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={11} color="#94a3b8" />
            <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 500 }}>Messages sent via WhatsApp Business API</span>
          </div>
        </div>

        {/* ─── Chat panel ─── */}
        {activeConv ? (
          <div
            className={`wa-chat${!showChat ? ' wa-chat-hidden' : ''}`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f0fdf4', minWidth: 0 }}
          >
            {/* Chat header */}
            <div style={{ padding: '12px 18px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 6px rgba(0,0,0,.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  className="wa-back-btn"
                  onClick={() => setShowChat(false)}
                  style={{ display: 'none', width: 32, height: 32, borderRadius: 9, border: '1px solid var(--surface-3)', background: 'var(--surface-1)', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', flexShrink: 0 }}
                >
                  <ArrowLeft size={15} />
                </button>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: 'white', flexShrink: 0 }}>
                  {(activeConv._customerName || 'C').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
                    {activeConv._customerName || 'Customer'}
                  </div>
                  <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                    WhatsApp · {activeConv.conversationStatus}
                    {activeConv.loanApplicationId && (
                      <span style={{ marginLeft: 6, color: 'var(--text-muted)', fontWeight: 500 }}>
                        · Loan {String(activeConv.loanApplicationId).slice(0, 8)}…
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[{ icon: <Phone size={14} />, tip: 'Call customer' }, { icon: <MoreVertical size={14} />, tip: 'Options' }].map(({ icon, tip }) => (
                  <Tooltip key={tip} title={tip}>
                    <button style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 150ms' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#22c55e'; (e.currentTarget as HTMLElement).style.color = '#22c55e'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                    >{icon}</button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Encryption notice */}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.15)', borderRadius: 100, padding: '5px 14px', fontSize: 11, color: '#16a34a', fontWeight: 600 }}>
                  <Lock size={10} /> Messages are sent via WhatsApp Business API
                </span>
              </div>

              {loadingMsgs ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
              ) : messages.length === 0 ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.6, paddingBottom: 40 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,.1)', border: '2px solid rgba(34,197,94,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <MessageCircle size={24} color="#22c55e" strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>No messages yet</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 220, lineHeight: 1.5 }}>
                    Send the first message — it will be delivered to the customer on WhatsApp.
                  </div>
                </div>
              ) : (
                groupByDate(messages).map(group => (
                  <div key={group.label}>
                    <div style={{ textAlign: 'center', margin: '14px 0' }}>
                      <span style={{ background: 'rgba(34,197,94,.12)', borderRadius: 100, padding: '3px 14px', fontSize: 10.5, color: '#16a34a', fontWeight: 700 }}>{group.label}</span>
                    </div>
                    {group.msgs.map(m => <MsgBubble key={m.id} msg={m} />)}
                  </div>
                ))
              )}
              <div ref={messagesEnd} />
            </div>

            {/* Input area */}
            <div style={{ padding: '10px 12px 12px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
              {/* Templates */}
              <div style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                {TEMPLATES.map(t => (
                  <button
                    key={t.label}
                    onClick={() => setInputText(t.body)}
                    style={{ padding: '3px 10px', borderRadius: 100, border: '1px solid #d1fae5', background: '#f0fdf4', fontSize: 11, fontWeight: 600, color: '#16a34a', cursor: 'pointer', transition: 'all 150ms', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#dcfce7'; el.style.borderColor = '#22c55e'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#f0fdf4'; el.style.borderColor = '#d1fae5'; }}
                  >{t.label}</button>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 4 }}>
                  <ChevronDown size={11} color="#94a3b8" />
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Templates</span>
                </div>
              </div>

              {/* Input box */}
              <div
                style={{ display: 'flex', alignItems: 'flex-end', gap: 6, background: '#f8fafc', borderRadius: 16, border: '1.5px solid #e2e8f0', padding: '8px 10px 8px 12px', transition: 'border-color 200ms' }}
                onFocusCapture={e => (e.currentTarget.style.borderColor = '#22c55e')}
                onBlurCapture={e  => (e.currentTarget.style.borderColor = '#e2e8f0')}
              >
                {([<Paperclip size={14} />, <Smile size={14} />] as React.ReactNode[]).map((icon, i) => (
                  <button key={i} style={{ width: 26, height: 26, border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 7, transition: 'all 150ms', flexShrink: 0 }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#22c55e'; el.style.background = '#f0fdf4'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.background = 'none'; }}
                  >{icon}</button>
                ))}
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type a message to send via WhatsApp…"
                  rows={1}
                  style={{ flex: 1, border: 'none', background: 'transparent', resize: 'none', fontSize: 13.5, color: 'var(--text-primary)', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, maxHeight: 96, overflowY: 'auto' }}
                  onInput={e => { const el = e.currentTarget; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 96) + 'px'; }}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || sending}
                  style={{ width: 36, height: 36, borderRadius: 11, border: 'none', background: inputText.trim() && !sending ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() && !sending ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all 200ms', boxShadow: inputText.trim() ? '0 4px 10px rgba(34,197,94,.3)' : 'none' }}
                >
                  {sending ? <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> : <Send size={15} color={inputText.trim() ? 'white' : '#94a3b8'} />}
                </button>
              </div>

              <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                <Lock size={9} color="var(--text-muted)" />
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
                  Delivered via WhatsApp Business · End-to-end encrypted
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`wa-chat${!showChat ? ' wa-chat-hidden' : ''}`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4', gap: 14 }}
          >
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(34,197,94,.25)' }}>
              <MessageCircle size={32} color="white" strokeWidth={1.5} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 6 }}>WhatsApp</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, maxWidth: 260, lineHeight: 1.6 }}>
                Select a conversation or start a new chat to communicate with customers via WhatsApp.
              </div>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              style={{ marginTop: 4, padding: '10px 24px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,.3)' }}
            >
              + Start New Chat
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
              <Lock size={10} color="#94a3b8" />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>Messages sent via WhatsApp Business API</span>
            </div>
          </div>
        )}
      </div>

      {/* ── New Conversation Modal ── */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={16} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>New WhatsApp Chat</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>Start a conversation with a customer</div>
            </div>
          </div>
        }
        open={showNewModal}
        onCancel={() => { setShowNewModal(false); form.resetFields(); }}
        footer={null}
        width={440}
        styles={{ body: { paddingTop: 20 } }}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateConversation}>
          <Form.Item name="customerName" label="Customer Name" rules={[{ required: true, message: 'Enter customer name' }]}>
            <Input prefix={<User size={14} color="#94a3b8" />} placeholder="e.g. Rahul Sharma" size="large" style={{ borderRadius: 10 }} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="WhatsApp Number"
            rules={[
              { required: true, message: 'Enter WhatsApp number' },
              { pattern: /^\+?[1-9]\d{9,14}$/, message: 'Enter a valid number with country code (e.g. +919876543210)' },
            ]}
          >
            <Input prefix={<Phone size={14} color="#94a3b8" />} placeholder="+919876543210" size="large" style={{ borderRadius: 10 }} />
          </Form.Item>
          <Form.Item name="loanRef" label="Loan Application ID (optional)">
            <Input prefix={<Hash size={14} color="#94a3b8" />} placeholder="e.g. APP-99218" size="large" style={{ borderRadius: 10 }} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button type="button" onClick={() => { setShowNewModal(false); form.resetFields(); }} style={{ flex: 1, height: 44, borderRadius: 11, border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', color: 'var(--text-secondary)' }}>
              Cancel
            </button>
            <button type="submit" style={{ flex: 1, height: 44, borderRadius: 11, border: 'none', background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: 'white', fontWeight: 700, fontSize: 13.5, cursor: 'pointer', boxShadow: '0 4px 12px rgba(34,197,94,.3)' }}>
              Start Chat
            </button>
          </div>
        </Form>
      </Modal>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
};

export default WhatsAppPage;
