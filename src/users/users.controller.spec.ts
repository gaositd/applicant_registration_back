import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  // let request: Request;
  let request: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: {} }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/users', () => {
    it('should be defined', async () => {
      const response: Response = await request.get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('/users/:id', () => {
    it('should be defined', async () => {
      const response: Response = await request.get('/users/:id');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe('/admin', () => {
    it('should be defined', async () => {
      const response: Response = await request.post('/admin');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe('/admin', () => {
    it('should be defined', async () => {
      const response: Response = await request.put('/admin/:id');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });

  describe('/admin', () => {
    it('should be defined', async () => {
      const response: Response = await request.delete('/admin/:id');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(null);
    });
  });

});
