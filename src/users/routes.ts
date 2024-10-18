import { Router } from 'express';

import {
  getUserById,
  getUserByEmail,
  updateUser,
} from './controller';

const router = Router();

router.get('/users/:id', getUserById);
// GET /users/:id

router.get('/users/email/:email', getUserByEmail);
// GET /users/email/:email

router.put('/users/:id', updateUser);
// PUT /users/:id

export default router;
