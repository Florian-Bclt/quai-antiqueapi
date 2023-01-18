import { InputType, ObjectType } from "@nestjs/graphql";
import { TableCreateInput, TableCreateOutput } from "./table-create.dto";

@InputType()
export class TableUpdateInput extends TableCreateInput {}

@ObjectType()
export class TableUpdateOutput extends TableCreateOutput {}