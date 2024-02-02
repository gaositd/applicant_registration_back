import { EntityManager } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { ReportesMock } from '../users/testing/reportesService.mock';
import { ReportesService } from './reportes.service';

describe('ReportesService', () => {
  let service: ReportesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportesService,
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReportesService>(ReportesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe ('getFichaPago', () => {
    it('Should return an object of document', async () =>{
      const fichaPago = await service.getFichaPago(id:number,);
      expect(fichaPago).toEqual(ReportesMock);
    });
  });
});
