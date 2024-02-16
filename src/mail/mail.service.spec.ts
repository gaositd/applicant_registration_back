import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mailMock } from 'src/users/testing/mailService.mock';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;
  const {to, from, subject, template, context} = mailMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("sendEmail", () =>{
    it('Shouls return a email',async () => {
      const email = await service.sendMail(to,subject,template,context);
      expect(email).toEqual(null);
    })
  });

});
