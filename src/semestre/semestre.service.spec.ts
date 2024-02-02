import { EntityManager } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { SEMESTER_STATUS } from './../constants';
// import { SemestreMock } from 'src/users/testing/semestreService.mock';
import { SemestreService } from './semestre.service';

describe('SemestreService', () => {
  let service: SemestreService;
  // let em:EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        SemestreService,
        {
          provide: EntityManager,
          useValue: {
            fork: jest.fn(() => ({
              findOne: jest.fn().mockReturnValue(SEMESTER_STATUS),
            })),
            find: jest.fn(),
          },
        },
        SemestreService,
      ],
    }).compile();

    service = module.get<SemestreService>(SemestreService);
    // em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSemestreStatus', () => {
    it('Should return a status', async() =>{
      const semestre = await service.getSemestreStatus();
      expect(semestre).toEqual(undefined);
    } );
  } );

  describe('startSemestre', () => {
    it('Should return an abierto', async() => {
      const semestre = await service.startSemestre();
      expect(semestre).toEqual(SEMESTER_STATUS.OPEN);
    } );
  });

  describe('endSemestre', () => {
    it('Should return a cerrado', async() =>{
      const semestre = await service.endSemestre();
      expect(semestre).toEqual(SEMESTER_STATUS.CLOSED);
    } );
  } );

});
