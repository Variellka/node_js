import { MoreThanOrEqual, Between } from 'typeorm';
import { AppDataSource } from '../../db/postgres';
import { IProduct, IProductTypeOrmRepository, QueryObject, Result } from '../../types/types';
import { Product } from '../../db/postgres/models/product-model';
import { validateProductQuery } from '../../helpers/queryErrorHandlers/product';

const productSearchQueryHandler = (query?: QueryObject) => {
  const result: Result = {
    where: {},
    order: {},
  };
  if (!query) return result;
  if (query) {
    validateProductQuery(query);
  }
  if (query.displayName) {
    result.where.displayName = query.displayName;
  }
  if (query.minRating) {
    if (!isNaN(query.minRating)) {
      result.where.totalRating = MoreThanOrEqual(query.minRating);
    }
  }
  if (query.price) {
    const [min, max] = query.price.split(':').map((value) => parseInt(value));
    result.where.price = Between(min, max);
  }
  if (query.sortBy) {
    const [option, type] = query.sortBy.split(':');
    result.order[option] = type.toUpperCase();
  }
  if (query.limit) {
    result.take = query.limit;
  }
  if (query.offset) {
    result.skip = query.offset;
  }

  return result;
};

export default class ProductTypeOrmRepository implements IProductTypeOrmRepository {
  public async getAll(query: QueryObject | undefined): Promise<IProduct[]> {
    const searchOptions = productSearchQueryHandler(query);
    const data: IProduct[] = await AppDataSource.getRepository(Product).find({ ...searchOptions });
    return data;
  }
}
