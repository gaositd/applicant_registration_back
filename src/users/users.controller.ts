import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { QueryUserType, RequestType } from '../types';
import { adminRegisterDTO } from './dto/adminRegisterDTo';
import { UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { Roles } from './guards/roles.decorator';
import { UsersService } from './users.service';
import { ExcludeDeletedusers } from './interceptors/filterDeleteUser.interceptor';
import { USER_ROLES_TYPE } from '../models/user';
import { IsPublic } from './guards/public.decorator';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from 'src/auth/auth.service';
import { PasswordResetDTO } from './dto/passwordReset.dto';
import { ERROR_MESSAGES } from 'src/constants';

@UseGuards(AuthenticatedGuard)
@UseInterceptors(ExcludeDeletedusers)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Roles('admin', 'secretaria')
  @Get('/')
  async findUsers(
    @Query('status') status: QueryUserType = 'all',
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('role') role: USER_ROLES_TYPE | USER_ROLES_TYPE[],
    @Req() req: RequestType,
  ) {
    if (req.user.role === 'secretaria' && role === 'admin')
      throw new ForbiddenException(
        'No tienes permisos para ver administradores',
      );

    if (Array.isArray(role) && role.includes('admin'))
      throw new ForbiddenException(
        'No tienes permisos para ver administradores',
      );

    return this.usersService.find(
      status === 'all' ? undefined : status,
      search,
      page,
      role,
    );
  }

  @Roles('secretaria', 'admin')
  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<any> {
    const searchData = {};

    if (Number.isInteger(parseInt(id))) searchData['id'] = parseInt(id);
    else searchData['matricula'] = id;

    const data = await this.usersService.findOne(searchData);

    const { password, ...parsedUser } = data;

    return parsedUser;
  }

  @IsPublic()
  @Post('/')
  async newUser(@Body() userData: UserRegisterDTO, @Req() req: RequestType) {
    return this.usersService.create(userData, req.user?.id);
  }

  @Roles('admin')
  @Post('/admin')
  async createAdmin(
    @Body() userData: adminRegisterDTO,
    @Req() req: RequestType,
  ) {
    return this.usersService.createAdmin(userData, req.user.id);
  }

  @IsPublic()
  @Put('/password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body() { password }: PasswordResetDTO,
  ) {
    try {
      const { id } = verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      ) as TokenPayload;

      return this.usersService.resetPassword(id, password);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new ForbiddenException(
          ERROR_MESSAGES.PASSWORD_RESET_EXPIRED_TOKEN,
        );
      }
      throw new BadRequestException(ERROR_MESSAGES.PASSWORD_RESET_ERROR);
    }
  }
  @Roles('admin', 'secretaria')
  @Put('/:id')
  async updateUser(
    @Param('id') id: number | string,
    @Body() userData: UpdateUserDTO,
    @Req() req: RequestType,
  ) {
    if (!id) throw new BadRequestException('No se recibio el id');

    return this.usersService.update(id, userData, req.user.id);
  }

  @Roles('admin', 'secretaria')
  @Delete('/:id')
  async deleteUser(@Param('id') id: number | string, @Req() req: RequestType) {
    if (!id) throw new BadRequestException('No se recibio el id');

    if (req.user.id === id)
      throw new BadRequestException('No puedes eliminarte a ti mismo');

    return this.usersService.deleteUser(id, req.user.id, req.user.role);
  }
}
