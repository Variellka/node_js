import { prop, getModelForClass } from '@typegoose/typegoose';

class categoryClass {
  @prop()
  public displayName?: String;

  @prop()
  public createdAt?: Date;
}

export const categoryModel = getModelForClass(categoryClass);
