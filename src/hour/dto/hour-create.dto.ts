import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class OpeningHoursCreateInput{
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  dayOfWeek: number;

  @Field(() => Boolean)
  isClosed: boolean;

  @IsNotEmpty()
  @Field({ nullable: true })
  lunchOpeningTime?: string;

  @IsNotEmpty()
  @Field({nullable: true })
  lunchClosingTime?: string;

  @IsNotEmpty()
  @Field({nullable: true })
  dinnerOpeningTime?: string;

  @IsNotEmpty()
  @Field({ nullable: true })
  dinnerClosingTime?: string;
}

@ObjectType()
export class OpeningHoursCreateOutput {
  @Field(() => OpeningHours)
  openingHours: OpeningHours;
}

