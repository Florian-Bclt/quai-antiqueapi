import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';

@InputType()
export class OpeningHoursInput {
  @Field(() => ID)
  id: string;

  @Field()
  dayOfWeek: string;

  @Field()
  isClosed: boolean;

  @Field({ nullable: true })
  openTime?: string;

  @Field({ nullable: true })
  closeTime?: string;
}

@InputType()
export class OpeningHoursCreateInput extends OpeningHoursInput {}

@ObjectType()
export class OpeningHoursCreateOuput {
  @Field(() => OpeningHours)
  openingHours: OpeningHours;
}

