import { Test, TestingModule } from '@nestjs/testing';
import { ContactabilityService } from './contactability.service';

describe('PromotionService', () => {
  let service: ContactabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactabilityService],
    }).compile();

    service = module.get<ContactabilityService>(ContactabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
