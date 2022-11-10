import { IProduct, IProductTypegooseRepository, QueryObject, Result } from '../../types/types';
import { ProductModel } from '../../db/mongodb/models/product-model';

const productSearchQueryHandler = (query?: QueryObject) => {
  const result: Result = {
    find: {},
    sort: {},
  };
  if (!query) return result;
  if (query.displayName) {
    result.find.displayName = query.displayName;
  }
  if (query.minRating) {
    result.find.totalRating = {
      $gte: query.minRating,
    };
  }
  if (query.price) {
    const [min, max] = query.price.split(':').map((value) => parseInt(value));
    result.find.price = {
      $gte: isNaN(min) ? 0 : min,
      $lte: max,
    };
  }
  if (query.sortBy) {
    const [option, type] = query.sortBy.split(':');
    const order = type === 'desc' ? -1 : 1;
    result.sort = [[option, order]];
  }
  return result;
};

export default class ProductTypegooseRepository implements IProductTypegooseRepository {
  public async getAll(query?: QueryObject): Promise<IProduct[]> {
    let searchOptions = {};
    let sortOptions = {};
    if (query) {
      searchOptions = productSearchQueryHandler(query).find;
      sortOptions = productSearchQueryHandler(query).sort;
    }
    const data: IProduct[] = await ProductModel.find({ ...searchOptions });
    //.sort(sortOptions);
    return data;
  }
}
