import { Resolver, Args, Query } from "@nestjs/graphql";
import { Reservation } from "../models/reservation.model";
import { ReservationService } from "../reservation.service";

@Resolver()
export class ReservationQueriesResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(returns => Reservation)
  async getReservationById(@Args("reservationId") reservationId: string): Promise<Reservation> {
    return this.reservationService.getReservationById(reservationId);
  }

  @Query(returns => [Reservation])
  async getReservationsByUser(@Args("userId") userId: string): Promise<Reservation[]> {
    return this.reservationService.getReservationsByUser(userId);
  }

  @Query(returns => [Reservation])
  async getReservationsByTable(@Args("tableId") tableId: string): Promise<Reservation[]> {
    return this.reservationService.getReservationsByTable(tableId);
  }
}
