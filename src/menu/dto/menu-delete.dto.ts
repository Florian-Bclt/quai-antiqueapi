import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Menu } from "../models/menu.model";

@ObjectType()
export class MenuDeleteOutput {
  @Field(() => ID)
  menuId: Menu['id'];
}