import mongoose from 'mongoose';
import logger from './../../helpers/logger';

export const connectMongoDb = (): void => {
  const connectionString: string = process.env.MONGO_DATABASE_URL || '';
  mongoose.connect(connectionString);

  let db = mongoose.connection;
  db.on('error', (error) => {
    logger.log({
      level: 'error',
      message: 'Error in MongoDb connection: ' + error.message,
    });
    mongoose.disconnect();
  });
  db.on('connected', () => {
    logger.log({
      level: 'info',
      message: 'MongoDB connected successfully',
    });
  });
  db.on('disconnected', () => {
    logger.log({
      level: 'info',
      message: 'MongoDB disconnected',
    });
  });
};
