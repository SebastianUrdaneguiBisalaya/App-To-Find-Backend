import { Router } from 'express';
import {
  getUsers, getUserById
} from './controller';

const router = Router();

router.get('/getUsers', getUsers);
router.get('/users/:user_id', getUserById);

// GET /getUsers

export default router;
