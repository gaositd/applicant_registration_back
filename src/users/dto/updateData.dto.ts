import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  mail: string;
}
