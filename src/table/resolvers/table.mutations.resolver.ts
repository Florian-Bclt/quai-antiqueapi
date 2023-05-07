import { UseGuards } from "@nestjs/common";
import { Args, Context, ID, Mutation, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TableCreateInput, TableCreateOutput } from "../dto/table-create.dto";
import { TableDeleteOutput } from "../dto/table-delete.dto";
import { TableUpdateInput, TableUpdateOutput } from "../dto/table-update.dto";
import { Table } from "../models/table.model";
import { TableService } from "../table.service";
import { RoleGuard } from "src/auth/guards/role.guard";
import { UserRole } from "src/user/models/user.model";

@Resolver(Table)
export class TableMutationsResolver {
  constructor(
    private readonly tableService: TableService) {}

// Créer une table
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => TableCreateOutput)
  async tableCreate(
    @Args('input') input: TableCreateInput,
    @Context() ctx
    ) {
      const requiredRole = UserRole.ADMIN;
      ctx.switchToHttp().getRequest().requiredRole = requiredRole;
      
      return this.tableService.tableCreate(input);
  }

// Modifier une table 
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => TableUpdateOutput)
  async tableUpdate(
    @Args({name: 'tableId', type: () => ID })tableId: Table['id'],
    @Args('input') input: TableUpdateInput,
    @Context() ctx
    ) {
      const requiredRole = UserRole.ADMIN;
      ctx.switchToHttp().getRequest().requiredRole = requiredRole;

      return this.tableService.tableUpdate(tableId, input);
  }

// Delete table 
  @UseGuards(JwtAuthGuard)
  @Mutation(() => TableDeleteOutput)
  async tableDelete(
    @Args({name: 'tableId', type: () => ID })tableId: Table['id'],
    @Context() ctx
    ) {
      const requiredRole = UserRole.ADMIN;
      ctx.switchToHttp().getRequest().requiredRole = requiredRole;
      
      return this.tableService.tableDelete(tableId);
  }
}