import { InputType, ObjectType } from "@nestjs/graphql";
import { OpeningHoursCreateInput, OpeningHoursCreateOutput } from "./hour-create.dto";

@InputType()
export class OpeningHoursUpdateInput extends OpeningHoursCreateInput {}

@ObjectType()
export class OpeningHoursUpdateOutput extends OpeningHoursCreateOutput {}