import { mongoose } from '@typegoose/typegoose';
import { IAccount, IOrderList, IOrderTypegooseRepository } from '../../types/types';
import { OrderListModel } from '../../db/mongodb/models/order-list-model';
import { AccountModel } from '../../db/mongodb/models/account-model';
import { ProductModel } from '../../db/mongodb/models/product-model';

export default class OrderTypegooseRepository implements IOrderTypegooseRepository {
  public async getByUserId(id: string): Promise<IOrderList | null> {
    const order: IOrderList | null = await OrderListModel.findOne({ user: id });
    return order;
  }

  public async create(userId: string, productId: string, quantity: number): Promise<IOrderList> {
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const order = await new OrderListModel({
      user: await AccountModel.findOne({ _id: userObjectId }),
      products: [await ProductModel.findOne({ _id: productObjectId })],
      productQuantity: {
        productId,
        quantity,
      },
    }).save();

    return order;
  }

  public async update(userId: string, productId: string, quantity: number): Promise<IOrderList | null> {
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const order: IOrderList | null = await OrderListModel.findOneAndUpdate(
      {
        user: userId,
        products: productId,
        'productQuantity.productId': productId,
      },
      { $set: { 'productQuantity.$.quantity': quantity } }
    );
    if (!order) {
      const product = await ProductModel.findOne({ _id: productObjectId });
      if (product) {
        await OrderListModel.findOneAndUpdate(
          { user: userId },
          { $push: { products: product, productQuantity: { productId, quantity } } }
        );
      }
    }

    return this.getByUserId(userId);
  }
}
