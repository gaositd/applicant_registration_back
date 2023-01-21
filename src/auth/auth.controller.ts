import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestType) {
    return req.user;
  }
}
