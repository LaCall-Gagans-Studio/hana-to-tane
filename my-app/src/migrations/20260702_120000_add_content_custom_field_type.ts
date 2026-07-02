import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_column_reservation_settings_custom_fields_type" ADD VALUE IF NOT EXISTS 'content';
  `)

  await db.execute(sql`
    ALTER TYPE "public"."enum__column_v_version_reservation_settings_custom_fields_type" ADD VALUE IF NOT EXISTS 'content';
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'column_reservation_settings_custom_fields' AND column_name = 'content'
      ) THEN
        ALTER TABLE "column_reservation_settings_custom_fields" ADD COLUMN "content" varchar;
      END IF;
    END
    $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = '_column_v_version_reservation_settings_custom_fields' AND column_name = 'content'
      ) THEN
        ALTER TABLE "_column_v_version_reservation_settings_custom_fields" ADD COLUMN "content" varchar;
      END IF;
    END
    $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "column_reservation_settings_custom_fields" DROP COLUMN IF EXISTS "content";
  `)

  await db.execute(sql`
    ALTER TABLE "_column_v_version_reservation_settings_custom_fields" DROP COLUMN IF EXISTS "content";
  `)
}
