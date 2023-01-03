import { Router, Request, Response } from 'express';
import { ProductRepository } from '../repositories/productRepository';

export const BuyerRouter = (router: Router): void => {
  router.get('/products/:id', async (req: Request, res: Response) => {
    try {
      const product = await ProductRepository.getById(req.params.id);
      res.status(200).send(product);
    } catch (err: any) {
      res.status(err.status || 500).send({
        status: err.status,
        message: err.message,
      });
    }
  });
};
