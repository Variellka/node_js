import { AppDataSource } from '../../db/postgres';
import { hashPassword } from '../../helpers/hash';
import { IAccount, IAccountRepository, IOrderList, IOrderTypeOrmRepository } from '../../types/types';
import { Account } from '../../db/postgres/models/account-model';
import { OrderList } from '../../db/postgres/models/order-list-model';

export default class OrderTypeOrmRepository implements IOrderTypeOrmRepository {
  update: (userId: string, productId: string, quantity: number) => Promise<IOrderList | null>;
  create: (username: string, productId: string, quantity: number) => Promise<IOrderList>;

  public async getByUserId(id: string): Promise<IOrderList | null> {
    const orderRepository = AppDataSource.getRepository(OrderList);

    let orderQueryBuilder;
    orderQueryBuilder = orderRepository.createQueryBuilder('order-list').where('order-list.id = :id', { id });

    const order = await orderQueryBuilder.getOne();
    if (!orderQueryBuilder) {
      throw {
        message: 'no products in order',
        status: 200,
      };
    }
    return order;
  }
}
