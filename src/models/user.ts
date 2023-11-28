import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { ActivityHistory } from './activity_history';
import { BaseModel } from './base';
import { UserDocuments } from './user_documents';
import { Notification } from './notification';

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

enum USER_CIVIL_STATUS {
  SOLTERO = 'soltero',
  CASADO = 'casado',
  DIVORCIADO = 'divorciado',
  VIUDO = 'viudo',
}

export type USER_CIVIL_STATUS_TYPE = `${USER_CIVIL_STATUS}`;

export type USER_STATUS_TYPE = `${USER_STATUS}`;

enum ESTADO {
  AGUASCALIENTES = 'Aguascalientes',
  BAJA_CALIFORNIA = 'Baja California',
  BAJA_CALIFORNIA_SUR = 'Baja California Sur',
  CAMPECHE = 'Campeche',
  CHIAPAS = 'Chiapas',
  CHIHUAHUA = 'Chihuahua',
  CIUDAD_DE_MEXICO = 'Ciudad de México',
  COAHUILA = 'Coahuila',
  COLIMA = 'Colima',
  DURANGO = 'Durango',
  ESTADO_DE_MEXICO = 'Estado de México',
  GUANAJUATO = 'Guanajuato',
  GUERRERO = 'Guerrero',
  HIDALGO = 'Hidalgo',
  JALISCO = 'Jalisco',
  MICHOACAN = 'Michoacán',
  MORELOS = 'Morelos',
  NAYARIT = 'Nayarit',
  NUEVO_LEON = 'Nuevo León',
  OAXACA = 'Oaxaca',
  PUEBLA = 'Puebla',
  QUERETARO = 'Querétaro',
  QUINTANA_ROO = 'Quintana Roo',
  SAN_LUIS_POTOSI = 'San Luis Potosí',
  SINALOA = 'Sinaloa',
  SONORA = 'Sonora',
  TABASCO = 'Tabasco',
  TAMAULIPAS = 'Tamaulipas',
  TLAXCALA = 'Tlaxcala',
  VERACRUZ = 'Veracruz',
  YUCATAN = 'Yucatán',
  ZACATECAS = 'Zacatecas',
}

export type ESTADO_TYPE = `${ESTADO}`;

export enum USER_SEXO {
  MASCULINO = 'masculino',
  FEMENINO = 'femenino',
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
  @Property()
  curp: string;

  @Property()
  direccion: string;

  @Property()
  celular: string;

  @Property({ nullable: true })
  telefono: string;

  @Property()
  foto: string;

  @Enum({
    items: () => USER_SEXO,
  })
  sexo: USER_SEXO_TYPE;

  @Property()
  trabaja: boolean;

  @Enum({
    items: () => USER_CIVIL_STATUS,
    default: USER_CIVIL_STATUS.SOLTERO,
  })
  estadoCivil: USER_CIVIL_STATUS_TYPE;

  @Enum({
    items: () => ESTADO,
  })
  estado: ESTADO_TYPE;

  @Property()
  escuelaProcedencia: string;

  @Property()
  promedio: number;

  @Property()
  mail: string;

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
