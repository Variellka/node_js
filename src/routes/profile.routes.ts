import { Router } from 'express';
import passport from 'passport';
import { AccountRepository } from '../repositories/accountRepository';

export const ProfileRouter = (router: Router): void => {
  router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const { username } = req.body;
    if (username) {
      const account = await AccountRepository.getByUsername(username);
      if (account) {
        res.status(200).send(account);
      } else res.status(401).send('account was not found');
    } else res.status(400).send('username field is invalid');
  });
};
