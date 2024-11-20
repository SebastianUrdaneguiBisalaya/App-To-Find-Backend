import { Router } from 'express';
import { handler } from './middleware';

const router = Router();

router.post('/upload', handler, (_req, res) => {
  res.send('File uploaded successfully');
});

export default router;
