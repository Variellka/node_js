import { IAccountRepository } from '../types/types';

import AccountTypegooseRepository from './account/accountTypegooseRepository';
import AccountTypeOrmRepository from './account/accountTypeOrmRepository';

let AccountRepository: IAccountRepository;

function createAccountTypegooseRepository() {
  AccountRepository = new AccountTypegooseRepository();
}

function createAccountTypeOrmRepository() {
  AccountRepository = new AccountTypeOrmRepository();
}

export { createAccountTypegooseRepository, createAccountTypeOrmRepository, AccountRepository };
