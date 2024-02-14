import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import supertest, { Response } from 'supertest';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let request: any;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    app = module.createNestApplication(); // Crea la aplicación a partir del módulo de test
    await app.init();
    request = supertest(app.getHttpServer());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('me', () => {
    it('should be me information', async() => {
      const me: Response = await request.get('/auth/me');

      expect(me.status).toBe(200);
      expect(me.body).toEqual({});
    });
  });

  describe('login', () => {
    it('should be me login', async() => {
      const login: Response = await request.post('/auth/login');

      expect(login.status).toBe(200);
      expect(login.body).toEqual({});
    });
  });

  describe('logout', () => {
    it('should be nothing', async() => {
      const logout: Response = await request.delete('/auth/logout');

      expect(logout.status).toBe(200);
      expect(logout.body).toEqual('');
    });
  });

});
