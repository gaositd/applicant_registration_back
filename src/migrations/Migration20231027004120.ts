import { Migration } from '@mikro-orm/migrations';

export class Migration20231027004120 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "status" text check ("status" in (\'completed\', \'pending\', \'dueued\')) not null default \'pending\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "status";');
  }

}
