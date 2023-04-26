import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TableCreateInput, TableCreateOutput } from "../dto/table-create.dto";
import { TableDeleteOutput } from "../dto/table-delete.dto";
import { TableUpdateInput, TableUpdateOutput } from "../dto/table-update.dto";
import { Table } from "../models/table.model";
import { TableService } from "../table.service";

@Resolver(Table)
export class TableMutationsResolver {
  constructor(
    private readonly tableService: TableService) {}

// Créer une table
  @UseGuards(JwtAuthGuard)
  @Mutation(() => TableCreateOutput)
  async tableCreate(
    @Args('input') input: TableCreateInput) {
      console.log(this.tableService);
      return this.tableService.tableCreate(input);
  }

// Modifier une table 
  @UseGuards(JwtAuthGuard)
  @Mutation(() => TableUpdateOutput)
  async tableUpdate(
    @Args({name: 'tableId', type: () => ID })tableId: Table['id'],
    @Args('input') input: TableUpdateInput) {
      return this.tableService.tableUpdate(tableId, input);
  }

// Delete table 
  @UseGuards(JwtAuthGuard)
  @Mutation(() => TableDeleteOutput)
  async tableDelete(
    @Args({name: 'tableId', type: () => ID })tableId: Table['id']
    ) {
      return this.tableService.tableDelete(tableId);
  }
}