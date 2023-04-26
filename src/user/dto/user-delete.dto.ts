import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserCreateInput } from './user-create.dto';
import { User } from '../models/user.model';

@InputType()
export class UserDeleteInput extends UserCreateInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UserDeleteOutput {
  @Field(() => User)
  user: User;
}