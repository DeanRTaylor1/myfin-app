import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';
import { apiLimiter } from '../../../services/rate-limiter';

const router = express.Router();
//TODO add update router
router.put(
  '/api/finances/outgoings',
  requireAuth,
  apiLimiter,
  async (req: Request, res: Response) => {
    const { email, item, currency, userId, tag, cost } = req.body;

    const existingItem = await Outgoings.updateExistingRecord(
      email,
      item,
      currency,
      tag,
      cost
    );

    console.log(existingItem);
    if (!existingItem) {
      throw new BadRequestError('Item does not exist');
    }

    res.status(200).send([existingItem]);
  }
);

export { router as updateDutgoingRouter };
