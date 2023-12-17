import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CONFIG, CONFIG_TYPE } from 'src/models/configs';

export class CreateSettingDto {
  @IsString()
  name: string;

  @IsEnum(CONFIG)
  configType: CONFIG_TYPE;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  value: string;
}
