import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  Property,
} from '@mikro-orm/core';
import { BaseModel } from './base';
import { Documents_Observaciones } from './documents_observaciones';

@Entity()
export class UserDocuments extends BaseModel {
  @Property()
  ruta: string;

  @Property()
  isValid: boolean;

  @ManyToMany({
    entity: () => Documents_Observaciones,
    owner: true,
    cascade: [Cascade.ALL],
  })
  observaciones = new Collection<Documents_Observaciones>(this);
}
