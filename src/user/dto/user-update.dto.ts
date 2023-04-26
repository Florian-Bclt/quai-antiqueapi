import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { UserCreateInput } from './user-create.dto';
import { User } from '../models/user.model';

@InputType()
export class UserUpdateInput extends PartialType(UserCreateInput) {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  allergy?: string;
}

@ObjectType()
export class UserUpdateOutput {
  @Field(() => User)
  user: User;
}