import { EntityManager } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityHistoryService } from '../activity-history/activity-history.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SemestreService } from '../semestre/semestre.service';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: ActivityHistoryService,
          useValue: {},
        },
        {
          provide: NotificationsService,
          useValue: {},
        },
        {
          provide: SemestreService,
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findDocs', () =>{
    it('Should return an document object', () =>{
      jest.spyOn(em, 'find').mockImplementation(async () => {});
      const doc = await service.findDocs();
      expect(doc).toEqual({});
    });
  });

  describe('findDocsById', () => {
    it('Should return an document object', () =>{
      jest.spyOn(em, 'find').mockImplementation(async () => {});
      const doc = await service.findDocsById();
      expect(doc).toEqual({});
    });
  });

  describe('updateDocumentStatus', () =>{
    it('Should return an update document status', () =>{
      const doc = await service.updateDocumentStatus();
      expect(doc).toEqual(true);
    });
  });

  describe('uploadDocument', () =>{
    it('Should return an object Upload File', () =>{
      const doc = await service.uploadDocument();
      expect(doc).toEqual({});
    });
  });

  describe('findDocsFile', () => {
    it('Should return a object Documet File', () =>{
      const doc = await service.findDocsFile();
      expect(doc).toEqual({});
    });
  });
  
});
