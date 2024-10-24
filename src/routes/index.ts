import { Router } from 'express';
import AuthenticationRouter from '../context/auth/routes';
import EventsRouter from '../context/events/routes';
import UserRouter from '../context/users/routes';

const router = Router();

router.use('/auth', AuthenticationRouter);
router.use(EventsRouter);
router.use(UserRouter);

export default router;
