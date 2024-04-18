import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { USER_ROLES_TYPE, User } from '../models/user';
import { sign, verify } from 'jsonwebtoken';
import { EntityManager } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

interface userData {
  id: number;
  nombre: string;
  email: string;
  matricula: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: USER_ROLES_TYPE;
}
export type TokenPayload = {
  id: number;
};

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly em: EntityManager,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    matricula: string,
    password: string,
  ): Promise<userData | null> {
    const user = await this.userService.findOne({ matricula }, false);

    if (!user) return null;

    if (user && (await compare(password, user.password))) {
      const { password, ...userData } = user;

      return userData;
    }

    return null;
  }

  async requestPasswordReset(email: string, isAPIRequest: boolean) {
    const user = await this.em.findOne(User, { email });

    console.log(isAPIRequest);
    if (!user) {
      this.logger.error(
        `Se registro un intento de cambio de contraseña para un usuario inexistente al usuario ${email}`,
      );
      return { ok: true };
    }

    const token = sign({ id: user.id }, this.configService.get('JWT_SECRET'), {
      expiresIn: '5m',
    });

    const resetPasswordURL = `${this.configService.get('CLIENT_URL')}/password-reset?token=${token}`;

    if (isAPIRequest) return { token, resetPasswordURL };

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Solicitud de cambio de contraseña',
      template: 'password-reset',
      context: {
        url: resetPasswordURL,
      },
    });
    return { ok: true };
  }

  async verifyPasswordResetToken(token: string) {
    try {
      verify(token, this.configService.get('JWT_SECRET'));
      return { ok: true };
    } catch (error) {
      this.logger.error(
        'Se registro un intento de cambio de contraseña con un token invalido',
      );
      throw new ForbiddenException('Token invalido');
    }
  }
}
