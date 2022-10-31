import { ICategory, ICategoryTypegooseRepository } from '../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category-model';

export default class CategoryTypegooseRepository implements ICategoryTypegooseRepository {
  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find();
    return data;
  }
}
