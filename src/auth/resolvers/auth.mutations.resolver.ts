import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "../auth.service";
import { AuthLoginOutput } from "../dto/auth-login.dto";
import { LocalAuthGuard } from "../guards/local-auth.guard";

@Resolver()
export class AuthMutationsResolver{
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthLoginOutput)
  async authLogin(
    @Context('req') req,
    @Args('username') _username: string,
    @Args('password') _password: string,
  ) {
    const user = await this.authService.validateUser(_username, _password);
    if(!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}