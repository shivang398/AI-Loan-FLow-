import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as commsService from '../services/communications.service';
import { ok, fail } from '../utils/response';

const router = Router();

// WhatsApp lives in whatsapp.routes.ts; this router only serves team meetings
router.use(authenticate);

// ── Team Meetings ─────────────────────────────────────────────────────────────
router.get('/team-meetings/rooms/:roomKey', async (req: Request, res: Response) => {
  res.json(ok('Room ready', await commsService.getOrCreateRoom(req.params.roomKey)));
});

router.get('/team-meetings/rooms/:roomKey/messages', async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string ?? '0');
  const size = parseInt(req.query.size as string ?? '50');
  res.json(ok('Messages fetched', await commsService.getRoomMessages(req.params.roomKey, page, size)));
});

router.post('/team-meetings/rooms/:roomKey/messages', async (req: Request, res: Response) => {
  const { senderName, senderRole, senderInitials, body, messageType } = req.body;
  if (!senderName || !body) { res.status(400).json(fail('senderName and body are required')); return; }
  res.status(201).json(ok('Message sent', await commsService.saveRoomMessage({ roomKey: req.params.roomKey, senderId: req.user!.id, senderName, senderRole, senderInitials, body, messageType })));
});

export default router;
