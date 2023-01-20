import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(matricula: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ matricula });
  }
}
