import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { Request as RequestType } from 'express';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: RequestType) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/hello')
  async helloTest() {
    return 'Hello Worlds';
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  async me(@Req() req: RequestType) {
    return req.user;
  }
}
