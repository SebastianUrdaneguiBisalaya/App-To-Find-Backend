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
} from './controller';

const router = Router();

router.get('/trendingevents', getTrendingEvents);
// GET /trendingevents?limit=10&offset=0
router.get('/thisweekevents', getThisWeekEvents);
// GET /thisweekevents?limit=10&offset=0
router.get('/upcomingevents', getUpcomingEvents);
// GET /upcomingevents?limit=10&offset=0
router.get('/istrendingevents', getInputSearchTrendingEvents);
// GET http://localhost:3000/istrendingevents?event_date_start=2024-10-01&event_date_end=2024-12-31&event_name=boys&limit=10&offset=0
router.get('/isthisweekevents', getInputSearchThisWeekEvents);
// GET http://localhost:3000/isthisweekevents?event_date_start=2024-10-01&event_date_end=2024-12-31&event_name=boys&limit=10&offset=0
router.get('/isupcomingevents', getInputSearchUpcomingEvents);
// GET http://localhost:3000/isupcomingevents?event_date_start=2024-10-01&event_date_end=2024-12-31&event_name=boys&limit=10&offset=0
router.get('/eventdetail/:event_id', getEventDetailById);
// GET http://localhost:3000/eventdetail/01013117-8426-4b5e-be85-aa6f45d3220b
router.get('/userhistoryevents/:user_id', getUserHistoryEvents);
// GET http://localhost:3000/userhistoryevents/01013117-8426-4b5e-be85-aa6f45d3220b

export default router;
