import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/models/user';
import { getCurrentPeriod, getFileName } from 'src/utils/users.utils';
import { OperationType, UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { createMatricula } from './utils';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config/dist/config.service';
import {
  FileType,
  FileTypeInterface,
  UserDocuments,
} from 'src/models/user_documents';
import { Documents_Observaciones } from 'src/models/documents_observaciones';
@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  async find() {
    return this.em.find(User, {});
  }

  async findOne(data: { id?: number; matricula?: string }) {
    return this.em.fork().findOne(User, data);
  }

  async create(userData: UserRegisterDTO) {
    const hashedPassword = await hash(
      userData.password,
      parseInt(this.configService.get<string>('HASH_SALT_ROUNDS')),
    );

    const newUser = this.em
      .fork()
      .create(User, { ...userData, password: hashedPassword });

    newUser.matricula = createMatricula(12);

    const documentsRawFile = fs.readFileSync(
      path.resolve(__dirname, './../../config/documents.json'),
      'utf-8',
    );

    type documentFileType = {
      document: string;
      fileType: string[];
    };

    const documents: documentFileType[] = JSON.parse(documentsRawFile);

    documents.forEach((document) => {
      console.log(FileType[document.document]);

      newUser.documentos.add(
        this.em.create(UserDocuments, {
          fileType: FileType[document.document],
        }),
      );
    });

    await this.em.persistAndFlush(newUser);

    return newUser;
  }

  async update(id: number, userData: UpdateUserDTO) {
    const user = await this.em.fork().findOne(User, { id });

    const updatedUser = Object.assign(user, userData);

    await this.em.fork().persistAndFlush(updatedUser);

    return 'El usuario ha sido registrado con exito';
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

      const document = user.documentos
        .getItems()
        .find((document) => document.fileType === documentType);

      document.status = 'reviewing';

      const newPath = path.join('./uploads', getCurrentPeriod(), matricula);

      if (!fs.existsSync(newPath)) fs.mkdirSync(newPath, { recursive: true });

      const FullPath = path.join(
        newPath,
        getFileName(documentType, file.originalname),
      );

      document.ruta = FullPath;

      fs.writeFileSync(FullPath, file.buffer);

      await this.em.persistAndFlush(document);

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

  async createAdmin(userData: UserRegisterDTO) {
    try {
      const user = this.em.create(User, userData);

      const hashedPassword = await hash(
        userData.password,
        parseInt(this.configService.get<string>('HASH_SALT_ROUNDS')),
      );

      user.password = hashedPassword;

      user.matricula = createMatricula(12);

      await this.em.persistAndFlush(user);

      return {
        message: 'El usuario ha sido creado con exito',
        user: user,
      };
    } catch (error) {
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  async findDocsById(id: number) {
    try {
      const user = await this.em.findOneOrFail(
        User,
        {
          id,
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

  async updateDocumentStatus(
    id: number,
    operation: OperationType,
    observaciones?: string[],
  ) {
    try {
      const document = await this.em.findOneOrFail(
        UserDocuments,
        { id },
        { populate: ['observaciones'] },
      );

      if (operation === 'approve') {
        if (document.status === 'rejected') {
          this.em.remove(document.observaciones.getItems());
          document.observaciones.removeAll();
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

      return {
        message: 'El documento ha sido actualizado con exito',
      };
    } catch (error) {
      throw new BadRequestException('No se pudo actualizar el documento');
    }
  }
}
