import { Test, TestingModule } from '@nestjs/testing';
import { SemestreService } from './semestre.service';

describe('SemestreService', () => {
  let service: SemestreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemestreService],
    }).compile();

    service = module.get<SemestreService>(SemestreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
