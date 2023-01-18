import { Args, Query, Resolver } from "@nestjs/graphql";
import { TablesPagination, TablesPaginationArgs } from "../dto/tables-pagination.dto";
import { Table } from "../models/table.model";
import { TableService } from "../table.service";

@Resolver(Table)
export class TableQueriesResolver {
  constructor(private readonly tableService: TableService) {}

  @Query(() => [TablesPagination])
  async tablesPagination(@Args() args: TablesPaginationArgs) {
    return this.tableService.tablesPagination(args);
  }
}