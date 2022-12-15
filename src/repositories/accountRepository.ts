import { IAccountRepository } from '../types/types';

import AccountTypegooseRepository from './account/accountTypegooseRepository';
import AccountTypeOrmRepository from './account/accountTypeOrmRepository';

let AccountRepository: IAccountRepository;

function createProductTypegooseRepository() {
  AccountRepository = new AccountTypegooseRepository();
}

function createProductTypeOrmRepository() {
  AccountRepository = new AccountTypeOrmRepository();
}

export { createProductTypegooseRepository, createProductTypeOrmRepository, AccountRepository };
