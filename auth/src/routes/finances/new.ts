import express, { Response, Request } from 'express';
import { requireAuth } from '../../common';

const router = express.Router();

router.post(
  '/api/finances/new',
  requireAuth,
  async (req: Request, res: Response) => {
    res.send('TBC');
  }
);
