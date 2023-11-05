import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ActivityHistory } from './activity_history';
import { BaseModel } from './base';
import { UserDocuments } from './user_documents';

enum USER_ROLES {
  ADMIN = 'admin',
  SECRETARIA = 'secretaria',
  PROSPECTO = 'prospecto',
}

export type USER_ROLES_TYPE = `${USER_ROLES}`;

enum USER_STATUS {
  COMPLETED = 'completed',
  PENDING = 'pending',
  DUEUED = 'dueued',
}

export type USER_STATUS_TYPE = `${USER_STATUS}`;
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

  @Enum({
    items: () => USER_ROLES,
    default: USER_ROLES.PROSPECTO,
    defaultRaw: `'${USER_ROLES.PROSPECTO}'`,
  })
  role: USER_ROLES_TYPE;

  @ManyToMany({ entity: () => UserDocuments, owner: true })
  documentos = new Collection<UserDocuments>(this);

  @Enum({ items: () => USER_STATUS, default: USER_STATUS.PENDING })
  status: USER_STATUS_TYPE = USER_STATUS.PENDING;

  @OneToMany(
    () => ActivityHistory,
    (activityHistory) => activityHistory.updatedBy,
  )
  activityHistory = new Collection<ActivityHistory>(this);
}
