import { Migration } from '@mikro-orm/migrations';

export class Migration20240414001620_FixedPendingMigration extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "configs" add column "description" varchar(255) null;');
    this.addSql('alter table "configs" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "configs" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "configs" alter column "updated_at" type date using ("updated_at"::date);');

    this.addSql('alter table "documents_observaciones" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "documents_observaciones" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "documents_observaciones" alter column "updated_at" type date using ("updated_at"::date);');

    this.addSql('alter table "user" add column "consecutivo_folio" int null, add column "carrera" text check ("carrera" in (\'LCC\', \'LM\')) null;');
    this.addSql('alter table "user" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "user" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "user" alter column "updated_at" type date using ("updated_at"::date);');
    this.addSql('alter table "user" alter column "fecha_nacimiento" type date using ("fecha_nacimiento"::date);');

    this.addSql('alter table "notification" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "notification" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "notification" alter column "updated_at" type date using ("updated_at"::date);');

    this.addSql('alter table "activity_history" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "activity_history" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "activity_history" alter column "updated_at" type date using ("updated_at"::date);');

    this.addSql('alter table "user_documents" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "user_documents" alter column "created_at" set default \'NOW()\';');
    this.addSql('alter table "user_documents" alter column "updated_at" type date using ("updated_at"::date);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "activity_history" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "activity_history" alter column "created_at" set default \'2024-04-14 00:13:55.058834+00\';');
    this.addSql('alter table "activity_history" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "configs" drop column "description";');

    this.addSql('alter table "configs" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "configs" alter column "created_at" set default \'2024-04-14 00:13:55.058834+00\';');
    this.addSql('alter table "configs" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "documents_observaciones" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "documents_observaciones" alter column "created_at" set default \'2024-04-14 00:13:55.058834+00\';');
    this.addSql('alter table "documents_observaciones" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "notification" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "notification" alter column "created_at" set default \'2024-04-14 00:13:55.058834+00\';');
    this.addSql('alter table "notification" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "user" drop column "consecutivo_folio", drop column "carrera";');

    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "created_at" set default \'2024-04-14 00:13:55.058834+00\';');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "fecha_nacimiento" type timestamptz(0) using ("fecha_nacimiento"::timestamptz(0));');

    this.addSql('alter table "user_documents" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user_documents" alter column "created_at" set default \'2024-04-14 00:13:55.058834+00\';');
    this.addSql('alter table "user_documents" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
  }

}
