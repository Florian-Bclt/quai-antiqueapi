import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { Table } from "src/table/models/table.model";
import { Pagination, PaginationArgs, PaginationSortBy, SortDirection } from "../../pagination/dto/pagination.dto";

// Sort by title
@InputType()
export class TablesPaginationSortBy extends PaginationSortBy{
  @Field(() => SortDirection, { nullable : true })
  title?: SortDirection
}
@ArgsType()
export class TablesPaginationArgs extends PaginationArgs {
  @Field(() => SortDirection, { nullable : true })
  sortBy?: TablesPaginationSortBy;
}

@ObjectType()
export class TablesPagination extends Pagination {
 @Field(() => [Table])
 nodes: Table[];
}