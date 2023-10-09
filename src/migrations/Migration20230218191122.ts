import { Migration } from '@mikro-orm/migrations';

export class Migration20230218191122 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "activity_history" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "description" varchar(255) null, "updated_by_id" int not null, "action" text check ("action" in (\'create\', \'update\', \'delete\')) not null, "user_affected_id" int not null);');

    this.addSql('alter table "activity_history" add constraint "activity_history_updated_by_id_foreign" foreign key ("updated_by_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "activity_history" add constraint "activity_history_user_affected_id_foreign" foreign key ("user_affected_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "activity_history" cascade;');
  }

}
