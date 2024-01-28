import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { USER_ROLES_TYPE } from '../models/user';

interface userData {
  id: number;
  nombre: string;
  email: string;
  matricula: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: USER_ROLES_TYPE;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(
    matricula: string,
    password: string,
  ): Promise<userData | null> {
    const user = await this.userService.findOne({ matricula }, false);

    if (!user) return null;

    if (user && (await compare(password, user.password))) {
      const { password, ...userData } = user;

      return userData;
    }

    return null;
  }
}
