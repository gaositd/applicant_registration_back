import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(matricula: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ matricula });

    if (user && (await compare(password, user.password))) {
      const { password, ...userData } = user;

      return userData;
    }
    return null;
  }
}
