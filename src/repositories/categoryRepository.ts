import { ICategoryRepository } from '../types/types';

import CategoryTypegooseRepository from './category/categoryTypegooseRepository';
import CategoryTypeOrmRepository from './category/categoryTypeOrmRepository';

let CategoryRepository: ICategoryRepository;

function createCategoryTypegooseRepository() {
  CategoryRepository = new CategoryTypegooseRepository();
}

function createCategoryTypeOrmRepository() {
  CategoryRepository = new CategoryTypeOrmRepository();
}

export { createCategoryTypegooseRepository, createCategoryTypeOrmRepository, CategoryRepository };
