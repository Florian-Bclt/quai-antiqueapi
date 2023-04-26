import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuCreateInput, MenuCreateOutput } from './dto/menu-create.dto';
import { MenuUpdateInput, MenuUpdateOutput } from './dto/menu-update.dto';
import { MenuDeleteOutput } from './dto/menu-delete.dto';
import { Menu } from './models/menu.model';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async menuCreate(input: MenuCreateInput): Promise<MenuCreateOutput> {
    const newMenu = this.menuRepository.create(input);
    const menu = await this.menuRepository.save(newMenu);
    return { menu };
  }
  
  async menuUpdate(menuId: Menu['id'], input: MenuUpdateInput) : Promise<MenuUpdateOutput> {
    const menu = await this.menuRepository.findOneBy({id : menuId});
    menu.title = input.title;
    menu.price = input.price;
    menu.entries = input.entries;
    menu.mainCourses = input.mainCourses;
    menu.desserts = input.desserts;
    await menu.save();
    return { menu };
  }

  async menuDelete(menuId: Menu['id'] ) : Promise<MenuDeleteOutput> {
    const menu = await this.menuRepository.findOneBy({id: menuId});
    await menu.remove();
    return { menuId };
  }

  
  async findAllMenus(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async findMenuById(menuid: Menu['id'] ) : Promise<Menu> {
    return await this.menuRepository.findOneBy({id : menuid});
  }
}
