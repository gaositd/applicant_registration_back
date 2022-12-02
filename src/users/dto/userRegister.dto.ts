import { IsString } from 'class-validator';

export class UserRegisterDTO {
  @IsString()
  nombre: string;

  @IsString()
  mail: string;
}
