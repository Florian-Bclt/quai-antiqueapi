import { InputType, ObjectType } from "@nestjs/graphql";
import { ProductsCreateInput, ProductsCreateOutput } from "./products-create.dto";

@InputType()
export class ProductsUpdateInput extends ProductsCreateInput {}

@ObjectType()
export class ProductsUpdateOutput extends ProductsCreateOutput {}