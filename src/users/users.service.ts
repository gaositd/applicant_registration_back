import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { User } from 'src/models/user';
import { UserRegisterDTO } from './dto/userRegister.dto';
import { createMatricula } from './utils';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async find() {
    return this.em.find(User, {});
  }

  async findOne(data: { id?: number; matricula?: string }) {
    return this.em.fork().findOne(User, data);
  }

  async create(userData: UserRegisterDTO) {
    const newUser = this.em.fork().create(User, userData);

    newUser.matricula = createMatricula();

    await this.em.persistAndFlush(newUser);

    return newUser;
  }
}
