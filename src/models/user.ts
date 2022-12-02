import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseModel } from './base';

@Entity()
export class User extends BaseModel {
  @Property()
  nombre: string;

  @Property()
  mail: string;

  @Property()
  @Unique()
  matricula: string;
}
