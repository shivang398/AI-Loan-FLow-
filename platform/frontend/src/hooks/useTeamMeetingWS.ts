import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  receiveMessage, setTyping, setWSStatus, setRoomOnline, updateMessageStatus,
} from '../store/slices/teamMeetingSlice';
import type { TeamMessage, TeamRoom, WSConnectionStatus } from '../store/slices/teamMeetingSlice';
import { RootState } from '../store';

/* ─── Wire protocol ─── */
type WSOutbound =
  | { type: 'JOIN_ROOM';    roomId: string; userId: string }
  | { type: 'LEAVE_ROOM';   roomId: string; userId: string }
  | { type: 'SEND_MESSAGE'; roomId: string; userId: string; payload: Omit<TeamMessage, 'id' | 'status'> }
  | { type: 'TYPING_START'; roomId: string; userId: string }
  | { type: 'TYPING_STOP';  roomId: string; userId: string }
  | { type: 'MARK_READ';    roomId: string; userId: string; messageId: string };

type WSInbound =
  | { type: 'NEW_MESSAGE';     roomId: string; payload: TeamMessage }
  | { type: 'TYPING_START';    roomId: string; senderId: string }
  | { type: 'TYPING_STOP';     roomId: string; senderId: string }
  | { type: 'PRESENCE_UPDATE'; roomId: string; userId: string; isOnline: boolean }
  | { type: 'MESSAGE_STATUS';  roomId: string; messageId: string; status: TeamMessage['status'] };

/* ─── Role-aware peer reply templates ─── */
const ROLE_REPLIES: Record<string, string[]> = {
  RM_to_CONNECTOR: [
    'I\'ve checked your file — one more document needed. Please upload ITR for last 2 years.',
    'CIBIL looks clean. Moving this to the underwriting queue now.',
    'The lender needs a fresh salary slip. Current one is more than 3 months old.',
    'Great work! This file has been sanctioned. Disbursement in 48 hours.',
    'I\'ll escalate this to Ops for priority processing.',
  ],
  CONNECTOR_to_RM: [
    'Documents uploaded. Please review at your earliest convenience.',
    'Client has agreed to provide the co-applicant. Should I add them to the form?',
    'The property valuation is done. Sending the report via Document Library now.',
    'Client is asking for a revised EMI schedule. Can you share one?',
    'New lead just qualified — CIBIL 748, salary ₹85K. Submitting application.',
  ],
  RM_to_OPERATIONS: [
    'File is doc-complete on our end. Please prioritise for credit review.',
    'Connector has re-uploaded the salary slips. Should be in the queue now.',
    'Can you check the SLA status on APP-99220? Client is following up.',
    'Please add a query note on APP-99221 for the employment verification.',
  ],
  OPERATIONS_to_RM: [
    'Credit approved. Moving to disbursement. Payout will reflect in 24 hours.',
    'Query raised on APP-99218 — employment letter does not match income stated.',
    'All three files processed. TAT was within SLA.',
    'Salary slip verified via NSDL. File cleared for sanction.',
  ],
  ADMIN_to_RM: [
    'Monthly target revised. New disbursement goal: ₹2.5 Cr for Q2.',
    'Please ensure all connectors complete their KYC renewal this week.',
    'Good performance metrics this month. Keep it up.',
    'New lender partnership active from Monday — ICICI updated rate card shared.',
  ],
  ADMIN_to_OPERATIONS: [
    'SLA breach percentage is at 18% — needs to come under 10% by month end.',
    'New verification SOP uploaded to Document Library. Please follow from today.',
    'Three team members approved for training on Tuesday.',
    'Daily ops report must be shared by 6 PM going forward.',
  ],
  ADMIN_to_TEAM_LEADER: [
    'New connector batch (12 members) approved for onboarding this quarter.',
    'Performance dashboard updated. Review your team metrics.',
    'Compliance audit scheduled for next Wednesday. Please prepare.',
    'Training calendar for Q3 has been shared on the portal.',
  ],
  TEAM_LEADER_to_CONNECTOR: [
    'Good progress this month! Focus on the two files pending CIBIL re-check.',
    'New product: Bajaj Finserv Home Loan at 8.5%. Start sourcing leads.',
    'Your payout for last month has been processed. Check Earnings section.',
    'Please attend the connector briefing on Friday at 3 PM via video call.',
  ],
  OPERATIONS_to_CONNECTOR: [
    'Your document for APP-99218 is received. Processing now.',
    'There is a mismatch in the bank statement — please re-upload a clear scan.',
    'Application approved! Disbursement letter will be sent to the client.',
    'Please ask your client to sign the sanction letter digitally via the portal.',
  ],
  DEFAULT: [
    'Noted. I will action this shortly.',
    'Thanks for the update.',
    'On it — will revert by EOD.',
    'Acknowledged. Let me check and get back to you.',
  ],
};

function getReplyKey(senderRole: string, receiverRole: string): string {
  const key = `${senderRole}_to_${receiverRole}`;
  return ROLE_REPLIES[key] ? key : 'DEFAULT';
}
function pickReply(senderRole: string, receiverRole: string): string {
  const pool = ROLE_REPLIES[getReplyKey(senderRole, receiverRole)];
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ─── Simulation engine ─── */
class SimulationEngine {
  private timers: ReturnType<typeof setTimeout>[] = [];

  simulateResponse(
    room: TeamRoom,
    myRole: string,
    onTypingStart: (roomId: string) => void,
    onTypingStop: (roomId: string) => void,
    onMessage: (msg: TeamMessage) => void,
  ) {
    const peer = room.participantA.role === myRole ? room.participantB : room.participantA;
    const peerRole = peer.role;
    const typingDelay = 700 + Math.random() * 800;
    const replyDelay  = typingDelay + 1600 + Math.random() * 2200;

    const t1 = setTimeout(() => onTypingStart(room.id), typingDelay);
    const t2 = setTimeout(() => {
      onTypingStop(room.id);
      const newMsg: TeamMessage = {
        id: `sim-${Date.now()}`,
        roomId: room.id,
        senderId: peer.id,
        senderName: peer.name,
        senderRole: peerRole,
        senderInitials: peer.initials,
        body: pickReply(peerRole, myRole),
        timestamp: new Date().toISOString(),
        status: 'DELIVERED',
        type: 'TEXT',
      };
      onMessage(newMsg);
    }, replyDelay);

    this.timers.push(t1, t2);
  }

  clear() { this.timers.forEach(clearTimeout); this.timers = []; }
}

/* ─── WebSocket constants ─── */
const WS_URL = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws/team-meeting`;
// After 2 fast retries (~2.5 s total) fall through to simulation — the backend
// team-meeting WS endpoint is optional; simulation provides full UX offline.
const MAX_RECONNECT_DELAY_MS = 1_500;

export function useTeamMeetingWS() {
  const dispatch = useDispatch();
  const { user }  = useSelector((state: RootState) => state.auth);
  const { rooms } = useSelector((state: RootState) => state.teamMeeting);

  const wsRef           = useRef<WebSocket | null>(null);
  const reconnectDelay  = useRef(500);
  const reconnectTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSimulated     = useRef(false);
  const simEngine       = useRef(new SimulationEngine());

  const setStatus = useCallback((s: WSConnectionStatus) => {
    dispatch(setWSStatus(s));
  }, [dispatch]);

  const send = useCallback((frame: WSOutbound) => {
    if (!isSimulated.current && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(frame));
    }
  }, []);

  const handleFrame = useCallback((frame: WSInbound) => {
    switch (frame.type) {
      case 'NEW_MESSAGE':      dispatch(receiveMessage(frame.payload)); break;
      case 'TYPING_START':     dispatch(setTyping({ roomId: frame.roomId, isTyping: true })); break;
      case 'TYPING_STOP':      dispatch(setTyping({ roomId: frame.roomId, isTyping: false })); break;
      case 'PRESENCE_UPDATE':  dispatch(setRoomOnline({ roomId: frame.roomId, isOnline: frame.isOnline })); break;
      case 'MESSAGE_STATUS':   dispatch(updateMessageStatus({ messageId: frame.messageId, roomId: frame.roomId, status: frame.status })); break;
    }
  }, [dispatch]);

  const enterSimulation = useCallback(() => {
    isSimulated.current = true;
    setStatus('SIMULATED');
    setTimeout(() => {
      rooms.filter(r => r.isOnline).forEach(r =>
        dispatch(setRoomOnline({ roomId: r.id, isOnline: true }))
      );
    }, 500);
  }, [rooms, setStatus, dispatch]);

  const scheduleReconnect = useCallback(() => {
    if (reconnectTimer.current) return;
    reconnectTimer.current = setTimeout(() => {
      reconnectTimer.current = null;
      if (reconnectDelay.current >= MAX_RECONNECT_DELAY_MS) {
        enterSimulation();
        return;
      }
      reconnectDelay.current = Math.min(reconnectDelay.current * 2, MAX_RECONNECT_DELAY_MS);
      connect(); // eslint-disable-line
    }, reconnectDelay.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterSimulation]);

  const connect = useCallback(() => {
    if (wsRef.current) return;
    setStatus('CONNECTING');

    let ws: WebSocket;
    try { ws = new WebSocket(WS_URL); } catch { enterSimulation(); return; }
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectDelay.current = 1_000;
      setStatus('CONNECTED');
      rooms.forEach(r => send({ type: 'JOIN_ROOM', roomId: r.id, userId: user?.id ?? 'guest' }));
    };
    ws.onmessage = (ev) => {
      try { handleFrame(JSON.parse(ev.data) as WSInbound); } catch { /* ignore */ }
    };
    ws.onerror = () => { /* errors always precede close */ };
    ws.onclose = () => {
      wsRef.current = null;
      if (isSimulated.current) return;
      setStatus('RECONNECTING');
      scheduleReconnect();
    };
  }, [rooms, user, send, handleFrame, setStatus, enterSimulation, scheduleReconnect]);

  /* ─── Public API ─── */
  const sendChatMessage = useCallback((
    msgPayload: Omit<TeamMessage, 'id' | 'status'>,
    room: TeamRoom,
  ) => {
    if (!isSimulated.current) {
      send({ type: 'SEND_MESSAGE', roomId: msgPayload.roomId, userId: user?.id ?? 'guest', payload: msgPayload });
    }
    if (isSimulated.current) {
      simEngine.current.simulateResponse(
        room,
        user?.role ?? 'RM',
        (roomId) => dispatch(setTyping({ roomId, isTyping: true })),
        (roomId) => dispatch(setTyping({ roomId, isTyping: false })),
        (newMsg)  => dispatch(receiveMessage(newMsg)),
      );
    }
  }, [send, user, dispatch]);

  const sendTypingStart = useCallback((roomId: string) => {
    send({ type: 'TYPING_START', roomId, userId: user?.id ?? 'guest' });
  }, [send, user]);

  const sendTypingStop = useCallback((roomId: string) => {
    send({ type: 'TYPING_STOP', roomId, userId: user?.id ?? 'guest' });
  }, [send, user]);

  const sendMarkRead = useCallback((roomId: string, messageId: string) => {
    send({ type: 'MARK_READ', roomId, userId: user?.id ?? 'guest', messageId });
  }, [send, user]);

  /* ─── Lifecycle ─── */
  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      simEngine.current.clear();
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
        wsRef.current = null;
      }
      // Reset so a re-mount enters simulation quickly again
      reconnectDelay.current = 500;
      isSimulated.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { sendChatMessage, sendTypingStart, sendTypingStop, sendMarkRead };
}
