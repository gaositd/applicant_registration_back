import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { hash } from 'bcrypt';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';
import { USER_OPERATIONS_MESSAGES } from 'src/constants';
import { MailService } from 'src/mail/mail.service';
import { USER_ROLES_TYPE, USER_STATUS_TYPE, User } from 'src/models/user';
import { FileType, UserDocuments } from 'src/models/user_documents';
import { adminRegisterDTO } from './dto/adminRegisterDTo';
import { UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { createMatricula, generatePassword } from './utils';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
    private readonly activityHistoryService: ActivityHistoryService,
    private readonly mailService: MailService,
  ) {}

  async find(
    status?: USER_STATUS_TYPE,
    search?: string,
    page?: number,
    USER_ROLE?: USER_ROLES_TYPE | USER_ROLES_TYPE[],
  ) {
    const statusOptions = status ? { status } : {};
    const searchOptions = search
      ? {
          $or: [
            { matricula: { $ilike: `%${search}%` } },
            { nombre: { $ilike: `%${search}%` } },
          ],
        }
      : {};
    const pageOptions = page ? { limit: 10, offset: page * 10 } : {};
    const roleOptions = USER_ROLE
      ? { role: Array.isArray(USER_ROLE) ? { $in: USER_ROLE } : USER_ROLE }
      : {};
    return this.em.find(User, {
      ...pageOptions,
      ...searchOptions,
      ...statusOptions,
      ...roleOptions,
    });
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

  async create(userData: UserRegisterDTO, adminId?: number) {
    try {
      const password = generatePassword(10);

      const hashedPassword = await hash(
        password,
        parseInt(this.configService.get<string>('HASH_SALT_ROUNDS')),
      );

      const newUser = this.em
        .fork()
        .create(User, { ...userData, password: hashedPassword });

      newUser.matricula = createMatricula(12);

      Object.keys(FileType).forEach((document) => {
        newUser.documentos.add(
          this.em.create(UserDocuments, {
            fileType: document as FileType,
          }),
        );
      });

      await this.em.persistAndFlush(newUser);

      const response = await this.activityHistoryService.createActivityHistory({
        action: 'create',
        description: USER_OPERATIONS_MESSAGES.create,
        updatedBy: adminId ? adminId : newUser.id,
        userAffected: newUser.id,
      });

      if (!response.ok) throw new Error(response.error);

      await this.mailService.sendMail({
        to: newUser.email,
        subject: 'Pre-registro facultad de matematicas UJED',
        template: 'user-register',
        context: {
          name: newUser.nombre,
          matricula: newUser.matricula,
          password,
          loginUrl: `${this.configService.get<string>('CLIENT_URL')}/login}`,
        },
      });

      return {
        ...newUser,
        password,
      };
    } catch (error) {
      console.error(error);
      if (error.code === '23505')
        throw new BadRequestException(
          'El aspirante ya se encuentra registrado',
        );
      throw new BadRequestException('No se pudo crear el usuario');
    }
  }

  async update(id: number | string, userData: UpdateUserDTO, adminId: number) {
    const options = typeof id === 'number' ? { id } : { matricula: id };

    const user = await this.em.fork().findOne(User, options);

    const updatedUser = Object.assign(user, userData);

    await this.em.fork().persistAndFlush(updatedUser);

    this.activityHistoryService.createActivityHistory({
      action: 'update',
      description: USER_OPERATIONS_MESSAGES.update,
      updatedBy: adminId,
      userAffected: user.id,
    });

    return 'El usuario ha sido registrado con exito';
  }

  async createAdmin(userData: adminRegisterDTO, adminId: number) {
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
        description: USER_OPERATIONS_MESSAGES['create-admin'],
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

  async deleteUser(id: number | string, adminId: number, adminRole: string) {
    try {
      const options = typeof id === 'number' ? { id } : { matricula: id };

      const user = await this.em.fork().findOne(User, options);

      if (adminRole !== 'admin' && user.role === 'admin')
        throw new ForbiddenException(
          'No tienes permisos para eliminar a este usuario',
        );

      user.isDeleted = true;

      await this.em.persistAndFlush(user);

      this.activityHistoryService.createActivityHistory({
        action: 'delete',
        description: USER_OPERATIONS_MESSAGES.delete,
        updatedBy: adminId,
        userAffected: user.id,
      });

      return {
        message: 'El usuario ha sido eliminado con exito',
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('No se pudo eliminar el usuario');
    }
  }
}
