import {
  BadGatewayException,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestType, Response } from 'express';
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
  @Get('/me')
  async me(@Req() req: RequestType) {
    return { user: req.user };
  }

  @Delete('/logout')
  async logout(@Req() req: RequestType, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) throw new BadGatewayException(err.message);

      res.status(200).json({ message: 'Sesion cerrada satisfactoriamente' });
    });
  }
}
