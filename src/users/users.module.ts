import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [ConfigModule],
})
export class UsersModule {}
