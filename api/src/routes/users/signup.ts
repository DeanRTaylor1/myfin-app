import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '../../common';
import { User } from '../../models/mongoose/User';
import { confirmationEmailHandler } from '../../services/nodemailer';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid').normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username must be between 4 s 20 characters')
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new BadRequestError('Details not provided');
    }

    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new BadRequestError('Username in use');
    }

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    //password hashing as middleware in User Model

    const user = User.build({ username, email, password });
    await user.save();

    if (process.env.TEST_EMAIL && email === process.env.TEST_EMAIL) {
      user.confirmed = true;
      await user.save();
      const userJwt = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_KEY!
      );
      //env variable checked in index.ts
      //store in session object
      req.session = { jwt: userJwt };

      return res.status(201).send(user);
    }
    confirmationEmailHandler.sendConfirmationEmail(username, email, user._id);

    res.status(201).send(user);
  }
);

export { router as signupRouter };

//email confirmation now required so commenting this out temporarily
// //generate jwt
// const userJwt = jwt.sign(
//   { id: user.id, username: user.username, email: user.email },
//   process.env.JWT_KEY!
// );
// //env variable checked in index.ts
// //store in session object
// req.session = { jwt: userJwt };
