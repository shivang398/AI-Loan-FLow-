import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  conversationId: string;
  body: string;
  senderType: 'OPERATIONS' | 'CONNECTOR';
  timestamp: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  attachments?: string[];
}

export interface Conversation {
  id: string;
  connectorName: string;
  loanId: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface MessagingState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messagesByConversation: Record<string, Message[]>;
  loading: boolean;
}

const initialState: MessagingState = {
  conversations: [],
  activeConversationId: null,
  messagesByConversation: {},
  loading: false,
};

const messagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversationId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { conversationId } = action.payload;
      if (!state.messagesByConversation[conversationId]) {
        state.messagesByConversation[conversationId] = [];
      }
      state.messagesByConversation[conversationId].push(action.payload);
      
      // Update last message in conversation list
      const conv = state.conversations.find(c => c.id === conversationId);
      if (conv) {
        conv.lastMessage = action.payload.body;
        conv.updatedAt = action.payload.timestamp;
      }
    },
    updateMessageStatus: (state, action: PayloadAction<{ id: string, status: Message['status'] }>) => {
      Object.values(state.messagesByConversation).forEach(messages => {
        const msg = messages.find(m => m.id === action.payload.id);
        if (msg) msg.status = action.payload.status;
      });
    },
  },
});

export const { setConversations, setActiveConversation, addMessage, updateMessageStatus } = messagingSlice.actions;
export default messagingSlice.reducer;
