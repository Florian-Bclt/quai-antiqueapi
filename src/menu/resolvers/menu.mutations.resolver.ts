import { Resolver, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { Menu } from '../models/menu.model';
import { MenuService } from '../menu.service';
import { MenuCreateInput, MenuCreateOutput } from '../dto/menu-create.dto';
import { MenuUpdateInput, MenuUpdateOutput } from '../dto/menu-update.dto';
import { MenuDeleteOutput } from '../dto/menu-delete.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRole } from 'src/user/models/user.model';
import { Request } from 'express';

@Resolver(() => Menu)
export class MenuMutationsResolver {
  constructor(private readonly menuService: MenuService) {}

  // Create menu
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => MenuCreateOutput)
  async menuCreate(
    @Args('input') input: MenuCreateInput,
    @Context('req') req: Request,
      ) {
      const requiredRole = UserRole.ADMIN;
      req['requiredRole'] = requiredRole;

      return this.menuService.menuCreate(input);
  }

  // Update menu
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => MenuUpdateOutput)
  async menuUpdate(
    @Args({ name: 'menuId', type: () => ID }) menuId: Menu['id'],
    @Args('input') input: MenuUpdateInput,
    @Context('req') req: Request,
    ) {
    const requiredRole = UserRole.ADMIN;
    req['requiredRole'] = requiredRole;

      return this.menuService.menuUpdate(menuId, input);
  }

  // Delete menu
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => MenuDeleteOutput)
  async menuDelete(
    @Args({ name: 'menuId', type: () => ID }) menuId: Menu['id'],
    @Context('req') req: Request,
    ) {
    const requiredRole = UserRole.ADMIN;
    req['requiredRole'] = requiredRole;
      
      return this.menuService.menuDelete(menuId)
    }
  }

