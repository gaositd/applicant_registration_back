import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getNotifications', () => {
    it('should return notification',() =>{
      const notification = controller.getNotifications();
      expect(notification).toEqual({});
    });
  });

  describe('createNotification', () =>{
    it('should create notification',() =>{
      const notification = controller.createNotification();
      expect(notification).toEqual({});
    });
  });

  describe('createNotificationToUser', () =>{
    it('should create notification to user',() =>{
      const notification = controller.createNotificationToUser();
      expect(notification).toEqual({});
    });
  });

  describe('updateNotification', () =>{
    it('should update notification',() =>{
      const notification = controller.updateNotification();
      expect(notification).toEqual({});
    });
  });
  
});
