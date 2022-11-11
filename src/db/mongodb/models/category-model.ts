import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { ProductClass } from './product-model';

export class CategoryClass {
  @prop()
  public displayName?: String;

  @prop()
  public createdAt?: Date;

  @prop({ ref: () => ProductClass })
  public productIds?: Ref<ProductClass>[];
}

export const CategoryModel = getModelForClass(CategoryClass);
