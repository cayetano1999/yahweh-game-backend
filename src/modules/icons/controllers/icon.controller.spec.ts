import { Test, TestingModule } from '@nestjs/testing';
import { IconController } from './icon.controller';

describe('IconController', () => {
  let controller: IconController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IconController],
    }).compile();

    controller = module.get<IconController>(IconController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
