import { prop, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { IAccount, IProductMongo, IProductQuantity, IOrderListMongo } from './../../../types/types';
import { Account } from './account-model';
import { Product } from './product-model';

@index({ user: 1 }, { unique: true })
export class OrderList implements IOrderListMongo {
  @prop({ ref: () => Account })
  public user: Ref<IAccount>;

  @prop({ ref: () => Product })
  public products: Ref<IProductMongo>[];

  @prop()
  public productQuantity: IProductQuantity[];
}

export const OrderListModel = getModelForClass(OrderList);
