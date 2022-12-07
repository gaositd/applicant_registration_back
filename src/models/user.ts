import { Entity, Enum, Property, Unique } from '@mikro-orm/core';
import { BaseModel } from './base';

enum USER_ROLES {
  ADMIN = 'admin',
  SECRETARIA = 'secretaria',
  PROSPECTO = 'prospecto',
}

type USER_ROLES_TYPE = Record<USER_ROLES, string>;
@Entity()
export class User extends BaseModel {
  @Property()
  nombre: string;

  @Property()
  mail: string;

  @Property()
  @Unique()
  matricula: string;

  @Property({ nullable: true })
  isDeleted = false;

  @Enum(() => USER_ROLES)
  role: USER_ROLES_TYPE;
}
