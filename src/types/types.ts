import { Ref } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongoose';

export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categoryIds?: Ref<ICategory>[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  productIds?: Ref<IProduct>[];
}

export interface QueryObject {
  displayName?: string;
  minRating?: number;
  price?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
}

export interface Result {
  find: any;
  sort: any;
  pagination: any;
}

interface Repository<T> {
  getAll: (query?: QueryObject) => Promise<T[]>;
  getById?: (id: ObjectId | string, query?: QueryObject) => Promise<T | null>;
}

export interface IProductRepository extends Repository<IProduct> {}
export interface ICategoryRepository extends Repository<ICategory> {}

export interface IProductTypeOrmRepository extends IProductRepository {}
export interface IProductTypegooseRepository extends IProductRepository {}

export interface ICategoryTypeOrmRepository extends ICategoryRepository {}
export interface ICategoryTypegooseRepository extends ICategoryRepository {}
