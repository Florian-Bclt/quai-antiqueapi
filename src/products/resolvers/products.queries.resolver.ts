import { Args, Query, Resolver } from "@nestjs/graphql";
import { Products } from "../models/products.model";
import { ProductsService } from "../products.service";
import { ProductsPagination, ProductsPaginationArgs } from "../dto/products-pagination.dto";

@Resolver(Products)
export class ProductsQueriesResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductsPagination])
  async productsPagination(@Args() args: ProductsPaginationArgs) {
    return this.productsService.productsPagination(args);
  }
}