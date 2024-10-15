import { Router } from 'express';
import { getTrendingEvents } from './controller';

const router = Router();

router.get('/trendingEvents', getTrendingEvents);

export default router;
