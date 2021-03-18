/**
 * Creating Authentication middleware
 */

// imports
import passport from 'passport';
import passportJWT from 'passport-jwt';
import Logger from '../lib/Logger.js';
import dotenv from 'dotenv';

// init dotenv
dotenv.config();

// initialise passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// define options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

// use passport
passport.use(
  new JwtStrategy(opts, async (jwtData, done) => {
    try {
      Logger.info(`${jwtData.username} does an authenticated request`);
      return done(null, jwtData.username);
    } catch (error) {
      done(null, error);
    }
  })
);

export default (req, res, next) => {
  if (req.method == 'GET') {
    // we no need authentication on get requests
    next();
  } else {
    // authenticate user
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error || !user) {
        Logger.error(info);
        res.status(401).send(info);
      } else {
        next();
      }
    })(req, res, next);
  }
};
