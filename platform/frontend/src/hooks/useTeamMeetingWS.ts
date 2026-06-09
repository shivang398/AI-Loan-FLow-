import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  receiveMessage, setTyping, setWSStatus, setRoomOnline,
} from '../store/slices/teamMeetingSlice';
import type { TeamMessage, TeamRoom, WSConnectionStatus } from '../store/slices/teamMeetingSlice';
import { RootState } from '../store';

function getAuthToken(): string | null {
  try { return sessionStorage.getItem('token'); } catch { return null; }
}

const MAX_RETRIES = 3;
const BASE_RETRY_DELAY_MS = 1000;

export function useTeamMeetingWS() {
  const dispatch    = useDispatch();
  const { user }    = useSelector((state: RootState) => state.auth);
  const wsRef       = useRef<WebSocket | null>(null);
  const joinedRef   = useRef<Set<string>>(new Set());
  const retriesRef  = useRef(0);
  const gaveUpRef   = useRef(false);

  const setStatus = useCallback((s: WSConnectionStatus) => {
    dispatch(setWSStatus(s));
  }, [dispatch]);

  // ─── Inbound frame handler ─────────────────────────────────────────────
  const handleFrame = useCallback((raw: string) => {
    let frame: any;
    try { frame = JSON.parse(raw); } catch { return; }

    switch (frame.type) {
      case 'NEW_MESSAGE': {
        const p = frame.payload;
        const msg: TeamMessage = {
          id:              p.id,
          roomId:          frame.roomId,
          senderId:        p.senderId,
          senderName:      p.senderName,
          senderRole:      p.senderRole,
          senderInitials:  p.senderInitials,
          body:            p.body,
          timestamp:       p.timestamp,
          status:          p.status ?? 'DELIVERED',
          type:            p.type ?? 'TEXT',
        };
        dispatch(receiveMessage(msg));
        break;
      }
      case 'TYPING_START':
        dispatch(setTyping({ roomId: frame.roomId, isTyping: true }));
        break;
      case 'TYPING_STOP':
        dispatch(setTyping({ roomId: frame.roomId, isTyping: false }));
        break;
      case 'PRESENCE_UPDATE':
        dispatch(setRoomOnline({ roomId: frame.roomId, isOnline: frame.isOnline }));
        break;
      default:
        break;
    }
  }, [dispatch]);

  // ─── Send helper — returns false if the socket is not open ────────────
  const sendFrame = useCallback((payload: object): boolean => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }, []);

  // ─── Connect ──────────────────────────────────────────────────────────
  const connect = useCallback(() => {
    // Already gave up or no token → stay in simulation mode, don't spam
    if (gaveUpRef.current) return;
    const token = getAuthToken();
    if (!token) { setStatus('SIMULATED'); return; }

    // Vite proxy forwards /ws/team-meeting → ws://127.0.0.1:8087/ws/team-meeting
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${window.location.host}/ws/team-meeting?token=${token}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    setStatus('CONNECTING');

    ws.onopen = () => {
      retriesRef.current = 0; // reset on successful connection
      setStatus('CONNECTED');
      joinedRef.current.forEach(roomId => {
        ws.send(JSON.stringify({ type: 'JOIN_ROOM', roomId, userId: user?.id ?? '' }));
      });
    };

    ws.onmessage = (evt) => handleFrame(evt.data);

    ws.onerror = () => setStatus('RECONNECTING');

    ws.onclose = () => {
      // If cleanup already cleared the ref, this is an intentional close — skip reconnect
      if (wsRef.current !== ws) return;
      wsRef.current = null;
      retriesRef.current += 1;
      if (retriesRef.current >= MAX_RETRIES) {
        // Backend WS not available — fall back to simulation, stop retrying
        gaveUpRef.current = true;
        setStatus('SIMULATED');
        return;
      }
      setStatus('DISCONNECTED');
      const delay = BASE_RETRY_DELAY_MS * Math.pow(2, retriesRef.current - 1);
      setTimeout(connect, Math.min(delay, 30_000));
    };
  }, [user?.id, setStatus, handleFrame]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    connect();
    return () => {
      const ws = wsRef.current;
      wsRef.current = null;  // clear ref first so onclose sees null !== ws and skips reconnect
      if (ws && ws.readyState !== WebSocket.CLOSING && ws.readyState !== WebSocket.CLOSED) {
        ws.close();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Public API ────────────────────────────────────────────────────────

  /** Join a room on the server so this session receives broadcasts for it. */
  const joinRoom = useCallback((roomId: string) => {
    if (joinedRef.current.has(roomId)) return;
    joinedRef.current.add(roomId);
    sendFrame({ type: 'JOIN_ROOM', roomId, userId: user?.id ?? '' });
  }, [sendFrame, user?.id]);

  /**
   * Send a chat message via real WebSocket.
   * The caller (TeamMeeting.tsx) already dispatched the message to Redux for
   * instant local display — this sends it to the backend to persist + broadcast.
   */
  const sendChatMessage = useCallback((
    msgPayload: Omit<TeamMessage, 'id' | 'status'>,
    room: TeamRoom,
  ): boolean => {
    return sendFrame({
      type:    'SEND_MESSAGE',
      roomId:  room.id,
      payload: { ...msgPayload },
    });
  }, [sendFrame]);

  const sendTypingStart = useCallback((roomId: string) => {
    sendFrame({ type: 'TYPING_START', roomId, userId: user?.id ?? '' });
  }, [sendFrame, user?.id]);

  const sendTypingStop = useCallback((roomId: string) => {
    sendFrame({ type: 'TYPING_STOP', roomId, userId: user?.id ?? '' });
  }, [sendFrame, user?.id]);

  const sendMarkRead = useCallback((roomId: string, messageId: string) => {
    sendFrame({ type: 'MARK_READ', roomId, messageId });
  }, [sendFrame]);

  return { sendChatMessage, sendTypingStart, sendTypingStop, sendMarkRead, joinRoom };
}
