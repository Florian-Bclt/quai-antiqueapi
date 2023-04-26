import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './models/menu.model';
import { MenuMutationsResolver } from './resolvers/menu.mutations.resolver';
import { MenuQueriesResolver } from './resolvers/menu.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService, MenuMutationsResolver, MenuQueriesResolver]
})
export class MenuModule {}
