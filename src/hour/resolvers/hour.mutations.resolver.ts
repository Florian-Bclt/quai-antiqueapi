import { Args, Context, ID, Mutation, Resolver } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';
import { OpeningHoursService } from '../hour.service';
import { OpeningHoursCreateInput, OpeningHoursCreateOutput } from '../dto/hour-create.dto';
import { OpeningHoursUpdateInput, OpeningHoursUpdateOutput } from '../dto/hour-update.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRole } from 'src/user/models/user.model';
import { Request } from 'express';

@Resolver(() => OpeningHours)
export class OpeningHoursMutationsResolver {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  // Créer un horaire
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => OpeningHoursCreateOutput)
  async createOpeningHours(
    @Args('input') input: OpeningHoursCreateInput,
    @Context('req') req: Request,
  ) {
    const requiredRole = UserRole.ADMIN;
    req['requiredRole'] = requiredRole;

    return this.openingHoursService.createOpeningHours(input);
}

  // Modifier horaire
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => OpeningHoursUpdateOutput)
  async updateOpeningHours(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: OpeningHoursUpdateInput,
    @Context('req') req: Request,
  ) {
    const requiredRole = UserRole.ADMIN;
    req['requiredRole'] = requiredRole;
    return await this.openingHoursService.updateOpeningHours(id, input);
  }

  // Supprimer un horaire
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Mutation(() => ID)
  async DeleteOpeningHours(
    @Args('id', { type: () => ID }) id: string,
    @Context('req') req: Request,
  ) {
    const requiredRole = UserRole.ADMIN;
    req['requiredRole'] = requiredRole;
    await this.openingHoursService.deleteOpeningHours(id);
    return id
  }
}