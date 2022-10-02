import { ICategoryRepository, IProductRepository } from './types/types';
import { connectMongoDb } from './db/mongodb';

import CategoryTypegooseRepository from './repositories/category/categoryTypegooseRepository';
import ProductTypegooseRepository from './repositories/product/productTypegooseRepository';

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
  }
}

export { database, ProductRepository, CategoryRepository };
