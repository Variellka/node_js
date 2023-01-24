import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './models/product-model';
import { Category } from './models/category-model';
import { Account } from './models/account-model';
import { Rating } from './models/rating-model';
import { OrderList } from './models/order-list-model';
import { OrderListProducts } from './models/order-list-products-model';
import logger from './../../helpers/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASS as string,
  database: process.env.POSTGRES_DB_NAME as string,
  entities: [Category, Product, Account, Rating, OrderList, OrderListProducts],
  logging: true,
  synchronize: true,
});

export const connectPostgreSQL = () => {
  AppDataSource.initialize()
    .then(() => {
      logger.log({
        level: 'info',
        message: 'PostgreSQL connected successfully',
      });
    })
    .catch((error) => {
      logger.log({
        level: 'error',
        message: 'Error in PostgreSQL connection: ' + error.message,
      });
    });
};
