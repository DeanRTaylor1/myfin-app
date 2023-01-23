import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';

const router = express.Router();

router.get(
  '/api/finances/outgoings',
  requireAuth,
  async (req: Request, res: Response) => {
    const { email, page } = req.headers;
    console.log(email, page);
    if (!email || !page || isNaN(+page)) {
      return new BadRequestError('Missing Paramaters');
    }

    if (typeof email !== 'string') {
      throw new BadRequestError('Details not provided');
    }
    //first page should be page 1
    const items = await Outgoings.getRecordsByUser(email, +page);

    console.log(items);

    res.status(200).send(items);
  }
);

export { router as getOutgoingsRouter };
