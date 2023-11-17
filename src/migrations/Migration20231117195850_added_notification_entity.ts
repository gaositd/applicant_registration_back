import { Migration } from '@mikro-orm/migrations';

export class Migration20231117195850_added_notification_entity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "notification" ("id" serial primary key, "created_at" timestamptz(0) not null default \'NOW()\', "updated_at" timestamptz(0) not null, "type" text check ("type" in (\'system\', \'text\', \'resource\', \'requirement\')) not null default \'system\', "data" varchar(255) not null, "required" boolean not null default false, "addressed" boolean null default false, "is_global" boolean null default false, "user_id" int null);');

    this.addSql('alter table "notification" add constraint "notification_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;');

    this.addSql('alter table "activity_history" drop constraint "activity_history_user_affected_id_foreign";');

    this.addSql('alter table "activity_history" alter column "user_affected_id" type int using ("user_affected_id"::int);');
    this.addSql('alter table "activity_history" alter column "user_affected_id" drop not null;');
    this.addSql('alter table "activity_history" add constraint "activity_history_user_affected_id_foreign" foreign key ("user_affected_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "notification" cascade;');

    this.addSql('alter table "activity_history" drop constraint "activity_history_user_affected_id_foreign";');

    this.addSql('alter table "activity_history" alter column "user_affected_id" type int using ("user_affected_id"::int);');
    this.addSql('alter table "activity_history" alter column "user_affected_id" set not null;');
    this.addSql('alter table "activity_history" add constraint "activity_history_user_affected_id_foreign" foreign key ("user_affected_id") references "user" ("id") on update cascade;');
  }

}
