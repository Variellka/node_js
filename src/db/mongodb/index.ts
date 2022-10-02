import mongoose from 'mongoose';

export const connectMongoDb = (): void => {
  const connectionString: string = process.env.MONGO_DATABASE_URL || '';
  mongoose.connect(connectionString);

  let db = mongoose.connection;
  db.on('error', (error: string) => {
    console.error('error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', () => {
    console.log('MongoDB connected successfully');
  });
  db.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
};
