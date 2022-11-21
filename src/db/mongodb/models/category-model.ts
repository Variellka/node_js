import { prop, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { Product } from './product-model';
import { ICategoryMongo, IProductMongo } from './../../../types/types';

@index({ displayName: 1 }, { unique: true })
export class Category implements ICategoryMongo {
  @prop()
  public displayName: string;

  @prop()
  public createdAt: Date;

  @prop({ ref: () => Product })
  public products: Ref<IProductMongo>[];
}

export const CategoryModel = getModelForClass(Category);
