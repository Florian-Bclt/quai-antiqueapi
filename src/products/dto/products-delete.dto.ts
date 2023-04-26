import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Products } from "../models/products.model";

@ObjectType()
export class ProductsDeleteOutput {
 @Field(() => ID)
 productsId: Products['id'];
}