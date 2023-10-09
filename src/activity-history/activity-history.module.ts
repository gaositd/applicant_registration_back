import { Module } from '@nestjs/common';
import { ActivityHistoryService } from './activity-history.service';
import { ActivityHistoryController } from './activity-history.controller';

@Module({
  providers: [ActivityHistoryService],
  controllers: [ActivityHistoryController]
})
export class ActivityHistoryModule {}
