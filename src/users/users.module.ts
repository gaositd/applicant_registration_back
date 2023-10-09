import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ActivityHistoryService],
  exports: [UsersService],
  imports: [ConfigModule],
})
export class UsersModule {}
