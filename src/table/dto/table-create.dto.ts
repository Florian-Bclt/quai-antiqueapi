import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Table } from "../models/table.model";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class TableCreateInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => Int, {defaultValue: 0})
  @IsNotEmpty()
  @IsNumber()
  places: number;

  @Field(() => Boolean)
  statut: boolean;
}

@ObjectType()
export class TableCreateOutput{
 @Field(() => Table)
 table: Table;
}