import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../products.service';
import { ProductsCreateInput, ProductsCreateOutput } from '../dto/products-create.dto';
import { Products } from '../models/products.model';
import { ProductsUpdateInput, ProductsUpdateOutput } from '../dto/products-update.dto';
import { ProductsDeleteOutput } from '../dto/products-delete.dto';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User, UserRole } from 'src/user/models/user.model';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Request } from 'express';

@Resolver(Products)
export class ProductsMutationResolver {
  constructor(private readonly productsService: ProductsService) {}

  // Créer un produit
  @UseGuards(JwtAuthGuard, RoleGuard) // Protection des mutations avec JWT
  @Mutation(() => ProductsCreateOutput)
    async productsCreate(
      @Args('input') input: ProductsCreateInput,
      @CurrentUser() user: User,
      @Context('req') req: Request,
      ) {
        const requiredRole = UserRole.ADMIN;
        req['requiredRole'] = requiredRole;

      return this.productsService.productsCreate(input);
    }

  // Modifier un produit
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductsUpdateOutput)
    async productsUpdate(
      @Args({ name: 'productsId', type: () => ID}) productsId: Products['id'],
      @Args('input') input: ProductsUpdateInput,
      @CurrentUser() user: User,
      @Context('req') req: Request,
      ) {
        const requiredRole = UserRole.ADMIN;
        req['requiredRole'] = requiredRole;
      
        return this.productsService.productsUpdate(productsId, input);
    }

  // Supprimer un produit
  @UseGuards(JwtAuthGuard)
  @Mutation(() => ProductsDeleteOutput)
    async productsDelete(
      @Args({ name: 'productsId', type: () => ID}) productsId: Products['id'],
      @CurrentUser() user: User,
      @Context('req') req: Request,
      ) {
        const requiredRole = UserRole.ADMIN;
        req['requiredRole'] = requiredRole;

        return this.productsService.productsDelete(productsId);
    }
  }