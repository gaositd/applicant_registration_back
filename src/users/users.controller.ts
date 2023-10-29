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
import { USER_STATUS_TYPE } from 'src/models/user';
import { FileType } from 'src/models/user_documents';
import { QueryUserType, RequestType } from 'src/types';
import { adminRegisterDTO } from './dto/adminRegisterDTo';
import {
  ParamDocumentUpdateDTO,
  UpdateDocumentDTO,
  UpdateUserDTO,
} from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { Roles } from './guards/roles.decorator';
import { UsersService } from './users.service';

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin', 'secretaria')
  @Get('/')
  async findUsers() {
    return this.usersService.find();
  }

  @Roles('admin', 'secretaria')
  @Get('/prospectos')
  async findProspectos(@Query('status') status: QueryUserType = 'all') {
    return this.usersService.findProspectos(
      status === 'all' ? undefined : status,
    );
  }

  @Roles('prospecto')
  @Get('/docs')
  async getUserDocs(@Req() req: RequestType) {
    return this.usersService.findDocs(req.user.matricula);
  }

  @Roles('admin', 'secretaria')
  @Get('/docs/:id')
  async getUserDocsById(@Param('id') id: number | string) {

    return this.usersService.findDocsById(id);
  }

  @Roles('secretaria', 'admin')
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const searchData = {};

    if (Number.isInteger(parseInt(id))) searchData['id'] = parseInt(id);
    else searchData['matricula'] = id;

    const data = await this.usersService.findOne(searchData);

    return data;
  }

  @Roles('admin', 'secretaria')
  @Post('/')
  async newUser(@Body() userData: UserRegisterDTO, @Req() req: RequestType) {
    return this.usersService.create(userData, req.user.id);
  }

  @Roles('secretaria', 'prospecto')
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

  @Roles('admin')
  @Post('/admin')
  async createAdmin(
    @Body() userData: adminRegisterDTO,
    @Req() req: RequestType,
  ) {
    return this.usersService.createAdmin(userData, req.user.id);
  }

  @Roles('admin')
  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: UpdateUserDTO,
    @Req() req: RequestType,
  ) {
    if (!id) throw new BadRequestException('No se recibio el id');

    return this.usersService.update(id, userData, req.user.id);
  }

  @Roles('secretaria')
  @Put('/docs/:id')
  async updateUserDocs(
    @Param('id') id: number,
    @Query() { operation }: ParamDocumentUpdateDTO,
    @Body() { observaciones }: UpdateDocumentDTO,
    @Req() req: RequestType,
  ) {
    if (!id) throw new BadRequestException('No se recibio el id');

    return this.usersService.updateDocumentStatus(
      id,
      operation,
      req.user.id,
      observaciones,
    );
  }
}
