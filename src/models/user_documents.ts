import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  Property,
} from '@mikro-orm/core';
import { BaseModel } from './base';
import { Documents_Observaciones } from './documents_observaciones';

export enum FileType {
  CURP = 'curp',
  ACTA_NACIMIENTO = 'acta_nacimiento',
  COMPROBANTE_DOMICILIO = 'comprobante_domicilio',
}

export type FileTypeInterface = Record<FileType, string>;

export enum FileStatus {
  APPROVED = 'approved',
  REVIEWING = 'reviewing',
  REJECTED = 'rejected',
  OPENTOUPLUAD = 'open-to-upload',
}

export type FileStatusType = Record<FileStatus, string>;
@Entity()
export class UserDocuments extends BaseModel {
  @Enum(() => FileType)
  fileType: FileTypeInterface;

  @Property({ nullable: true })
  ruta?: string;

  @Enum({ items: () => FileStatus, default: FileStatus.REVIEWING })
  status: FileStatusType;

  @ManyToMany({
    entity: () => Documents_Observaciones,
    owner: true,
    cascade: [Cascade.ALL],
    nullable: true,
  })
  observaciones? = new Collection<Documents_Observaciones>(this);
}
