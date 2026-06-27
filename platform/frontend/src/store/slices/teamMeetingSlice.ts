import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ADMIN' | 'RM' | 'OPERATIONS' | 'TEAM_LEADER' | 'CONNECTOR' | 'PARTNER_MANAGER' | 'TELECALLER';
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

export function getRoomsForRole(rooms: TeamRoom[], role: UserRole): TeamRoom[] {
  return rooms.filter(r =>
    r.participantA.role === role || r.participantB.role === role
  );
}

const ROLE_COLOR: Record<UserRole, string> = {
  ADMIN:           '#6366f1',
  RM:              '#3b82f6',
  OPERATIONS:      '#f59e0b',
  TEAM_LEADER:     '#8b5cf6',
  CONNECTOR:       '#10b981',
  PARTNER_MANAGER: '#ec4899',
  TELECALLER:      '#06b6d4',
};

export function buildParticipant(id: string, name: string, role: UserRole): RoomParticipant {
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
  return { id, name, initials, role, color: ROLE_COLOR[role] ?? '#64748b' };
}

const initialState: TeamMeetingState = {
  rooms: [],
  activeRoomId: null,
  messagesByRoom: {},
  loading: false,
  isSending: false,
  typingByRoom: {},
  wsStatus: 'CONNECTING',
};

const teamMeetingSlice = createSlice({
  name: 'teamMeeting',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<TeamRoom[]>) => {
      state.rooms = action.payload;
      // seed a system message for any new room that has no messages yet
      action.payload.forEach(r => {
        if (!state.messagesByRoom[r.id]) {
          state.messagesByRoom[r.id] = [{
            id: `sys-${r.id}`,
            roomId: r.id,
            senderId: 'system',
            senderName: 'System',
            senderRole: 'ADMIN',
            senderInitials: 'SY',
            body: 'Team Meeting started. All messages are end-to-end encrypted.',
            timestamp: new Date().toISOString(),
            status: 'READ',
            type: 'SYSTEM',
          }];
        }
      });
    },
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
      const msgs = state.messagesByRoom[m.roomId];
      // Replace the optimistic copy (id starts with 'm-') if body+sender match
      const optimisticIdx = msgs.findIndex(
        x => x.id.startsWith('m-') && x.senderId === m.senderId && x.body === m.body,
      );
      if (optimisticIdx !== -1) {
        msgs[optimisticIdx] = m;
      } else if (!msgs.some(x => x.id === m.id)) {
        msgs.push(m);
      }
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
  setRooms, setActiveRoom, sendMessage, receiveMessage, markRoomRead,
  setTyping, setWSStatus, setRoomOnline, updateMessageStatus,
} = teamMeetingSlice.actions;
export default teamMeetingSlice.reducer;
