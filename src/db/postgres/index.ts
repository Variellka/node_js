import { createConnection } from 'typeorm';

export const connectPostgreSQL = async (): Promise<void> => {
  await createConnection()
    .then(() => {
      console.log('PostgreSQL connected successfully');
    })
    .catch((error) => {
      console.error('error in PostgreSQL connection: ' + error);
    });
};
