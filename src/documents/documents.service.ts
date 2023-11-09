import { EntityManager } from '@mikro-orm/core';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../models/user';
import { DOCUMENTS_OPREATIONS_MESSAGES } from '../contants';
import { Documents_Observaciones } from '../models/documents_observaciones';
import { FileTypeInterface, UserDocuments } from '../models/user_documents';
import { OperationType } from '../users/dto/updateData.dto';
import { ActivityHistoryService } from '../activity-history/activity-history.service';
import * as path from 'path';
import { getCurrentPeriod, getFileName } from '../utils/users.utils';
import * as fs from 'fs';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly em: EntityManager,
    private readonly activityHistoryService: ActivityHistoryService,
  ) {}

  async findDocs(matricula: string) {
    try {
      const user = await this.em.findOneOrFail(
        User,
        {
          matricula,
        },
        { populate: ['documentos', 'documentos.observaciones'] },
      );

      return {
        documentos: user.documentos,
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findDocsById(id: number | string) {
    const options = typeof id === 'number' ? { id } : { matricula: id };

    try {
      const user = await this.em.findOneOrFail(User, options, {
        populate: ['documentos', 'documentos.observaciones'],
      });

      return {
        name: user.nombre,

        documentos: user.documentos,
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updateDocumentStatus(
    id: number,
    operation: OperationType,
    adminId: number,
    observaciones?: string[],
  ) {
    try {
      const document = await this.em.findOneOrFail(
        UserDocuments,
        { id },
        { populate: ['observaciones'] },
      );

      const user = await this.em.findOneOrFail(User, { documentos: { id } });

      if (operation === 'approve') {
        if (document.status === 'rejected') {
          this.em.remove(document.observaciones.getItems());
          document.observaciones.removeAll();
          document.status = 'approved';
        } else document.status = 'approved';
      } else if (operation === 'reject') {
        document.status = 'rejected';
        document.observaciones.add(
          observaciones.map((observacion) =>
            this.em.create(Documents_Observaciones, { observacion }),
          ),
        );
      }

      await this.em.persistAndFlush(document);

      this.activityHistoryService.createActivityHistory({
        action: 'update',
        description: DOCUMENTS_OPREATIONS_MESSAGES[operation],
        updatedBy: adminId,
        userAffected: user.id,
      });

      return {
        message: 'El documento ha sido actualizado con exito',
      };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar el documento');
    }
  }

  async uploadDocument(
    file: Express.Multer.File,
    documentType: FileTypeInterface,
    matricula: string,
  ) {
    try {
      const user = await this.em.findOneOrFail(
        User,
        {
          matricula,
        },
        { populate: ['documentos'] },
      );

      if (!user.documentos.length)
        throw new BadRequestException('No se encontraron documentos');

      const document = user.documentos
        .getItems()
        .find((document) => document.fileType === documentType);

      if (document.status === 'rejected') {
        await document.observaciones.init();
        document.observaciones.removeAll();
      }

      if (document.status === 'approved') {
        throw new BadRequestException('El documento ya ha sido aprovado');
      }

      document.status = 'reviewing';

      const newPath = path.join('./uploads', getCurrentPeriod(), matricula);

      document.mimeType = file.mimetype;

      if (!fs.existsSync(newPath)) fs.mkdirSync(newPath, { recursive: true });

      const FullPath = path.join(
        newPath,
        getFileName(documentType, file.originalname),
      );

      document.ruta = FullPath;

      fs.writeFileSync(FullPath, file.buffer);

      await this.em.persistAndFlush(document);

      this.activityHistoryService.createActivityHistory({
        action: 'update',
        description: 'Se ha subido un nuevo documento',
        updatedBy: user.id,
        userAffected: user.id,
      });

      return {
        message: 'El archivo se ha subido satisfactoriamente',
        filename: file.filename,
      };
    } catch (error) {
      console.error(error);
      return {
        message: error.message,
      };
    }
  }

  async findDocsFile(id: number) {
    try {
      const document = await this.em.findOneOrFail(UserDocuments, { id });

      const file = fs.readFileSync(document.ruta);

      return {
        file,
        name: getFileName(document.fileType, document.ruta),
        mimeType: document.mimeType,
      };
    } catch (error) {
      throw new NotFoundException('Documento no encontrado');
    }
  }
}
