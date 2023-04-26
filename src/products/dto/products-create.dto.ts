import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Products } from "../models/products.model";

@InputType()
export class ProductsCreateInput {
  @Field(() => String)
  title: string;
  
  @Field(() => Number)
  price: number;

  @Field(() => String)
  tags: string;

  @Field(() => String)
  category: string;
}

@ObjectType()
export class ProductsCreateOutput {
  @Field(() => Products)
  products: Products;
}