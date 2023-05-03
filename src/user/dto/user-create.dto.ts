import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User, UserRole } from "../models/user.model";


@InputType()
export class UserCreateInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  allergy?: string;

  @Field(() => UserRole)
  role: UserRole;
}

@ObjectType()
export class UserCreateOutput {
  @Field(() => User)
  user: User;
}

