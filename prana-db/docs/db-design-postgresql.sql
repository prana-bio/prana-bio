CREATE SCHEMA "app";

CREATE TABLE "app"."users" (
  "user_id" uuid PRIMARY KEY,
  "full_name" varchar,
  "username" varchar,
  "email" varchar,
  "phone" varchar,
  "birthday" date,
  "language" enum,
  "biography" varchar,
  "twitter" varchar,
  "instagram" varchar,
  "website" varchar,
  "dark_mode" boolean,
  "text_notifications" boolean,
  "email_notifications" boolean,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "app"."tenants" (
  "tenant_id" uuid PRIMARY KEY,
  "created_by" uuid,
  "tenant_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "app"."tenant_users" (
  "tenant_id" uuid,
  "user_id" uuid,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "app"."payment_methods" (
  "payment_method_id" uuid PRIMARY KEY,
  "tenant_id" uuid,
  "user_id" uuid,
  "method_type" tuple,
  "encrypted_first_name" varchar,
  "encrypted_last_name" varchar,
  "encrypted_expire_month" int,
  "encrypted_expire_year" int,
  "encrypted_cvc" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "app"."collections" (
  "collection_id" uuid PRIMARY KEY,
  "tenant_id" uuid,
  "user_id" uuid,
  "collection_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "app"."article_collections" (
  "tenant_id" uuid,
  "user_id" uuid,
  "article_id" uuid,
  "collection_id" uuid,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "app"."donations" (
  "donation_id" uuid PRIMARY KEY,
  "tenant_id" uuid,
  "user_id" uuid,
  "conservation_organization_id" uuid,
  "payment_method_id" uuid,
  "amount" float,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "conservation_organizations" (
  "conservation_organization_id" uuid PRIMARY KEY,
  "url" varchar,
  "name" varchar,
  "thumbnail" varchar,
  "certified_on" date,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "strategies" (
  "strategy_id" uuid PRIMARY KEY,
  "strategy_name" varchar,
  "description" text,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "conservation_organization_strategies" (
  "conservation_organization_id" uuid,
  "strategy_id" uuid,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "conservation_organization_countries" (
  "conservation_organization_id" uuid,
  "country_id" uuid,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "articles" (
  "article_id" uuid PRIMARY KEY,
  "url" varchar,
  "name" varchar,
  "author_name" varchar,
  "publisher_name" varchar,
  "thumbnail" varchar,
  "place_sourced" varchar,
  "published_on" date,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "countries" (
  "country_id" uuid PRIMARY KEY,
  "name" varchar,
  "iso_alpha2" char(2),
  "iso_alpha3" char(3),
  "region" varchar,
  "geometry" "geometry(Geometry, 4326)"
);

CREATE TABLE "kingdoms" (
  "kingdom_id" uuid PRIMARY KEY,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "phyla" (
  "phyla_id" uuid PRIMARY KEY,
  "kingdom_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "classes" (
  "class_id" uuid PRIMARY KEY,
  "phyla_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "orders" (
  "order_id" uuid PRIMARY KEY,
  "class_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "families" (
  "family_id" uuid PRIMARY KEY,
  "order_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "genera" (
  "genera_id" uuid PRIMARY KEY,
  "family_id" uuid,
  "name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "species" (
  "species_id" uuid PRIMARY KEY,
  "genera_id" uuid,
  "name" varchar,
  "common_name" varchar,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "species_iucn_status" (
  "species_id" uuid,
  "category" enum,
  "assessment_year" int,
  "source_url" varchar,
  "notes" text,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "species_countries" (
  "country_id" uuid,
  "species_id" uuid,
  "name" varchar,
  "total_area" float,
  "country_area" float,
  "country_area_percent_of_total" float,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "terrestrial_biome_protected_area_index" (
  "tbpai_id" uuid PRIMARY KEY,
  "country_id" uuid,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "marine_protected_area_index" (
  "mpai_id" uuid PRIMARY KEY,
  "country_id" uuid,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "protected_area_representativeness_index" (
  "pari_id" uuid PRIMARY KEY,
  "country_id" uuid,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "species_habitat_index" (
  "shi_id" uuid PRIMARY KEY,
  "country_id" uuid,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "species_protection_index" (
  "spi_id" uuid PRIMARY KEY,
  "country_id" uuid,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

CREATE TABLE "biodiversity_habitat_index" (
  "bhi_id" uuid PRIMARY KEY,
  "country_id" uuid,
  "assessment_year" int,
  "created_at" timestamp,
  "updated_at" timestamp,
  "deleted_at" timestamp
);

ALTER TABLE "app"."tenants" ADD FOREIGN KEY ("created_by") REFERENCES "app"."users" ("user_id");

ALTER TABLE "app"."tenant_users" ADD FOREIGN KEY ("tenant_id") REFERENCES "app"."tenants" ("tenant_id");

ALTER TABLE "app"."tenant_users" ADD FOREIGN KEY ("user_id") REFERENCES "app"."users" ("user_id");

ALTER TABLE "app"."payment_methods" ADD FOREIGN KEY ("tenant_id") REFERENCES "app"."tenants" ("tenant_id");

ALTER TABLE "app"."payment_methods" ADD FOREIGN KEY ("user_id") REFERENCES "app"."users" ("user_id");

ALTER TABLE "app"."collections" ADD FOREIGN KEY ("tenant_id") REFERENCES "app"."tenants" ("tenant_id");

ALTER TABLE "app"."collections" ADD FOREIGN KEY ("user_id") REFERENCES "app"."users" ("user_id");

ALTER TABLE "app"."article_collections" ADD FOREIGN KEY ("tenant_id") REFERENCES "app"."tenants" ("tenant_id");

ALTER TABLE "app"."article_collections" ADD FOREIGN KEY ("user_id") REFERENCES "app"."users" ("user_id");

ALTER TABLE "app"."article_collections" ADD FOREIGN KEY ("article_id") REFERENCES "articles" ("article_id");

ALTER TABLE "app"."article_collections" ADD FOREIGN KEY ("collection_id") REFERENCES "app"."collections" ("collection_id");

ALTER TABLE "app"."donations" ADD FOREIGN KEY ("tenant_id") REFERENCES "app"."tenants" ("tenant_id");

ALTER TABLE "app"."donations" ADD FOREIGN KEY ("user_id") REFERENCES "app"."users" ("user_id");

ALTER TABLE "app"."donations" ADD FOREIGN KEY ("conservation_organization_id") REFERENCES "conservation_organizations" ("conservation_organization_id");

ALTER TABLE "app"."donations" ADD FOREIGN KEY ("payment_method_id") REFERENCES "app"."payment_methods" ("payment_method_id");

ALTER TABLE "conservation_organization_strategies" ADD FOREIGN KEY ("conservation_organization_id") REFERENCES "conservation_organizations" ("conservation_organization_id");

ALTER TABLE "conservation_organization_strategies" ADD FOREIGN KEY ("strategy_id") REFERENCES "strategies" ("strategy_id");

ALTER TABLE "conservation_organization_countries" ADD FOREIGN KEY ("conservation_organization_id") REFERENCES "conservation_organizations" ("conservation_organization_id");

ALTER TABLE "conservation_organization_countries" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "phyla" ADD FOREIGN KEY ("kingdom_id") REFERENCES "kingdoms" ("kingdom_id");

ALTER TABLE "classes" ADD FOREIGN KEY ("phyla_id") REFERENCES "phyla" ("phyla_id");

ALTER TABLE "orders" ADD FOREIGN KEY ("class_id") REFERENCES "classes" ("class_id");

ALTER TABLE "families" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("order_id");

ALTER TABLE "genera" ADD FOREIGN KEY ("family_id") REFERENCES "families" ("family_id");

ALTER TABLE "species" ADD FOREIGN KEY ("genera_id") REFERENCES "genera" ("genera_id");

ALTER TABLE "species_iucn_status" ADD FOREIGN KEY ("species_id") REFERENCES "species" ("species_id");

ALTER TABLE "species_countries" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "species_countries" ADD FOREIGN KEY ("species_id") REFERENCES "species" ("species_id");

ALTER TABLE "terrestrial_biome_protected_area_index" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "marine_protected_area_index" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "protected_area_representativeness_index" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "species_habitat_index" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "species_protection_index" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");

ALTER TABLE "biodiversity_habitat_index" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("country_id");
