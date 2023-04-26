import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { ReservationCreateInput } from './reservation-create.dto';

@InputType()
export class ReservationDeleteInput extends ReservationCreateInput {
  @Field(() => String)
  readonly id: string;
}
