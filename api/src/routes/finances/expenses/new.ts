import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, NotAuthorizedError, requireAuth, validateRequest } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { User } from '../../../models/postgres/user-model';
import { apiLimiter } from '../../../services/rate-limiter';

const router = express.Router();

router.post(
  '/api/finances/expenses',
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
  body('dateSpent')
    .trim()
    .escape(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { item, cost, currency, tag, dateSpent, email } = req.body;

    console.log(req.body);

    if (!item || !cost || !currency || !tag || !dateSpent || !email) {
      throw new BadRequestError('Missing Attributes');
    }
    if(email !== req.currentUser!.email){
      throw new NotAuthorizedError(); 
    }
    const { id } = await User.findByEmail(email);

    const result = await Expenses.insertNewExpense(
      item,
      cost,
      currency,
      tag,
      dateSpent,
      id
    );
    console.log(result);
    res.send(result);
  }
);

export { router as expensesNewRouter };
