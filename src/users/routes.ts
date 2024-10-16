import { Router } from 'express';
import {
  getUsers
} from './controller';

const router = Router();

router.get('/getUsers', getUsers);
// GET /getUsers

export default router;
