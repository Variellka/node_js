import { AppDataSource } from '../../db/postgres';
import { IProduct, IProductTypeOrmRepository } from '../../types/types';
import { Product } from '../../db/postgres/models/product-model';

export default class ProductTypeOrmRepository implements IProductTypeOrmRepository {
  public async getAll(): Promise<IProduct[]> {
    const data: IProduct[] = await AppDataSource.getRepository(Product).find();
    return data;
  }
}
