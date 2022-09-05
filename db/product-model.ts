import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

class ProductClass {
  @prop()
  public displayName?: String;

  @prop()
  public categoryId?: ObjectId;

  @prop()
  public createdAt?: Date;

  @prop()
  public totalRating?: Number;

  @prop()
  public price?: Number;
}

export const ProductModel = getModelForClass(ProductClass);
