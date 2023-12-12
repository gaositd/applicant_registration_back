import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ActivityHistory } from './activity_history';
import { BaseModel } from './base';
import { Notification } from './notification';
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

export enum USER_CIVIL_STATUS {
  SOLTERO = 'soltero',
  CASADO = 'casado',
  DIVORCIADO = 'divorciado',
  VIUDO = 'viudo',
}

export type USER_CIVIL_STATUS_TYPE = `${USER_CIVIL_STATUS}`;

export type USER_STATUS_TYPE = `${USER_STATUS}`;
export enum Estado {
  Aguascalientes = 'Aguascalientes',
  BajaCalifornia = 'Baja California',
  BajaCaliforniaSur = 'Baja California Sur',
  Campeche = 'Campeche',
  Chiapas = 'Chiapas',
  Chihuahua = 'Chihuahua',
  CiudadDeMexico = 'Ciudad de México',
  Coahuila = 'Coahuila',
  Colima = 'Colima',
  Durango = 'Durango',
  EstadoDeMexico = 'Estado de México',
  Guanajuato = 'Guanajuato',
  Guerrero = 'Guerrero',
  Hidalgo = 'Hidalgo',
  Jalisco = 'Jalisco',
  Michoacan = 'Michoacán',
  Morelos = 'Morelos',
  Nayarit = 'Nayarit',
  NuevoLeon = 'Nuevo León',
  Oaxaca = 'Oaxaca',
  Puebla = 'Puebla',
  Queretaro = 'Querétaro',
  QuintanaRoo = 'Quintana Roo',
  SanLuisPotosi = 'San Luis Potosí',
  Sinaloa = 'Sinaloa',
  Sonora = 'Sonora',
  Tabasco = 'Tabasco',
  Tamaulipas = 'Tamaulipas',
  Tlaxcala = 'Tlaxcala',
  Veracruz = 'Veracruz',
  Yucatan = 'Yucatán',
  Zacatecas = 'Zacatecas',
}

export type ESTADO_TYPE = `${Estado}`;

export enum USER_SEXO {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
  OTRO = 'otro',
}

export type USER_SEXO_TYPE = `${USER_SEXO}`;
@Entity()
export class User extends BaseModel {
  @Property()
  nombre: string;

  @Property()
  apellidoPaterno: string;

  @Property()
  apellidoMaterno: string;

  @Property({ type: 'date' })
  fechaNacimiento: Date;

  @Unique()
  @Property({ nullable: true })
  curp: string;

  @Property({ nullable: true })
  direccion: string;

  @Property()
  celular: string;

  @Property({ nullable: true })
  telefono: string;

  @Property({ nullable: true })
  foto: string;

  @Enum({
    items: () => USER_SEXO,
    nullable: true,
  })
  sexo: USER_SEXO_TYPE;

  @Property({
    nullable: true,
  })
  trabaja: boolean;

  @Enum({
    items: () => USER_CIVIL_STATUS,
    default: USER_CIVIL_STATUS.SOLTERO,
    nullable: true,
  })
  estadoCivil: USER_CIVIL_STATUS_TYPE;

  @Enum({
    items: () => Estado,
    nullable: true,
  })
  estado: ESTADO_TYPE;

  @Property({ nullable: true })
  escuelaProcedencia: string;

  @Property({ nullable: true })
  promedio: number;

  @Property({})
  email: string;

  @Property()
  @Unique()
  matricula: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  lenguaIndigena: boolean;

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

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications = new Collection<Notification>(this);
}
