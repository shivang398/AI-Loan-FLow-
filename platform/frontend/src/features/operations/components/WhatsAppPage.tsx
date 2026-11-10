import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input, Spin, Segmented, Button, App, Tooltip } from 'antd';
import { Search, Send, RefreshCw, ArrowLeft, Bot, UserRound, Check, CheckCheck, AlertCircle, MessageCircle, Clock } from 'lucide-react';
import api from '../../../shared/services/apiClient';

const NAVY = '#0B1E3D';
const GOLD = '#C4993A';
const MUTED = '#7A92B5';
const BORDER = '#D4DCE8';

const SERVICE_WINDOW_MS = 24 * 60 * 60 * 1000;

interface Conversation {
  id: string;
  customerName: string | null;
  customerPhone: string;
  botMode: 'BOT' | 'HUMAN';
  leadId: string | null;
  lastInboundAt: string | null;
  updatedAt: string;
  lastMessage: { messageBody: string | null; senderType: string; createdAt: string } | null;
}

interface Message {
  id: string;
  senderType: 'CUSTOMER' | 'BOT' | 'AGENT';
  messageBody: string | null;
  deliveryStatus: string;
  createdAt: string;
}

const leadRef = (id: string) => `RM-${id.slice(0, 8).toUpperCase()}`;
const fmtPhone = (p: string) => (p.startsWith('91') && p.length === 12 ? `+91 ${p.slice(2, 7)} ${p.slice(7)}` : `+${p}`);

function fmtTime(iso: string) {
  const d = new Date(iso);
  const sameDay = d.toDateString() === new Date().toDateString();
  return sameDay
    ? d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

/** WhatsApp-style *bold* → <strong>, keeping line breaks */
function renderBody(text: string) {
  return text.split(/(\*[^*\n]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2
      ? <strong key={i}>{part.slice(1, -1)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>,
  );
}

const DeliveryTick: React.FC<{ status: string }> = ({ status }) => {
  if (status === 'FAILED') return <AlertCircle size={12} color="#DC2626" />;
  if (status === 'READ') return <CheckCheck size={12} color="#2563EB" />;
  if (status === 'DELIVERED') return <CheckCheck size={12} color={MUTED} />;
  return <Check size={12} color={MUTED} />;
};

const ModeTag: React.FC<{ mode: 'BOT' | 'HUMAN' }> = ({ mode }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase', padding: '2px 8px',
    color: mode === 'BOT' ? '#7A5A1A' : '#FFFFFF',
    background: mode === 'BOT' ? 'var(--gold-pale)' : NAVY,
    border: `1px solid ${mode === 'BOT' ? 'rgba(196,153,58,0.35)' : NAVY}`,
  }}>
    {mode === 'BOT' ? <Bot size={10} /> : <UserRound size={10} />}
    {mode === 'BOT' ? 'Bot' : 'Agent'}
  </span>
);

const MessageBubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const inbound = msg.senderType === 'CUSTOMER';
  const agent = msg.senderType === 'AGENT';
  return (
    <div style={{ display: 'flex', justifyContent: inbound ? 'flex-start' : 'flex-end', marginBottom: 8 }}>
      <div style={{ maxWidth: '75%' }}>
        {!inbound && (
          <div style={{ fontSize: 10, fontWeight: 700, color: agent ? NAVY : GOLD, textAlign: 'right', marginBottom: 2, letterSpacing: '0.04em' }}>
            {agent ? 'AGENT' : 'BOT'}
          </div>
        )}
        <div style={{
          padding: '8px 12px', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          background: inbound ? '#FFFFFF' : agent ? NAVY : 'var(--surface-2)',
          color: agent ? '#FFFFFF' : 'var(--text-primary)',
          border: `1px solid ${inbound ? BORDER : agent ? NAVY : BORDER}`,
          borderRadius: 4,
        }}>
          {renderBody(msg.messageBody ?? '')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, justifyContent: inbound ? 'flex-start' : 'flex-end' }}>
          <span style={{ fontSize: 10, color: MUTED }}>{fmtTime(msg.createdAt)}</span>
          {!inbound && <DeliveryTick status={msg.deliveryStatus} />}
        </div>
      </div>
    </div>
  );
};

const WhatsAppPage: React.FC = () => {
  const { message } = App.useApp();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'HUMAN' | 'BOT'>('ALL');
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [switchingMode, setSwitchingMode] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const active = conversations.find(c => c.id === activeId) ?? null;

  const loadConversations = useCallback(async () => {
    try {
      const res = await api.get('/whatsapp/conversations', {
        params: { size: 100, ...(filter !== 'ALL' && { mode: filter }), ...(search.trim() && { search: search.trim() }) },
      });
      setConversations(res.data?.data?.items ?? []);
    } catch {
      // keep the last list on a transient failure
    } finally {
      setLoadingList(false);
    }
  }, [filter, search]);

  const loadMessages = useCallback(async (id: string) => {
    try {
      const res = await api.get(`/whatsapp/conversations/${id}/messages`);
      const data = res.data?.data;
      setMessages(data?.messages ?? []);
      if (data?.conversation) setConversations(prev => prev.map(c => (c.id === id ? { ...c, ...data.conversation } : c)));
    } catch {
      // keep current transcript
    }
  }, []);

  useEffect(() => {
    api.get('/whatsapp/status').then(r => setConfigured(!!r.data?.data?.configured)).catch(() => setConfigured(null));
  }, []);

  useEffect(() => {
    const t = setTimeout(loadConversations, search ? 300 : 0);
    const iv = setInterval(loadConversations, 10_000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [loadConversations, search]);

  useEffect(() => {
    if (!activeId) return;
    setLoadingMsgs(true);
    setMessages([]);
    loadMessages(activeId).finally(() => setLoadingMsgs(false));
    const iv = setInterval(() => loadMessages(activeId), 4_000);
    return () => clearInterval(iv);
  }, [activeId, loadMessages]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [messages.length]);

  const windowOpen = !!active?.lastInboundAt && Date.now() - new Date(active.lastInboundAt).getTime() < SERVICE_WINDOW_MS;

  const send = async () => {
    const body = draft.trim();
    if (!body || !activeId || sending) return;
    setSending(true);
    try {
      await api.post(`/whatsapp/conversations/${activeId}/messages`, { body });
      setDraft('');
      setConversations(prev => prev.map(c => (c.id === activeId ? { ...c, botMode: 'HUMAN' } : c)));
    } catch (err: any) {
      message.error(err?.response?.data?.message ?? 'Message could not be sent');
    } finally {
      setSending(false);
      loadMessages(activeId);
    }
  };

  const switchMode = async (mode: 'BOT' | 'HUMAN') => {
    if (!activeId) return;
    setSwitchingMode(true);
    try {
      await api.put(`/whatsapp/conversations/${activeId}/mode`, { mode });
      setConversations(prev => prev.map(c => (c.id === activeId ? { ...c, botMode: mode } : c)));
      message.success(mode === 'HUMAN' ? 'You are now handling this chat — the bot is paused' : 'Chat handed back to the bot');
    } catch {
      message.error('Could not change mode');
    } finally {
      setSwitchingMode(false);
    }
  };

  const awaitingAgent = conversations.filter(c => c.botMode === 'HUMAN').length;

  return (
    <div>
      <style>{`
        .wa-shell { display: flex; height: calc(100vh - 220px); min-height: 480px; background: #fff; border: 1px solid ${BORDER}; }
        .wa-list  { width: 320px; flex-shrink: 0; border-right: 1px solid ${BORDER}; display: flex; flex-direction: column; min-width: 0; }
        .wa-chat  { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .wa-back  { display: none !important; }
        .wa-item:hover { background: var(--surface-1); }
        @media (max-width: 768px) {
          .wa-shell { height: calc(100dvh - 290px); min-height: 420px; }
          .wa-list  { width: 100%; border-right: none; }
          .wa-shell.has-active .wa-list { display: none; }
          .wa-shell:not(.has-active) .wa-chat { display: none; }
          .wa-back  { display: inline-flex !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 22, color: NAVY, letterSpacing: '-0.02em' }}>WhatsApp Chats</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3 }}>
            Customer chats from the WhatsApp bot{awaitingAgent > 0 && <> · <strong style={{ color: NAVY }}>{awaitingAgent}</strong> with an agent</>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {configured === false && (
            <Tooltip title="WHATSAPP_ACCESS_TOKEN / WHATSAPP_PHONE_NUMBER_ID are not set on the server, so replies are logged but not delivered.">
              <span style={{ fontSize: 11, fontWeight: 700, color: '#B45309', background: '#FFFBEB', border: '1px solid #FCD34D', padding: '3px 10px', letterSpacing: '0.04em' }}>
                DRY-RUN — NOT CONNECTED TO WHATSAPP
              </span>
            </Tooltip>
          )}
          <Segmented
            value={filter}
            onChange={v => setFilter(v as typeof filter)}
            options={[{ label: 'All', value: 'ALL' }, { label: 'With agent', value: 'HUMAN' }, { label: 'Bot', value: 'BOT' }]}
          />
          <Button icon={<RefreshCw size={14} />} onClick={loadConversations}>Refresh</Button>
        </div>
      </div>

      <div className={`wa-shell${active ? ' has-active' : ''}`}>
        {/* Conversation list */}
        <div className="wa-list">
          <div style={{ padding: 12, borderBottom: `1px solid ${BORDER}` }}>
            <Input
              allowClear
              prefix={<Search size={14} color={MUTED} />}
              placeholder="Search name or number"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {loadingList ? (
              <div style={{ padding: 40, textAlign: 'center' }}><Spin /></div>
            ) : conversations.length === 0 ? (
              <div style={{ padding: '48px 24px', textAlign: 'center', color: MUTED, fontSize: 13, lineHeight: 1.6 }}>
                <MessageCircle size={28} color={BORDER} style={{ marginBottom: 10 }} />
                <div>No WhatsApp chats yet.</div>
                <div>Chats appear here when customers message your business number.</div>
              </div>
            ) : conversations.map(c => (
              <button
                key={c.id}
                className="wa-item"
                onClick={() => setActiveId(c.id)}
                style={{
                  width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', padding: '12px 14px',
                  borderBottom: '1px solid var(--surface-2)', display: 'block',
                  background: c.id === activeId ? 'var(--gold-pale)' : undefined,
                  borderLeft: `3px solid ${c.id === activeId ? GOLD : 'transparent'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.customerName || fmtPhone(c.customerPhone)}
                  </span>
                  <span style={{ fontSize: 10, color: MUTED, flexShrink: 0 }}>{fmtTime(c.updatedAt)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: MUTED, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.lastMessage ? `${c.lastMessage.senderType === 'CUSTOMER' ? '' : c.lastMessage.senderType === 'AGENT' ? 'You: ' : 'Bot: '}${(c.lastMessage.messageBody ?? '').replace(/\*/g, '').split('\n')[0]}` : '—'}
                  </span>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    {c.leadId && <span style={{ fontSize: 10, fontWeight: 700, color: '#15803D', background: '#F0FAF4', border: '1px solid #A3D9B8', padding: '1px 6px' }}>LEAD</span>}
                    <ModeTag mode={c.botMode} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="wa-chat">
          {!active ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: MUTED, fontSize: 13, gap: 8, padding: 24, textAlign: 'center' }}>
              <MessageCircle size={36} color={BORDER} />
              Select a chat to see the conversation.
            </div>
          ) : (
            <>
              <div style={{ padding: '12px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <Button className="wa-back" type="text" size="small" icon={<ArrowLeft size={16} />} onClick={() => setActiveId(null)} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: 16, color: NAVY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {active.customerName || fmtPhone(active.customerPhone)}
                    </div>
                    <div style={{ fontSize: 12, color: MUTED, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 2 }}>
                      <span>{fmtPhone(active.customerPhone)}</span>
                      <ModeTag mode={active.botMode} />
                      {active.leadId && <span style={{ color: '#15803D', fontWeight: 600 }}>Lead {leadRef(active.leadId)}</span>}
                    </div>
                  </div>
                </div>
                {active.botMode === 'BOT' ? (
                  <Button type="primary" icon={<UserRound size={14} />} loading={switchingMode} onClick={() => switchMode('HUMAN')}>Take over</Button>
                ) : (
                  <Button icon={<Bot size={14} />} loading={switchingMode} onClick={() => switchMode('BOT')}>Hand back to bot</Button>
                )}
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: 16, background: 'var(--surface-1)' }}>
                {loadingMsgs ? (
                  <div style={{ padding: 40, textAlign: 'center' }}><Spin /></div>
                ) : messages.map(m => <MessageBubble key={m.id} msg={m} />)}
                <div ref={endRef} />
              </div>

              <div style={{ borderTop: `1px solid ${BORDER}`, padding: 12 }}>
                {!windowOpen ? (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: '#7A5A1A', background: 'var(--gold-pale)', border: '1px solid rgba(196,153,58,0.35)', padding: '8px 12px' }}>
                    <Clock size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>More than 24 hours since the customer last wrote, so WhatsApp only allows approved templates. Reach them from <strong>Broadcasts</strong>, or wait for them to message again.</span>
                  </div>
                ) : (
                  <>
                    {active.botMode === 'BOT' && (
                      <div style={{ fontSize: 11, color: MUTED, marginBottom: 6 }}>Sending a message pauses the bot for this chat.</div>
                    )}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                      <Input.TextArea
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        onPressEnter={e => { if (!e.shiftKey) { e.preventDefault(); send(); } }}
                        placeholder="Type a reply…  (Shift+Enter for a new line)"
                        autoSize={{ minRows: 1, maxRows: 5 }}
                        maxLength={4096}
                      />
                      <Button type="primary" icon={<Send size={14} />} loading={sending} disabled={!draft.trim()} onClick={send}>Send</Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPage;
