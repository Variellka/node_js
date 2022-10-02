import { IProduct, IProductTypegooseRepository } from '../../types/types';
import { ProductModel } from '../../db/mongodb/models/product-model';

export default class ProductTypegooseRepository implements IProductTypegooseRepository {
  public async getAll(): Promise<IProduct[]> {
    const data: IProduct[] = await ProductModel.find();
    return data;
  }
}
