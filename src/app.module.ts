import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityHistoryModule } from './activity-history/activity-history.module';
import { DocumentsModule } from './documents/documents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    ActivityHistoryModule,
    DocumentsModule,
    NotificationsModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
