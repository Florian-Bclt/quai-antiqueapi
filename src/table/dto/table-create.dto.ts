import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Table } from "../models/table.model";

@InputType()
export class TableCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => Number)
  place: number;

  @Field(() => Boolean)
  statut: boolean;
}

@ObjectType()
export class TableCreateOutput{
 @Field(() => Table)
 table: Table;
}