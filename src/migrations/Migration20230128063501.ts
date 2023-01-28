import { Migration } from '@mikro-orm/migrations';

export class Migration20230128063501 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_documents" add column "status" text check ("status" in (\'approved\', \'reviewing\', \'rejected\')) not null default \'reviewing\';');
    this.addSql('alter table "user_documents" alter column "ruta" type varchar(255) using ("ruta"::varchar(255));');
    this.addSql('alter table "user_documents" alter column "ruta" drop not null;');
    this.addSql('alter table "user_documents" drop column "is_valid";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_documents" add column "is_valid" boolean not null;');
    this.addSql('alter table "user_documents" alter column "ruta" type varchar(255) using ("ruta"::varchar(255));');
    this.addSql('alter table "user_documents" alter column "ruta" set not null;');
    this.addSql('alter table "user_documents" drop column "status";');
  }

}
