import { IProductRepository } from '../types/types';

import ProductTypegooseRepository from './product/productTypegooseRepository';
import ProductTypeOrmRepository from './product/productTypeOrmRepository';

let ProductRepository: IProductRepository;

function createProductTypegooseRepository() {
  ProductRepository = new ProductTypegooseRepository();
}

function createProductTypeOrmRepository() {
  ProductRepository = new ProductTypeOrmRepository();
}

export { createProductTypegooseRepository, createProductTypeOrmRepository, ProductRepository };
