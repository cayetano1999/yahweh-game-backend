import { Test, TestingModule } from '@nestjs/testing';
import { ContactabilityController } from './contactability.controller';

describe('ContactabilityController', () => {
  let controller: ContactabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactabilityController],
    }).compile();

    controller = module.get<ContactabilityController>(ContactabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
