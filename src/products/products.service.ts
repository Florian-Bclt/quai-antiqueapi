import { Injectable } from "@nestjs/common";
import { ProductsCreateInput, ProductsCreateOutput } from "./dto/products-create.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "./models/products.model";
import { ProductsUpdateInput, ProductsUpdateOutput } from "./dto/products-update.dto";
import { ProductsDeleteOutput } from "./dto/products-delete.dto";
import { SortDirection } from "src/pagination/dto/pagination.dto";
import { ProductsPagination, ProductsPaginationArgs } from "./dto/products-pagination.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async productsCreate(input: ProductsCreateInput): Promise<ProductsCreateOutput> {
    const newProducts = this.productsRepository.create(input);
    const products = await this.productsRepository.save(newProducts);
    return { products };
  }

  async productsUpdate(
    productsId: Products['id'],
    input: ProductsUpdateInput
    ): Promise<ProductsUpdateOutput> {
    const products = await this.productsRepository.findOneBy({id: productsId});
    products.category = input.category;
    products.title = input.title;
    products.price = input.price;
    products.tags = input.tags;
    await products.save();
    return { products };
  }

  async productsDelete(
    productsId: Products['id']
    ) : Promise<ProductsDeleteOutput> {
    const products = await this.productsRepository.findOneBy({id: productsId});
    await products.remove();
    return { productsId };
  }

  async productsPagination(
    args: ProductsPaginationArgs
    ): Promise<ProductsPagination> {
      const qb = this.productsRepository.createQueryBuilder('products');
      qb.take(args.take)
      qb.skip(args.skip)
      if (args.sortBy) {
        if (args.sortBy.createAt !== null) {
          qb.addOrderBy(
            'products.createdAt',
            args.sortBy.createAt === SortDirection.ASC ? 'ASC' : 'DESC'
          );
        }
        if (args.sortBy.title !== null) {
          qb.addOrderBy(
            'products.title',
            args.sortBy.title === SortDirection.ASC ? 'ASC' : 'DESC'
          );
        }
      }
    const [nodes, totalCount] = await qb.getManyAndCount();
    
    return { nodes, totalCount };
  }
}