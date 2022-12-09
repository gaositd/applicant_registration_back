import { Migration } from '@mikro-orm/migrations';

export class Migration20221209065335 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "nombre" varchar(255) not null, "mail" varchar(255) not null, "matricula" varchar(255) not null, "is_deleted" boolean null default false, "role" text check ("role" in (\'admin\', \'secretaria\', \'prospecto\')) not null);');
    this.addSql('alter table "user" add constraint "user_matricula_unique" unique ("matricula");');
  }

}
