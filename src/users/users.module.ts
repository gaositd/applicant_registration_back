import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ActivityHistoryService, MailService],
  exports: [UsersService],
  imports: [ConfigModule],
})
export class UsersModule {}
