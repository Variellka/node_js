import { mongoose } from '@typegoose/typegoose';
import { IAccount, IOrderList, IOrderListProducts, IOrderTypegooseRepository } from '../../types/types';
import { OrderListModel } from '../../db/mongodb/models/order-list-model';
import { AccountModel } from '../../db/mongodb/models/account-model';
import { ProductModel } from '../../db/mongodb/models/product-model';

export default class OrderTypegooseRepository implements IOrderTypegooseRepository {
  public async getByUserId(id: string): Promise<IOrderListProducts[] | null> {
    const order: IOrderList | null = await OrderListModel.findOne({ user: id });
    if (order) {
      return order.products;
    }
    return null;
  }

  public async create(userId: string, productId: string, quantity: number): Promise<IOrderListProducts[] | null> {
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const order = await new OrderListModel({
      user: await AccountModel.findOne({ _id: userObjectId }),
      products: {
        quantity,
        product: await ProductModel.findOne({ _id: productObjectId }),
      },
    }).save();

    return order.products;
  }

  public async update(userId: string, productId: string, quantity: number): Promise<IOrderListProducts[] | null> {
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const order: IOrderList | null = await OrderListModel.findOneAndUpdate(
      { user: userId, 'products.product._id': productObjectId },
      { $set: { 'products.$.quantity': quantity } }
    );

    if (!order) {
      const product = await ProductModel.findOne({ _id: productObjectId });
      if (product) {
        await OrderListModel.findOneAndUpdate({ user: userId }, { $push: { products: { quantity, product } } });
      }
    }

    return this.getByUserId(userId);
  }
}
