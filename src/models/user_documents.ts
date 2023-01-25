import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseModel } from './base';
import { Configuration } from './configs';

@Entity()
export class UserDocuments extends BaseModel {
  @Property()
  ruta: string;

  @Property()
  isValid: boolean;

  @Property()
  observaciones: String[];

  @ManyToMany({ entity: () => Configuration, owner: true })
  documentos = new Collection<Configuration>(this);
}
