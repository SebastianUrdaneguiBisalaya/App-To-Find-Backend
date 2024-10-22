import { Router } from 'express';

import {
  getUserById,
  updateUser,
} from './controller';

const router = Router();

router.get('/users/:id', getUserById);
// GET /users/:id

router.put('/users/:id', updateUser);
// PUT /users/:id

export default router;
