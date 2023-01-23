import { Request } from 'express';
import passport from 'passport';
import {
  StrategyOptions,
  VerifyCallback,
  VerifyFunctionWithRequestAndParams,
} from 'passport-google-oauth2';
import { BadRequestError } from '../common';
import { User } from '../models/postgres/user-model';
import initPgUser from './new-user-postgres';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { verify } from 'jsonwebtoken';
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import { Strategy as GithubStrategy } from 'passport-github2';

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${process.env.API_URL}api/auth/github/callback`,
      scope: ['user:email'],
    },
    async function verify(
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: VerifyCallback
    ) {
      console.log(profile);
      const githubUser = {
        id: profile.id,
        email: profile.emails![0].value,
        username: profile.displayName,
      };
      let user = await User.findByEmail(githubUser.email!);
      console.log(user);
      if (user && user.authStrategy !== 'github') {
        console.log('fail');
        return cb(null, null);
      }

      if (!user) {
        console.log('Creating User');
        user = await User.insertNewUserOAuth(
          githubUser.email,
          githubUser.username,
          'github',
          githubUser.id
        );
      }
      return cb(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: `${process.env.API_URL}api/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'displayName'],
    },
    async function verify(accessToken, refreshToken, profile, cb) {
      console.log(profile.displayName);
      const githubUser = {
        id: profile.id,
        email: profile.emails![0].value,
        username: profile.displayName,
      };
      let user = await User.findByEmail(githubUser.email!);
      console.log(user);
      if (user && user.authStrategy !== 'facebook') {
        console.log('fail');
        return cb(null, null);
      }

      if (!user) {
        console.log('Creating User');
        user = await User.insertNewUserOAuth(
          githubUser.email,
          githubUser.username,
          'facebook',
          githubUser.id
        );
      }
      return cb(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}api/auth/google/callback`,
      state: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      cb: VerifyCallback
    ) => {
      console.log(
        'profile' + profile.provider + ' ' + profile.email + ' ' + profile.id
      );
      const googleUser = {
        id: profile.id,
        email: profile.email,
        username: profile.displayName,
      };
      let user = await User.findByEmail(googleUser.email);
      console.log(user);
      if (user && user.authStrategy !== 'google') {
        return cb(null, null);
      }

      if (!user) {
        console.log('Creating User');
        user = await User.insertNewUserOAuth(
          googleUser.email,
          googleUser.username,
          'google',
          googleUser.id
        );
      }
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user: any, cb) {
  console.log('serializing user');
  console.log(user);
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  console.log('deserialising user');
  return cb(null, user!);
  console.log(user);
});
