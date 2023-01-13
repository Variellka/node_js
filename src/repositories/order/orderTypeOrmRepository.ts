import { AppDataSource } from '../../db/postgres';
import { hashPassword } from '../../helpers/hash';
import { IAccount, IAccountRepository, IOrderList, IOrderTypeOrmRepository } from '../../types/types';
import { Account } from '../../db/postgres/models/account-model';
import { OrderList } from '../../db/postgres/models/order-list-model';

export default class OrderTypeOrmRepository implements IOrderTypeOrmRepository {
  getByUsername: (username: string) => Promise<IOrderList | null>;
  //   public async getByUsername(username: string): Promise<IOrderList | null> {
  //     const user: IAccount | null = await AppDataSource.getRepository(Account).findOne({ where: { username } });
  //     const order: IOrderList | null = await AppDataSource.getRepository(OrderList).findOne({ where: { user : user} });
  //     return order ? order : null;
  //   }
}
