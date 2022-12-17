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
};
