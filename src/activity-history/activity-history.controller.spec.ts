import { Test, TestingModule } from '@nestjs/testing';
import { ActivityHistoryController } from './activity-history.controller';

describe('ActivityHistoryController', () => {
  let controller: ActivityHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityHistoryController],
    }).compile();

    controller = module.get<ActivityHistoryController>(ActivityHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
