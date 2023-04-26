import { Test, TestingModule } from '@nestjs/testing';
import { HourService } from './hour.service';

describe('HourService', () => {
  let service: HourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HourService],
    }).compile();

    service = module.get<HourService>(HourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
