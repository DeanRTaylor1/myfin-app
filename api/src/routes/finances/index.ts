import express, { Request, Response } from 'express';
import { currentUser, requireAuth } from '../../common';
import { User } from '../../models/postgres/user-model';

const router = express.Router();

router.post(
  '/api/finances',
  requireAuth,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const userData = await User.findByEmail(email);
    console.log(userData);
    //remove the postgres id from the return as it is unused
    delete userData.id;
    delete userData.authStrategy;
    delete userData.authId;

    res.status(200).send(userData);
  }
);

export { router as indexFinancesRouter };
