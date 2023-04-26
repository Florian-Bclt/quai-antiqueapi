import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningHoursResolver } from './resolvers/hour.mutations.resolver';
import { OpeningHours } from './models/hour.model';
import { OpeningHoursService } from './hour.service';

@Module({
  imports: [TypeOrmModule.forFeature([OpeningHours])],
  providers: [OpeningHoursService, OpeningHoursResolver]
})
export class HourModule {}
