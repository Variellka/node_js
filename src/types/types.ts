import { Ref } from '@typegoose/typegoose/lib/types';
import { ObjectId } from 'mongoose';

export interface IProduct {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categories: ICategory[] | Ref<ICategory>[];
  ratings: IRating[];
}

export interface IProductMongo {
  _id?: ObjectId;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categories: Ref<ICategory>[];
  ratings: IRating[];
}

export interface IProductPostgres {
  _id?: string;
  displayName: string;
  createdAt: Date;
  totalRating: number;
  price: number;
  categories: ICategory[];
  ratings: IRating[];
}

export interface ICategory {
  _id?: ObjectId | string;
  displayName: string;
  createdAt: Date;
  products: IProduct[] | Ref<IProduct>[];
}

export interface ICategoryMongo {
  _id?: ObjectId;
  displayName: string;
  createdAt: Date;
  products: Ref<IProduct>[];
}

export interface ICategoryPostgres {
  _id?: string;
  displayName: string;
  createdAt: Date;
  products: IProduct[];
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

export interface IAccount {
  _id?: ObjectId | string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ILoggedUser {
  id: ObjectId | string;
  username: string;
}

export interface IRating {
  _id?: string;
  userId: ObjectId | string;
  rating: number;
  product: IProduct;
}

export interface IOrderListMangoProducts {
  quantity: number;
  product: Ref<IProductMongo>;
}
export interface IOrderListPostgresProducts {
  _id?: string;
  quantity: number;
  product: IProductPostgres;
}
export interface IOrderListProducts {
  _id?: ObjectId | string;
  quantity: number;
  product: Ref<IProductMongo> | IProductPostgres;
}
export interface IOrderListMongo {
  _id?: ObjectId;
  user: Ref<IAccount>;
  products: IOrderListMangoProducts[];
}
export interface IOrderListPostgres {
  _id?: string;
  user: IAccount;
  products: IOrderListPostgresProducts[];
}
export interface IOrderList {
  _id?: ObjectId | string;
  user: IAccount | Ref<IAccount>;
  products: IOrderListProducts[];
}

interface ProductRepository<T> {
  getAll: (query?: QueryObject) => Promise<T[]>;
  getById: (id: any) => Promise<IProduct | null>;
  rateProduct: (productId: string, ratingObj: IRating) => Promise<IProduct | null>;
}

interface CategoryRepository<T> {
  getAll: () => Promise<T[]>;
  getById: (id: any, query?: QueryObject) => Promise<T | null>;
}

interface AccountRepository<T> {
  create: (entity: T) => Promise<T>;
  getByUsername: (username: string) => Promise<T | null>;
  getById: (id: any) => Promise<T | null>;
  update: (entity: T) => Promise<boolean>;
  delete: (entity: T) => Promise<boolean>;
}

interface OrderRepository<T> {
  getByUserId: (id: string) => Promise<T | null>;
  create: (userId: string, productId: string, quantity: number) => Promise<T | null>;
  update: (userId: string, productId: string, quantity: number) => Promise<T | null>;
  // delete: (entity: T) => Promise<boolean>;
}

export interface IProductRepository extends ProductRepository<IProduct> {}
export interface ICategoryRepository extends CategoryRepository<ICategory> {}
export interface IAccountRepository extends AccountRepository<IAccount> {}
export interface IOrderRepository extends OrderRepository<IOrderList> {}

export interface IProductTypeOrmRepository extends IProductRepository {}
export interface IProductTypegooseRepository extends IProductRepository {}

export interface ICategoryTypeOrmRepository extends ICategoryRepository {}
export interface ICategoryTypegooseRepository extends ICategoryRepository {}

export interface IAccountTypeOrmRepository extends IAccountRepository {}
export interface IAccountTypegooseRepository extends IAccountRepository {}

export interface IOrderTypeOrmRepository extends IOrderRepository {}
export interface IOrderTypegooseRepository extends IOrderRepository {}
