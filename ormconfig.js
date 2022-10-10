const ormConfig = {
  type: 'postgres',
  user: 'postgres',
  password: process.env.POSTGRES_PASS,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_NAME,
};

module.exports = ormConfig;
