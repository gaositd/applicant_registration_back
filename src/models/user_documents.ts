import {
  Collection,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseModel } from './base';
import { Configuration } from './configs';
import { User } from './user';

export class UserDocuments extends BaseModel {
  @Property()
  ruta: string;

  @Property()
  isValid: boolean;

  @Property()
  observaciones: String[];

  @ManyToOne(() => User)
  user: User;

  @ManyToMany({ entity: () => Configuration, owner: true })
  documentos = new Collection<Configuration>(this);
}
