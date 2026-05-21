import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'antd';
import {
  Send, Search, Phone, Video, MoreVertical,
  Paperclip, Smile, Check, CheckCheck,
  Users, MessageSquare, Lock, Wifi, WifiOff, RefreshCw, Radio
} from 'lucide-react';
import { RootState } from '../../../store';
import {
  setActiveRoom, sendMessage, getRoomsForRole,
} from '../../../store/slices/teamMeetingSlice';
import type { TeamRoom, TeamMessage, WSConnectionStatus, UserRole } from '../../../store/slices/teamMeetingSlice';
import { useTeamMeetingWS } from '../../../hooks/useTeamMeetingWS';

/* ─── Role labels ─── */
const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Admin', RM: 'Relationship Manager',
  OPERATIONS: 'Operations', TEAM_LEADER: 'Team Leader', CONNECTOR: 'Connector',
};

/* ─── Time helpers ─── */
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

/* ─── WS status badge ─── */
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
const TypingIndicator: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
    <div style={{ width: 32 }} />
    <div style={{ padding: '10px 16px', borderRadius: '18px 18px 18px 4px', background: 'white', border: '1px solid var(--surface-3)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 5 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: 'tmDot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  </div>
);

/* ─── Read-receipt tick ─── */
const Tick: React.FC<{ status: TeamMessage['status'] }> = ({ status }) => {
  if (status === 'READ')      return <CheckCheck size={13} color="#3b82f6" />;
  if (status === 'DELIVERED') return <CheckCheck size={13} color="#94a3b8" />;
  return <Check size={13} color="#94a3b8" />;
};

/* ─── Room list item ─── */
const RoomItem: React.FC<{ room: TeamRoom; isActive: boolean; myRole: UserRole; onClick: () => void }> = ({
  room, isActive, myRole, onClick,
}) => {
  const peer     = room.participantA.role === myRole ? room.participantB : room.participantA;
  const peerRole = ROLE_LABELS[peer.role];
  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left', padding: '12px 14px', background: isActive
        ? 'linear-gradient(90deg,rgba(59,130,246,.12),rgba(99,102,241,.06))' : 'transparent',
      border: 'none', borderRadius: 14, cursor: 'pointer', transition: 'all 200ms',
      display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2,
      borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
    }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(248,250,252,.9)'; }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13,
          background: `linear-gradient(135deg,${peer.color}22,${peer.color}11)`,
          border: `1.5px solid ${peer.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: peer.color,
        }}>{peer.initials}</div>
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: 11, height: 11,
          borderRadius: '50%', border: '2px solid white',
          background: room.isOnline ? '#10b981' : '#94a3b8',
          boxShadow: room.isOnline ? '0 0 6px rgba(16,185,129,.55)' : 'none',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? '#1d4ed8' : 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {peer.name}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, flexShrink: 0, marginLeft: 8 }}>
            {fmtRoomTime(room.lastMessageTime)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
            <span style={{ color: peer.color, fontWeight: 700, fontSize: 10, marginRight: 4 }}>
              {peerRole.split(' ')[0]}
            </span>
            {room.lastMessage}
          </span>
          {room.unreadCount > 0 && (
            <span style={{ marginLeft: 6, background: '#3b82f6', color: 'white', borderRadius: 100, fontSize: 10, fontWeight: 800, padding: '1px 7px', flexShrink: 0 }}>
              {room.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

/* ─── Message bubble ─── */
const Bubble: React.FC<{ msg: TeamMessage; isMine: boolean; showAvatar: boolean }> = ({ msg, isMine, showAvatar }) => {
  if (msg.type === 'SYSTEM') return (
    <div style={{ textAlign: 'center', margin: '16px 0' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(59,130,246,.06)', border: '1px solid rgba(59,130,246,.12)',
        borderRadius: 100, padding: '5px 14px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600,
      }}>
        <Lock size={10} />{msg.body}
      </span>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: isMine ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 8, marginBottom: 3 }}>
      <div style={{ width: 32, height: 32, flexShrink: 0 }}>
        {!isMine && showAvatar && (
          <Tooltip title={`${msg.senderName} · ${ROLE_LABELS[msg.senderRole]}`} placement="left">
            <div style={{
              width: 32, height: 32, borderRadius: 10, cursor: 'default',
              background: 'rgba(59,130,246,.1)', border: '1.5px solid rgba(59,130,246,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: '#3b82f6',
            }}>{msg.senderInitials}</div>
          </Tooltip>
        )}
      </div>
      <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
        {showAvatar && !isMine && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4, marginLeft: 2 }}>
            {msg.senderName}
            <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              {ROLE_LABELS[msg.senderRole]}
            </span>
          </span>
        )}
        <div style={{
          padding: '10px 14px',
          borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          background: isMine ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'white',
          border: isMine ? 'none' : '1px solid var(--surface-3)',
          boxShadow: isMine ? '0 4px 12px rgba(37,99,235,.25)' : 'var(--shadow-sm)',
        }}>
          <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: isMine ? 'white' : 'var(--text-primary)', fontWeight: 500 }}>
            {msg.body}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, [isMine ? 'marginRight' : 'marginLeft']: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{fmtTime(msg.timestamp)}</span>
          {isMine && <Tick status={msg.status} />}
        </div>
      </div>
    </div>
  );
};

/* ─── Main component ─── */
const TeamMeeting: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { rooms, activeRoomId, messagesByRoom, typingByRoom, wsStatus } =
    useSelector((state: RootState) => state.teamMeeting);

  const { sendChatMessage, sendTypingStart, sendTypingStop, sendMarkRead } = useTeamMeetingWS();

  const [inputText,   setInputText]   = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef  = useRef<HTMLDivElement>(null);
  const inputRef        = useRef<HTMLTextAreaElement>(null);
  const typingTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const myRole    = (user?.role ?? 'RM') as UserRole;
  const myRooms   = getRoomsForRole(rooms, myRole);
  const activeRoom = myRooms.find(r => r.id === activeRoomId) ?? null;
  const messages   = activeRoomId ? (messagesByRoom[activeRoomId] ?? []) : [];
  const isTyping   = activeRoomId ? (typingByRoom[activeRoomId] ?? false) : false;
  const totalUnread = myRooms.reduce((s, r) => s + r.unreadCount, 0);

  const peer = activeRoom
    ? (activeRoom.participantA.role === myRole ? activeRoom.participantB : activeRoom.participantA)
    : null;

  const filteredRooms = myRooms.filter(r => {
    const p = r.participantA.role === myRole ? r.participantB : r.participantA;
    return p.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  /* scroll on new msgs */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping, activeRoomId]);

  /* mark read on open */
  useEffect(() => {
    if (activeRoomId && messages.length) {
      sendMarkRead(activeRoomId, messages[messages.length - 1].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoomId]);

  /* auto-select first room if none active */
  useEffect(() => {
    if (!activeRoomId && myRooms.length > 0) {
      dispatch(setActiveRoom(myRooms[0].id));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRooms.length]);

  const handleSend = useCallback(() => {
    if (!inputText.trim() || !activeRoomId || !activeRoom || !user) return;
    const mySelf = activeRoom.participantA.role === myRole ? activeRoom.participantA : activeRoom.participantB;
    const payload: Omit<TeamMessage, 'id' | 'status'> = {
      roomId: activeRoomId,
      senderId: user.id,
      senderName: mySelf.name,
      senderRole: myRole,
      senderInitials: mySelf.initials,
      body: inputText.trim(),
      timestamp: new Date().toISOString(),
      type: 'TEXT',
    };
    dispatch(sendMessage(payload));
    sendChatMessage(payload, activeRoom);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    sendTypingStop(activeRoomId);
    setInputText('');
    inputRef.current?.focus();
  }, [inputText, activeRoomId, activeRoom, user, myRole, dispatch, sendChatMessage, sendTypingStop]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (!activeRoomId) return;
    sendTypingStart(activeRoomId);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => sendTypingStop(activeRoomId), 2_500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  /* quick-reply hints per role */
  const quickReplies: Record<UserRole, string[]> = {
    RM:          ['Follow up on docs', 'File approved', 'CIBIL looks good', 'Need more details'],
    CONNECTOR:   ['Documents uploaded', 'Client confirmed', 'New lead ready', 'Query resolved'],
    OPERATIONS:  ['Processing now', 'Query raised', 'Approved — disbursing', 'Document mismatch'],
    ADMIN:       ['Target updated', 'Review Q2 report', 'Compliance due', 'Good performance'],
    TEAM_LEADER: ['Check your target', 'Training on Friday', 'Payout processed', 'New product live'],
  };

  return (
    <>
      <style>{`
        @keyframes tmDot {
          0%,60%,100% { transform:translateY(0);opacity:.4 }
          30%          { transform:translateY(-5px);opacity:1 }
        }
      `}</style>

      {/* Page heading */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
              Internal · {ROLE_LABELS[myRole]}
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em' }}>
              Team Meeting
            </h1>
          </div>
          <WSBadge status={wsStatus} />
        </div>
      </div>

      {/* Chat shell */}
      <div style={{
        display: 'flex', height: 'calc(100vh - 220px)', borderRadius: 24,
        overflow: 'hidden', border: '1px solid var(--surface-3)',
        boxShadow: 'var(--shadow-xl)', background: 'white', minHeight: 480,
      }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid var(--surface-2)', display: 'flex', flexDirection: 'column', background: '#fafbfc' }}>
          <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid var(--surface-2)', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h2 style={{ fontSize: 16, fontWeight: 900, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: 8 }}>
                Conversations
                {totalUnread > 0 && (
                  <span style={{ background: '#ef4444', color: 'white', borderRadius: 100, fontSize: 10, fontWeight: 800, padding: '1px 7px' }}>
                    {totalUnread}
                  </span>
                )}
              </h2>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(79,70,229,.3)' }}>
                <Users size={15} color="white" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface-1)', borderRadius: 11, padding: '7px 11px', border: '1px solid var(--surface-3)' }}>
              <Search size={14} color="var(--text-muted)" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{ border: 'none', background: 'transparent', flex: 1, fontSize: 12.5, color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 8px' }}>
            {filteredRooms.map(room => (
              <RoomItem
                key={room.id}
                room={room}
                isActive={activeRoomId === room.id}
                myRole={myRole}
                onClick={() => dispatch(setActiveRoom(room.id))}
              />
            ))}
          </div>

          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--surface-2)', background: 'white', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0 }}>
              {user?.email?.slice(0, 2).toUpperCase() ?? 'AD'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email?.split('@')[0] ?? 'User'}
              </div>
              <div style={{ fontSize: 10, color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 5px #10b981' }} />
                {ROLE_LABELS[myRole]}
              </div>
            </div>
            <Lock size={13} color="var(--text-muted)" />
          </div>
        </div>

        {/* ── Chat panel ── */}
        {activeRoom && peer ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
            {/* header */}
            <div style={{ padding: '14px 20px', background: 'white', borderBottom: '1px solid var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(0,0,0,.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `linear-gradient(135deg,${peer.color}20,${peer.color}10)`, border: `1.5px solid ${peer.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: peer.color }}>
                    {peer.initials}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: '50%', background: activeRoom.isOnline ? '#10b981' : '#94a3b8', border: '2px solid white', boxShadow: activeRoom.isOnline ? '0 0 6px rgba(16,185,129,.5)' : 'none' }} />
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{peer.name}</div>
                  <div style={{ fontSize: 11, color: isTyping ? '#3b82f6' : activeRoom.isOnline ? '#10b981' : 'var(--text-muted)', fontWeight: 600, transition: 'color 200ms' }}>
                    {isTyping ? 'Typing...' : activeRoom.isOnline ? `Online · ${ROLE_LABELS[peer.role]}` : `${ROLE_LABELS[peer.role]} · Last seen recently`}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {([<Phone size={15} />, <Video size={15} />, <MoreVertical size={15} />] as React.ReactNode[]).map((icon, i) => (
                  <Tooltip key={i} title={['Voice call', 'Video call', 'More options'][i]}>
                    <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--surface-3)', background: 'var(--surface-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 150ms' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLElement).style.color = '#3b82f6'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                    >{icon}</button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {groupByDate(messages).map(group => (
                <div key={group.label}>
                  <div style={{ textAlign: 'center', margin: '14px 0' }}>
                    <span style={{ background: 'rgba(148,163,184,.1)', borderRadius: 100, padding: '3px 14px', fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700 }}>
                      {group.label}
                    </span>
                  </div>
                  {group.messages.map((m, idx) => {
                    const isMine  = m.senderRole === myRole;
                    const prev    = idx > 0 ? group.messages[idx - 1] : null;
                    const showAvatar = !prev || prev.senderId !== m.senderId || prev.type === 'SYSTEM';
                    return <Bubble key={m.id} msg={m} isMine={isMine} showAvatar={showAvatar} />;
                  })}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* input */}
            <div style={{ padding: '14px 18px', background: 'white', borderTop: '1px solid var(--surface-2)' }}>
              <div style={{ display: 'flex', gap: 7, marginBottom: 10, flexWrap: 'wrap' }}>
                {quickReplies[myRole].map(t => (
                  <button key={t} onClick={() => setInputText(t)} style={{ padding: '4px 11px', borderRadius: 100, border: '1px solid var(--surface-3)', background: 'var(--surface-1)', fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 150ms', whiteSpace: 'nowrap' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLElement).style.color = '#3b82f6'; (e.currentTarget as HTMLElement).style.background = '#eff6ff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; (e.currentTarget as HTMLElement).style.background = 'var(--surface-1)'; }}
                  >{t}</button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, background: 'var(--surface-1)', borderRadius: 18, border: '1.5px solid var(--surface-3)', padding: '9px 11px 9px 14px', transition: 'border-color 200ms' }}
                onFocusCapture={e => (e.currentTarget.style.borderColor = '#3b82f6')}
                onBlurCapture={e  => (e.currentTarget.style.borderColor = 'var(--surface-3)')}
              >
                {([<Paperclip size={15} />, <Smile size={15} />] as React.ReactNode[]).map((icon, i) => (
                  <button key={i} style={{ width: 28, height: 28, border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 8, transition: 'all 150ms' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#3b82f6'; (e.currentTarget as HTMLElement).style.background = '#eff6ff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.background = 'none'; }}
                  >{icon}</button>
                ))}

                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
                  rows={1}
                  style={{ flex: 1, border: 'none', background: 'transparent', resize: 'none', fontSize: 13.5, color: 'var(--text-primary)', outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, maxHeight: 100, overflowY: 'auto' }}
                  onInput={e => { const el = e.currentTarget; el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 100) + 'px'; }}
                />

                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  style={{ width: 36, height: 36, borderRadius: 11, border: 'none', background: inputText.trim() ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'var(--surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputText.trim() ? 'pointer' : 'not-allowed', flexShrink: 0, transition: 'all 200ms', boxShadow: inputText.trim() ? '0 4px 12px rgba(37,99,235,.3)' : 'none' }}
                >
                  <Send size={15} color={inputText.trim() ? 'white' : '#94a3b8'} />
                </button>
              </div>

              <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                <Lock size={9} color="var(--text-muted)" />
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
                  End-to-end encrypted · {wsStatus === 'SIMULATED' ? 'Simulation mode' : wsStatus === 'CONNECTED' ? 'Connected' : wsStatus}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', gap: 14 }}>
            <div style={{ width: 72, height: 72, borderRadius: 22, background: 'linear-gradient(135deg,rgba(99,102,241,.1),rgba(59,130,246,.1))', border: '1.5px solid rgba(99,102,241,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare size={32} color="#6366f1" strokeWidth={1.5} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Team Meeting</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500, marginTop: 5, maxWidth: 260 }}>
                Select a conversation from the list to start.
              </div>
            </div>
            <WSBadge status={wsStatus} />
          </div>
        )}
      </div>
    </>
  );
};

export default TeamMeeting;
