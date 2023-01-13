import { Router, Request, Response } from 'express';
import jwtCheck from '../middlewares/jwtCheck';
import { ProductRepository } from '../repositories/productRepository';
import { OrderRepository } from '../repositories/orderRepository';
import { ILoggedUser, IProduct, IRating } from '../types/types';

export const BuyerRouter = (router: Router): void => {
  router.post('/products/:id/rate', jwtCheck, async (req: Request, res: Response) => {
    try {
      const product = await ProductRepository.getById(req.params.id);
      const { rating } = req.body;
      if (product) {
        const ratingObj: IRating = {
          userId: (req.user as ILoggedUser).id,
          rating: rating,
          product: product as IProduct,
        };
        const updatedProduct = await ProductRepository.rateProduct(req.params.id, ratingObj);
        res.status(200).send(updatedProduct);
      }
    } catch (err: any) {
      res.status(err.status || 500).send({
        status: err.status,
        message: err.message,
      });
    }
  });

  router.get('/order-list', jwtCheck, async (req: Request, res: Response) => {
    try {
      const username = (req.user as ILoggedUser).username;
      if (username) {
        console.log(OrderRepository);
        const order = await OrderRepository.getByUsername(username);
        if (order) {
          res.send(order);
        } else res.status(200).send('no products in order');
      }
    } catch (err: any) {
      res.status(err.status || 500).send({
        status: err.status,
        message: err.message,
      });
    }
  });
};
