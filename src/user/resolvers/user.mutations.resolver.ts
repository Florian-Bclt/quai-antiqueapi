import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserCreateInput, UserCreateOutput } from "../dto/user-create.dto";
import { User } from "../models/user.model";
import { UserService } from "../user.service";
import { UserUpdateInput, UserUpdateOutput } from "../dto/user-update.dto";

@Resolver(User)
export class UserMutationsResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Mutation(() => UserCreateOutput)
  async userCreate(@Args('input') input: UserCreateInput): Promise<UserCreateOutput>{
    return this.userService.userCreate(input);
  }
  
  @Mutation(() => UserUpdateOutput)
async userUpdate(
  @Args('id') id: string,
  @Args('input') input: UserUpdateInput,
): Promise<UserUpdateOutput> {
  return this.userService.userUpdate(id, input);
}


@Mutation(() => Boolean)
async userDelete(@Args('id') id: string): Promise<boolean> {
  await this.userService.userDelete(id);
  return true;
}

}