import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpeningHours } from './models/hour.model';
import { OpeningHoursCreateInput } from './dto/hour-create.dto';
import { OpeningHoursUpdateInput } from './dto/hour-update.dto';

@Injectable()
export class OpeningHoursService {
  constructor(
    @InjectRepository(OpeningHours)
    private readonly openingHoursRepository: Repository<OpeningHours>,
  ) {}

  async findAll(): Promise<OpeningHours[]> {
    return await this.openingHoursRepository.find();
  }

  async findOne(id: string): Promise<OpeningHours> {
    return await this.openingHoursRepository.findOne({where : { id }});
  }

  async create(input: OpeningHoursCreateInput): Promise<OpeningHours> {
    const openingHours = this.openingHoursRepository.create(input);
    return await this.openingHoursRepository.save(openingHours);
  }

  async update(id: string, input: OpeningHoursUpdateInput): Promise<OpeningHours> {
    const openingHours = await this.openingHoursRepository.findOne({where : { id }});
    Object.assign(openingHours, input);
    return await this.openingHoursRepository.save(openingHours);
  }

  async delete(id: string): Promise<void> {
    await this.openingHoursRepository.delete(id);
  }
}
