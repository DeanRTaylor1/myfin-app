import passport from 'passport';
import express, { Request, Response } from 'express';
import { isNamedExportBindings } from 'typescript';
const router = express.Router();
import jwt from 'jsonwebtoken';

const successLoginUrl = 'http://localhost:3000/auth/signin';
const errorLoginUrl = 'http://localhost:3000/auth/signin';

router.get(
  '/api/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/api/users/auth/google/callback',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/api/users/googleconfirm',
    failureRedirect: '/api/users/googlefail',
  }),
  (req, res) => {
    console.log('Req:' + req);

    res.send('Thank you for signing in!');
  }
);

router.get('/api/users/googleconfirm', (req: Request, res: Response) => {
  //console.log(req.session?.passport.user);
  const { id, username, email } = req.session?.passport.user;
  //console.log('id: ' + id);
  const userJwt = jwt.sign({ id, username, email }, process.env.JWT_KEY!);
  //env variable checked in index.ts
  //store in session object
  req.session = { jwt: userJwt };

  res.status(201).redirect('http://www.myfinapi.dev/auth/confirm/oauth');
});

router.get('/api/users/googlefail', (req: Request, res: Response) => {
  console.log('Auth does not match');

  res.status(400).redirect('http://www.myfinapi.dev/auth/error');
});
export { router as googleRouter };
