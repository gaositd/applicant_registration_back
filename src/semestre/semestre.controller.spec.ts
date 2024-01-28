import { Test, TestingModule } from '@nestjs/testing';
import { SemestreController } from './semestre.controller';
import { SemestreService } from './semestre.service';

describe('SemestreController', () => {
  let controller: SemestreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemestreController],
      providers: [
        {
          provide: SemestreService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SemestreController>(SemestreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
