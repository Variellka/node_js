import { prop, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { Category } from './category-model';
import { ICategoryMongo, IProductMongo } from './../../../types/types';

@index({ displayName: 1 }, { unique: true })
@index({ createdAt: 1, totalRating: 1, price: 1 })
export class Product implements IProductMongo {
  @prop()
  public displayName: string;

  @prop()
  public createdAt: Date;

  @prop()
  public totalRating: number;

  @prop()
  public price: number;

  @prop({ ref: () => Category })
  public categories: Ref<ICategoryMongo>[];
}

export const ProductModel = getModelForClass(Product);
