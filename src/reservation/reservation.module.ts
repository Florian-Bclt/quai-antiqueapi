import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './models/reservation.model';
import { ReservationMutationsResolver } from './resolvers/reservation.mutations.resolvers';
import { ReservationQueriesResolver } from './resolvers/reservation.queries.resolvers';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
  ],
    
  providers: [
    ReservationService, 
    ReservationMutationsResolver, 
    ReservationQueriesResolver,
  ]
})
export class ReservationModule {}
