import { prop, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { CategoryClass } from './category-model';

@index({ displayName: 1 }, { unique: true })
@index({ createdAt: 1, totalRating: 1, price: 1 })
export class ProductClass {
  @prop()
  public displayName?: String;

  @prop()
  public createdAt?: Date;

  @prop()
  public totalRating?: Number;

  @prop()
  public price?: Number;

  @prop({ ref: () => CategoryClass })
  public categories?: Ref<CategoryClass>[];
}

export const ProductModel = getModelForClass(ProductClass);
