CREATE TABLE iucn_categories (
   iucn_category_id UUID PRIMARY KEY,
   name VARCHAR(50),
   abbreviation VARCHAR(10),
   description TEXT,
   created TIMESTAMP,
   updated TIMESTAMP
);