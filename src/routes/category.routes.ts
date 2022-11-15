import { Router, Request, Response } from 'express';
import { CategoryRepository } from '../repositories/categoryRepository';

export const CategoryRouter = (router: Router): void => {
  router.get('/categories', async (req: Request, res: Response) => {
    try {
      const categories = await CategoryRepository.getAll();
      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send('Error getting categories: ' + err);
    }
  });

  router.get('/categories/:id', async (req: Request, res: Response) => {
    const { query } = req;
    try {
      const category = await CategoryRepository.getById(req.params.id, query);
      res.status(200).send(category);
    } catch (err) {
      res.status(500).send('Error getting category by Id: ' + err);
    }
  });
};
