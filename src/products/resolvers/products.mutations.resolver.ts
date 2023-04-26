import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../products.service';
import { ProductsCreateInput, ProductsCreateOutput } from '../dto/products-create.dto';
import { Products } from '../models/products.model';
import { ProductsUpdateInput, ProductsUpdateOutput } from '../dto/products-update.dto';
import { ProductsDeleteOutput } from '../dto/products-delete.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(Products)
export class ProductsMutationResolver {
  constructor(private readonly productsService: ProductsService) {}

  // Create products
  @UseGuards(JwtAuthGuard) // protect mutations with JWT
  @Mutation(() => ProductsCreateOutput)
    async productsCreate(@Args('input') input: ProductsCreateInput) {
      return this.productsService.productsCreate(input);
    }

  // Update products
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductsUpdateOutput)
    async productsUpdate(
      @Args({ name: 'productsId', type: () => ID}) productsId: Products['id'],
      @Args('input') input: ProductsUpdateInput) {
      return this.productsService.productsUpdate(productsId, input);
    }

  // Delete products
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductsDeleteOutput)
    async productsDelete(
      @Args({ name: 'productsId', type: () => ID}) productsId: Products['id']) {
      return this.productsService.productsDelete(productsId);
    }
  }