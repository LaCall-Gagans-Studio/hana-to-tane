import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_column_reservation_settings_custom_fields_type" AS ENUM('text', 'textarea', 'radio');
  CREATE TYPE "public"."enum_column_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__column_v_version_reservation_settings_custom_fields_type" AS ENUM('text', 'textarea', 'radio');
  CREATE TYPE "public"."enum__column_v_version_category" AS ENUM('free_school', 'event', 'other');
  CREATE TYPE "public"."enum__column_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_sponsors_background_color" AS ENUM('bg-white', 'bg-pink', 'bg-blue', 'bg-yellow', 'bg-lime', 'bg-green', 'bg-gray-100', 'bg-black');
  CREATE TYPE "public"."enum_news_category" AS ENUM('EVENT', 'INFO', 'REPORT', 'OTHER');
  CREATE TYPE "public"."enum_site_content_hero_large_links_color_class" AS ENUM('bg-[#cfed75]', 'bg-yellow', 'bg-pink', 'bg-blue');
  CREATE TYPE "public"."enum_site_content_hero_small_links_hover_class" AS ENUM('hover:bg-blue', 'hover:bg-pink', 'hover:bg-orange-400', 'hover:bg-yellow');
  CREATE TYPE "public"."enum_site_content_social_links_platform" AS ENUM('instagram', 'x', 'facebook', 'youtube', 'other');
  ALTER TYPE "public"."enum_members_type" ADD VALUE 'chibikko' BEFORE 'collaborator';
  CREATE TABLE "column_reservation_settings_custom_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "column_reservation_settings_custom_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum_column_reservation_settings_custom_fields_type" DEFAULT 'text'
  );
  
  CREATE TABLE "_column_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_column_v_version_reservation_settings_custom_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_column_v_version_reservation_settings_custom_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"type" "enum__column_v_version_reservation_settings_custom_fields_type" DEFAULT 'text',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_column_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_published_date" timestamp(3) with time zone,
  	"version_category" "enum__column_v_version_category",
  	"version_image_id" integer,
  	"version_content" jsonb,
  	"version_target_event_id" integer,
  	"version_reservation_settings_enabled" boolean DEFAULT false,
  	"version_reservation_settings_capacity" numeric,
  	"version_reservation_settings_deadline" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__column_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"category" "enum_news_category" NOT NULL,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reservations_responses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "reservations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"column_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "banner_scrolling_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "banner_big_banners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "banner" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_content_hero_large_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"color_class" "enum_site_content_hero_large_links_color_class" DEFAULT 'bg-[#cfed75]'
  );
  
  CREATE TABLE "site_content_hero_small_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"hover_class" "enum_site_content_hero_small_links_hover_class" DEFAULT 'hover:bg-blue'
  );
  
  CREATE TABLE "site_content_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_content_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "column" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "column" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "column" ALTER COLUMN "published_date" DROP NOT NULL;
  ALTER TABLE "column" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "column" ADD COLUMN "target_event_id" integer;
  ALTER TABLE "column" ADD COLUMN "reservation_settings_enabled" boolean DEFAULT false;
  ALTER TABLE "column" ADD COLUMN "reservation_settings_capacity" numeric;
  ALTER TABLE "column" ADD COLUMN "reservation_settings_deadline" timestamp(3) with time zone;
  ALTER TABLE "column" ADD COLUMN "_status" "enum_column_status" DEFAULT 'draft';
  ALTER TABLE "sponsors" ADD COLUMN "background_color" "enum_sponsors_background_color" DEFAULT 'bg-white';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "news_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reservations_id" integer;
  ALTER TABLE "column_reservation_settings_custom_fields_options" ADD CONSTRAINT "column_reservation_settings_custom_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."column_reservation_settings_custom_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "column_reservation_settings_custom_fields" ADD CONSTRAINT "column_reservation_settings_custom_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."column"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_column_v_version_tags" ADD CONSTRAINT "_column_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_column_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_column_v_version_reservation_settings_custom_fields_options" ADD CONSTRAINT "_column_v_version_reservation_settings_custom_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_column_v_version_reservation_settings_custom_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_column_v_version_reservation_settings_custom_fields" ADD CONSTRAINT "_column_v_version_reservation_settings_custom_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_column_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_column_v" ADD CONSTRAINT "_column_v_parent_id_column_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."column"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_column_v" ADD CONSTRAINT "_column_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_column_v" ADD CONSTRAINT "_column_v_version_target_event_id_events_id_fk" FOREIGN KEY ("version_target_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservations_responses" ADD CONSTRAINT "reservations_responses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reservations" ADD CONSTRAINT "reservations_column_id_column_id_fk" FOREIGN KEY ("column_id") REFERENCES "public"."column"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banner_scrolling_banners" ADD CONSTRAINT "banner_scrolling_banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banner_scrolling_banners" ADD CONSTRAINT "banner_scrolling_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "banner_big_banners" ADD CONSTRAINT "banner_big_banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "banner_big_banners" ADD CONSTRAINT "banner_big_banners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."banner"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_hero_large_links" ADD CONSTRAINT "site_content_hero_large_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_hero_small_links" ADD CONSTRAINT "site_content_hero_small_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_content_social_links" ADD CONSTRAINT "site_content_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "column_reservation_settings_custom_fields_options_order_idx" ON "column_reservation_settings_custom_fields_options" USING btree ("_order");
  CREATE INDEX "column_reservation_settings_custom_fields_options_parent_id_idx" ON "column_reservation_settings_custom_fields_options" USING btree ("_parent_id");
  CREATE INDEX "column_reservation_settings_custom_fields_order_idx" ON "column_reservation_settings_custom_fields" USING btree ("_order");
  CREATE INDEX "column_reservation_settings_custom_fields_parent_id_idx" ON "column_reservation_settings_custom_fields" USING btree ("_parent_id");
  CREATE INDEX "_column_v_version_tags_order_idx" ON "_column_v_version_tags" USING btree ("_order");
  CREATE INDEX "_column_v_version_tags_parent_id_idx" ON "_column_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_column_v_version_reservation_settings_custom_fields_options_order_idx" ON "_column_v_version_reservation_settings_custom_fields_options" USING btree ("_order");
  CREATE INDEX "_column_v_version_reservation_settings_custom_fields_options_parent_id_idx" ON "_column_v_version_reservation_settings_custom_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_column_v_version_reservation_settings_custom_fields_order_idx" ON "_column_v_version_reservation_settings_custom_fields" USING btree ("_order");
  CREATE INDEX "_column_v_version_reservation_settings_custom_fields_parent_id_idx" ON "_column_v_version_reservation_settings_custom_fields" USING btree ("_parent_id");
  CREATE INDEX "_column_v_parent_idx" ON "_column_v" USING btree ("parent_id");
  CREATE INDEX "_column_v_version_version_slug_idx" ON "_column_v" USING btree ("version_slug");
  CREATE INDEX "_column_v_version_version_image_idx" ON "_column_v" USING btree ("version_image_id");
  CREATE INDEX "_column_v_version_version_target_event_idx" ON "_column_v" USING btree ("version_target_event_id");
  CREATE INDEX "_column_v_version_version_updated_at_idx" ON "_column_v" USING btree ("version_updated_at");
  CREATE INDEX "_column_v_version_version_created_at_idx" ON "_column_v" USING btree ("version_created_at");
  CREATE INDEX "_column_v_version_version__status_idx" ON "_column_v" USING btree ("version__status");
  CREATE INDEX "_column_v_created_at_idx" ON "_column_v" USING btree ("created_at");
  CREATE INDEX "_column_v_updated_at_idx" ON "_column_v" USING btree ("updated_at");
  CREATE INDEX "_column_v_latest_idx" ON "_column_v" USING btree ("latest");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "reservations_responses_order_idx" ON "reservations_responses" USING btree ("_order");
  CREATE INDEX "reservations_responses_parent_id_idx" ON "reservations_responses" USING btree ("_parent_id");
  CREATE INDEX "reservations_column_idx" ON "reservations" USING btree ("column_id");
  CREATE INDEX "reservations_updated_at_idx" ON "reservations" USING btree ("updated_at");
  CREATE INDEX "reservations_created_at_idx" ON "reservations" USING btree ("created_at");
  CREATE INDEX "banner_scrolling_banners_order_idx" ON "banner_scrolling_banners" USING btree ("_order");
  CREATE INDEX "banner_scrolling_banners_parent_id_idx" ON "banner_scrolling_banners" USING btree ("_parent_id");
  CREATE INDEX "banner_scrolling_banners_image_idx" ON "banner_scrolling_banners" USING btree ("image_id");
  CREATE INDEX "banner_big_banners_order_idx" ON "banner_big_banners" USING btree ("_order");
  CREATE INDEX "banner_big_banners_parent_id_idx" ON "banner_big_banners" USING btree ("_parent_id");
  CREATE INDEX "banner_big_banners_image_idx" ON "banner_big_banners" USING btree ("image_id");
  CREATE INDEX "site_content_hero_large_links_order_idx" ON "site_content_hero_large_links" USING btree ("_order");
  CREATE INDEX "site_content_hero_large_links_parent_id_idx" ON "site_content_hero_large_links" USING btree ("_parent_id");
  CREATE INDEX "site_content_hero_small_links_order_idx" ON "site_content_hero_small_links" USING btree ("_order");
  CREATE INDEX "site_content_hero_small_links_parent_id_idx" ON "site_content_hero_small_links" USING btree ("_parent_id");
  CREATE INDEX "site_content_social_links_order_idx" ON "site_content_social_links" USING btree ("_order");
  CREATE INDEX "site_content_social_links_parent_id_idx" ON "site_content_social_links" USING btree ("_parent_id");
  ALTER TABLE "column" ADD CONSTRAINT "column_target_event_id_events_id_fk" FOREIGN KEY ("target_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reservations_fk" FOREIGN KEY ("reservations_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "column_target_event_idx" ON "column" USING btree ("target_event_id");
  CREATE INDEX "column__status_idx" ON "column" USING btree ("_status");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_reservations_id_idx" ON "payload_locked_documents_rels" USING btree ("reservations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "column_reservation_settings_custom_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "column_reservation_settings_custom_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_column_v_version_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_column_v_version_reservation_settings_custom_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_column_v_version_reservation_settings_custom_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_column_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "news" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservations_responses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "banner_scrolling_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "banner_big_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_hero_large_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_hero_small_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "column_reservation_settings_custom_fields_options" CASCADE;
  DROP TABLE "column_reservation_settings_custom_fields" CASCADE;
  DROP TABLE "_column_v_version_tags" CASCADE;
  DROP TABLE "_column_v_version_reservation_settings_custom_fields_options" CASCADE;
  DROP TABLE "_column_v_version_reservation_settings_custom_fields" CASCADE;
  DROP TABLE "_column_v" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "reservations_responses" CASCADE;
  DROP TABLE "reservations" CASCADE;
  DROP TABLE "banner_scrolling_banners" CASCADE;
  DROP TABLE "banner_big_banners" CASCADE;
  DROP TABLE "banner" CASCADE;
  DROP TABLE "site_content_hero_large_links" CASCADE;
  DROP TABLE "site_content_hero_small_links" CASCADE;
  DROP TABLE "site_content_social_links" CASCADE;
  DROP TABLE "site_content" CASCADE;
  ALTER TABLE "column" DROP CONSTRAINT "column_target_event_id_events_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_news_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reservations_fk";
  
  ALTER TABLE "members" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "members" ALTER COLUMN "type" SET DEFAULT 'staff'::text;
  DROP TYPE "public"."enum_members_type";
  CREATE TYPE "public"."enum_members_type" AS ENUM('staff', 'collaborator');
  ALTER TABLE "members" ALTER COLUMN "type" SET DEFAULT 'staff'::"public"."enum_members_type";
  ALTER TABLE "members" ALTER COLUMN "type" SET DATA TYPE "public"."enum_members_type" USING "type"::"public"."enum_members_type";
  DROP INDEX "column_target_event_idx";
  DROP INDEX "column__status_idx";
  DROP INDEX "payload_locked_documents_rels_news_id_idx";
  DROP INDEX "payload_locked_documents_rels_reservations_id_idx";
  ALTER TABLE "column" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "column" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "column" ALTER COLUMN "published_date" SET NOT NULL;
  ALTER TABLE "column" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "column" DROP COLUMN "target_event_id";
  ALTER TABLE "column" DROP COLUMN "reservation_settings_enabled";
  ALTER TABLE "column" DROP COLUMN "reservation_settings_capacity";
  ALTER TABLE "column" DROP COLUMN "reservation_settings_deadline";
  ALTER TABLE "column" DROP COLUMN "_status";
  ALTER TABLE "sponsors" DROP COLUMN "background_color";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "news_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reservations_id";
  DROP TYPE "public"."enum_column_reservation_settings_custom_fields_type";
  DROP TYPE "public"."enum_column_status";
  DROP TYPE "public"."enum__column_v_version_reservation_settings_custom_fields_type";
  DROP TYPE "public"."enum__column_v_version_category";
  DROP TYPE "public"."enum__column_v_version_status";
  DROP TYPE "public"."enum_sponsors_background_color";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_site_content_hero_large_links_color_class";
  DROP TYPE "public"."enum_site_content_hero_small_links_hover_class";
  DROP TYPE "public"."enum_site_content_social_links_platform";`)
}
