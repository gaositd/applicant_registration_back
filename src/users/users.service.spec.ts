import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ActivityHistoryService } from '../activity-history/activity-history.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { EntityManager } from '@mikro-orm/postgresql';
describe('UsersService', () => {
  let service: UsersService;
  let em: EntityManager;
  let config: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: EntityManager,
          useValue: {
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
    config = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return an array of users', async () => {
    jest.spyOn(em, 'find').mockImplementation(async () => []);
    const users = await service.find();
    expect(users).toEqual([]);
  });
});
