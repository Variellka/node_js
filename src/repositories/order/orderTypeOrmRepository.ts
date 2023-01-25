import { AppDataSource } from '../../db/postgres';
import {
  IAccount,
  IOrderListPostgres,
  IOrderListPostgresProducts,
  IOrderListProducts,
  IOrderTypeOrmRepository,
  IProductPostgres,
} from '../../types/types';
import { Account } from '../../db/postgres/models/account-model';
import { OrderList } from '../../db/postgres/models/order-list-model';
import { Product } from '../../db/postgres/models/product-model';
import { OrderListProducts } from '../../db/postgres/models/order-list-products-model';

export default class OrderTypeOrmRepository implements IOrderTypeOrmRepository {
  public async update(userId: string, productId: string, quantity: number): Promise<IOrderListProducts[] | null> {
    const orderRepository = AppDataSource.getRepository(OrderList);
    const orderProductsRepository = AppDataSource.getRepository(OrderListProducts);

    const order = await orderRepository
      .createQueryBuilder('order-list')
      .where('order-list.user._id = :userId', { userId })
      .getOne();

    const orderProduct = await orderProductsRepository
      .createQueryBuilder('order-list-products')
      .where('order-list-products.order_id = :id', { id: order?._id })
      .andWhere('order-list-products.productId = :productId', { productId })
      .getOne();

    if (orderProduct) {
      if (quantity) {
      } else if (!quantity) {
        await orderProductsRepository.remove(orderProduct);
      }
    } else if (!orderProduct) {
      const product = await AppDataSource.getRepository(Product)
        .createQueryBuilder('product')
        .where('product.id = :productId', { productId })
        .getOne();
      await AppDataSource.getRepository(OrderListProducts).save({
        quantity,
        product,
        order,
      } as IOrderListPostgresProducts);
    }

    return await this.getByUserId(userId);
  }

  public async getByUserId(id: string): Promise<IOrderListProducts[] | null> {
    const orderRepository = AppDataSource.getRepository(OrderList);
    const orderProductsRepository = AppDataSource.getRepository(OrderListProducts);

    const order = await orderRepository
      .createQueryBuilder('order-list')
      .where('order-list.user._id = :id', { id })
      .getOne();

    const orderProducts = await orderProductsRepository
      .createQueryBuilder('order-list-products')
      .leftJoinAndSelect('order-list-products.product', 'product')
      .where('order-list-products.order._id = :id', { id: order?._id })
      .getMany();

    if (orderProducts.length) {
      return orderProducts;
    }
    return null;
  }

  public async create(userId: string, productId: string, quantity: number): Promise<IOrderListProducts[] | null> {
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
