import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';
import { OpeningHoursService } from '../hour.service';
import { OpeningHoursCreateInput } from '../dto/hour-create.dto';
import { OpeningHoursUpdateInput } from '../dto/hour-update.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRole } from 'src/user/models/user.model';

@Resolver(() => OpeningHours)
export class OpeningHoursResolver {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => OpeningHours)
  async createOpeningHours(
    @Args('input') input: OpeningHoursCreateInput,
    @Context() ctx
    ): Promise<OpeningHours> {
      const requiredRole = UserRole.ADMIN;
      ctx.switchToHttp().getRequest().requiredRole = requiredRole;
    
      return await this.openingHoursService.create(input);
  }

  @Mutation(() => OpeningHours)
  async updateOpeningHours(
    @Args('id') id: string,
    @Args('input') input: OpeningHoursUpdateInput,
    @Context() ctx
  ): Promise<OpeningHours> {
      const requiredRole = UserRole.ADMIN;
      ctx.switchToHttp().getRequest().requiredRole = requiredRole;
    
      return await this.openingHoursService.update(id, input);
  }
}
