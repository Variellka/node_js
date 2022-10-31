import express from 'express';
import { ProductRouter } from './src/routes/product.routes';
import { database } from './src';
require('dotenv').config();
database.connect();

const app = express();
const PORT = process.env.PORT || 3000;

const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

ProductRouter(router);

app.listen(PORT, function () {
  console.log(`server started on PORT ${PORT}`);
});
