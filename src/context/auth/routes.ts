import { asyncHandler } from './../../utils/asyncHandler';
import { Router } from 'express';
import { signUp, login, verifyAccount } from './controller';
import { validateData } from '../../shared/middleware/validation.middleware';
import { SignUpSchema, LoginSchema } from './schema';

const router = Router();

router.post('/sign-up', validateData(SignUpSchema), asyncHandler(signUp));
router.post('/login', validateData(LoginSchema), asyncHandler(login));
router.post('/verify', asyncHandler(verifyAccount));

export default router;
