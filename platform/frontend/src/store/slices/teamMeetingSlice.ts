import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ADMIN' | 'RM' | 'OPERATIONS' | 'TEAM_LEADER' | 'CONNECTOR';
export type WSConnectionStatus = 'CONNECTING' | 'CONNECTED' | 'RECONNECTING' | 'DISCONNECTED' | 'SIMULATED';

export interface RoomParticipant {
  id: string;
  name: string;
  initials: string;
  role: UserRole;
  color: string;
}

export interface TeamMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderInitials: string;
  body: string;
  timestamp: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  type: 'TEXT' | 'FILE' | 'SYSTEM';
}

export interface TeamRoom {
  id: string;
  participantA: RoomParticipant;
  participantB: RoomParticipant;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface TeamMeetingState {
  rooms: TeamRoom[];
  activeRoomId: string | null;
  messagesByRoom: Record<string, TeamMessage[]>;
  loading: boolean;
  isSending: boolean;
  typingByRoom: Record<string, boolean>;
  wsStatus: WSConnectionStatus;
}

/* ─── Participant registry ─── */
const P = {
  admin:   { id: 'u-admin', name: 'Platform Admin',  initials: 'PA', role: 'ADMIN'       as UserRole, color: '#6366f1' },
  priya:   { id: 'u-rm1',   name: 'Priya Sharma',    initials: 'PS', role: 'RM'          as UserRole, color: '#3b82f6' },
  sunil:   { id: 'u-rm2',   name: 'Sunil Gavaskar',  initials: 'SG', role: 'RM'          as UserRole, color: '#0ea5e9' },
  vikram:  { id: 'u-ops1',  name: 'Vikram Batra',    initials: 'VB', role: 'OPERATIONS'  as UserRole, color: '#f59e0b' },
  deepika: { id: 'u-ops2',  name: 'Deepika Nair',    initials: 'DN', role: 'OPERATIONS'  as UserRole, color: '#f97316' },
  rajan:   { id: 'u-tl1',   name: 'Rajan Mehta',     initials: 'RM', role: 'TEAM_LEADER' as UserRole, color: '#8b5cf6' },
  arjun:   { id: 'u-con1',  name: 'Arjun Kumar',     initials: 'AK', role: 'CONNECTOR'   as UserRole, color: '#10b981' },
  saira:   { id: 'u-con2',  name: 'Saira Bano',      initials: 'SB', role: 'CONNECTOR'   as UserRole, color: '#14b8a6' },
  rahul:   { id: 'u-con3',  name: 'Rahul Das',       initials: 'RD', role: 'CONNECTOR'   as UserRole, color: '#ef4444' },
  meera:   { id: 'u-con4',  name: 'Meera Singh',     initials: 'MS', role: 'CONNECTOR'   as UserRole, color: '#ec4899' },
};

/* ─── Mock rooms covering all role pairs ─── */
const MOCK_ROOMS: TeamRoom[] = [
  /* RM ↔ Connector */
  {
    id: 'r-rm-con1', participantA: P.priya, participantB: P.arjun,
    lastMessage: 'Please review the HDFC file I submitted.',
    lastMessageTime: '2026-05-19T10:42:00Z', unreadCount: 3, isOnline: true, status: 'ACTIVE',
  },
  {
    id: 'r-rm-con2', participantA: P.priya, participantB: P.saira,
    lastMessage: 'Documents uploaded for Loan #2347.',
    lastMessageTime: '2026-05-19T09:15:00Z', unreadCount: 0, isOnline: true, status: 'ACTIVE',
  },
  {
    id: 'r-rm-con3', participantA: P.priya, participantB: P.rahul,
    lastMessage: 'Client is asking for a status update.',
    lastMessageTime: '2026-05-18T17:30:00Z', unreadCount: 1, isOnline: false, status: 'ACTIVE',
  },
  {
    id: 'r-rm-con4', participantA: P.sunil, participantB: P.meera,
    lastMessage: 'Thank you for the quick approval!',
    lastMessageTime: '2026-05-18T14:00:00Z', unreadCount: 0, isOnline: false, status: 'ACTIVE',
  },
  /* RM ↔ Operations */
  {
    id: 'r-rm-ops1', participantA: P.priya, participantB: P.vikram,
    lastMessage: 'APP-99218 is ready for final credit review.',
    lastMessageTime: '2026-05-19T08:55:00Z', unreadCount: 2, isOnline: true, status: 'ACTIVE',
  },
  /* Admin ↔ RM */
  {
    id: 'r-admin-rm1', participantA: P.admin, participantB: P.priya,
    lastMessage: 'Q2 disbursement targets updated in MIS.',
    lastMessageTime: '2026-05-19T07:30:00Z', unreadCount: 1, isOnline: true, status: 'ACTIVE',
  },
  /* Admin ↔ Operations */
  {
    id: 'r-admin-ops1', participantA: P.admin, participantB: P.vikram,
    lastMessage: 'SLA breach report due by EOD Friday.',
    lastMessageTime: '2026-05-18T16:00:00Z', unreadCount: 0, isOnline: false, status: 'ACTIVE',
  },
  /* Admin ↔ Team Leader */
  {
    id: 'r-admin-tl1', participantA: P.admin, participantB: P.rajan,
    lastMessage: 'New connector batch onboarding approved.',
    lastMessageTime: '2026-05-17T11:00:00Z', unreadCount: 0, isOnline: true, status: 'ACTIVE',
  },
  /* Operations ↔ Connector */
  {
    id: 'r-ops-con1', participantA: P.vikram, participantB: P.arjun,
    lastMessage: 'Salary slip is still missing for APP-99218.',
    lastMessageTime: '2026-05-19T09:50:00Z', unreadCount: 4, isOnline: true, status: 'ACTIVE',
  },
  {
    id: 'r-ops-con2', participantA: P.deepika, participantB: P.saira,
    lastMessage: 'Bank statement verified. Case moving forward.',
    lastMessageTime: '2026-05-19T08:20:00Z', unreadCount: 0, isOnline: true, status: 'ACTIVE',
  },
  /* Team Leader ↔ Connector */
  {
    id: 'r-tl-con1', participantA: P.rajan, participantB: P.arjun,
    lastMessage: 'Your monthly target: 15 disbursals. You are at 9.',
    lastMessageTime: '2026-05-19T08:00:00Z', unreadCount: 1, isOnline: true, status: 'ACTIVE',
  },
  {
    id: 'r-tl-con2', participantA: P.rajan, participantB: P.meera,
    lastMessage: 'Great job on the Axis Bank closure!',
    lastMessageTime: '2026-05-18T15:30:00Z', unreadCount: 0, isOnline: false, status: 'ACTIVE',
  },
  /* Team Leader ↔ RM */
  {
    id: 'r-tl-rm1', participantA: P.rajan, participantB: P.priya,
    lastMessage: 'Three connectors need reassignment this week.',
    lastMessageTime: '2026-05-18T10:00:00Z', unreadCount: 2, isOnline: true, status: 'ACTIVE',
  },
];

/* ─── Mock messages for key rooms ─── */
const sys = (roomId: string, body: string, time: string): TeamMessage => ({
  id: `sys-${roomId}`, roomId, senderId: 'system', senderName: 'System',
  senderRole: 'ADMIN', senderInitials: 'SY', body, timestamp: time,
  status: 'READ', type: 'SYSTEM',
});

const msg = (
  id: string, roomId: string,
  sender: RoomParticipant,
  body: string, time: string,
  status: TeamMessage['status'] = 'READ',
): TeamMessage => ({
  id, roomId, senderId: sender.id, senderName: sender.name,
  senderRole: sender.role, senderInitials: sender.initials,
  body, timestamp: time, status, type: 'TEXT',
});

const MOCK_MESSAGES: Record<string, TeamMessage[]> = {
  'r-rm-con1': [
    sys('r-rm-con1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-19T08:00:00Z'),
    msg('m1', 'r-rm-con1', P.arjun, 'Good morning! I submitted a new HDFC Home Loan file. Loan ₹12L. Please review?', '2026-05-19T09:15:00Z'),
    msg('m2', 'r-rm-con1', P.priya, 'Good morning Arjun! CIBIL looks fine. I need the last 6-month bank statements.', '2026-05-19T09:32:00Z'),
    msg('m3', 'r-rm-con1', P.arjun, 'I\'ll collect from client by EOD and upload via Document Library.', '2026-05-19T09:45:00Z'),
    msg('m4', 'r-rm-con1', P.priya, 'Yes — tag the application ID when uploading. Ops team needs that for routing.', '2026-05-19T09:47:00Z'),
    msg('m5', 'r-rm-con1', P.arjun, 'Please review the HDFC file I submitted.', '2026-05-19T10:42:00Z', 'DELIVERED'),
  ],
  'r-rm-con2': [
    sys('r-rm-con2', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-18T10:00:00Z'),
    msg('m10', 'r-rm-con2', P.saira, 'Hi! New client for SBI Personal Loan ₹5.5L. CIBIL 760. Should I proceed?', '2026-05-19T09:00:00Z'),
    msg('m11', 'r-rm-con2', P.priya, 'CIBIL 760 is excellent. Proceed — run FOIR first. Keep EMI obligations under 45%.', '2026-05-19T09:05:00Z'),
    msg('m12', 'r-rm-con2', P.saira, 'Documents uploaded for Loan #2347.', '2026-05-19T09:15:00Z', 'READ'),
  ],
  'r-rm-ops1': [
    sys('r-rm-ops1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-19T07:00:00Z'),
    msg('m20', 'r-rm-ops1', P.priya, 'Hi Vikram, APP-99218 for Arjun Mehta — all docs verified on our end. Ready for credit.', '2026-05-19T08:40:00Z'),
    msg('m21', 'r-rm-ops1', P.vikram, 'Got it. I\'ll assign to the underwriting queue. Expected TAT 4 hours.', '2026-05-19T08:48:00Z'),
    msg('m22', 'r-rm-ops1', P.priya, 'APP-99218 is ready for final credit review.', '2026-05-19T08:55:00Z', 'DELIVERED'),
  ],
  'r-admin-rm1': [
    sys('r-admin-rm1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-19T07:00:00Z'),
    msg('m30', 'r-admin-rm1', P.admin, 'Priya, Q2 disbursement targets have been updated. Please review in MIS Reports.', '2026-05-19T07:25:00Z'),
    msg('m31', 'r-admin-rm1', P.priya, 'Thank you. I\'ll review and brief my connector team today.', '2026-05-19T07:28:00Z'),
    msg('m32', 'r-admin-rm1', P.admin, 'Q2 disbursement targets updated in MIS.', '2026-05-19T07:30:00Z', 'DELIVERED'),
  ],
  'r-admin-ops1': [
    sys('r-admin-ops1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-18T14:00:00Z'),
    msg('m40', 'r-admin-ops1', P.admin, 'Vikram — 4 SLA breaches this week. Please send a detailed report.', '2026-05-18T15:45:00Z'),
    msg('m41', 'r-admin-ops1', P.vikram, 'On it. Report will be ready by EOD Friday along with root cause analysis.', '2026-05-18T15:58:00Z'),
    msg('m42', 'r-admin-ops1', P.admin, 'SLA breach report due by EOD Friday.', '2026-05-18T16:00:00Z', 'READ'),
  ],
  'r-ops-con1': [
    sys('r-ops-con1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-19T09:00:00Z'),
    msg('m50', 'r-ops-con1', P.vikram, 'Arjun, the salary slip for APP-99218 is missing. Please upload immediately.', '2026-05-19T09:35:00Z'),
    msg('m51', 'r-ops-con1', P.arjun, 'Apologies! Client will send it by 2 PM today. I\'ll upload right away.', '2026-05-19T09:42:00Z'),
    msg('m52', 'r-ops-con1', P.vikram, 'Salary slip is still missing for APP-99218.', '2026-05-19T09:50:00Z', 'DELIVERED'),
  ],
  'r-tl-con1': [
    sys('r-tl-con1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-19T07:30:00Z'),
    msg('m60', 'r-tl-con1', P.rajan, 'Arjun, mid-month review — you\'re at 9 disbursals vs target of 15. Push for 6 more this fortnight.', '2026-05-19T07:55:00Z'),
    msg('m61', 'r-tl-con1', P.arjun, 'Understood Rajan sir. I have 4 active files in review. Will accelerate.', '2026-05-19T07:58:00Z'),
    msg('m62', 'r-tl-con1', P.rajan, 'Your monthly target: 15 disbursals. You are at 9.', '2026-05-19T08:00:00Z', 'DELIVERED'),
  ],
  'r-tl-rm1': [
    sys('r-tl-rm1', 'Team Meeting started. All messages are end-to-end encrypted.', '2026-05-18T09:00:00Z'),
    msg('m70', 'r-tl-rm1', P.rajan, 'Priya, Rajesh Gupta and two other connectors need RM reassignment this week.', '2026-05-18T09:55:00Z'),
    msg('m71', 'r-tl-rm1', P.priya, 'Noted. I\'ll coordinate with Admin and confirm by Wednesday.', '2026-05-18T09:58:00Z'),
    msg('m72', 'r-tl-rm1', P.rajan, 'Three connectors need reassignment this week.', '2026-05-18T10:00:00Z', 'DELIVERED'),
  ],
};

/* ─── Room filter helpers (which rooms each role sees) ─── */
export function getRoomsForRole(rooms: TeamRoom[], role: UserRole): TeamRoom[] {
  return rooms.filter(r =>
    r.participantA.role === role || r.participantB.role === role
  );
}

/* ─── Slice ─── */
const initialState: TeamMeetingState = {
  rooms: MOCK_ROOMS,
  activeRoomId: null,
  messagesByRoom: MOCK_MESSAGES,
  loading: false,
  isSending: false,
  typingByRoom: {},
  wsStatus: 'CONNECTING',
};

const teamMeetingSlice = createSlice({
  name: 'teamMeeting',
  initialState,
  reducers: {
    setActiveRoom: (state, action: PayloadAction<string>) => {
      state.activeRoomId = action.payload;
      const room = state.rooms.find(r => r.id === action.payload);
      if (room) room.unreadCount = 0;
    },
    sendMessage: (state, action: PayloadAction<Omit<TeamMessage, 'id' | 'status'>>) => {
      const newMsg: TeamMessage = { ...action.payload, id: `m-${Date.now()}`, status: 'SENT' };
      if (!state.messagesByRoom[newMsg.roomId]) state.messagesByRoom[newMsg.roomId] = [];
      state.messagesByRoom[newMsg.roomId].push(newMsg);
      const room = state.rooms.find(r => r.id === newMsg.roomId);
      if (room) { room.lastMessage = newMsg.body; room.lastMessageTime = newMsg.timestamp; }
    },
    receiveMessage: (state, action: PayloadAction<TeamMessage>) => {
      const m = action.payload;
      if (!state.messagesByRoom[m.roomId]) state.messagesByRoom[m.roomId] = [];
      state.messagesByRoom[m.roomId].push(m);
      const room = state.rooms.find(r => r.id === m.roomId);
      if (room) {
        room.lastMessage = m.body;
        room.lastMessageTime = m.timestamp;
        if (state.activeRoomId !== m.roomId) room.unreadCount += 1;
      }
    },
    markRoomRead: (state, action: PayloadAction<string>) => {
      const room = state.rooms.find(r => r.id === action.payload);
      if (room) room.unreadCount = 0;
    },
    setTyping: (state, action: PayloadAction<{ roomId: string; isTyping: boolean }>) => {
      state.typingByRoom[action.payload.roomId] = action.payload.isTyping;
    },
    setWSStatus: (state, action: PayloadAction<WSConnectionStatus>) => {
      state.wsStatus = action.payload;
    },
    setRoomOnline: (state, action: PayloadAction<{ roomId: string; isOnline: boolean }>) => {
      const room = state.rooms.find(r => r.id === action.payload.roomId);
      if (room) room.isOnline = action.payload.isOnline;
    },
    updateMessageStatus: (state, action: PayloadAction<{ messageId: string; roomId: string; status: TeamMessage['status'] }>) => {
      const msgs = state.messagesByRoom[action.payload.roomId];
      if (msgs) {
        const m = msgs.find(m => m.id === action.payload.messageId);
        if (m) m.status = action.payload.status;
      }
    },
  },
});

export const {
  setActiveRoom, sendMessage, receiveMessage, markRoomRead,
  setTyping, setWSStatus, setRoomOnline, updateMessageStatus,
} = teamMeetingSlice.actions;
export default teamMeetingSlice.reducer;
