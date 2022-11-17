import { AppDataSource } from '../../db/postgres';
import { ICategory, ICategoryTypeOrmRepository, QueryObject } from '../../types/types';
import { Category } from '../../db/postgres/models/category-model';

export default class CategoryTypeOrmRepository implements ICategoryTypeOrmRepository {
  public async getAll(): Promise<ICategory[]> {
    const data: ICategory[] = await AppDataSource.getRepository(Category).find();
    return data;
  }

  public async getById(id: number, query?: QueryObject): Promise<any> {
    const categoryRepository = AppDataSource.getRepository(Category);

    let categoryQueryBuilder;
    categoryQueryBuilder = categoryRepository.createQueryBuilder('category').where('category.id = :id', { id });

    if (query?.includeProducts) {
      if (!query?.includeTop3Products) {
        categoryQueryBuilder.leftJoinAndSelect('category.products', 'product');
      } else if (query?.includeTop3Products === 'top') {
        categoryQueryBuilder
          .leftJoinAndSelect('category.products', 'product')
          .orderBy('product.totalRating', 'ASC')
          .limit(3);
      }
    }

    const data = await categoryQueryBuilder.getMany();

    return data;
  }
}
