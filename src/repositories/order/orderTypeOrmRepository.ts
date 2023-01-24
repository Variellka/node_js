import { AppDataSource } from '../../db/postgres';
import {
  IAccount,
  IOrderList,
  IOrderListPostgres,
  IOrderListPostgresProducts,
  IOrderTypeOrmRepository,
  IProductPostgres,
} from '../../types/types';
import { Account } from '../../db/postgres/models/account-model';
import { OrderList } from '../../db/postgres/models/order-list-model';
import { Product } from '../../db/postgres/models/product-model';

export default class OrderTypeOrmRepository implements IOrderTypeOrmRepository {
  update: (userId: string, productId: string, quantity: number) => Promise<IOrderList | null>;

  public async getByUserId(id: string): Promise<IOrderList | null> {
    const orderRepository = AppDataSource.getRepository(OrderList);

    const order = await orderRepository
      .createQueryBuilder('order-list')
      .leftJoinAndSelect('order-list.products', 'products')
      .where('order-list.user._id = :id', { id })
      .getOne();

    return order;
  }

  public async create(userId: string, productId: string, quantity: number): Promise<IOrderList | null> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository
      .createQueryBuilder('product')
      .where('product.id = :productId', { productId })
      .getOne();

    const user: IAccount | null = await AppDataSource.getRepository(Account).findOne({ where: { _id: userId } });

    if (product && user) {
      const newOrderList = {
        user: user as IAccount,
        products: [
          {
            quantity,
            product: product as IProductPostgres,
          },
        ] as IOrderListPostgresProducts[],
      };

      await AppDataSource.getRepository(OrderList).save(newOrderList as IOrderListPostgres);
    }

    return await this.getByUserId(userId);
  }
}
