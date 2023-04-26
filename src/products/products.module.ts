import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './models/products.model';
import { ProductsMutationResolver } from './resolvers/products.mutations.resolver';
import { ProductsQueriesResolver } from './resolvers/products.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductsService, ProductsMutationResolver, ProductsQueriesResolver]
})
export class ProductsModule {}
