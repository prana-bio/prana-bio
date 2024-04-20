CREATE TABLE countries_species (
   country_species_id UUID PRIMARY KEY,
   country_id UUID REFERENCES countries(country_id),
   species_id UUID REFERENCES species(species_id),
   country_habitat_range_area FLOAT,
   country_habitat_range_area_pct FLOAT,
   created TIMESTAMP,
   updated TIMESTAMP
);