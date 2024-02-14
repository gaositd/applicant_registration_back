import { EntityManager } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { UserMock } from 'src/users/testing/userService.mocks';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let em:EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: UsersService, useValue: {
        fork: jest.fn(() => ({
          findOne: jest.fn().mockReturnValue(UserMock),
        })),
        find: jest.fn(),
      } }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    em = module.get<EntityManager>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if user is not found', async () => {
    const user = await service.validateUser('matricula', 'password');
    expect(user).toBeNull();
  });

  describe('validateUser', () => {// Simula comparación fallida
    it('should return null if user is not found', async () => {
      jest.spyOn(em, 'find').mockImplementation(async () => []);

      const user = await service.validateUser('12345','wrongPassword');
      expect(user).toBeNull();
    });
    
    it('should return null if user is not found', async () => {
      jest.spyOn(em, 'find').mockImplementation(async () => []);
  
      const user = await service.validateUser('1234567890','1234567890');
      expect(user).toEqual({UserMock});
    });
  });

});
