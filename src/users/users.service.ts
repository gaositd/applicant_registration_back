import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { hash } from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';
import { USER_STATUS_TYPE, User } from 'src/models/user';
import {
  FileType,
  UserDocuments
} from 'src/models/user_documents';
import { UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { createMatricula } from './utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
    private readonly activityHistoryService: ActivityHistoryService,
  ) {}

  async find() {
    return this.em.find(User, {});
  }

  async findOne(
    data: {
      id?: number;
      matricula?: string;
    },
    populateData?: boolean,
  ) {
    const user = await this.em.fork().findOne(User, data, {
      populate: populateData ? ['activityHistory'] : false,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(userData: UserRegisterDTO, adminId: number) {
    try {
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

      const response = await this.activityHistoryService.createActivityHistory({
        action: 'create',
        description: 'Se ha registrado un nuevo usuario',
        updatedBy: adminId,
        userAffected: newUser.id,
      });

      if (!response.ok) throw new Error(response.error);

      return newUser;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  async update(id: number, userData: UpdateUserDTO, adminId: number) {
    const user = await this.em.fork().findOne(User, { id });

    const updatedUser = Object.assign(user, userData);

    await this.em.fork().persistAndFlush(updatedUser);

    this.activityHistoryService.createActivityHistory({
      action: 'update',
      description: 'Se ha actualizado un usuario',
      updatedBy: adminId,
      userAffected: user.id,
    });

    return 'El usuario ha sido registrado con exito';
  }

 



  async createAdmin(userData: UserRegisterDTO, adminId: number) {
    try {
      const user = this.em.create(User, userData);

      const hashedPassword = await hash(
        userData.password,
        parseInt(this.configService.get<string>('HASH_SALT_ROUNDS')),
      );

      user.password = hashedPassword;

      user.matricula = createMatricula(12);

      await this.em.persistAndFlush(user);

      this.activityHistoryService.createActivityHistory({
        action: 'create',
        description: 'Se ha creado un nuevo administrador o secretaria',
        updatedBy: adminId,
        userAffected: user.id,
      });

      return {
        message: 'El usuario ha sido creado con exito',
        user: user,
      };
    } catch (error) {
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }


  async findProspectos(status?: USER_STATUS_TYPE) {
    const statusOptions = status ? { status } : {};

    try {
      const prospectos = await this.em.find(User, {
        role: 'prospecto',
        ...statusOptions,
      });

      return prospectos;
    } catch (error) {
      console.error(error);
      throw new BadGatewayException('No se pudo obtener los prospectos');
    }
  }
}
