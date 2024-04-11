import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityHistoryModule } from './activity-history/activity-history.module';
import { DocumentsModule } from './documents/documents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SettingsModule } from './settings/settings.module';
import { ReportesModule } from './reportes/reportes.module';
import { SemestreModule } from './semestre/semestre.module';
import path from 'path';
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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
      },
      defaults: {
        from: '"No Reply" <test@test.com>',
      },
      template: {
        dir: path.join(__dirname, '../', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule,
    SettingsModule,
    ReportesModule,
    SemestreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
