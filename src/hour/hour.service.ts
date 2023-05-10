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

  async createOpeningHours(input: OpeningHoursCreateInput): Promise<OpeningHoursCreateOutput> {
    const openingHours = this.openingHoursRepository.create(input);
    const savedOpeningHours = await this.openingHoursRepository.save(openingHours);
    return { openingHours: savedOpeningHours };
  }

  async updateOpeningHours(id: string, input: OpeningHoursUpdateInput): Promise<OpeningHoursUpdateOutput> {
    const openingHours = await this.openingHoursRepository.findOne({where: { id }});
    if(!openingHours) {
      throw new Error(`Opening hours with id ${id} not found`);
    }

    Object.assign(openingHours, input);
    const updatedOpeningHours = await this.openingHoursRepository.save(openingHours);
    return { openingHours: updatedOpeningHours};
  }

  async deleteOpeningHours(id: string): Promise<string> {
    const result = await this.openingHoursRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Opening hours with id ${id} not found`);
    }
    return id;
  }

  async findAllOpeningHours(): Promise<OpeningHours[]> {
    return this.openingHoursRepository.find();
  }

  async findOneOpeningHoursById(id: string): Promise<OpeningHours> {
    return this.openingHoursRepository.findOne({where: { id }});
  }

  async getOpeningHoursForDay(dayOfWeek: number): Promise<OpeningHours[]> {
    return this.openingHoursRepository.find({ where: { dayOfWeek } })
  }
}
