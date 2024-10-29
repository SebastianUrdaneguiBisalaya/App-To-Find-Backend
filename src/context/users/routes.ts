import { Router } from 'express';
import { deleteUser, getUserById, updateUser } from './controller';
import { authorizationMiddleware } from '../../shared/middleware/authorization.middleware';

const router = Router();

router.get('/users/:id', authorizationMiddleware, getUserById);
// GET /users/:id

router.put('/users/:id', authorizationMiddleware, updateUser);
// PUT /users/:id

router.delete('/users/:id', authorizationMiddleware, deleteUser);
// DELETE /users/:id

export default router;
