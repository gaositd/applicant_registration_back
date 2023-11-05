import { Migration } from '@mikro-orm/migrations';

export class Migration20231029185923_add_mimeType_documents extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_documents" add column "mime_type" varchar(255) null;')
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_documents" drop column "mime_type";')
  }

}
