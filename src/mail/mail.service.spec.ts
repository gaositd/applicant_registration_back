import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { mailMock } from 'src/users/testing/mailService.mock';

describe('MailService', () => {
  let service: MailService;
  // const {to, from, subject, template, context} = mailMock;

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
      const email = await service.sendMail(mailMock);
      expect(email).toEqual(null);
    })
  });

});
