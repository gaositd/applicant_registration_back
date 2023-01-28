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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { FileType } from 'src/models/user_documents';
import { RequestType } from 'src/types';
import { UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { UsersService } from './users.service';

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async findUsers() {
    return this.usersService.find();
  }

  @Get('/docs/')
  async getUserDocs(@Req() req: RequestType) {
    return this.usersService.findDocs(req.user.matricula);
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

  @UseGuards(AuthenticatedGuard)
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
    @Req() req: RequestType,
  ) {
    if (!file)
      return {
        message: 'Archivo no valido',
      };

    return await this.usersService.uploadDocument(
      file,
      FileType[document],
      req.user.matricula,
    );
  }

  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() userData: UpdateUserDTO) {
    if (!id) throw new BadRequestException('No se recibio el id');

    return this.usersService.update(id, userData);
  }
}
