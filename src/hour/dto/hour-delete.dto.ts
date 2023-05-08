import { Field, ID, ObjectType } from "@nestjs/graphql";
import { OpeningHours } from "../models/hour.model";

@ObjectType()
export class OpeningHoursDeleteOutput {
  @Field(() => ID)
  id : OpeningHours['id'];
}