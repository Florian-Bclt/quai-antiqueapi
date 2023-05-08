import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningHoursMutationsResolver } from './resolvers/hour.mutations.resolver';
import { OpeningHours } from './models/hour.model';
import { OpeningHoursService } from './hour.service';
import { OpeningHoursQueryResolver } from './resolvers/hour.queries.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OpeningHours])],
  providers: [OpeningHoursService, OpeningHoursMutationsResolver, OpeningHoursQueryResolver]
})
export class HourModule {}
