import { Migration } from '@mikro-orm/migrations';

export class Migration20230127220341 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_documents" add column "file_type" text check ("file_type" in (\'curp\', \'acta_nacimiento\', \'comprobante_domicilio\')) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_documents" drop column "file_type";');
  }

}
