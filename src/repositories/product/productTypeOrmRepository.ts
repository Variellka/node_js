import { MoreThanOrEqual, Between } from 'typeorm';
import { AppDataSource } from '../../db/postgres';
import { IProduct, IProductTypeOrmRepository, IRating, QueryObject, Result, IProductPostgres } from '../../types/types';
import { Product } from '../../db/postgres/models/product-model';
import { Rating } from '../../db/postgres/models/rating-model';
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

  public async getById(id: string): Promise<IProduct | null> {
    const productRepository = AppDataSource.getRepository(Product);

    let productQueryBuilder;
    productQueryBuilder = productRepository.createQueryBuilder('product').where('product.id = :id', { id });

    const product = await productQueryBuilder.getOne();
    if (!product) {
      throw {
        message: 'product does not exist',
        status: 404,
      };
    }
    return product;
  }

  public async rateProduct(productId: string, ratingObj: IRating): Promise<IProduct | null> {
    const product = await this.getById(productId);

    if (product) {
      const ratingRepository = AppDataSource.getRepository(Rating);

      let ratingQueryBuilder;
      ratingQueryBuilder = ratingRepository
        .createQueryBuilder('rating')
        .where('rating.userId = :userId', { userId: ratingObj.userId })
        .andWhere('rating.productId = :productId', { productId });

      const rating = await ratingQueryBuilder.getOne();

      if (rating) {
        rating.rating = ratingObj.rating;
        await ratingRepository.save(rating);
      } else {
        ratingObj.product = product as Product;
        await ratingRepository.save(ratingObj as Rating);
      }

      const [{ avg }] = await ratingRepository
        .createQueryBuilder('rating')
        .where('rating.productId = :productId', { productId })
        .select('AVG(rating)')
        .execute();

      product.totalRating = parseInt(avg);

      await AppDataSource.getRepository(Product)
        .createQueryBuilder()
        .update(Product)
        .where('product.id = :productId', { productId })
        .set({ totalRating: product.totalRating })
        .execute();
    }

    return product;
  }
}
