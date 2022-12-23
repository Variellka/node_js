import { Router } from 'express';
import passport from 'passport';
import { AccountRepository } from '../repositories/accountRepository';
import jwtCheck from '../middlewares/jwtCheck';

export const ProfileRouter = (router: Router): void => {
  router.get('/profile', jwtCheck, async (req, res, next) => {
    const { username } = req.body;
    if (username) {
      const account = await AccountRepository.getByUsername(username);
      if (account) {
        res.status(200).send({ username: account.username, firstName: account.firstName, lastName: account.lastName });
      } else res.status(401).send('account was not found');
    } else res.status(400).send('username field is invalid');
  });
};
