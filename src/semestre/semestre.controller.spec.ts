import { Test, TestingModule } from '@nestjs/testing';
import { SemestreController } from './semestre.controller';

describe('SemestreController', () => {
  let controller: SemestreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemestreController],
    }).compile();

    controller = module.get<SemestreController>(SemestreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
