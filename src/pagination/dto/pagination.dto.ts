import { ArgsType, Field, InputType, Int, InterfaceType, registerEnumType } from "@nestjs/graphql";
import { Node } from "../models/node.model";

export enum SortDirection {
  ASC,
  DESC,
}

registerEnumType(SortDirection, {
  name: 'SortDirection'
});

//Find by creationDate
@InputType()
export class PaginationSortBy {
  @Field(() => SortDirection, { nullable: true})
  createAt?: SortDirection;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  take: number;
}

// Get all elements
@InterfaceType()
export abstract class Pagination<N extends Node = Node> {
  @Field()
  totalCount: number;

  @Field(() => [Node])
  abstract nodes: N[];
}