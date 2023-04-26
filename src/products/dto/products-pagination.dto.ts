import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from "../../pagination/dto/pagination.dto";
import { Products } from "../models/products.model";

// Sort by title
@InputType()
export class ProductsPaginationSortBy extends PaginationSortBy{
  @Field(() => SortDirection, { nullable : true })
  title?: SortDirection
}
@ArgsType()
export class ProductsPaginationArgs extends PaginationArgs {
  @Field(() => SortDirection, { nullable : true })
  sortBy?: ProductsPaginationSortBy;
}

@ObjectType()
export class ProductsPagination extends Pagination {
 @Field(() => [Products])
 nodes: Products[];
}