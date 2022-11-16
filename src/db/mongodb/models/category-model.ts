import { prop, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { ProductClass } from './product-model';

@index({ displayName: 1 }, { unique: true })
export class CategoryClass {
  @prop()
  public displayName?: String;

  @prop()
  public createdAt?: Date;

  @prop({ ref: () => ProductClass })
  public products?: Ref<ProductClass>[];
}

export const CategoryModel = getModelForClass(CategoryClass);
