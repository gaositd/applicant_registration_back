import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';

@Module({
  providers: [DocumentsService, ActivityHistoryService],
  controllers: [DocumentsController]
})
export class DocumentsModule {}
