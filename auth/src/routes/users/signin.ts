import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { confirmationEmailHandler } from '../../services/nodemailer';
import jwt from 'jsonwebtoken';
import { Password } from '../../services/password';
import { User } from '../../models/mongoose/User';
import { BadRequestError, validateRequest } from '../../common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email bust be an email'),
    body('password').trim().notEmpty().withMessage('Password can not be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials'); //use generic error as we don't want to be too specific to end user
    }
    if (!existingUser.confirmed) {
      throw new BadRequestError('Please confirm your email!');
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }
    //generate jwt
    console.log(process.env.JWT_KEY)
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
      { expiresIn: '24h' }
    );
    //env variable checked in index.ts
    //store in session object
    req.session = { jwt: userJwt };
    //delete later
    console.log('\x1b[36m%s\x1b[0m', req.session);

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
