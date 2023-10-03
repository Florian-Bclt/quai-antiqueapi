import { Field, ObjectType } from "@nestjs/graphql";
import { User, UserRole } from "src/user/models/user.model";

@ObjectType()
export class AuthLoginOutput {
  @Field(() => String)
  accessToken: string;

  @Field()
  role: UserRole;

  @Field(() => User)
  user: User;
}