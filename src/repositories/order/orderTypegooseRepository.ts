import { mongoose } from '@typegoose/typegoose';
import { IAccount, IOrderList, IOrderTypegooseRepository } from '../../types/types';
import { OrderListModel } from '../../db/mongodb/models/order-list-model';
import { AccountModel } from '../../db/mongodb/models/account-model';

export default class OrderTypegooseRepository implements IOrderTypegooseRepository {
  public async getByUsername(username: string): Promise<IOrderList | null> {
    console.log(username);
    const order: IOrderList | null = await OrderListModel.findOne({ 'user.userName': username });
    return order;
  }
}
