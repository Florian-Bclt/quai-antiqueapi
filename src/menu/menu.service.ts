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
    const newMenu = this.menuRepository.create({
      ...input,
      entries: input.entries.map((entry) => ({ title: entry.title, description: entry.description })),
      mainCourses: input.mainCourses.map((mainCourse) => ({ title: mainCourse.title, description: mainCourse.description })),
      desserts: input.desserts.map((dessert) => ({ title: dessert.title, description: dessert.description })),
    });
    const menu = await this.menuRepository.save(newMenu);
    return { menu };
  }
  
  async menuUpdate(menuId: Menu['id'], input: MenuUpdateInput) : Promise<MenuUpdateOutput> {
    const menu = await this.menuRepository.findOne({where : {id: menuId}});
    menu.title = input.title;
    menu.price = input.price;
    menu.entries = input.entries.map((entry) => ({ title: entry.title, description: entry.description }));
    menu.mainCourses = input.mainCourses.map((mainCourse) => ({ title: mainCourse.title, description: mainCourse.description }));
    menu.desserts = input.desserts.map((dessert) => ({ title: dessert.title, description: dessert.description }));
    await menu.save();
    return { menu };
  }

  async menuDelete(menuId: Menu['id'] ) : Promise<MenuDeleteOutput> {
    const menu = await this.menuRepository.findOne({where : {id : menuId}});
    await menu.remove();
    return { menuId };
  }

  async findAllMenus(): Promise<Menu[]> {
    return await this.menuRepository.find();
  }

  async findMenuById(menuId: Menu['id'] ) : Promise<Menu> {
    return await this.menuRepository.findOne({where : {id : menuId}});
  }
}
