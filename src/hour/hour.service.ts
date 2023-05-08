import { ConflictException, Injectable } from '@nestjs/common';
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

  // Create hour
  async OpeningHoursCreate(input: OpeningHoursCreateInput): Promise<OpeningHoursCreateOutput> {
    const openingHours = this.openingHoursRepository.create(input);
    const savedOpeningHours = await this.openingHoursRepository.save(openingHours);
    const output = new OpeningHoursCreateOutput();
    output.openingHours = savedOpeningHours;

    return output;
  }

  // Update hour
  async OpeningHoursUpdate(id: string, input: OpeningHoursUpdateInput): Promise<OpeningHoursUpdateOutput> {
    const openingHours = await this.openingHoursRepository.findOne({where : { id }});
    Object.assign(openingHours, input);
    await this.openingHoursRepository.save(openingHours);
    return { openingHours}
  }

  // Delete hour
  async OpeningHoursDelete(id: string): Promise<String> {
    const result = await this.openingHoursRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Opening hours with id ${id} not found`);
    }
    return id;
  }

  // List all hours
  async findAllOpeningHours(): Promise<OpeningHours[]> {
    return await this.openingHoursRepository.find();
  }

  // List hour by id
  async findOneOpeningHoursById(id: string): Promise<OpeningHours> {
    return await this.openingHoursRepository.findOne({where : { id }});
  }
}
