import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  password: process.env.POSTGRES_PASS,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_NAME,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
