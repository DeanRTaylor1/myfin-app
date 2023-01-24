import express, { Request, Response } from 'express';
import { header } from 'express-validator';
import { BadRequestError, requireAuth, validateRequest } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';
import { checkUserId } from '../../../services/check-userid';

const router = express.Router();

router.delete(
  '/api/finances/outgoings',
  requireAuth,
  header('item')
    .trim()
    .escape(),
  header('userid')
    .trim()
    .escape(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { item, userid } = req.headers;
    if (!userid || typeof item !== 'string' || typeof +userid !== 'number') {
      throw new BadRequestError('Missing Parameters');
    }
    const existingItem = await Outgoings.findExistingItemByName(item);
    if (!existingItem) {
      throw new BadRequestError('Item does not exist');
    }
    const validUser = await checkUserId(req.currentUser!.email, +userid)
    if (!validUser) {
      throw new BadRequestError('Something went wrong')
    }
    await Outgoings.deleteOutgoingRecords(item, +userid);
    res.status(200).send([{ message: 'Removed Item Successfully' }]);
  }
);

export { router as deleteOutgoingRouter };
