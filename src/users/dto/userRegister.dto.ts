import { IsString, MinLength } from 'class-validator';

export class UserRegisterDTO {
  @IsString()
  nombre: string;

  @IsString()
  mail: string;

  @IsString()
  @MinLength(8)
  password: string;
}