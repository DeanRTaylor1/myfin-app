import passport from 'passport';
import express, { Request, Response } from 'express';

const router = express.Router();
import jwt from 'jsonwebtoken';

const successLoginUrl = 'http://localhost:3000/auth/signin';
const errorLoginUrl = 'http://localhost:3000/auth/signin';

router.get(
  '/api/login/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/api/users/auth/facebook/callback',
  passport.authenticate('facebook', {
    successReturnToOrRedirect: '/api/users/facebookconfirm',
    failureRedirect: '/api/users/facebookfail',
  }),
  (req, res) => {
    console.log('Req:' + req);

    res.send('Thank you for signing in!');
  }
);

router.get('/api/users/facebookconfirm', (req: Request, res: Response) => {
  console.log(req.session?.passport.user);
  const { id, username, email } = req.session?.passport.user;
  console.log('id: ' + id);
  const userJwt = jwt.sign({ id, username, email }, process.env.JWT_KEY!);
  //env variable checked in index.ts
  //store in session object
  req.session = { jwt: userJwt };

  res.status(201).redirect('http://www.myfin.dev/auth/confirm/oauth');
});

router.get('/api/users/facebookfail', (req: Request, res: Response) => {
  console.log('Auth does not match');

  res.status(400).redirect('http://www.myfin.dev/auth/confirm/oauth');
});
export { router as facebookRouter };
