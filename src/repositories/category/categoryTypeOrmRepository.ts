/* eslint-disable space-before-function-paren */
import { AppDataSource } from '../../db/postgres';
import { ICategory, ICategoryTypeOrmRepository } from '../../types/types';
import { Сategory } from '../../db/postgres/models/category-model';
import { Schema } from 'mongoose';

export default class CategoryTypeOrmRepository implements ICategoryTypeOrmRepository {
  getById: (id: string | Schema.Types.ObjectId) => Promise<ICategory | null>;
  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await AppDataSource.getRepository(Сategory).find();
    return data;
  }
}
