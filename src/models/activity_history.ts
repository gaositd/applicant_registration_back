import {
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseModel } from './base';
import { User } from './user';

enum OPERATIONS {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type OPERATIONS_TYPE = `${OPERATIONS}`;

@Entity()
export class ActivityHistory extends BaseModel {
  @Property({ nullable: true })
  description?: string;

  @ManyToOne()
  updatedBy: User;

  @Enum({ items: () => OPERATIONS })
  action: OPERATIONS_TYPE;

  @ManyToOne()
  userAffected: User;
}
