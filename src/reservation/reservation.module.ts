import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './models/reservation.model';
import { ReservationMutationsResolver } from './resolvers/reservation.mutations.resolvers';
import { ReservationQueriesResolver } from './resolvers/reservation.queries.resolvers';
import { ReservationService } from './reservation.service';
import { UserModule } from 'src/user/user.module';
import { TableModule } from 'src/table/table.module';
import { UserService } from 'src/user/user.service';
import { TableService } from 'src/table/table.service';
import { User } from 'src/user/models/user.model';
import { Table } from 'src/table/models/table.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      User,
      Table
    ]),
    UserModule,
    TableModule
  ],
  providers: [
    ReservationService, 
    ReservationMutationsResolver, 
    ReservationQueriesResolver, 
    UserService,
    TableService,
  ]
})
export class ReservationModule {}
