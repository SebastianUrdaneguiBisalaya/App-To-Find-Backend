import { Router } from 'express';
import {
  getUsers, getUserByEmail
} from './controller';

const router = Router();

router.get('/getUsers', getUsers);
router.get('/users/:user_email', getUserByEmail);

// GET /getUsers

export default router;
