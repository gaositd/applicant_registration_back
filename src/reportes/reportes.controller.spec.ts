import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'supertest';
import { ReportesController } from './reportes.controller';
import { ReportesService } from './reportes.service';

describe('ReportesController', () => {
  let controller: ReportesController;
  let request: Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportesController],
      providers: [
        {
          provide: ReportesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ReportesController>(ReportesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fichaPago', () => {
    it('should be return fichaPago', async () => {
      const reports: any = {...};
      // const response:Response = await request.get('/reportes/fichaPago');
      const response:any = await request.get('/reportes/fichaPago');

      expect(response.status).toBe(201);
      expect(response.body).toEqual(reports);
    });
  });

});
