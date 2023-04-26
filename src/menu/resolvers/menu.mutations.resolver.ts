import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { Menu } from '../models/menu.model';
import { MenuService } from '../menu.service';
import { MenuCreateInput, MenuCreateOutput } from '../dto/menu-create.dto';
import { MenuUpdateInput, MenuUpdateOutput } from '../dto/menu-update.dto';
import { MenuDeleteOutput } from '../dto/menu-delete.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Menu)
export class MenuMutationsResolver {
  constructor(private readonly menuService: MenuService) {}

  // Create menu
  @UseGuards(JwtAuthGuard)
  @Mutation(() => MenuCreateOutput)
  async menuCreate(@Args('input') input: MenuCreateInput) {
    return this.menuService.menuCreate(input);
  }

  // Update menu
  @UseGuards(JwtAuthGuard)
  @Mutation(() => MenuUpdateOutput)
  async menuUpdate(
    @Args({ name: 'menuId', type: () => ID }) menuId: Menu['id'],
    @Args('input') input: MenuUpdateInput) {
    return this.menuService.menuUpdate(menuId, input);
  }

  // Delete menu
  @UseGuards(JwtAuthGuard)
  @Mutation(() => MenuDeleteOutput)
  async menuDelete(
    @Args({ name: 'menuId', type: () => ID }) menuId: Menu['id']) {
      return this.menuService.menuDelete(menuId)
    }
  }

