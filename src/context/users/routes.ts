import { Router } from 'express';
import { deleteUser, getUserById, updateUser } from './controller';
import { authorizationMiddleware } from '../../shared/middleware/authorization.middleware';

const router = Router();

router.get('/users/:id', authorizationMiddleware, getUserById);
router.put('/users/:id', authorizationMiddleware, updateUser);
router.delete('/users/:id', authorizationMiddleware, deleteUser);

export default router;
