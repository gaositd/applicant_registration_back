import { Migration } from '@mikro-orm/migrations';

export class Migration20230125205751 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "configuration" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "config_type" text check ("config_type" in (\'value\', \'user_config\', \'app_config\')) not null, "name" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('alter table "configuration" add constraint "configuration_name_unique" unique ("name");');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "nombre" varchar(255) not null, "mail" varchar(255) not null, "matricula" varchar(255) not null, "password" varchar(255) not null, "is_deleted" boolean null default false, "role" text check ("role" in (\'admin\', \'secretaria\', \'prospecto\')) not null default \'prospecto\');');
    this.addSql('alter table "user" add constraint "user_matricula_unique" unique ("matricula");');

    this.addSql('create table "user_documents" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "ruta" varchar(255) not null, "is_valid" boolean not null, "observaciones" text[] not null);');

    this.addSql('create table "user_documents_documentos" ("user_documents_id" int not null, "configuration_id" int not null, constraint "user_documents_documentos_pkey" primary key ("user_documents_id", "configuration_id"));');

    this.addSql('create table "user_documentos" ("user_id" int not null, "user_documents_id" int not null, constraint "user_documentos_pkey" primary key ("user_id", "user_documents_id"));');

    this.addSql('alter table "user_documents_documentos" add constraint "user_documents_documentos_user_documents_id_foreign" foreign key ("user_documents_id") references "user_documents" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_documents_documentos" add constraint "user_documents_documentos_configuration_id_foreign" foreign key ("configuration_id") references "configuration" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_documentos" add constraint "user_documentos_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_documentos" add constraint "user_documentos_user_documents_id_foreign" foreign key ("user_documents_id") references "user_documents" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_documents_documentos" drop constraint "user_documents_documentos_configuration_id_foreign";');

    this.addSql('alter table "user_documentos" drop constraint "user_documentos_user_id_foreign";');

    this.addSql('alter table "user_documents_documentos" drop constraint "user_documents_documentos_user_documents_id_foreign";');

    this.addSql('alter table "user_documentos" drop constraint "user_documentos_user_documents_id_foreign";');

    this.addSql('drop table if exists "configuration" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "user_documents" cascade;');

    this.addSql('drop table if exists "user_documents_documentos" cascade;');

    this.addSql('drop table if exists "user_documentos" cascade;');
  }

}
