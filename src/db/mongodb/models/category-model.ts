import { prop, getModelForClass } from '@typegoose/typegoose';

class CategoryClass {
  @prop()
  public displayName?: String;

  @prop()
  public createdAt?: Date;
}

export const CategoryModel = getModelForClass(CategoryClass);
