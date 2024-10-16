import { Router } from 'express';
import {
  getTrendingEvents,
  getThisWeekEvents,
  getUpcomingEvents,
} from './controller';

const router = Router();

router.get('/trendingevents', getTrendingEvents);
// GET /trendingevents?limit=10&offset=0
router.get('/thisweekevents', getThisWeekEvents);
// GET /thisweekevents?limit=10&offset=0
router.get('/upcomingevents', getUpcomingEvents);
// GET /upcomingevents?limit=10&offset=0

export default router;
