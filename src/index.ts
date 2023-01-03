import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgres';
import { createProductTypeOrmRepository, createProductTypegooseRepository } from './repositories/productRepository';
import { createCategoryTypegooseRepository, createCategoryTypeOrmRepository } from './repositories/categoryRepository';
import { createAccountTypegooseRepository, createAccountTypeOrmRepository } from './repositories//accountRepository';

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    createProductTypegooseRepository();
    createCategoryTypegooseRepository();
    createAccountTypegooseRepository();
  } else {
    await connectPostgreSQL();
    createProductTypeOrmRepository();
    createCategoryTypeOrmRepository();
    createAccountTypeOrmRepository();
  }
}

export { database };
