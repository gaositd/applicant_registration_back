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

@UseGuards(AuthenticatedGuard)
@UseInterceptors(ExcludeDeletedusers)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  async findUser(@Param('id') id: string) {
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
