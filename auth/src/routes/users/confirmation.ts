import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../models/mongoose/User';
import initPgUser from '../../services/new-user-postgres';
import { BadRequestError } from '../../common';

const router = express.Router();

router.put('/api/users/confirmation', async (req: Request, res: Response) => {
  const { userid } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    throw new BadRequestError('Invalid Token');
  }
  user.confirmed = true;
  await user.save();

  // new UserCreatedPublisher(natsWrapper.client).publish({
  //   email: user.email,
  //   username: user.username,
  // });
  await initPgUser(user.email, user.username);

  const userJwt = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_KEY!
  );
  //env variable checked in index.ts
  //store in session object
  req.session = { jwt: userJwt };

  res.status(201).send(user);
});

export { router as confirmationRouter };
