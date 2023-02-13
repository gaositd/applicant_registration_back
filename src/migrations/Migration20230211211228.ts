import { Migration } from '@mikro-orm/migrations';

export class Migration20230211211228 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_documents" drop constraint if exists "user_documents_status_check";');

    this.addSql('alter table "user_documents" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "user_documents" add constraint "user_documents_status_check" check ("status" in (\'approved\', \'reviewing\', \'rejected\', \'open-to-upload\'));');
    this.addSql('alter table "user_documents" alter column "status" set default \'open-to-upload\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_documents" drop constraint if exists "user_documents_status_check";');

    this.addSql('alter table "user_documents" alter column "status" type text using ("status"::text);');
    this.addSql('alter table "user_documents" add constraint "user_documents_status_check" check ("status" in (\'approved\', \'reviewing\', \'rejected\'));');
    this.addSql('alter table "user_documents" alter column "status" set default \'reviewing\';');
  }

}
