import passport from 'passport';
import express, { Request, Response } from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

const successLoginUrl = 'http://localhost:3000/auth/signin';
const errorLoginUrl = 'http://localhost:3000/auth/signin';

router.get('/api/login/github', passport.authenticate('github'));

router.get(
  '/api/users/auth/github/callback',
  passport.authenticate('github', {
    successReturnToOrRedirect: '/api/users/githubconfirm',
    failureRedirect: '/api/users/githubfail',
  }),
  (req, res) => {
    console.log('Req:' + req);

    res.send('Thank you for signing in!');
  }
);

router.get('/api/users/githubconfirm', (req: Request, res: Response) => {
  console.log(req.session?.passport.user);
  const { id, username, email } = req.session?.passport.user;
  console.log('id: ' + id);
  const userJwt = jwt.sign({ id, username, email }, process.env.JWT_KEY!);
  //env variable checked in index.ts
  //store in session object
  req.session = { jwt: userJwt };

  res.status(201).redirect('http://www.myfin.dev/auth/confirm/oauth');
});

router.get('/api/users/githubfail', (req: Request, res: Response) => {
  console.log('Auth does not match');

  res.status(400).redirect('www.myfin.dev/auth/confirm/oauth');
});
export { router as githubRouter };
