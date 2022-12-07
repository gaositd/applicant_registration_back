import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findUsers() {
    return this.usersService.find();
  }

  @Get('/:id')
  async findUser(@Param('id') id: string | number) {
    return this.usersService.findOne({
      id: typeof id === 'number' ? id : null,
      matricula: typeof id === 'string' ? id : null,
    });
  }

  @Post('/')
  async newUser(@Body() userData: UserRegisterDTO) {
    return this.usersService.create(userData);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDTO) {
    if (!id) throw new BadRequestException('No se recibio el id');

    return this.usersService.update(id, userData);
  }
}
