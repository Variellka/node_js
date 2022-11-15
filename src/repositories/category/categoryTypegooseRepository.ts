import { ObjectId } from 'mongoose';
import { ICategory, ICategoryTypegooseRepository, QueryObject } from '../../types/types';
import { CategoryModel } from '../../db/mongodb/models/category-model';
import { ProductModel } from '../../db/mongodb/models/product-model';

export default class CategoryTypegooseRepository implements ICategoryTypegooseRepository {
  public async getAll(): Promise<ICategory[]> {
    const data: any = await CategoryModel.find().select('displayName');
    return data;
  }

  public async getById(id: ObjectId | string, query?: QueryObject): Promise<ICategory | null> {
    const data: any = await CategoryModel.findById(id);

    if (query?.includeProducts && data) {
      let products: any;

      if (!query?.includeTop3Products) {
        products = await ProductModel.find({ categoryIds: id });
      } else if (query?.includeTop3Products) {
        products = await ProductModel.find({ categoryIds: id }).sort({ totalRating: -1 }).limit(3);
      }
      data.productsIds = products;
      console.log(data.productsIds);
    }

    return data;
  }
}
