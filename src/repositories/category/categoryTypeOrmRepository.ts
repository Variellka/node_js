/* eslint-disable space-before-function-paren */
import { AppDataSource } from '../../db/postgres';
import { ICategory, ICategoryTypeOrmRepository, QueryObject } from '../../types/types';
import { Category } from '../../db/postgres/models/category-model';
import { Schema } from 'mongoose';

export default class CategoryTypeOrmRepository implements ICategoryTypeOrmRepository {
  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await AppDataSource.getRepository(Category).find();
    return data;
  }

  public async getById(id: number, query?: QueryObject): Promise<ICategory | null> {
    const data: any = await AppDataSource.getRepository(Category).findOne({ where: { id } });

    // if (query?.includeProducts && data) {
    //   if (!query?.includeTop3Products) {
    //     data;
    //   } else if (query?.includeTop3Products === 'top') {
    //   }
    // }

    return data;
  }
}
