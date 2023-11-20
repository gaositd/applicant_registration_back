import { Enum } from '@mikro-orm/core';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ENotificationType, TNotificationType } from 'src/models/notification';

export class CreateNotificationDTO {
  @IsString()
  data: string;

  @IsEnum(ENotificationType)
  type: TNotificationType;

  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @IsBoolean()
  @IsOptional()
  isGlobal: boolean;
}
