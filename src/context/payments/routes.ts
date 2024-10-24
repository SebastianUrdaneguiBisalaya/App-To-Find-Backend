import { Router } from 'express';
import { checkout, success } from './controller';
import { asyncHandler } from '../../utils/asyncHandler';

const router = Router();

router.post('/checkout', asyncHandler(checkout));
router.get('/success', asyncHandler(success));
// router.get('/cancel', success);

export default router;
