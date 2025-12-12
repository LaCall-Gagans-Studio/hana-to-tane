import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Manual migration to add transfer_id to plants table
  // We use IF NOT EXISTS where possible or catch errors to be safe against existing schema

  // 1. Add column as nullable first
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'plants' AND column_name = 'transfer_id') THEN
        ALTER TABLE "plants" ADD COLUMN "transfer_id" varchar;
      END IF;
    END
    $$;
  `)

  // 2. Backfill existing rows (if any) to ensure uniqueness before making it NOT NULL and UNIQUE
  await db.execute(sql`
    UPDATE "plants" 
    SET "transfer_id" = 'migrated-' || "id" 
    WHERE "transfer_id" IS NULL;
  `)

  // 3. Set NOT NULL
  await db.execute(sql`
    ALTER TABLE "plants" ALTER COLUMN "transfer_id" SET NOT NULL;
  `)

  // 4. Create Unique Index
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "plants_transfer_id_idx" ON "plants" USING btree ("transfer_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "plants_transfer_id_idx";
    ALTER TABLE "plants" DROP COLUMN IF EXISTS "transfer_id";
  `)
}
