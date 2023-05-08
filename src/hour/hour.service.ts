import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpeningHours } from './models/hour.model';
import { OpeningHoursCreateInput, OpeningHoursCreateOutput } from './dto/hour-create.dto';
import { OpeningHoursUpdateInput, OpeningHoursUpdateOutput } from './dto/hour-update.dto';

@Injectable()
export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHours)
    private readonly openingHoursRepository: Repository<OpeningHours>,
  ) {}

  // Créer un horaire
  async OpeningHoursCreate(input: OpeningHoursCreateInput): Promise<OpeningHoursCreateOutput> {
    const openingHours = this.openingHoursRepository.create(input);
    const savedOpeningHours = await this.openingHoursRepository.save(openingHours);
    const output = new OpeningHoursCreateOutput();
    output.openingHours = savedOpeningHours;

    return output;
  }

  // Modifier un horaire
  async OpeningHoursUpdate(id: string, input: OpeningHoursUpdateInput): Promise<OpeningHoursUpdateOutput> {
    const openingHours = await this.openingHoursRepository.findOne({where : { id }});
    Object.assign(openingHours, input);
    await this.openingHoursRepository.save(openingHours);
    return { openingHours}
  }

  // Supprimer un horaire
  async OpeningHoursDelete(id: string): Promise<String> {
    const result = await this.openingHoursRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Opening hours with id ${id} not found`);
    }
    return id;
  }

  // Afficher la liste des horaires
  async findAllOpeningHours(): Promise<OpeningHours[]> {
    return await this.openingHoursRepository.find();
  }

  // Afficher un horaire en fonction de l'id
  async findOneOpeningHoursById(id: string): Promise<OpeningHours> {
    return await this.openingHoursRepository.findOne({where : { id }});
  }
}
