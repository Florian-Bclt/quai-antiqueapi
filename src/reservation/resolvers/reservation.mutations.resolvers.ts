import { Resolver, Args, Mutation } from "@nestjs/graphql";
import { ReservationCreateInput } from "../dto/reservation-create.dto";
import { Reservation } from "../models/reservation.model";
import { ReservationService } from "../reservation.service";
import { ReservationUpdateInput } from "../dto/reservation-update.dto";

@Resolver()
export class ReservationMutationsResolver {
  constructor(private readonly reservationService: ReservationService) {}

  // Créer une réservation
  @Mutation(() => Reservation)
  // async createReservation(
  //   @Args("userId") userId: string, @Args("reservation") reservation: ReservationCreateInput): Promise<Reservation> {
  //   return this.reservationService.createReservation(userId, reservation);
  // }

  // @Mutation(() => Reservation)
  // async updateReservation(@Args("reservationId") reservationId: string, @Args("reservation") reservation: ReservationUpdateInput): Promise<Reservation> {
  //   return this.reservationService.updateReservation(reservationId, reservation);
  // }

  @Mutation(() => String)
  async cancelReservation(@Args("reservationId") reservationId: string): Promise<String> {
    await this.reservationService.cancelReservation(reservationId);
    return `Reservation with ID "${reservationId}" has been cancelled.`;
  }
}
