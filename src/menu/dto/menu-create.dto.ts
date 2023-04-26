import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Menu } from "../models/menu.model";

@InputType()
export class MenuCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => Number)
  price: number;

  @Field(() => [String])
  entries: string[];

  @Field(() => [String])
  mainCourses: string[];

  @Field(() => [String])
  desserts: string[];

}

@ObjectType()
export class MenuCreateOutput {
  @Field(() => Menu)
  menu: Menu;
}