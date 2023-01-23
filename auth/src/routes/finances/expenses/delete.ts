import express, { Request, Response } from 'express';
import { header } from 'express-validator';
import { BadRequestError, requireAuth, validateRequest } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { User } from '../../../models/postgres/user-model';
import { checkUserId } from '../../../services/check-userid';

const router = express.Router();

router.delete(
  '/api/finances/expenses',
  requireAuth,
  header('item')
    .trim()
    .escape(),
  header('userid')
    .trim()
    .escape(),
  validateRequest,
  async (req: Request, res: Response) => {
    const { userid, item, datespent } = req.headers;

    if (!userid || !item || !datespent) {
      throw new BadRequestError('Missing Attributes');
    }

    // const { id } = await User.findByEmail(email);

    if (
      isNaN(+userid) ||
      typeof item !== 'string' ||
      typeof datespent !== 'string'
    ) {
      throw new BadRequestError('Missing Paramaters');
    }
    const validUser = await checkUserId(req.currentUser!.email, +userid)
    if (!validUser) {
      throw new BadRequestError('Something went wrong')
    }


    const response = await Expenses.deleteExpenseRecord(
      item,
      +userid,
      datespent
    );

    res.status(200).send(response);
  }
);

export { router as deleteExpenseRouter };
