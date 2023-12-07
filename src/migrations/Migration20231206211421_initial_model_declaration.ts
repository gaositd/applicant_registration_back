import { Migration } from '@mikro-orm/migrations';

export class Migration20231206211421_initial_model_declaration extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "configs" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "config_type" text check ("config_type" in (\'value\', \'user_config\', \'app_config\')) not null, "name" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('alter table "configs" add constraint "configs_name_unique" unique ("name");');

    this.addSql('create table "documents_observaciones" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "observacion" varchar(255) not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "nombre" varchar(255) not null, "apellido_paterno" varchar(255) not null, "apellido_materno" varchar(255) not null, "fecha_nacimiento" timestamptz(0) not null, "curp" varchar(255) null, "direccion" varchar(255) null, "celular" varchar(255) not null, "telefono" varchar(255) null, "foto" varchar(255) null, "sexo" text check ("sexo" in (\'masculino\', \'femenino\', \'otro\')) null, "trabaja" boolean null, "estado_civil" text check ("estado_civil" in (\'soltero\', \'casado\', \'divorciado\', \'viudo\')) null default \'soltero\', "estado" text check ("estado" in (\'Aguascalientes\', \'Baja California\', \'Baja California Sur\', \'Campeche\', \'Chiapas\', \'Chihuahua\', \'Ciudad de México\', \'Coahuila\', \'Colima\', \'Durango\', \'Estado de México\', \'Guanajuato\', \'Guerrero\', \'Hidalgo\', \'Jalisco\', \'Michoacán\', \'Morelos\', \'Nayarit\', \'Nuevo León\', \'Oaxaca\', \'Puebla\', \'Querétaro\', \'Quintana Roo\', \'San Luis Potosí\', \'Sinaloa\', \'Sonora\', \'Tabasco\', \'Tamaulipas\', \'Tlaxcala\', \'Veracruz\', \'Yucatán\', \'Zacatecas\')) null, "escuela_procedencia" varchar(255) null, "promedio" int null, "email" varchar(255) not null, "matricula" varchar(255) not null, "password" varchar(255) not null, "lengua_indigena" boolean null, "is_deleted" boolean null default false, "role" text check ("role" in (\'admin\', \'secretaria\', \'prospecto\')) not null default \'prospecto\', "status" text check ("status" in (\'completed\', \'pending\', \'dueued\')) not null default \'pending\');');
    this.addSql('alter table "user" add constraint "user_curp_unique" unique ("curp");');
    this.addSql('alter table "user" add constraint "user_matricula_unique" unique ("matricula");');

    this.addSql('create table "notification" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "type" text check ("type" in (\'system\', \'text\', \'resource\', \'requirement\')) not null default \'system\', "data" varchar(255) not null, "required" boolean not null default false, "addressed" boolean null default false, "is_global" boolean null default false, "user_id" int null);');

    this.addSql('create table "activity_history" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "description" varchar(255) null, "updated_by_id" int not null, "action" text check ("action" in (\'create\', \'update\', \'delete\')) not null, "user_affected_id" int null);');

    this.addSql('create table "user_documents" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "file_type" text check ("file_type" in (\'curp\', \'acta_nacimiento\', \'comprobante_domicilio\', \'certificado_bachillerato\', \'certificado_secundaria\')) not null, "ruta" varchar(255) null, "mime_type" varchar(255) null, "status" text check ("status" in (\'approved\', \'reviewing\', \'rejected\', \'open-to-upload\')) not null default \'open-to-upload\');');

    this.addSql('create table "user_documents_observaciones" ("user_documents_id" int not null, "documents_observaciones_id" int not null, constraint "user_documents_observaciones_pkey" primary key ("user_documents_id", "documents_observaciones_id"));');

    this.addSql('create table "user_documentos" ("user_id" int not null, "user_documents_id" int not null, constraint "user_documentos_pkey" primary key ("user_id", "user_documents_id"));');

    this.addSql('alter table "notification" add constraint "notification_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "activity_history" add constraint "activity_history_updated_by_id_foreign" foreign key ("updated_by_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "activity_history" add constraint "activity_history_user_affected_id_foreign" foreign key ("user_affected_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user_documents_observaciones" add constraint "user_documents_observaciones_user_documents_id_foreign" foreign key ("user_documents_id") references "user_documents" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_documents_observaciones" add constraint "user_documents_observaciones_documents_observaciones_id_foreign" foreign key ("documents_observaciones_id") references "documents_observaciones" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_documentos" add constraint "user_documentos_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_documentos" add constraint "user_documentos_user_documents_id_foreign" foreign key ("user_documents_id") references "user_documents" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_documents_observaciones" drop constraint "user_documents_observaciones_documents_observaciones_id_foreign";');

    this.addSql('alter table "notification" drop constraint "notification_user_id_foreign";');

    this.addSql('alter table "activity_history" drop constraint "activity_history_updated_by_id_foreign";');

    this.addSql('alter table "activity_history" drop constraint "activity_history_user_affected_id_foreign";');

    this.addSql('alter table "user_documentos" drop constraint "user_documentos_user_id_foreign";');

    this.addSql('alter table "user_documents_observaciones" drop constraint "user_documents_observaciones_user_documents_id_foreign";');

    this.addSql('alter table "user_documentos" drop constraint "user_documentos_user_documents_id_foreign";');

    this.addSql('drop table if exists "configs" cascade;');

    this.addSql('drop table if exists "documents_observaciones" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "notification" cascade;');

    this.addSql('drop table if exists "activity_history" cascade;');

    this.addSql('drop table if exists "user_documents" cascade;');

    this.addSql('drop table if exists "user_documents_observaciones" cascade;');

    this.addSql('drop table if exists "user_documentos" cascade;');
  }

}
