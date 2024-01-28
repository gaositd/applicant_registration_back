import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, UsersService],
  imports: [PassportModule.register({ session: true })],
})
export class AuthModule {}
