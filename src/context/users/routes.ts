import { Router } from 'express';
import { getUserById, updateUser } from './controller';
import { authorizationMiddleware } from '../../shared/middleware/authorization.middleware';

const router = Router();

router.get('/users/:id', authorizationMiddleware, getUserById);
// GET /users/:id

router.put('/users/:id', authorizationMiddleware, updateUser);
// PUT /users/:id

export default router;
