import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Query,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request as RequestType, Response } from 'express';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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

  @Get('/password-reset-token')
  async validatePasswordToken(@Query('token') token: string) {
    console.log(token);
    return await this.authService.verifyPasswordResetToken(token);
  }

  @Post('/request-password-reset')
  async requestPasswordReset(
    @Body('email') email: string,
    @Headers('x-no-gui') noGUI: boolean,
  ) {
    return await this.authService.requestPasswordReset(email, noGUI);
  }

  @Delete('/logout')
  async logout(@Req() req: RequestType, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) throw new BadGatewayException(err.message);

      res.status(200).json({ message: 'Sesion cerrada satisfactoriamente' });
    });
  }
}
