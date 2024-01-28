import { Test, TestingModule } from '@nestjs/testing';
import { ActivityHistoryService } from './activity-history.service';
import { EntityManager } from '@mikro-orm/postgresql';

describe('ActivityHistoryService', () => {
  let service: ActivityHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityHistoryService,
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ActivityHistoryService>(ActivityHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
