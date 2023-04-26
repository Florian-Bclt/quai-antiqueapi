import { Args, Query, Resolver } from "@nestjs/graphql";
import { User, UserRole } from "../models/user.model";
import { UserService } from "../user.service";


@Resolver(() => User)
export class UserQueriesResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: "users" })
  async getUsers(): Promise<User[]> {
    return this.userService.userGetAll();
  }

  @Query(() => User, { name: "user" })
  async getUser(@Args("id") id: string): Promise<User> {
    return this.userService.userGet(id);
  }

  @Query(() => [User])
  async userGetByRole(@Args('role') role: string): Promise<User[]> {
    const validRoles = Object.values(UserRole);
    if (!validRoles.includes(role as UserRole)) {
      throw new Error(`Invalid role: ${role}`);
    }
    return this.userService.userGetByRole(role as UserRole);
  }
}