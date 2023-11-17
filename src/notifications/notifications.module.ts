import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, ActivityHistoryService],
})
export class NotificationsModule {}
