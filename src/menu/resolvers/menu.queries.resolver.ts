import { Resolver, Query, Args } from '@nestjs/graphql';
import { Menu } from '../models/menu.model';
import { MenuService } from '../menu.service';


@Resolver(() => Menu)
export class MenuQueriesResolver {
  constructor(private readonly menuService: MenuService) {}

  @Query(() => Menu)
  async getMenu(@Args('id') id: string): Promise<Menu> {
    return this.menuService.findMenuById(id);
  }

  @Query(() => [Menu])
  async getAllMenus(): Promise<Menu[]> {
    return this.menuService.findAllMenus();
  }
}
