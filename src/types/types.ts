import { Ref } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongoose';

export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categories?: Ref<ICategory>[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  products?: Ref<IProduct>[];
}

export interface QueryObject {
  displayName?: string;
  minRating?: number;
  price?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
  includeProducts?: boolean;
  includeTop3Products?: string;
}

export interface Result {
  find?: any;
  sort?: any;
  where?: any;
  order?: any;
  pagination?: any;
  skip?: any;
  take?: any;
}

interface ProductRepository<T> {
  getAll: (query?: QueryObject) => Promise<T[]>;
}

interface CategoryRepository<T> {
  getAll: () => Promise<T[]>;
  getById: (id: ObjectId | string, query?: QueryObject) => Promise<T | null>;
}

export interface IProductRepository extends ProductRepository<IProduct> {}
export interface ICategoryRepository extends CategoryRepository<ICategory> {}

export interface IProductTypeOrmRepository extends IProductRepository {}
export interface IProductTypegooseRepository extends IProductRepository {}

export interface ICategoryTypeOrmRepository extends ICategoryRepository {}
export interface ICategoryTypegooseRepository extends ICategoryRepository {}
