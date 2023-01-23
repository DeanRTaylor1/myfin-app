import express, { Request, Response } from 'express';
import { header } from 'express-validator';
import { BadRequestError, requireAuth, validateRequest } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { User } from '../../../models/postgres/user-model';

const router = express.Router();

router.get(
  '/api/finances/expenses',
  requireAuth,
  header('email')
    .trim()
    .escape()
    .isEmail()
    .withMessage('Invalid email'),
  header('page')
    .trim()
    .escape(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, page } = req.headers;
    if (!page || typeof email !== 'string' || isNaN(+page!)) {
      throw new BadRequestError('Missing Parameters');
    }
    const { id } = await User.findByEmail(email);
    const allItems = await Expenses.findAllByUserId(id, +page);
    res.status(200).send(allItems);
  }
);

export { router as expensesIndexRouter };
