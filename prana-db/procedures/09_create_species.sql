CREATE TABLE species (
   species_id UUID PRIMARY KEY,
   iucn_category_id UUID REFERENCES iucn_categories(iucn_category_id),
   iucn_taxon_id VARCHAR(50),
   common_name VARCHAR(255),
   binominal_name VARCHAR(255),
   name_language VARCHAR(50),
   species_group VARCHAR(50),
   total_habitat_range_area FLOAT,
   small_habitat_range_area FLOAT,
   created TIMESTAMP,
   updated TIMESTAMP
);