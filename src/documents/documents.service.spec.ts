import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { ActivityHistoryService } from '../activity-history/activity-history.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SemestreService } from '../semestre/semestre.service';
import { EntityManager } from '@mikro-orm/core';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: ActivityHistoryService,
          useValue: {},
        },
        {
          provide: NotificationsService,
          useValue: {},
        },
        {
          provide: SemestreService,
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
