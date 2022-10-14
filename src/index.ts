import { ICategoryRepository, IProductRepository } from './types/types';
import { connectMongoDb } from './db/mongodb';
import { connectPostgreSQL } from './db/postgres';

import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import ProductTypegooseRepository from './repositories/product/productTypegooseRepository';
import CategoryTypeOrmRepository from './repositories/category/categoryTypeOrmRepository';
import ProductTypeOrmRepository from './repositories/product/productTypeOrmRepository';

let ProductRepository: IProductRepository;
let CategoryRepository: ICategoryRepository;

const database = {
  connect,
};

async function connect(): Promise<void> {
  if (process.env.CURRENT_DB === 'mongo') {
    await connectMongoDb();
    ProductRepository = new ProductTypegooseRepository();
    CategoryRepository = new CategoryTypegooseRepository();
  } else if (process.env.CURRENT_DB === 'postgres') {
    await connectPostgreSQL();
    ProductRepository = new ProductTypeOrmRepository();
    CategoryRepository = new CategoryTypeOrmRepository();
  }
}

export { database, ProductRepository, CategoryRepository };
