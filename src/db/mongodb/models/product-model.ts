import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { CategoryClass } from './category-model';

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
  public categoryIds?: Ref<CategoryClass>[];
}

export const ProductModel = getModelForClass(ProductClass);
