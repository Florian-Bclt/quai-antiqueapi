import { Args, Query, Resolver } from '@nestjs/graphql';
import { OpeningHours } from '../models/hour.model';
import { OpeningHoursService } from '../hour.service';


@Resolver(() => OpeningHours)
export class OpeningHoursQueryResolver {
  constructor(private readonly openingHoursService: OpeningHoursService) {}

  @Query(() => [OpeningHours])
  async openingHours(): Promise<OpeningHours[]> {
    return await this.openingHoursService.findAllOpeningHours();
  }

  @Query(() => OpeningHours)
  async openingHoursById(@Args('id') id: string): Promise<OpeningHours> {
    return await this.openingHoursService.findOneOpeningHoursById(id);
  }
}
