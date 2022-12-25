import { Router } from 'express';
import passport from 'passport';
import { AccountRepository } from '../repositories/accountRepository';
import jwtCheck from '../middlewares/jwtCheck';
import { comparePassword, hashPassword } from '../helpers/hash';

export const ProfileRouter = (router: Router): void => {
  router.get('/profile', jwtCheck, async (req, res, next) => {
    const { username } = req.body;
    if (username) {
      const account = await AccountRepository.getByUsername(username);
      if (account) {
        res.send({ account: { username: account.username, firstName: account.firstName, lastName: account.lastName } });
      } else res.status(401).send('account was not found');
    } else res.status(400).send('username field is invalid');
  });

  router.put('/profile', jwtCheck, async (req, res, next) => {
    const { username, firstName, lastName } = req.body;
    await AccountRepository.getByUsername(username)
      .then(async (account) => {
        if (!account) res.status(404).send('account was not found');
        else if (account) {
          account.firstName = firstName;
          account.lastName = lastName;
          const updatedData = await AccountRepository.update(account);
          if (updatedData)
            res.send({
              account: { username: account.username, firstName: account.firstName, lastName: account.lastName },
              info: 'your data has been successfully changed.',
            });
          else res.status(500).send('something went wrong.');
        }
      })
      .catch((err) => next(err));
  });

  router.post('/profile/password', jwtCheck, async (req, res, next) => {
    const { username, password } = req.body;
    await AccountRepository.getByUsername(username)
      .then(async (account) => {
        if (!account) res.status(404).send('account was not found');
        else {
          if (await comparePassword(password, account.password))
            next(res.status(400).send('new password should not be the same as old password'));
          account.password = await hashPassword(password);
          const updatedData = await AccountRepository.update(account);
          if (updatedData) res.send(res.send('your password has been successfully changed.'));
          else res.status(500).send('something went wrong.');
        }
      })
      .catch((err) => next(err));
  });
};
