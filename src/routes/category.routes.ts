import { Router, Request, Response } from 'express';
import { CategoryRepository } from '../repositories/categoryRepository';

export const CategoryRouter = (router: Router): void => {
  router.get('/categories', async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const products = await CategoryRepository.getAll(query);
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send('Error getting categories: ' + err);
    }
  });
};
