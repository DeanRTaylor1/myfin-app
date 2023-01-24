import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../common';
import { User as mongooseUser } from '../../models/mongoose/User';
import { User as postgresUser } from '../../models/postgres/user-model';

const router = express.Router();

router.delete(
  '/api/users',
  requireAuth,
  async (req: Request, res: Response) => {
    const { email } = req.headers;

    if (!email || typeof email !== 'string') {
      throw new BadRequestError('Missing Parameters');
    }
    try {
      const deletedItem = await postgresUser.deleteUserByEmail(email);
      console.log(deletedItem);
    } catch (err) {
      throw new BadRequestError('Something went wrong');
    }
    const user = await mongooseUser.findOne({ email });
    if (user) {
      try {
        const mongooseDeletedItem = await mongooseUser.deleteOne({
          email: email,
        });
        console.log(mongooseDeletedItem);
      } catch (err) {
        throw new BadRequestError('Something Went Wrong');
      }
    }

    req.session = null;

    res.status(200).send([{ message: 'Account Deleted Successfully' }]);
  }
);

export { router as deleteAccountRouter };
