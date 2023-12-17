import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { BaseModel } from './base';

export enum CONFIG {
  VALUE = 'value',
  USER_CONFIG = 'user_config',
  APP_CONFIG = 'app_config',
}

export type CONFIG_TYPE = Record<CONFIG, string>;

@Entity()
export class Configs extends BaseModel {
  @Enum(() => CONFIG)
  configType: CONFIG_TYPE;

  @Unique()
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  value: string;
}
