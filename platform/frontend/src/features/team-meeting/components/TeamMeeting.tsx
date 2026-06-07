import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin, Tooltip } from 'antd';
import {
  Send, Search, Phone, Video, MoreVertical,
  Paperclip, Smile, Check, CheckCheck,
  Users, MessageSquare, Lock, Radio, ArrowLeft,
} from 'lucide-react';
import { RootState } from '../../../store';
import {
  setActiveRoom, sendMessage, receiveMessage, getRoomsForRole, setRooms, buildParticipant,
} from '../../../store/slices/teamMeetingSlice';
import type { TeamRoom, TeamMessage, UserRole } from '../../../store/slices/teamMeetingSlice';
import { useTeamMeetingWS } from '../../../hooks/useTeamMeetingWS';
import apiClient from '../../../shared/services/apiClient';

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Admin', RM: 'Relationship Manager',
  OPERATIONS: 'Operations', TEAM_LEADER: 'Team Leader', CONNECTOR: 'Connector',
  PARTNER_MANAGER: 'Partner Manager',
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

const TypingIndicator: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 4 }}>
    <div style={{ width: 30 }} />
    <div style={{
      padding: '10px 14px', borderRadius: '16px 16px 16px 4px',
      background: 'white', border: '1px solid #e2e8f0',
      boxShadow: '0 1px 4px rgba(0,0,0,.05)',
      display: 'flex', alignItems: 'center', gap: 4,
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: '#94a3b8',
          animation: 'tmDot 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.18}s`,
        }} />
      ))}
    </div>
  </div>
);

const Tick: React.FC<{ status: TeamMessage['status'] }> = ({ status }) => {
  if (status === 'READ')      return <CheckCheck size={12} color="#3b82f6" />;
  if (status === 'DELIVERED') return <CheckCheck size={12} color="#94a3b8" />;
  return <Check size={12} color="#94a3b8" />;
};

const RoomItem: React.FC<{
  room: TeamRoom; isActive: boolean; myRole: UserRole; onClick: () => void;
}> = ({ room, isActive, myRole, onClick }) => {
  const peer = room.participantA.role === myRole ? room.participantB : room.participantA;
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left', padding: '10px 12px',
        background: isActive ? 'rgba(59,130,246,.08)' : 'transparent',
        border: 'none',
        borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
        borderRadius: isActive ? '0 12px 12px 0' : '0 12px 12px 0',
        cursor: 'pointer', transition: 'background 150ms',
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 1,
      }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(241,245,249,.9)'; }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: `${peer.color}18`,
          border: `1.5px solid ${peer.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 800, color: peer.color,
        }}>{peer.initials}</div>
        <div style={{
          position: 'absolute', bottom: -1, right: -1, width: 10, height: 10,
          borderRadius: '50%', border: '2px solid white',
          background: room.isOnline ? '#10b981' : '#cbd5e1',
          boxShadow: room.isOnline ? '0 0 5px rgba(16,185,129,.5)' : 'none',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <span style={{
            fontSize: 13, fontWeight: isActive ? 700 : 600,
            color: isActive ? '#1d4ed8' : 'var(--text-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 110,
          }}>{peer.name}</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 6 }}>
            {fmtRoomTime(room.lastMessageTime)}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: 11, color: 'var(--text-muted)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
          }}>
            <span style={{ color: peer.color, fontWeight: 700, fontSize: 10, marginRight: 3 }}>
              {ROLE_LABELS[peer.role].split(' ')[0]}
            </span>
            {room.lastMessage || 'Start a conversation'}
          </span>
          {room.unreadCount > 0 && (
            <span style={{
              marginLeft: 6, background: '#3b82f6', color: 'white',
              borderRadius: 100, fontSize: 10, fontWeight: 800,
              padding: '1px 6px', flexShrink: 0,
            }}>{room.unreadCount}</span>
          )}
        </div>
      </div>
    </button>
  );
};

const Bubble: React.FC<{ msg: TeamMessage; isMine: boolean; showAvatar: boolean }> = ({ msg, isMine, showAvatar }) => {
  if (msg.type === 'SYSTEM') return (
    <div style={{ textAlign: 'center', margin: '12px 0' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        background: 'rgba(148,163,184,.1)', border: '1px solid rgba(148,163,184,.2)',
        borderRadius: 100, padding: '4px 12px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600,
      }}>
        <Lock size={9} />{msg.body}
      </span>
    </div>
  );
  return (
    <div style={{
      display: 'flex', flexDirection: isMine ? 'row-reverse' : 'row',
      alignItems: 'flex-end', gap: 6, marginBottom: 2,
    }}>
      <div style={{ width: 30, height: 30, flexShrink: 0 }}>
        {!isMine && showAvatar && (
          <Tooltip title={`${msg.senderName} · ${ROLE_LABELS[msg.senderRole]}`} placement="left">
            <div style={{
              width: 30, height: 30, borderRadius: 9, cursor: 'default',
              background: 'rgba(59,130,246,.1)', border: '1.5px solid rgba(59,130,246,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 800, color: '#3b82f6',
            }}>{msg.senderInitials}</div>
          </Tooltip>
        )}
      </div>
      <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
        {showAvatar && !isMine && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3, marginLeft: 2 }}>
            {msg.senderName}
            <span style={{ marginLeft: 5, fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8' }}>
              {ROLE_LABELS[msg.senderRole]}
            </span>
          </span>
        )}
        <div style={{
          padding: '9px 13px',
          borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isMine ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'white',
          border: isMine ? 'none' : '1px solid #e2e8f0',
          boxShadow: isMine ? '0 4px 10px rgba(37,99,235,.2)' : '0 1px 3px rgba(0,0,0,.04)',
        }}>
          <p style={{
            margin: 0, fontSize: 13.5, lineHeight: 1.55,
            color: isMine ? 'white' : 'var(--text-primary)', fontWeight: 450,
          }}>{msg.body}</p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 3, marginTop: 3,
          ...(isMine ? { marginRight: 3 } : { marginLeft: 3 }),
        }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{fmtTime(msg.timestamp)}</span>
          {isMine && <Tick status={msg.status} />}
        </div>
      </div>
    </div>
  );
};

const ROLE_MAP: Record<string, UserRole> = {
  ADMIN: 'ADMIN', RM: 'RM', OPERATIONS: 'OPERATIONS',
  TEAM_LEADER: 'TEAM_LEADER', CONNECTOR: 'CONNECTOR', PARTNER_MANAGER: 'PARTNER_MANAGER',
};

const TeamMeeting: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { rooms, activeRoomId, messagesByRoom, typingByRoom, wsStatus } =
    useSelector((state: RootState) => state.teamMeeting);

  const { sendChatMessage, sendTypingStart, sendTypingStop, sendMarkRead, joinRoom } = useTeamMeetingWS();

  const [inputText,    setInputText]    = useState('');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [showChat,     setShowChat]     = useState(false);
  const messagesEndRef  = useRef<HTMLDivElement>(null);
  const inputRef        = useRef<HTMLTextAreaElement>(null);
  const typingTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const myRole     = (user?.role ?? 'RM') as UserRole;
  const myRooms    = getRoomsForRole(rooms, myRole);
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

  useEffect(() => {
    if (!user) return;
    setLoadingRooms(true);
    apiClient.get('/connectors').then(res => {
      const members: any[] = res.data?.data || res.data || [];
      const myEmail = user.email!;
      const myName  = myEmail.split('@')[0] || 'Me';
      const myParticipant = buildParticipant(myEmail, myName, myRole);

      const builtRooms: TeamRoom[] = members
        .filter(m => m.email && m.email !== myEmail)
        .map(m => {
          const memberRole = ROLE_MAP[m.role] ?? 'CONNECTOR';
          const fullName = `${m.firstName || ''} ${m.lastName || ''}`.trim() || m.email || 'Team Member';
          const peerParticipant = buildParticipant(m.email, fullName, memberRole);
          // Use sorted emails so both sides always derive the same room key
          const roomId = `room-dm-${[myEmail, m.email].sort().join('--')}`;
          return {
            id: roomId,
            participantA: myParticipant,
            participantB: peerParticipant,
            lastMessage: '',
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            isOnline: m.status === 'ACTIVE',
            status: 'ACTIVE' as const,
          };
        });

      dispatch(setRooms(builtRooms));
    }).catch(() => {
      dispatch(setRooms([]));
    }).finally(() => setLoadingRooms(false));
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isTyping, activeRoomId]);

  // Join room on WS + load message history whenever active room changes
  useEffect(() => {
    if (!activeRoomId) return;
    joinRoom(activeRoomId);
    // Load persisted messages from server
    apiClient.get(`/messaging/team-meeting/rooms/${encodeURIComponent(activeRoomId)}/messages`)
      .then(res => {
        const serverMsgs: any[] = res.data?.data || [];
        serverMsgs.forEach(m => {
          dispatch(receiveMessage({
            id:             m.id,
            roomId:         m.roomKey,
            senderId:       m.senderId,
            senderName:     m.senderName,
            senderRole:     m.senderRole as any,
            senderInitials: m.senderInitials || '',
            body:           m.body,
            timestamp:      m.createdAt || new Date().toISOString(),
            status:         (m.status || 'DELIVERED') as any,
            type:           (m.messageType || 'TEXT') as any,
          }));
        });
      })
      .catch(() => { /* history fetch failed — local messages still shown */ });

    if (messages.length) {
      sendMarkRead(activeRoomId, messages[messages.length - 1].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoomId]);

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

  const handleRoomClick = (roomId: string) => {
    dispatch(setActiveRoom(roomId));
    setShowChat(true);
  };

  const quickReplies: Record<UserRole, string[]> = {
    RM:              ['Follow up on docs', 'File approved', 'CIBIL clear', 'Need more details'],
    CONNECTOR:       ['Documents uploaded', 'Client confirmed', 'New lead ready', 'Query resolved'],
    OPERATIONS:      ['Processing now', 'Query raised', 'Approved — disbursing', 'Doc mismatch'],
    ADMIN:           ['Target updated', 'Review Q2', 'Compliance due', 'Good performance'],
    TEAM_LEADER:     ['Check your target', 'Training Friday', 'Payout processed', 'New product live'],
    PARTNER_MANAGER: ['Onboarding approved', 'Payout released', 'Review connector', 'Slab updated'],
  };

  const onlineCount = myRooms.filter(r => r.isOnline).length;

  return (
    <>
      <style>{`
        @keyframes tmDot {
          0%,60%,100% { transform:translateY(0);opacity:.35 }
          30%          { transform:translateY(-4px);opacity:1 }
        }
        .tm-shell {
          display: flex;
          height: calc(100vh - 210px);
          min-height: 520px;
        }
        @media (max-width: 768px) {
          .tm-shell { height: calc(100dvh - 140px); min-height: 0; border-radius: 16px !important; }
          .tm-sidebar { width: 100% !important; }
          .tm-chat-pane { width: 100% !important; }
          .tm-sidebar-hidden { display: none !important; }
          .tm-chat-hidden   { display: none !important; }
          .tm-back-btn      { display: flex !important; }
          .tm-header-actions { display: none !important; }
          .tm-quick-replies { display: none !important; }
        }
      `}</style>

      {/* Page header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        }}>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 800, color: 'var(--brand-500)',
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4,
            }}>
              Internal · {ROLE_LABELS[myRole]}
            </div>
            <h1 style={{
              fontSize: 'clamp(1.25rem,4vw,1.6rem)', fontWeight: 900,
              color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.03em',
            }}>Team Meeting</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {onlineCount > 0 && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)',
                borderRadius: 100, padding: '4px 12px',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981' }}>
                  {onlineCount} online
                </span>
              </div>
            )}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(16,185,129,.08)', borderRadius: 100,
              padding: '4px 12px', border: '1px solid rgba(16,185,129,.2)',
            }}>
              <Radio size={11} color="#10b981" />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#10b981', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {wsStatus === 'SIMULATED' ? 'Live' : wsStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shell */}
      <div
        className="tm-shell"
        style={{
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid var(--surface-3)',
          boxShadow: '0 4px 24px rgba(0,0,0,.06)',
          background: 'white',
        }}
      >
        {/* ─── Sidebar ─── */}
        <div
          className={`tm-sidebar${showChat ? ' tm-sidebar-hidden' : ''}`}
          style={{
            width: 280, flexShrink: 0,
            borderRight: '1px solid var(--surface-2)',
            display: 'flex', flexDirection: 'column',
            background: '#f8fafc',
          }}
        >
          {/* Sidebar header */}
          <div style={{
            padding: '16px 14px 12px',
            borderBottom: '1px solid var(--surface-2)',
            background: 'white',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{
                fontSize: 15, fontWeight: 800, margin: 0,
                color: 'var(--text-primary)', letterSpacing: '-0.02em',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={13} color="white" />
                </div>
                Conversations
                {totalUnread > 0 && (
                  <span style={{ background: '#ef4444', color: 'white', borderRadius: 100, fontSize: 10, fontWeight: 800, padding: '1px 7px' }}>
                    {totalUnread}
                  </span>
                )}
              </h2>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'var(--surface-1)', borderRadius: 10,
              padding: '7px 10px', border: '1px solid var(--surface-3)',
            }}>
              <Search size={13} color="var(--text-muted)" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search people…"
                style={{
                  border: 'none', background: 'transparent', flex: 1,
                  fontSize: 12.5, color: 'var(--text-primary)', outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Room list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 4px' }}>
            {loadingRooms ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}><Spin /></div>
            ) : filteredRooms.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(99,102,241,.08)', border: '1.5px solid rgba(99,102,241,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <MessageSquare size={20} color="#6366f1" strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>No conversations</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Team members will appear here once connected.
                </div>
              </div>
            ) : (
              filteredRooms.map(room => (
                <RoomItem
                  key={room.id}
                  room={room}
                  isActive={activeRoomId === room.id}
                  myRole={myRole}
                  onClick={() => handleRoomClick(room.id)}
                />
              ))
            )}
          </div>

          {/* My status bar */}
          <div style={{
            padding: '10px 12px', borderTop: '1px solid var(--surface-2)',
            background: 'white', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'linear-gradient(135deg,#6366f1,#4f46e5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800, color: 'white', flexShrink: 0,
            }}>
              {user?.email?.slice(0, 2).toUpperCase() ?? 'AD'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.email?.split('@')[0] ?? 'User'}
              </div>
              <div style={{ fontSize: 10, color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 5px #10b981' }} />
                {ROLE_LABELS[myRole]}
              </div>
            </div>
            <Lock size={12} color="var(--text-muted)" />
          </div>
        </div>

        {/* ─── Chat panel ─── */}
        {activeRoom && peer ? (
          <div
            className={`tm-chat-pane${!showChat ? ' tm-chat-hidden' : ''}`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f1f5f9', minWidth: 0 }}
          >
            {/* Chat header */}
            <div style={{
              padding: '12px 18px', background: 'white',
              borderBottom: '1px solid var(--surface-2)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 1px 6px rgba(0,0,0,.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  className="tm-back-btn"
                  onClick={() => setShowChat(false)}
                  style={{
                    display: 'none', width: 32, height: 32, borderRadius: 9,
                    border: '1px solid var(--surface-3)', background: 'var(--surface-1)',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)', flexShrink: 0,
                  }}
                >
                  <ArrowLeft size={15} />
                </button>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 11,
                    background: `${peer.color}18`,
                    border: `1.5px solid ${peer.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800, color: peer.color,
                  }}>{peer.initials}</div>
                  <div style={{
                    position: 'absolute', bottom: -1, right: -1, width: 10, height: 10,
                    borderRadius: '50%', background: activeRoom.isOnline ? '#10b981' : '#cbd5e1',
                    border: '2px solid white',
                    boxShadow: activeRoom.isOnline ? '0 0 5px rgba(16,185,129,.5)' : 'none',
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
                    {peer.name}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600, transition: 'color 200ms',
                    color: isTyping ? '#3b82f6' : activeRoom.isOnline ? '#10b981' : 'var(--text-muted)',
                  }}>
                    {isTyping ? 'Typing…' : activeRoom.isOnline ? `Online · ${ROLE_LABELS[peer.role]}` : `${ROLE_LABELS[peer.role]}`}
                  </div>
                </div>
              </div>

              <div className="tm-header-actions" style={{ display: 'flex', gap: 4 }}>
                {([
                  { icon: <Phone size={14} />, label: 'Voice call' },
                  { icon: <Video size={14} />, label: 'Video call' },
                  { icon: <MoreVertical size={14} />, label: 'More options' },
                ]).map(({ icon, label }) => (
                  <Tooltip key={label} title={label}>
                    <button style={{
                      width: 34, height: 34, borderRadius: 9,
                      border: '1px solid var(--surface-3)', background: 'var(--surface-1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: 'var(--text-secondary)', transition: 'all 150ms',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3b82f6'; (e.currentTarget as HTMLElement).style.color = '#3b82f6'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--surface-3)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                    >{icon}</button>
                  </Tooltip>
                ))}
              </div>
            </div>

            {/* Messages area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 1 }}>
              {messages.length === 0 && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.55, paddingBottom: 40 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `${peer.color}18`, border: `1.5px solid ${peer.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                    <MessageSquare size={22} color={peer.color} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    Start the conversation
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 200, lineHeight: 1.5 }}>
                    Say hello to {peer.name}
                  </div>
                </div>
              )}
              {groupByDate(messages).map(group => (
                <div key={group.label}>
                  <div style={{ textAlign: 'center', margin: '12px 0' }}>
                    <span style={{
                      background: 'rgba(148,163,184,.15)', borderRadius: 100,
                      padding: '3px 12px', fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700,
                    }}>{group.label}</span>
                  </div>
                  {group.messages.map((m, idx) => {
                    const isMine = m.senderRole === myRole;
                    const prev   = idx > 0 ? group.messages[idx - 1] : null;
                    const showAvatar = !prev || prev.senderId !== m.senderId || prev.type === 'SYSTEM';
                    return <Bubble key={m.id} msg={m} isMine={isMine} showAvatar={showAvatar} />;
                  })}
                </div>
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div style={{ padding: '10px 12px 12px', background: 'white', borderTop: '1px solid var(--surface-2)' }}>
              <div className="tm-quick-replies" style={{ display: 'flex', gap: 5, marginBottom: 8, flexWrap: 'wrap' }}>
                {quickReplies[myRole].map(t => (
                  <button
                    key={t}
                    onClick={() => setInputText(t)}
                    style={{
                      padding: '3px 10px', borderRadius: 100,
                      border: '1px solid var(--surface-3)', background: 'var(--surface-1)',
                      fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)',
                      cursor: 'pointer', transition: 'all 150ms', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#3b82f6'; el.style.color = '#3b82f6'; el.style.background = '#eff6ff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--surface-3)'; el.style.color = 'var(--text-secondary)'; el.style.background = 'var(--surface-1)'; }}
                  >{t}</button>
                ))}
              </div>

              <div
                style={{
                  display: 'flex', alignItems: 'flex-end', gap: 6,
                  background: '#f8fafc', borderRadius: 16,
                  border: '1.5px solid var(--surface-3)', padding: '8px 10px 8px 12px',
                  transition: 'border-color 200ms',
                }}
                onFocusCapture={e => (e.currentTarget.style.borderColor = '#3b82f6')}
                onBlurCapture={e  => (e.currentTarget.style.borderColor = 'var(--surface-3)')}
              >
                {([<Paperclip size={14} />, <Smile size={14} />] as React.ReactNode[]).map((icon, i) => (
                  <button key={i} style={{
                    width: 26, height: 26, border: 'none', background: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 7, transition: 'all 150ms', flexShrink: 0,
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#3b82f6'; el.style.background = '#eff6ff'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.background = 'none'; }}
                  >{icon}</button>
                ))}
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  rows={1}
                  style={{
                    flex: 1, border: 'none', background: 'transparent', resize: 'none',
                    fontSize: 13.5, color: 'var(--text-primary)', outline: 'none',
                    fontFamily: 'Inter, sans-serif', lineHeight: 1.5,
                    maxHeight: 96, overflowY: 'auto',
                  }}
                  onInput={e => {
                    const el = e.currentTarget;
                    el.style.height = 'auto';
                    el.style.height = Math.min(el.scrollHeight, 96) + 'px';
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  style={{
                    width: 34, height: 34, borderRadius: 10, border: 'none',
                    background: inputText.trim() ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'var(--surface-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                    flexShrink: 0, transition: 'all 200ms',
                    boxShadow: inputText.trim() ? '0 4px 10px rgba(37,99,235,.3)' : 'none',
                  }}
                >
                  <Send size={14} color={inputText.trim() ? 'white' : '#94a3b8'} />
                </button>
              </div>

              <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                <Lock size={8} color="var(--text-muted)" />
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
                  End-to-end encrypted
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`tm-chat-pane${!showChat ? ' tm-chat-hidden' : ''}`}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              background: '#f8fafc', gap: 12,
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: 'linear-gradient(135deg,rgba(99,102,241,.1),rgba(59,130,246,.1))',
              border: '1.5px solid rgba(99,102,241,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MessageSquare size={28} color="#6366f1" strokeWidth={1.5} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Team Meeting
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-muted)', fontWeight: 500, marginTop: 5, maxWidth: 240 }}>
                Select a conversation to start messaging your team.
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamMeeting;
