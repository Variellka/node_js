import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './models/product-model';
import { Сategory } from './models/category-model';
import logger from './../../helpers/logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'node_postgresql',
  entities: [Сategory, Product],
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
