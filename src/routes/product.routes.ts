import { Router, Request, Response } from 'express';
import { ProductRepository } from '../repositories/productRepository';

export const ProductRouter = (router: Router): void => {
  router.get('/products', async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const products = await ProductRepository.getAll(query);
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send('Error getting products: ' + err);
    }
  });
};
