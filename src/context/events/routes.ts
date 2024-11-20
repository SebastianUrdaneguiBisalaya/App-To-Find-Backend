import { Router } from 'express';
import {
  getTrendingEvents,
  getThisWeekEvents,
  getUpcomingEvents,
  getInputSearchTrendingEvents,
  getInputSearchThisWeekEvents,
  getInputSearchUpcomingEvents,
  getEventDetailById,
  getUserHistoryEvents,
  getMyFavoriteEvents,
  toggleEventToFavorite,
} from './controller';
import { authorizationMiddleware } from '../../shared/middleware/authorization.middleware';

const router = Router();

router.get('/trendingevents', getTrendingEvents);
router.get('/thisweekevents', getThisWeekEvents);
router.get('/upcomingevents', getUpcomingEvents);
router.get('/istrendingevents', getInputSearchTrendingEvents);
router.get('/isthisweekevents', getInputSearchThisWeekEvents);
router.get('/isupcomingevents', getInputSearchUpcomingEvents);
router.get('/eventdetail/:event_id', getEventDetailById);
router.get(
  '/userhistoryevents/:user_id',
  authorizationMiddleware,
  getUserHistoryEvents,
);
router.get(
  '/myfavoritevents/:user_id',
  authorizationMiddleware,
  getMyFavoriteEvents,
);
router.post(
  '/toggle-favorite-events',
  authorizationMiddleware,
  toggleEventToFavorite,
);

export default router;
