import { Router } from 'express';
import AuthenticationRouter from '../context/auth/routes';
import EventsRouter from '../context/events/routes';
import UserRouter from '../context/users/routes';
import PaymentsRouter from '../context/payments/routes';
import LoginWithGoogleRouter from '../context/authgoogle/routes';

const router = Router();

router.use('/auth2', AuthenticationRouter);
router.use('/auth', LoginWithGoogleRouter);
router.use(EventsRouter);
router.use(UserRouter);
router.use('/payments', PaymentsRouter);

export default router;
