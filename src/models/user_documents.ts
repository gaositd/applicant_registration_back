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
  curp = 'curp',
  acta_nacimiento = 'acta_nacimiento',
  comprobante_domicilio = 'comprobante_domicilio',
}

export type FileTypeInterface = `${FileType}`;

export enum FileStatus {
  APPROVED = 'approved',
  REVIEWING = 'reviewing',
  REJECTED = 'rejected',
  OPENTOUPLUAD = 'open-to-upload',
}

export type FileStatusType = `${FileStatus}`;
@Entity()
export class UserDocuments extends BaseModel {
  @Enum(() => FileType)
  fileType: FileTypeInterface;

  @Property({ nullable: true })
  ruta?: string;

  @Property({ nullable: true })
  mimeType?: string;

  @Enum({ items: () => FileStatus, default: FileStatus.OPENTOUPLUAD })
  status: FileStatusType;

  @ManyToMany({
    entity: () => Documents_Observaciones,
    owner: true,
    cascade: [Cascade.ALL],
    nullable: true,
  })
  observaciones? = new Collection<Documents_Observaciones>(this);
}
