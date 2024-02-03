import { EntityManager } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityHistoryService } from '../activity-history/activity-history.service';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: EntityManager,
          useValue: {},
        },
        {
          provide: ActivityHistoryService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNotification', () => {
    it('should create Notification', async() => {
      const notification = await service.createNotification();
      expect(notification).toEqual('');;
    });
  });

  describe('getNotifications', () => {
    it('should get notifications', async() => {
      const notification = await service.getNotifications();
      expect(notification).toEqual({});
    });
  });

  describe('isUserExpedienteEnabled', () => {
    it('should return true', async() => {
      const notification = await service.isUserExpedienteEnabled();
      expect(notification).toEqual(true);
    });
  });

  describe('addressNotification', () =>{
    it('should return an object notification', async() => {
      const notification = await service.addressNotification();
      expect(notification).toEqual({});
    });
  });
});
