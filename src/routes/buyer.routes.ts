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
      const id = (req.user as ILoggedUser).id;
      if (id) {
        const order = await OrderRepository.getByUserId(id.toString());
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

  router.post('/order-list', jwtCheck, async (req: Request, res: Response) => {
    try {
      const { productId, quantity } = req.body;
      const { username, id } = req.user as ILoggedUser;
      if (username) {
        const order = await OrderRepository.getByUserId(id.toString());
        if (order) {
          const updatedOrder = await OrderRepository.update(id.toString(), productId, quantity);
          res.send(updatedOrder);
        } else {
          const newOrder = await OrderRepository.create(id.toString(), productId, quantity);
          res.send(newOrder);
        }
      }
    } catch (err: any) {
      res.status(err.status || 500).send({
        status: err.status,
        message: err.message,
      });
    }
  });

  router.post('/order-list/clear', jwtCheck, async (req: Request, res: Response) => {
    try {
      const id = (req.user as ILoggedUser).id;
      if (id) {
        const orderlistCleared = await OrderRepository.delete(id.toString());
        if (orderlistCleared) {
          res.send('you deleted all products from order-list');
        }
      }
    } catch (err: any) {
      res.status(err.status || 500).send({
        status: err.status,
        message: err.message,
      });
    }
  });
};
