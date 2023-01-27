import { Migration } from '@mikro-orm/migrations';

export class Migration20230127173329 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "configs" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "config_type" text check ("config_type" in (\'value\', \'user_config\', \'app_config\')) not null, "name" varchar(255) not null, "value" varchar(255) not null);');
    this.addSql('alter table "configs" add constraint "configs_name_unique" unique ("name");');

    this.addSql('drop table if exists "configuration" cascade;');

    this.addSql('drop table if exists "session" cascade;');

    this.addSql('alter table "documents_observaciones" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "documents_observaciones" alter column "created_at" set default \'NOW()\';');

    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "created_at" set default \'NOW()\';');

    this.addSql('alter table "user_documents" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user_documents" alter column "created_at" set default \'NOW()\';');
  }

  async down(): Promise<void> {
    this.addSql('create table "configuration" ("id" serial primary key, "created_at" timestamptz not null default \'2023-01-25 20:57:56.754462+00\', "updated_at" timestamptz not null default null, "config_type" text check ("config_type" in (\'value\', \'user_config\', \'app_config\')) not null default null, "name" varchar not null default null, "value" varchar not null default null);');
    this.addSql('alter table "configuration" add constraint "configuration_name_unique" unique ("name");');

    this.addSql('create table "session" ("sid" varchar not null default null, "sess" json not null default null, "expire" timestamp not null default null, constraint "session_pkey" primary key ("sid"));');
    this.addSql('create index "IDX_session_expire" on "session" ("expire");');

    this.addSql('drop table if exists "configs" cascade;');

    this.addSql('alter table "documents_observaciones" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "documents_observaciones" alter column "created_at" set default \'2023-01-27 17:27:12.914778+00\';');

    this.addSql('alter table "user" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "user" alter column "created_at" set default \'2023-01-25 20:57:56.754462+00\';');

    this.addSql('alter table "user_documents" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "user_documents" alter column "created_at" set default \'2023-01-25 20:57:56.754462+00\';');
  }

}
