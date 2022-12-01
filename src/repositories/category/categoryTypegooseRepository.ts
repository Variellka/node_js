import { ObjectId } from 'mongoose';
import { ICategory, ICategoryTypegooseRepository, IProduct, QueryObject } from '../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category-model';
import { ProductModel } from '../../db/mongodb/models/product-model';
import { validateCategoryQuery } from '../../helpers/queryErrorHandlers/category';

export default class CategoryTypegooseRepository implements ICategoryTypegooseRepository {
  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await CategoryModel.find().select('displayName');
    return data;
  }

  public async getById(id: ObjectId | string, query?: QueryObject): Promise<ICategory> {
    const data: ICategory | null = await CategoryModel.findById(id);
    const categoryWithFilter: any = {};

    if (data) {
      categoryWithFilter._id = data._id;
      categoryWithFilter.displayName = data.displayName;
    }

    if (query) validateCategoryQuery(query);

    if (query?.includeProducts && data) {
      let products: IProduct[] = [];
      if (!query?.includeTop3Products) {
        products = await ProductModel.find({ categories: id });
      } else if (query?.includeTop3Products === 'top') {
        products = await ProductModel.find({ categories: id }).sort({ totalRating: -1 }).limit(3);
      }
      categoryWithFilter.products = products;
    }

    return categoryWithFilter;
  }
}
