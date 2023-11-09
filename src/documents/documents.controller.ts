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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { FileType } from 'src/models/user_documents';
import { RequestType } from 'src/types';
import {
  ParamDocumentUpdateDTO,
  UpdateDocumentDTO,
} from 'src/users/dto/updateData.dto';
import { Roles } from 'src/users/guards/roles.decorator';
import { DocumentsService } from './documents.service';
import { Response } from 'express';

@UseGuards(AuthenticatedGuard)
@Controller('docs')
export class DocumentsController {
  constructor(private readonly documentService: DocumentsService) {}

  @Roles('prospecto')
  @Get('/')
  async getUserDocs(@Req() req: RequestType) {
    return this.documentService.findDocs(req.user.matricula);
  }

  @Get('/file/:id')
  async getUserDocsFile(@Param('id') id: number, @Res() res: Response) {
    const fileInfo = await this.documentService.findDocsFile(id);

    res.setHeader('Content-Type', fileInfo.mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileInfo.name}`,
    );
    res.status(200);

    res.send(fileInfo.file);
  }

  @Roles('admin', 'secretaria')
  @Get('/:id')
  async getUserDocsById(@Param('id') id: number | string) {
    return this.documentService.findDocsById(id);
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

    return await this.documentService.uploadDocument(
      file,
      FileType[document],
      req.user.matricula,
    );
  }

  @Roles('secretaria', 'admin')
  @Put('/:id')
  async updateUserDocs(
    @Param('id') id: number,
    @Query() { operation }: ParamDocumentUpdateDTO,
    @Body() { observaciones }: UpdateDocumentDTO,
    @Req() req: RequestType,
  ) {
    if (!id) throw new BadRequestException('No se recibio el id');

    return this.documentService.updateDocumentStatus(
      id,
      operation,
      req.user.id,
      observaciones,
    );
  }
}
