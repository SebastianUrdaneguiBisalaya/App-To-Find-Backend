import { Router } from 'express';
import AuthenticationRouter from '../context/auth/routes';
import EventsRouter from '../context/events/routes';

const router = Router();

router.use('/auth', AuthenticationRouter);
router.use('/events', EventsRouter);

export default router;
