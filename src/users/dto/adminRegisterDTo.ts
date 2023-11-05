import { IsEnum, IsString, MinLength } from 'class-validator';
import { USER_ROLES_TYPE } from 'src/models/user';

export class adminRegisterDTO {
  @IsString()
  nombre: string;

  @IsString()
  mail: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(['admin', 'secretaria'])
  role: USER_ROLES_TYPE;
}
