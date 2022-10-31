import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './models/product-model';
import { Сategory } from './models/category-model';

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
      console.log('PostgreSQL connected successfully');
    })
    .catch((error) => {
      console.error('error in PostgreSQL connection: ' + error);
    });
};
