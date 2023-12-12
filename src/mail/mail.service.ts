import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

type MailProps = {
  to: string;
  subject: string;
  template: string;
  context?: Record<string, unknown>;
};

@Injectable()
export class MailService {
  private logger = new Logger('MailService');

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('MAIL_CLIENT_ID'),
      this.configService.get('MAIL_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: this.configService.get('MAIL_REFRESH_TOKEN'),
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('MAIL_CLIENT_EMAIL'),
        clientId: this.configService.get('MAIL_CLIENT_ID'),
        clientSecret: this.configService.get('MAIL_CLIENT_SECRET'),
        accessToken,
      },
    };

    this.mailerService.addTransporter('gmail', config);
  }

  async sendMail({ to, subject, template, context }: MailProps): Promise<void> {
    try {
      const mailOptions: ISendMailOptions = {
        transporterName: 'gmail',
        to: 'elcorreodezomodan@gmail.com', // list of receivers
        from: this.configService.get('MAIL_CLIENT_EMAIL'), // sender address
        subject, // Subject line
        template,
        context,
      };

      await this.setTransport();

      this.mailerService.sendMail(mailOptions);

      this.logger.log(
        `Mail sent to ${to} with subject ${subject} and template ${template} at ${new Date().toLocaleString()}`,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
