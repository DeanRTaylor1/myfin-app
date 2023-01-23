import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError,  NotAuthorizedError,  requireAuth, validateRequest } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';
import { User } from '../../../models/postgres/user-model';
import { apiLimiter } from '../../../services/rate-limiter';

const router = express.Router();

router.post(
  '/api/finances/outgoings',
  requireAuth,
  apiLimiter,
  body('currency')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Invalid currency!'),
  body('item')
    .trim()
    .escape()
    .isAlphanumeric()
    .withMessage('Invalid Item name'),
  body('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email!'),
  body('tag')
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Invalid Tag!'),
  body('cost')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Cost must be a number!'),
  validateRequest,
  async (req: Request, res: Response) => {
    const { item, currency, email, tag, cost } = req.body;

    if (!currency || !email || !tag || !cost || !item) {
      throw new BadRequestError('Missing Attributes');
    }
     if(email !== req.currentUser!.email){
      throw new NotAuthorizedError(); 
    }
    const { id } = await User.findByEmail(email);

    const addedItem = await Outgoings.insertNewRecord(
      item,
      currency,
      id,
      tag,
      cost
    );
    //remove the postgres id from the return as it is unused

    const outgoings = await Outgoings.findAll();
    console.log(outgoings);

    res.status(201).send(addedItem);
  }
);

export { router as outgoingsNewRouter };
