import { Router } from 'express';
import { checkout, success, cancel } from './controller';
import { asyncHandler } from '../../utils/asyncHandler';
import { authorizationMiddleware } from '../../shared/middleware/authorization.middleware';

const router = Router();

router.post('/checkout', authorizationMiddleware, asyncHandler(checkout));
router.get('/success', asyncHandler(success));
router.get('/cancel', asyncHandler(cancel));

export default router;
