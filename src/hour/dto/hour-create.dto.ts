import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';

@InputType()
export class OpeningHoursCreateInput{
  @Field(() => String)
  dayOfWeek: string;

  @Field(() => Boolean)
  isClosed: boolean;

  @Field({ nullable: true })
  lunchOpeningTime?: string;

  @Field({nullable: true })
  lunchClosingTime?: string;

  @Field({nullable: true })
  dinnerOpeningTime?: string;

  @Field({ nullable: true })
  dinnerClosingTime?: string;
}

@ObjectType()
export class OpeningHoursCreateOutput {
  @Field(() => OpeningHours)
  openingHours: OpeningHours;
}

