import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, notification, Select } from 'antd';
import {
  Send, Search, Phone, Video, MoreVertical,
  Paperclip, Smile, Check, CheckCheck,
  Users, MessageSquare, Lock, Wifi, WifiOff, RefreshCw, Radio,
  Smartphone, MessageCircle, ChevronRight, X
} from 'lucide-react';
import { RootState } from '../../../store';
import {
  setActiveRoom, sendMessage, getRoomsForRole,
} from '../../../store/slices/teamMeetingSlice';
import type { TeamRoom, TeamMessage, WSConnectionStatus, UserRole } from '../../../store/slices/teamMeetingSlice';
import { useTeamMeetingWS } from '../../../hooks/useTeamMeetingWS';

/* ─── Shared helpers ─── */
const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Admin', RM: 'RM', OPERATIONS: 'Operations', TEAM_LEADER: 'Team Leader', CONNECTOR: 'Connector',
};
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}
function fmtRoomTime(iso: string) {
  const d = new Date(iso);
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days === 0) return fmtTime(iso);
  if (days === 1) return 'Yesterday';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}
function groupByDate(msgs: TeamMessage[]) {
  const groups: { label: string; messages: TeamMessage[] }[] = [];
  msgs.forEach(m => {
    const d = new Date(m.timestamp);
    const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
    const label = days === 0 ? 'Today' : days === 1 ? 'Yesterday'
      : d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
    const last = groups[groups.length - 1];
    if (last?.label === label) last.messages.push(m); else groups.push({ label, messages: [m] });
  });
  return groups;
}

/* ─── WS badge ─── */
const WSBadge: React.FC<{ status: WSConnectionStatus }> = ({ status }) => {
  const cfg: Record<WSConnectionStatus, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
    CONNECTED:    { color: '#10b981', bg: 'rgba(16,185,129,.08)', icon: <Wifi size={11} />,       label: 'Live' },
    SIMULATED:    { color: '#10b981', bg: 'rgba(16,185,129,.08)', icon: <Radio size={11} />,      label: 'Live' },
    CONNECTING:   { color: '#f59e0b', bg: 'rgba(245,158,11,.08)',  icon: <RefreshCw size={11} />, label: 'Connecting' },
    RECONNECTING: { color: '#f59e0b', bg: 'rgba(245,158,11,.08)',  icon: <RefreshCw size={11} />, label: 'Reconnecting' },
    DISCONNECTED: { color: '#ef4444', bg: 'rgba(239,68,68,.08)',   icon: <WifiOff size={11} />,   label: 'Offline' },
  };
  const c = cfg[status];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: c.bg, borderRadius: 100, padding: '3px 10px', border: `1px solid ${c.color}25` }}>
      <span style={{ color: c.color, display: 'flex' }}>{c.icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: c.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{c.label}</span>
      {(status === 'CONNECTED' || status === 'SIMULATED') && (
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
      )}
    </div>
  );
};

/* ─── Typing dots ─── */
const TypingDots: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
    <div style={{ width: 32 }} />
    <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: 'white', border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 5 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: 'otmDot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  </div>
);

/* ─── Tick ─── */
const Tick: React.FC<{ status: TeamMessage['status'] }> = ({ status }) => {
  if (status === 'READ')      return <CheckCheck size={13} color="#3b82f6" />;
  if (status === 'DELIVERED') return <CheckCheck size={13} color="#94a3b8" />;
  return <Check size={13} color="#94a3b8" />;
};

/* ─── Room list item (Team Meeting tab) ─── */
const TmRoomItem: React.FC<{ room: TeamRoom; isActive: boolean; myRole: UserRole; onClick: () => void }> = ({ room, isActive, myRole, onClick }) => {
  const peer = room.participantA.role === myRole ? room.participantB : room.participantA;
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', padding: '12px 14px', background: isActive ? 'linear-gradient(90deg,rgba(59,130,246,.12),rgba(99,102,241,.06))' : 'transparent', border: 'none', borderRadius: 14, cursor: 'pointer', transition: 'all 200ms', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2, borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent' }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(248,250,252,.9)'; }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${peer.color}22,${peer.color}11)`, border: `1.5px solid ${peer.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: peer.color }}>{peer.initials}</div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', border: '2px solid white', background: room.isOnline ? '#10b981' : '#94a3b8', boxShadow: room.isOnline ? '0 0 5px rgba(16,185,129,.6)' : 'none' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#1d4ed8' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{peer.name}</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0, marginLeft: 6 }}>{fmtRoomTime(room.lastMessageTime)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            <span style={{ color: peer.color, fontWeight: 700, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', marginRight: 4 }}>{ROLE_LABELS[peer.role]}</span>
            {room.lastMessage}
          </span>
          {room.unreadCount > 0 && (
            <span style={{ marginLeft: 6, background: '#3b82f6', color: 'white', borderRadius: 100, fontSize: 10, fontWeight: 800, padding: '1px 7px', flexShrink: 0 }}>{room.unreadCount}</span>
          )}
        </div>
      </div>
    </button>
  );
};

/* ─── Internal msg bubble ─── */
const TmBubble: React.FC<{ msg: TeamMessage; isMine: boolean; showAvatar: boolean }> = ({ msg, isMine, showAvatar }) => {
  if (msg.type === 'SYSTEM') return (
    <div style={{ textAlign: 'center', margin: '14px 0' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(59,130,246,.06)', border: '1px solid rgba(59,130,246,.12)', borderRadius: 100, padding: '5px 14px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
        <Lock size={10} />{msg.body}
      </span>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: isMine ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8, marginBottom: 3 }}>
      <div style={{ width: 30, height: 30, flexShrink: 0 }}>
        {!isMine && showAvatar && (
          <Tooltip title={`${msg.senderName} · ${ROLE_LABELS[msg.senderRole]}`} placement="left">
            <div style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(59,130,246,.1)', border: '1.5px solid rgba(59,130,246,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: '#3b82f6', cursor: 'default' }}>{msg.senderInitials}</div>
          </Tooltip>
        )}
      </div>
      <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
        {showAvatar && !isMine && (
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3, marginLeft: 2 }}>
            {msg.senderName}<span style={{ marginLeft: 5, fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{ROLE_LABELS[msg.senderRole]}</span>
          </span>
        )}
        <div style={{ padding: '10px 14px', borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: isMine ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'white', border: isMine ? 'none' : '1px solid var(--surface-3)', boxShadow: isMine ? '0 4px 12px rgba(37,99,235,.25)' : 'var(--shadow-sm)' }}>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: isMine ? 'white' : 'var(--text-primary)', fontWeight: 500 }}>{msg.body}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, [isMine ? 'marginRight' : 'marginLeft']: 3 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{fmtTime(msg.timestamp)}</span>
          {isMine && <Tick status={msg.status} />}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   WhatsApp Tab
══════════════════════════════════════════════════════════ */
interface WAContact {
  id: string;
  name: string;
  phone: string;
  caseId: string;
  status: string;
  lastMsg: string;
  time: string;
  unread: number;
  isOnline: boolean;
  color: string;
}
interface WAMessage { id: string; body: string; mine: boolean; time: string; status: 'sent' | 'delivered' | 'read' }

const WA_CONTACTS: WAContact[] = [
  { id: 'wa-1', name: 'Arjun Kumar',  phone: '+91 98765 43210', caseId: 'APP-99218', status: 'DOC_PENDING',  lastMsg: 'Will upload salary slip by 2 PM.', time: '10:42 AM', unread: 2,  isOnline: true,  color: '#10b981' },
  { id: 'wa-2', name: 'Saira Bano',   phone: '+91 98765 43211', caseId: 'APP-99219', status: 'IN_REVIEW',    lastMsg: 'Bank statement submitted.',         time: '09:15 AM', unread: 0,  isOnline: true,  color: '#14b8a6' },
  { id: 'wa-3', name: 'Rahul Das',    phone: '+91 98765 43212', caseId: 'APP-99220', status: 'QUERY_RAISED', lastMsg: 'What is the query about?',          time: 'Yesterday', unread: 1, isOnline: false, color: '#ef4444' },
  { id: 'wa-4', name: 'John Doe',     phone: '+91 98765 43213', caseId: 'APP-99221', status: 'DOC_PENDING',  lastMsg: 'Documents being arranged.',         time: 'Yesterday', unread: 0, isOnline: false, color: '#f59e0b' },
];

const WA_MOCK_MSGS: Record<string, WAMessage[]> = {
  'wa-1': [
    { id: '1', body: 'Hi Arjun, your case APP-99218 is under review. Salary slip for last 3 months is still pending.', mine: true,  time: '09:30 AM', status: 'read' },
    { id: '2', body: 'Sorry for the delay! My client had some issues with the bank portal. He will upload by 2 PM today.', mine: false, time: '09:35 AM', status: 'read' },
    { id: '3', body: 'Please ensure it is self-attested. The file cannot move forward without it.', mine: true,  time: '09:40 AM', status: 'read' },
    { id: '4', body: 'Will upload salary slip by 2 PM.', mine: false, time: '10:42 AM', status: 'delivered' },
  ],
  'wa-2': [
    { id: '1', body: 'Hi Saira, APP-99219 is in credit review. All documents received.', mine: true,  time: '08:00 AM', status: 'read' },
    { id: '2', body: 'Thank you! Please let me know once the decision is out.', mine: false, time: '08:05 AM', status: 'read' },
    { id: '3', body: 'Bank statement submitted.', mine: false, time: '09:15 AM', status: 'delivered' },
  ],
  'wa-3': [
    { id: '1', body: 'Hi Rahul, there is a query raised on APP-99220 regarding employment verification.', mine: true,  time: 'Yesterday 4:00 PM', status: 'read' },
    { id: '2', body: 'What is the query about? I will resolve it immediately.', mine: false, time: 'Yesterday 4:10 PM', status: 'delivered' },
  ],
};

const WA_REPLIES = [
  'Understood, I will arrange the documents right away.',
  'Can you please share the exact list of pending items?',
  'I have informed the client. We will update by EOD.',
  'The bank statement shows the required balance. Is there an issue?',
  'Salary certificate has been dispatched. Please check.',
];

const STATUS_CFG: Record<string, { color: string; bg: string; label: string }> = {
  DOC_PENDING:  { color: '#c2410c', bg: '#fff7ed', label: 'Docs Pending' },
  IN_REVIEW:    { color: '#1d4ed8', bg: '#eff6ff', label: 'In Review' },
  QUERY_RAISED: { color: '#b91c1c', bg: '#fef2f2', label: 'Query Raised' },
};

const WhatsAppTab: React.FC = () => {
  const [activeId,    setActiveId]    = useState<string | null>(null);
  const [msgsByChat,  setMsgsByChat]  = useState<Record<string, WAMessage[]>>(WA_MOCK_MSGS);
  const [inputText,   setInputText]   = useState('');
  const [search,      setSearch]      = useState('');
  const [showStatus,  setShowStatus]  = useState(false);
  const [selStatus,   setSelStatus]   = useState('APPROVED');
  const [wsTyping,    setWsTyping]    = useState(false);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeContact = WA_CONTACTS.find(c => c.id === activeId) ?? null;
  const messages = activeId ? (msgsByChat[activeId] ?? []) : [];
  const filtered  = WA_CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length, wsTyping, activeId]);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || !activeId) return;
    const newMsg: WAMessage = { id: `wam-${Date.now()}`, body: inputText.trim(), mine: true, time: fmtTime(new Date().toISOString()), status: 'sent' };
    setMsgsByChat(prev => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }));
    setInputText('');
    inputRef.current?.focus();

    // simulate delivery → read receipts
    setTimeout(() => setMsgsByChat(prev => {
      const msgs = [...(prev[activeId] ?? [])];
      const m = msgs.find(x => x.id === newMsg.id);
      if (m) m.status = 'delivered';
      return { ...prev, [activeId]: msgs };
    }), 1000);

    // simulate peer typing + reply
    const td = 800 + Math.random() * 700;
    const rd = td + 1500 + Math.random() * 2000;
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => { setWsTyping(true); typingTimer.current = null; }, td);
    setTimeout(() => {
      setWsTyping(false);
      const reply: WAMessage = {
        id: `war-${Date.now()}`,
        body: WA_REPLIES[Math.floor(Math.random() * WA_REPLIES.length)],
        mine: false, time: fmtTime(new Date().toISOString()), status: 'delivered',
      };
      setMsgsByChat(prev => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), reply] }));
      // mark our sent msg as read
      setMsgsByChat(prev => {
        const msgs = [...(prev[activeId] ?? [])].map(x => x.id === newMsg.id ? { ...x, status: 'read' as const } : x);
        return { ...prev, [activeId]: msgs };
      });
    }, rd);
  }, [inputText, activeId]);

  const handlePushStatus = () => {
    notification.success({
      message: 'Status sent via WhatsApp',
      description: `Case status "${selStatus}" pushed to ${activeContact?.name} at ${activeContact?.phone}.`,
      style: { borderRadius: 16, border: '1px solid #d1fae5' },
      placement: 'topRight',
    });
    setShowStatus(false);
  };

  const WaTick: React.FC<{ status: string }> = ({ status }) => {
    if (status === 'read')      return <CheckCheck size={13} color="#25d366" />;
    if (status === 'delivered') return <CheckCheck size={13} color="#94a3b8" />;
    return <Check size={13} color="#94a3b8" />;
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Contact list */}
      <div style={{ width: 280, flexShrink: 0, borderRight: '1px solid var(--surface-2)', display: 'flex', flexDirection: 'column', background: '#fafbfc' }}>
        <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid var(--surface-2)', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={15} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)' }}>WhatsApp</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>External Connector Chat</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-1)', borderRadius: 10, padding: '7px 10px', border: '1px solid var(--surface-3)' }}>
            <Search size={13} color="var(--text-muted)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search connectors..." style={{ border: 'none', background: 'transparent', flex: 1, fontSize: 12, color: 'var(--text-primary)', outline: 'none' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {filtered.map(c => {
            const isActive = activeId === c.id;
            const sc = STATUS_CFG[c.status] ?? STATUS_CFG.IN_REVIEW;
            return (
              <button key={c.id} onClick={() => setActiveId(c.id)} style={{ width: '100%', textAlign: 'left', padding: '11px 12px', background: isActive ? 'linear-gradient(90deg,rgba(34,197,94,.1),rgba(16,185,129,.06))' : 'transparent', border: 'none', borderRadius: 12, cursor: 'pointer', transition: 'all 200ms', display: 'flex', alignItems: 'center', gap: 11, marginBottom: 2, borderLeft: isActive ? '3px solid #16a34a' : '3px solid transparent' }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(248,250,252,.9)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c.color}18`, border: `1.5px solid ${c.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: c.color }}>{c.name.slice(0, 2).toUpperCase()}</div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', border: '2px solid white', background: c.isOnline ? '#10b981' : '#94a3b8' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: isActive ? '#15803d' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0, marginLeft: 6 }}>{c.time}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10.5, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{c.lastMsg}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 6 }}>
                      <span style={{ background: sc.bg, color: sc.color, borderRadius: 100, fontSize: 8.5, fontWeight: 800, padding: '1px 6px', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sc.label}</span>
                      {c.unread > 0 && <span style={{ background: '#22c55e', color: 'white', borderRadius: 100, fontSize: 9, fontWeight: 800, padding: '1px 6px' }}>{c.unread}</span>}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      {activeContact ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f0f7f4' }}>
          {/* chat header */}
          <div style={{ padding: '12px 18px', background: 'white', borderBottom: '1px solid #e2f5eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${activeContact.color}18`, border: `1.5px solid ${activeContact.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: activeContact.color }}>
                  {activeContact.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: activeContact.isOnline ? '#10b981' : '#94a3b8', border: '2px solid white' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{activeContact.name}</div>
                <div style={{ fontSize: 11, color: wsTyping ? '#16a34a' : activeContact.isOnline ? '#10b981' : '#94a3b8', fontWeight: 600, transition: 'color 200ms' }}>
                  {wsTyping ? 'Typing...' : activeContact.isOnline ? `Online · ${activeContact.phone}` : activeContact.phone}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: STATUS_CFG[activeContact.status]?.bg ?? '#eff6ff', color: STATUS_CFG[activeContact.status]?.color ?? '#1d4ed8', borderRadius: 100, fontSize: 10, fontWeight: 800, padding: '3px 10px', border: 'none', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>
                {activeContact.caseId}
              </span>
              {[<Phone size={15} />, <MoreVertical size={15} />].map((icon, i) => (
                <button key={i} style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid #d1fae5', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#16a34a', transition: 'all 150ms' }}>
                  {icon}
                </button>
              ))}
              <button
                onClick={() => setShowStatus(true)}
                style={{ padding: '6px 14px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(22,163,74,.3)' }}
              >
                <Smartphone size={13} />Push Status
              </button>
            </div>
          </div>

          {/* messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span style={{ background: 'rgba(0,0,0,.06)', borderRadius: 100, padding: '4px 14px', fontSize: 10.5, color: '#64748b', fontWeight: 600 }}>Today</span>
            </div>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.mine ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '72%' }}>
                  <div style={{ padding: '10px 14px', borderRadius: m.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.mine ? 'linear-gradient(135deg,#16a34a,#15803d)' : 'white', color: m.mine ? 'white' : '#0f172a', border: m.mine ? 'none' : '1px solid #e2f5eb', boxShadow: m.mine ? '0 4px 12px rgba(22,163,74,.25)' : '0 2px 8px rgba(0,0,0,.06)' }}>
                    <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, fontWeight: 500 }}>{m.body}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3, justifyContent: m.mine ? 'flex-end' : 'flex-start', padding: '0 3px' }}>
                    <span style={{ fontSize: 10, color: '#94a3b8', fontWeight: 500 }}>{m.time}</span>
                    {m.mine && <WaTick status={m.status} />}
                  </div>
                </div>
              </div>
            ))}
            {wsTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: 'white', border: '1px solid #e2f5eb', display: 'flex', alignItems: 'center', gap: 5 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: 'otmDot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* input */}
          <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid #e2f5eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#f0fdf4', borderRadius: 18, border: '1.5px solid #bbf7d0', padding: '8px 10px 8px 14px' }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = '#16a34a')}
              onBlurCapture={e  => (e.currentTarget.style.borderColor = '#bbf7d0')}
            >
              <Paperclip size={16} color="#94a3b8" style={{ cursor: 'pointer', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                placeholder="Type a WhatsApp message..."
                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13.5, color: '#0f172a', outline: 'none', fontFamily: 'Inter, sans-serif' }}
              />
              <Smile size={16} color="#94a3b8" style={{ cursor: 'pointer', flexShrink: 0 }} />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                style={{ width: 36, height: 36, borderRadius: 11, border: 'none', background: inputText.trim() ? 'linear-gradient(135deg,#16a34a,#15803d)' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all 200ms', boxShadow: inputText.trim() ? '0 4px 12px rgba(22,163,74,.3)' : 'none' }}
              >
                <Send size={15} color={inputText.trim() ? 'white' : '#94a3b8'} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0f7f4', gap: 14 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: '#dcfce7', border: '1.5px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageCircle size={32} color="#16a34a" strokeWidth={1.5} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>WhatsApp</div>
            <div style={{ fontSize: 12.5, color: '#64748b', fontWeight: 500, marginTop: 5 }}>Select a connector to start external communication.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#dcfce7', borderRadius: 100, padding: '5px 14px', border: '1px solid #bbf7d0' }}>
            <Smartphone size={11} color="#16a34a" />
            <span style={{ fontSize: 10.5, color: '#16a34a', fontWeight: 700 }}>WhatsApp Business API</span>
          </div>
        </div>
      )}

      {/* Push status modal */}
      {showStatus && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowStatus(false)}>
          <div style={{ background: 'white', borderRadius: 24, padding: 32, width: 380, boxShadow: '0 25px 50px rgba(0,0,0,.15)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>WhatsApp Business</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em' }}>Push Status Update</div>
              </div>
              <button onClick={() => setShowStatus(false)} style={{ width: 32, height: 32, borderRadius: 9, border: '1px solid var(--surface-3)', background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={14} />
              </button>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: 14, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Smartphone size={18} color="#16a34a" />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{activeContact?.name}</div>
                <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>{activeContact?.phone} · {activeContact?.caseId}</div>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>New Case Status</label>
              <Select className="w-full" style={{ width: '100%', height: 48 }} defaultValue="APPROVED" onChange={setSelStatus}
                options={[
                  { value: 'DOC_PENDING', label: 'Documents Pending' },
                  { value: 'IN_REVIEW',   label: 'Under Review' },
                  { value: 'APPROVED',    label: 'Sanction Approved' },
                  { value: 'DISBURSED',   label: 'Loan Disbursed' },
                  { value: 'REJECTED',    label: 'Application Rejected' },
                ]}
              />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowStatus(false)} style={{ flex: 1, height: 48, borderRadius: 14, border: '1.5px solid var(--surface-3)', background: 'white', fontSize: 13, fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handlePushStatus} style={{ flex: 1, height: 48, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#16a34a,#15803d)', color: 'white', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Smartphone size={14} />Send via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   Team Meeting Tab (internal WS chat)
══════════════════════════════════════════════════════════ */
const TeamMeetingTab: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { rooms, activeRoomId, messagesByRoom, typingByRoom } = useSelector((state: RootState) => state.teamMeeting);
  const { sendChatMessage, sendTypingStart, sendTypingStop, sendMarkRead } = useTeamMeetingWS();

  const [inputText,   setInputText]   = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const myRole   = (user?.role ?? 'OPERATIONS') as UserRole;
  const myRooms  = getRoomsForRole(rooms, myRole);
  const activeRoom = myRooms.find(r => r.id === activeRoomId) ?? null;
  const messages   = activeRoomId ? (messagesByRoom[activeRoomId] ?? []) : [];
  const isTyping   = activeRoomId ? (typingByRoom[activeRoomId] ?? false) : false;
  const totalUnread = myRooms.reduce((s, r) => s + r.unreadCount, 0);
  const peer = activeRoom
    ? (activeRoom.participantA.role === myRole ? activeRoom.participantB : activeRoom.participantA)
    : null;

  const filtered = myRooms.filter(r => {
    const p = r.participantA.role === myRole ? r.participantB : r.participantA;
    return p.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping, activeRoomId]);

  useEffect(() => {
    if (activeRoomId && messages.length) sendMarkRead(activeRoomId, messages[messages.length - 1].id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoomId]);

  useEffect(() => {
    if (!activeRoomId && myRooms.length > 0) dispatch(setActiveRoom(myRooms[0].id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRooms.length]);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || !activeRoomId || !activeRoom || !user) return;
    const mySelf = activeRoom.participantA.role === myRole ? activeRoom.participantA : activeRoom.participantB;
    const payload: Omit<TeamMessage, 'id' | 'status'> = {
      roomId: activeRoomId, senderId: user.id, senderName: mySelf.name,
      senderRole: myRole, senderInitials: mySelf.initials,
      body: inputText.trim(), timestamp: new Date().toISOString(), type: 'TEXT',
    };
    dispatch(sendMessage(payload));
    sendChatMessage(payload, activeRoom);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    sendTypingStop(activeRoomId);
    setInputText('');
    inputRef.current?.focus();
  }, [inputText, activeRoomId, activeRoom, user, myRole, dispatch, sendChatMessage, sendTypingStop]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (!activeRoomId) return;
    sendTypingStart(activeRoomId);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => sendTypingStop(activeRoomId), 2_500);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* sidebar */}
      <div style={{ width: 280, flexShrink: 0, borderRight: '1px solid var(--surface-2)', display: 'flex', flexDirection: 'column', background: '#fafbfc' }}>
        <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid var(--surface-2)', background: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 10, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={15} color="#4f46e5" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                Team Chat
                {totalUnread > 0 && <span style={{ background: '#ef4444', color: 'white', borderRadius: 100, fontSize: 9, fontWeight: 800, padding: '1px 6px' }}>{totalUnread}</span>}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Internal · Encrypted</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-1)', borderRadius: 10, padding: '7px 10px', border: '1px solid var(--surface-3)' }}>
            <Search size={13} color="var(--text-muted)" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." style={{ border: 'none', background: 'transparent', flex: 1, fontSize: 12, color: 'var(--text-primary)', outline: 'none' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
          {filtered.map(r => (
            <TmRoomItem key={r.id} room={r} isActive={activeRoomId === r.id} myRole={myRole} onClick={() => dispatch(setActiveRoom(r.id))} />
          ))}
        </div>
      </div>

      {/* chat */}
      {activeRoom && peer ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
          <div style={{ padding: '12px 18px', background: 'white', borderBottom: '1px solid var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${peer.color}18`, border: `1.5px solid ${peer.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: peer.color }}>{peer.initials}</div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: activeRoom.isOnline ? '#10b981' : '#94a3b8', border: '2px solid white' }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>{peer.name}</div>
                <div style={{ fontSize: 11, color: isTyping ? '#3b82f6' : activeRoom.isOnline ? '#10b981' : 'var(--text-muted)', fontWeight: 600, transition: 'color 200ms' }}>
                  {isTyping ? 'Typing...' : activeRoom.isOnline ? `Online · ${ROLE_LABELS[peer.role]}` : `${ROLE_LABELS[peer.role]} · Offline`}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {([<Phone size={14} />, <Video size={14} />, <MoreVertical size={14} />] as React.ReactNode[]).map((icon, i) => (
                <button key={i} style={{ width: 34, height: 34, borderRadius: 10, border: '1px solid var(--surface-3)', background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 150ms' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLElement).style.color = '#3b82f6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >{icon}</button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {groupByDate(messages).map(group => (
              <div key={group.label}>
                <div style={{ textAlign: 'center', margin: '12px 0' }}>
                  <span style={{ background: 'rgba(148,163,184,.1)', borderRadius: 100, padding: '3px 12px', fontSize: 10, color: 'var(--text-muted)', fontWeight: 700 }}>{group.label}</span>
                </div>
                {group.messages.map((m, idx) => {
                  const isMine = m.senderRole === myRole;
                  const prev = idx > 0 ? group.messages[idx - 1] : null;
                  const showAvatar = !prev || prev.senderId !== m.senderId || prev.type === 'SYSTEM';
                  return <TmBubble key={m.id} msg={m} isMine={isMine} showAvatar={showAvatar} />;
                })}
              </div>
            ))}
            {isTyping && <TypingDots />}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '12px 16px', background: 'white', borderTop: '1px solid var(--surface-2)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, background: 'var(--surface-1)', borderRadius: 17, border: '1.5px solid var(--surface-3)', padding: '8px 10px 8px 13px', transition: 'border-color 200ms' }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = '#3b82f6')}
              onBlurCapture={e  => (e.currentTarget.style.borderColor = 'var(--surface-3)')}
            >
              {([<Paperclip size={14} />, <Smile size={14} />] as React.ReactNode[]).map((icon, i) => (
                <button key={i} style={{ width: 27, height: 27, border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 7 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#3b82f6'; (e.currentTarget as HTMLElement).style.background = '#eff6ff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.background = 'none'; }}
                >{icon}</button>
              ))}
              <textarea ref={inputRef} value={inputText} onChange={handleChange}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Type a message… (Enter to send)" rows={1}
                style={{ flex: 1, border: 'none', background: 'transparent', resize: 'none', fontSize: 13, color: 'var(--text-primary)', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, maxHeight: 90, overflowY: 'auto' }}
                onInput={e => { const el = e.currentTarget; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 90) + 'px'; }}
              />
              <button onClick={handleSend} disabled={!inputText.trim()} style={{ width: 34, height: 34, borderRadius: 10, border: 'none', background: inputText.trim() ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all 200ms', boxShadow: inputText.trim() ? '0 4px 12px rgba(37,99,235,.3)' : 'none' }}>
                <Send size={14} color={inputText.trim() ? 'white' : '#94a3b8'} />
              </button>
            </div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
              <Lock size={9} color="var(--text-muted)" />
              <span style={{ fontSize: 9.5, color: 'var(--text-muted)', fontWeight: 500 }}>End-to-end encrypted</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', gap: 12 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg,rgba(99,102,241,.1),rgba(59,130,246,.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MessageSquare size={28} color="#6366f1" strokeWidth={1.5} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Team Meeting</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Select a conversation to start.</div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   Main OpsTeamMeetingPage
══════════════════════════════════════════════════════════ */
const OpsTeamMeetingPage: React.FC = () => {
  const [tab, setTab] = useState<'meeting' | 'whatsapp'>('meeting');
  const { wsStatus }  = useSelector((state: RootState) => state.teamMeeting);

  const tabs = [
    { key: 'meeting'  as const, label: 'Team Meeting', icon: <Users size={15} />,      badge: null },
    { key: 'whatsapp' as const, label: 'WhatsApp',     icon: <Smartphone size={15} />, badge: null },
  ];

  return (
    <>
      <style>{`
        @keyframes otmDot {
          0%,60%,100% { transform:translateY(0);opacity:.4 }
          30%          { transform:translateY(-5px);opacity:1 }
        }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Operations Communication Hub
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
              Team Meeting
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <WSBadge status={wsStatus} />
            {tab === 'whatsapp' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(22,163,74,.08)', borderRadius: 100, padding: '3px 10px', border: '1px solid rgba(22,163,74,.2)' }}>
                <Smartphone size={11} color="#16a34a" />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>WA Business</span>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 6px #16a34a' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card shell */}
      <div style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-xl)', background: 'white', height: 'calc(100vh - 220px)', minHeight: 480, display: 'flex', flexDirection: 'column' }}>

        {/* Tab bar */}
        <div style={{ display: 'flex', background: 'white', borderBottom: '1px solid var(--surface-2)', padding: '0 20px', flexShrink: 0 }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, color: tab === t.key ? (t.key === 'whatsapp' ? '#16a34a' : '#3b82f6') : 'var(--text-muted)', borderBottom: tab === t.key ? `2.5px solid ${t.key === 'whatsapp' ? '#16a34a' : '#3b82f6'}` : '2.5px solid transparent', marginBottom: -1, transition: 'all 200ms', letterSpacing: '-0.01em' }}>
              <span style={{ color: tab === t.key ? (t.key === 'whatsapp' ? '#16a34a' : '#3b82f6') : 'var(--text-muted)', transition: 'color 200ms', display: 'flex' }}>{t.icon}</span>
              {t.label}
              {t.badge && <span style={{ background: '#ef4444', color: 'white', borderRadius: 100, fontSize: 9, fontWeight: 800, padding: '1px 6px' }}>{t.badge}</span>}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          {/* Connection status in tab bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 8px' }}>
            <ChevronRight size={12} color="var(--text-muted)" />
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
              {tab === 'meeting' ? 'Encrypted channel' : 'External messaging'}
            </span>
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {tab === 'meeting'  && <TeamMeetingTab />}
          {tab === 'whatsapp' && <WhatsAppTab />}
        </div>
      </div>
    </>
  );
};

export default OpsTeamMeetingPage;
