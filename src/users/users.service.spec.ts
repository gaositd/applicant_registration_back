import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ActivityHistoryService } from '../activity-history/activity-history.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserMock } from './testing/userService.mocks';

describe('UsersService', () => {
  let service: UsersService;
  let em: EntityManager;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: EntityManager,
          useValue: {
            fork: jest.fn(() => ({
              findOne: jest.fn().mockReturnValue(UserMock),
            })),
            find: jest.fn(),
          },
        },
        UsersService,
        ActivityHistoryService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test'),
          },
        },
        {
          provide: MailService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of users', async () => {
      jest.spyOn(em, 'find').mockImplementation(async () => []);
      const users = await service.find();
      expect(users).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('Should return an user', async () => {
      const user = await service.findOne({ id: 1 });
      expect(user).toEqual(UserMock);
    });

    it('Should throw NotFound error if the user does not exist', async () => {
      try {
        await service.findOne({ id: 222 });
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });
});
