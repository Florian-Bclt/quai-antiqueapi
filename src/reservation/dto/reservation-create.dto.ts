import { InputType, Field, Int} from '@nestjs/graphql';
import { IsDate, IsInt, Min } from 'class-validator';

@InputType()
export class ReservationCreateInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  readonly guests: number;

  @Field(() => Date)
  @IsDate()
  readonly date: Date;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  readonly reservationHour: number;

  @Field(() => String)
  readonly tableId: string;
}
