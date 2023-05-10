import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './models/table.model';
import { TableMutationsResolver } from './resolvers/table.mutations.resolver';
import { TableQueriesResolver } from './resolvers/table.queries.resolver';
import { TableService } from './table.service';
import { ReservationService } from 'src/reservation/reservation.service';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Table]),
  ],
    
  providers: [TableService, TableMutationsResolver, TableQueriesResolver],
})
export class TableModule {}
