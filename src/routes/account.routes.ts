import { Router } from 'express';
import { AccountRepository } from '../repositories/accountRepository';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import randtoken from 'rand-token';

const refreshTokens: { [key: string]: string } = {};
const SECRET = 'SECRETO_PARA_ENCRIPTACION';

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

        const token = jwt.sign(JSON.parse(JSON.stringify(account)), SECRET, { expiresIn: 300 });
        const refreshToken = randtoken.uid(256);
        refreshTokens[refreshToken] = account.username;
        return res.json({
          username: account.username,
          token,
          refreshToken,
          info: info.message,
        });
      });
    })(req, res);
  });

  router.post('/token', async (req, res, next) => {
    const { username, refreshToken } = req.body;
    if (refreshTokens[refreshToken] === username) {
      await AccountRepository.getByUsername(username).then((account) => {
        if (account) {
          const token = jwt.sign(JSON.parse(JSON.stringify(account)), SECRET, {
            expiresIn: 600,
          });
          return res.json({
            accountUsername: account.username,
            token,
          });
        }
      });
    } else return res.status(400).send('refresh token or username is wrong!');
  });
};
