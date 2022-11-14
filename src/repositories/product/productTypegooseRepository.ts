import { IProduct, IProductTypegooseRepository, QueryObject, Result } from '../../types/types';
import { ProductModel } from '../../db/mongodb/models/product-model';

const productSearchQueryHandler = (query?: QueryObject) => {
  const result: Result = {
    find: {},
    sort: {},
    pagination: {},
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
  if (query.limit) {
    result.pagination.limit = query.limit;
  }
  if (query.offset) {
    result.pagination.offset = query.offset;
  }
  return result;
};

export default class ProductTypegooseRepository implements IProductTypegooseRepository {
  public async getAll(query?: QueryObject): Promise<IProduct[]> {
    let searchOptions, sortOptions, paginationOptions;
    if (query) {
      searchOptions = productSearchQueryHandler(query).find;
      sortOptions = productSearchQueryHandler(query).sort;
      paginationOptions = productSearchQueryHandler(query).pagination;
    }
    const data: any = await ProductModel.find({ ...searchOptions })
      .sort(sortOptions)
      .skip(paginationOptions.offset)
      .limit(paginationOptions.limit);

    return data;
  }
}
