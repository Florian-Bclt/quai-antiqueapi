import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';
import { OpeningHoursService } from '../hour.service';
import { OpeningHoursCreateInput } from '../dto/hour-create.dto';
import { OpeningHoursUpdateInput } from '../dto/hour-update.dto';

@Resolver(() => OpeningHours)
export class OpeningHoursResolver {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  @Mutation(() => OpeningHours)
  async createOpeningHours(@Args('input') input: OpeningHoursCreateInput): Promise<OpeningHours> {
    return await this.openingHoursService.create(input);
  }

  @Mutation(() => OpeningHours)
  async updateOpeningHours(
    @Args('id') id: string,
    @Args('input') input: OpeningHoursUpdateInput,
  ): Promise<OpeningHours> {
    return await this.openingHoursService.update(id, input);
  }
}
