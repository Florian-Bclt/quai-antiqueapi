import { InputType, ObjectType } from "@nestjs/graphql";
import { MenuCreateInput, MenuCreateOutput } from "./menu-create.dto";

@InputType()
export class MenuUpdateInput extends MenuCreateInput {}

@ObjectType()
export class MenuUpdateOutput extends MenuCreateOutput {}