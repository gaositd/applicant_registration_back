import { Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseModel } from './base';
import { User } from './user';

enum TIPO_DOCUMENTO {
  CURP = 'curp',
  ACTA_NACIMIENTO = 'acta_nacimiento',
}

export type TIPO_DOCUMENTO_TYPE = Record<TIPO_DOCUMENTO, string>;

export class UserDocuments extends BaseModel {
  @Enum(() => TIPO_DOCUMENTO)
  tipo_documento: TIPO_DOCUMENTO_TYPE;

  @Property()
  ruta: string;

  @Property()
  isValid: boolean;

  @Property()
  observaciones: String[];

  @ManyToOne(() => User)
  user: User;
}
