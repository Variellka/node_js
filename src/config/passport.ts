import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AccountRepository } from '../repositories/accountRepository';
import passportJWT from 'passport-jwt';
import { comparePassword } from '../helpers/hash';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(function (username, password, done) {
    return AccountRepository.getByUsername(username)
      .then(async (account) => {
        if (!account)
          return done(null, false, {
            message: 'user does not exist!',
          });
        if (account && !(await comparePassword(password, account.password)))
          return done(null, false, {
            message: 'password is wrong!',
          });
        return done(null, { username, id: account._id }, { message: 'logged in successfully' });
      })
      .catch((err) => done(err));
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRETO_PARA_ENCRIPTACION',
    },
    function (jwtPayload, done) {
      return AccountRepository.getById(jwtPayload.id)
        .then((account) => {
          if (!account)
            return done(null, false, {
              message: 'something went wrong',
            });
          return done(null, account);
        })
        .catch((err) => done(err));
    }
  )
);
