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

  @Property()
  password: string;

  @Property({ nullable: true, type: 'boolean', default: false })
  isDeleted: boolean;

  @Enum({ items: () => USER_ROLES, default: USER_ROLES.PROSPECTO })
  role: USER_ROLES_TYPE;
}
