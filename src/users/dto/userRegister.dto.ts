import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';
import {
  ESTADO_TYPE,
  Estado,
  USER_CIVIL_STATUS,
  USER_CIVIL_STATUS_TYPE,
  USER_SEXO,
  USER_SEXO_TYPE,
} from '../../models/user';

export class UserRegisterDTO {
  @IsString()
  apellidoPaterno: string;

  @IsString()
  apellidoMaterno: string;

  @IsString()
  celular: string;

  @IsString()
  curp: string;

  @IsBoolean()
  dialecto: boolean;

  @IsString()
  direccion: string;

  @IsString()
  email: string;

  @IsString()
  escuelaProcedencia: string;

  @IsEnum(USER_CIVIL_STATUS)
  estadoCivil: USER_CIVIL_STATUS_TYPE;

  @IsEnum(Estado)
  estadoEscuela: ESTADO_TYPE;

  @IsEnum(Estado)
  estadoNacimiento: ESTADO_TYPE;

  @IsDateString()
  fechaNacimiento: Date;

  @IsString()
  municipioEscuela: string;

  @IsString()
  municipioNacimiento: string;

  @IsString()
  nombre: string;

  @IsNumber()
  promedioBachillerato: number;

  @IsEnum(USER_SEXO)
  sexo: USER_SEXO_TYPE;

  @IsString()
  telefono: string;

  @IsString()
  tipoEscuelaProcedencia: string;

  @IsBoolean()
  trabaja: boolean;

  @IsString()
  carrer: string;
}
