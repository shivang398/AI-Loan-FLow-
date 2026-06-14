import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import * as commsService from '../services/communications.service';
import { ok } from '../utils/response';

const router = Router();
router.use(authenticate);

router.get('/', async (req: Request, res: Response) => {
  const unreadOnly = req.query.unread === 'true';
  res.json(ok('Notifications fetched', await commsService.getNotifications(req.user!.id, unreadOnly)));
});

router.get('/unread-count', async (req: Request, res: Response) => {
  const notifs = await commsService.getNotifications(req.user!.id, true);
  res.json(ok('Unread count fetched', { count: notifs.length }));
});

router.put('/read-all', async (req: Request, res: Response) => {
  const notifs = await commsService.getNotifications(req.user!.id, true);
  await Promise.all(notifs.map((n) => commsService.markNotificationRead(n.id, req.user!.id)));
  res.json(ok('All notifications marked as read', { marked: notifs.length }));
});

router.put('/:id/read', async (req: Request, res: Response) => {
  res.json(ok('Marked as read', await commsService.markNotificationRead(req.params.id, req.user!.id)));
});

export default router;
