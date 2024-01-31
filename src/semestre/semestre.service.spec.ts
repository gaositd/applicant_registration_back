import { EntityManager } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
// import { SEMESTER_STATUS } from 'src/constants';
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
              findOne: jest.fn().mockReturnValue("SemestreMock"),
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

  describe('fidOne', async() => {
    it('Should return a Status', async() =>{
      const semestre = await service.getSemestreStatus();
      expect(semestre).toEqual("");
    } );
  } );

  describe('findOne', () => {
    it('Should return a Abierto', async() => {
      const semestre = await service.startSemestre();
      // expect(semestre).toEqual(SEMESTER_STATUS.OPEN);
      expect(semestre).toEqual("Abierto");
    } );
  });

  describe('fidOne', async() => {
    it('Should return a Cerrado', async() =>{
      const semestre = await service.endSemestre();
      // expect(semestre).toEqual(SEMESTER_STATUS.CLOSED);
      expect(semestre).toEqual("Cerrado");
    } );
  } );

});
