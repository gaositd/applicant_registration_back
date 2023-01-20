import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from 'src/models/user';
import { DOCUMENT_TYPE } from 'src/utils/types';
import { getCurrentPeriod, getFileName } from 'src/utils/users.utils';
import { UpdateUserDTO } from './dto/updateData.dto';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { createMatricula } from './utils';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config/dist/config.service';

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
      this.configService.get<number>('HASH_SALT_ROUNDS'),
    );

    const newUser = this.em
      .fork()
      .create(User, { ...userData, password: hashedPassword });

    newUser.matricula = createMatricula();

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
    documentType: typeof DOCUMENT_TYPE,
    matricula: string,
  ) {
    try {
      const newPath = path.join('./uploads', getCurrentPeriod(), matricula);

      if (!fs.existsSync(newPath)) fs.mkdirSync(newPath, { recursive: true });

      fs.writeFileSync(
        path.join(newPath, getFileName(documentType, file.originalname)),
        file.buffer,
      );

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
}
