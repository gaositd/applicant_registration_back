import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  providers: [DocumentsService, ActivityHistoryService, NotificationsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
