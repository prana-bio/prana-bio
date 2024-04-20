CREATE TABLE countries_biodiversity_rankings (
   country_biodiversity_rank_id UUID PRIMARY KEY,
   country_id UUID REFERENCES countries(country_id),
   biodiversity_rank INTEGER,
   amphibians INTEGER,
   amphibians_rank INTEGER,
   birds INTEGER,
   birds_rank INTEGER,
   fish INTEGER,
   fish_rank INTEGER,
   mammals INTEGER,
   mammals_rank INTEGER,
   reptiles INTEGER,
   reptiles_rank INTEGER,
   plants INTEGER,
   plants_rank INTEGER,
   created TIMESTAMP,
   updated TIMESTAMP
);