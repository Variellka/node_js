import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgres';
import { createProductTypeOrmRepository, createProductTypegooseRepository } from './repositories/productRepository';
import { createCategoryTypegooseRepository, createCategoryTypeOrmRepository } from './repositories/categoryRepository';

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    createProductTypegooseRepository();
    createCategoryTypegooseRepository();
  } else if (process.env.CURRENT_DB === 'postgres') {
    await connectPostgreSQL();
    createProductTypeOrmRepository();
    createCategoryTypeOrmRepository();
  }
}

export { database };
