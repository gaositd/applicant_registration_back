import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DOCUMENT_TYPE } from 'src/utils/types';
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

  @Post('/upload')
  @UseInterceptors(FileInterceptor('documento'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpg|pdf|jpeg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query('fileType') document: string,
  ) {
    if (!file)
      return {
        message: 'Archivo no valido',
      };

    return await this.usersService.uploadDocument(
      file,
      DOCUMENT_TYPE[document],
      'TEST_MATRICULA',
    );
  }
}
