CREATE TABLE countries_epis (
   country_epi_id UUID PRIMARY KEY,
   country_id UUID REFERENCES Countries(country_id),
   epi_id UUID REFERENCES EPIs(epi_id),
   score FLOAT,
   change FLOAT,
   rank INT,
   year INT,
   created TIMESTAMP,
   updated TIMESTAMP
);