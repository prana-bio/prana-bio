CREATE TABLE epis (
   epi_id UUID PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   abbreviation VARCHAR(255),
   description TEXT,
   data_credits_name VARCHAR(255),
   data_credits_url VARCHAR(255),
   created TIMESTAMP,
   updated TIMESTAMP
);