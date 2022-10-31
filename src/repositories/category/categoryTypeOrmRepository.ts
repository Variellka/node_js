/* eslint-disable space-before-function-paren */
import { AppDataSource } from '../../db/postgres';
import { ICategory, ICategoryTypeOrmRepository } from '../../types/types';
import { Сategory } from '../../db/postgres/models/category-model';

export default class CategoryTypeOrmRepository implements ICategoryTypeOrmRepository {
  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await AppDataSource.getRepository(Сategory).find();
    return data;
  }
}
