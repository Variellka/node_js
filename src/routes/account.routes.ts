import { Router } from 'express';
import { AccountRepository } from '../repositories/accountRepository';
import jwt from 'jsonwebtoken';
import passport from 'passport';

export const AuthRouter = (router: Router): void => {
  router.post('/register', async (req, res, next) => {
    try {
      const { username, password, firstName, lastName } = req.body;
      const newAccount = await AccountRepository.create({
        username,
        password,
        firstName,
        lastName,
      });
      res.status(200).send(newAccount);
    } catch (err) {
      next(err);
    }
    next();
  });

  router.post('/authenticate', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, account, info) => {
      if (err || !account) {
        return res.status(400).json({
          error: 'something is not right!',
          info: info || err.message || 'server error',
        });
      }
      req.login(account, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(account, 'your_jwt_secret');
        return res.json({ account, token, info: info.message });
      });
    })(req, res);
  });
};
