import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Table } from "../models/table.model";

@ObjectType()
export class TableDeleteOutput {
  @Field(() => ID)
  tableId: Table['id'];
}