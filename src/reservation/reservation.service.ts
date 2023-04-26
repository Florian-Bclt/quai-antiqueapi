import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "./models/reservation.model";
import { TableService } from "src/table/table.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";
import { ReservationCreateInput } from "./dto/reservation-create.dto";
import { ReservationUpdateInput } from "./dto/reservation-update.dto";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly tableService: TableService,
    private readonly userService: UserService,
  ) {}

  async isTableAvailable(tableId: string, date: Date, reservationHour: number, guests: number): Promise<boolean> {
    // Vérifier si la table existe
    const tablesPagination = await this.tableService.tablesPagination({ take: 1, skip: 0, sortBy: null });
    const table = tablesPagination.nodes.find(node => node.id === tableId);

  if (!table) {
    throw new NotFoundException(`Table with ID "${tableId}" not found`);
  }
  
    // Vérifier si la table est libre à l'heure demandée
    const reservations = await this.reservationRepository.find({
      where: {
        table: {id : tableId},
        date: date,
        reservationHour: reservationHour,
      }
    });
  
    for (const reservation of reservations) {
      const start = reservation.reservationHour;
      const end = start + reservation.places;
      if (reservationHour >= start && reservationHour + guests <= end) {
        return false;
      }
    }
  
    return true;
  }
  
  async createReservation(userId: string, createReservationDto: ReservationCreateInput): Promise<Reservation> {
    const { tableId, date, reservationHour, guests } = createReservationDto;
  
    const isTableAvailable = await this.isTableAvailable(tableId, date, reservationHour, guests);
    if (!isTableAvailable) {
      throw new ConflictException(`Table with ID "${tableId}" is not available at ${reservationHour} on ${date}`);
    }

    // Créer la réservation
    const user = await this.userService.getUserById(userId);
    const reservation = new Reservation();
    reservation.user = user;
    reservation.tableId = tableId;
    reservation.date = date;
    reservation.reservationHour = reservationHour;
    reservation.places = guests;

    await this.reservationRepository.save(reservation);

    return reservation;
  }

  // Récupérer une réservation par son Id 
  async getReservationById(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({ 
      where: { id: reservationId }, 
      relations: ["user", "table"]
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID "${reservationId}" not found`);
    }
    return reservation;
  }
  
    // Mettre à jour la réservation
  async updateReservation(reservationId: string, updateReservationDto: ReservationUpdateInput): Promise<Reservation> {
    const { tableId, date, reservationHour, guests } = updateReservationDto;
    const reservation = await this.getReservationById(reservationId);
    
    const isTableAvailable = await this.isTableAvailable(tableId, date, reservationHour, guests);
    if (!isTableAvailable) {
      throw new ConflictException(`Table with ID "${tableId}" is not available at ${reservationHour} on ${date}`);
    }
  
    reservation.tableId = tableId;
    reservation.date = date;
    reservation.reservationHour = reservationHour;
    reservation.places = guests;
  
    await this.reservationRepository.save(reservation);
  
    return reservation;
  }
  
  // Annuler une réservation
  async cancelReservation(reservationId: string): Promise<void> {
    const reservation = await this.getReservationById(reservationId);
  
    await this.reservationRepository.remove(reservation);
  }
  
  // Récupérer les réservations d'un utilisateur
  async getReservationsByUser(userId: string): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ["user", "table"],
    });
  
    return reservations;
  }

  // Récupérer les réservations par table
  async getReservationsByTable(tableId: string): Promise<Reservation[]> {
    const reservations = await this.reservationRepository.find({
      where: { tableId },
      relations: ["user", "table"]
    });
    return reservations;
  }
  
}  
     
