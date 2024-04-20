CREATE TABLE taxons (
   taxon_id UUID PRIMARY KEY,
   scientific_name VARCHAR(255),
   canonical_name VARCHAR(255),
   generic_name VARCHAR(255),
   taxonomic_status VARCHAR(50),
   kingdom VARCHAR(100),
   phylum VARCHAR(100),
   class VARCHAR(100),
   order VARCHAR(100),
   family VARCHAR(100),
   genus VARCHAR(100)
);