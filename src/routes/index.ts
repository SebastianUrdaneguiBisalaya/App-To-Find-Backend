import { Router } from 'express';
import AuthenticationRouter from '../context/auth/routes';
import EventsRouter from '../context/events/routes';
import UserRouter from '../context/users/routes';
import PaymentsRouter from '../context/payments/routes';
import UploadImageRouter from '../uploadImages/routes';

const router = Router();

router.use('/auth', AuthenticationRouter);
router.use(EventsRouter);
router.use(UserRouter);
router.use('/payments', PaymentsRouter);
router.use(UploadImageRouter);

export default router;
