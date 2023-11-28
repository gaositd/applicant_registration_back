import { Migration } from '@mikro-orm/migrations';

export class Migration20231128205838_updated_user_data extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "apellido_paterno" varchar(255) not null, add column "apellido_materno" varchar(255) not null, add column "fecha_nacimiento" timestamptz(0) not null, add column "curp" varchar(255) not null, add column "direccion" varchar(255) not null, add column "celular" varchar(255) not null, add column "telefono" varchar(255) null, add column "foto" varchar(255) not null, add column "sexo" text check ("sexo" in (\'masculino\', \'femenino\')) not null, add column "trabaja" boolean not null, add column "estado_civil" text check ("estado_civil" in (\'soltero\', \'casado\', \'divorciado\', \'viudo\')) not null default \'soltero\', add column "estado" text check ("estado" in (\'Aguascalientes\', \'Baja California\', \'Baja California Sur\', \'Campeche\', \'Chiapas\', \'Chihuahua\', \'Ciudad de México\', \'Coahuila\', \'Colima\', \'Durango\', \'Estado de México\', \'Guanajuato\', \'Guerrero\', \'Hidalgo\', \'Jalisco\', \'Michoacán\', \'Morelos\', \'Nayarit\', \'Nuevo León\', \'Oaxaca\', \'Puebla\', \'Querétaro\', \'Quintana Roo\', \'San Luis Potosí\', \'Sinaloa\', \'Sonora\', \'Tabasco\', \'Tamaulipas\', \'Tlaxcala\', \'Veracruz\', \'Yucatán\', \'Zacatecas\')) not null, add column "escuela_procedencia" varchar(255) not null, add column "promedio" int not null, add column "lengua_indigena" boolean null;');
    this.addSql('alter table "user" add constraint "user_curp_unique" unique ("curp");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_curp_unique";');
    this.addSql('alter table "user" drop column "apellido_paterno";');
    this.addSql('alter table "user" drop column "apellido_materno";');
    this.addSql('alter table "user" drop column "fecha_nacimiento";');
    this.addSql('alter table "user" drop column "curp";');
    this.addSql('alter table "user" drop column "direccion";');
    this.addSql('alter table "user" drop column "celular";');
    this.addSql('alter table "user" drop column "telefono";');
    this.addSql('alter table "user" drop column "foto";');
    this.addSql('alter table "user" drop column "sexo";');
    this.addSql('alter table "user" drop column "trabaja";');
    this.addSql('alter table "user" drop column "estado_civil";');
    this.addSql('alter table "user" drop column "estado";');
    this.addSql('alter table "user" drop column "escuela_procedencia";');
    this.addSql('alter table "user" drop column "promedio";');
    this.addSql('alter table "user" drop column "lengua_indigena";');
  }

}
