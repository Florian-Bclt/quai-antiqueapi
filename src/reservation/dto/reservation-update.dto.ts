import { Field, InputType } from '@nestjs/graphql';
import { ReservationCreateInput } from './reservation-create.dto';

@InputType()
export class ReservationUpdateInput extends ReservationCreateInput {
  @Field(() => String)
  readonly id: string;
}