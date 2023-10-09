import { IsEnum, IsString, MinLength } from 'class-validator';

export class adminRegisterDTO {
  @IsString()
  nombre: string;

  @IsString()
  mail: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(['admin', 'secretaria'])
  role: string;
}
