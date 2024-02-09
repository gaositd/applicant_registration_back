import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest, { Response } from 'supertest';
// import { NestFactory } from '@nestjs/core';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let app: INestApplication;
  // let request: Request;
  let request: any;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {}, // Reemplaza con un mock más detallado si es necesario
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication(); // Crea la aplicación a partir del módulo de test
    await app.init();
    request = supertest(app.getHttpServer());
  });

  describe('getNotifications', () => {
    it('should return notifications', async () => {
      const response: Response = await request.post('/admin/:matricula');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('createNotification', () => {
    it('should create notification', async () => {
      const notificationData: any = { ... }; // Define los datos de la notificación
      const response: Response = await request.put('/admin/:id').send(notificationData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(notificationData);
    });
  });
});