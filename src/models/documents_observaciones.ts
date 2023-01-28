import { Entity, Property } from '@mikro-orm/core';
import { BaseModel } from './base';

@Entity()
export class Documents_Observaciones extends BaseModel {
  @Property()
  observacion: string;
}
