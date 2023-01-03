require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import { ProductRouter, CategoryRouter, AuthRouter, ProfileRouter, BuyerRouter } from './src/routes';
import { database } from './src';
import logger from './src/helpers/logger';
import './src/config/passport';
database.connect();

const app = express();
const PORT = process.env.PORT || 3000;

const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

app.use((req, res) => {
  if (res.writableEnded) {
    logger.log({
      level: 'info',
      message: `New request from ${req.url}. Response status is ${res.statusCode}.`,
    });
  } else {
    logger.log({
      level: 'warn',
      message: `New request from ${req.url}. Response status is 404, route was not found.`,
    });
    res.status(404).send('404 - Page not found');
  }
});

ProductRouter(router);
CategoryRouter(router);
AuthRouter(router);
ProfileRouter(router);
BuyerRouter(router);

app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `Server started on PORT ${PORT}`,
  });
});
