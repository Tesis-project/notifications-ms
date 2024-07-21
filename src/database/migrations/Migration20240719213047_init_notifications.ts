import { Migration } from '@mikro-orm/migrations';

export class Migration20240719213047_init_notifications extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "notifications" ("_id" uuid not null default gen_random_uuid(), "subject" varchar(255) not null, "message" varchar(255) not null, "state" text check ("state" in (\'READ\', \'UNREAD\')) not null default \'UNREAD\', "created_at" timestamptz not null default \'2024-07-19 17:30:47\', "read_at" timestamptz not null default \'2024-07-19 17:30:47\', "user" varchar(255) not null, constraint "notifications_pkey" primary key ("_id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "notifications" cascade;');
  }

}
