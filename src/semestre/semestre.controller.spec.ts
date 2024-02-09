import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'supertest';
import { SemestreController } from './semestre.controller';
import { SemestreService } from './semestre.service';

describe('SemestreController', () => {
  let controller: SemestreController;
  // let request: Request;
  let request: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemestreController],
      providers: [
        {
          provide: SemestreService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SemestreController>(SemestreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('semestre', () => {
    it('should be return semestre', async () => {
      const response: Response = await request.get('/admin/semestre');

      expect(response.status).toBe(200);
      expect(response.body).toEqual("");
    });
  });

  describe('semestre', () => {
    it('should be return semestre', async () => {
      const response: Response = await request.post('/admin/startSemestre');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(true);
    });
  });

  describe('semestre', () => {
    it('should be return semestre', async () => {
      const response: Response = await request.post('/admin/endSemestre');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(true);
    });
  });

});
