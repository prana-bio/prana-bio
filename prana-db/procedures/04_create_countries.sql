CREATE TABLE countries (
   country_id UUID PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   iso_alpha2 CHAR(2),
   iso_alpha3 CHAR(3),
   country_code VARCHAR,
   region VARCHAR,
   sub_region VARCHAR,
   created TIMESTAMP,
   updated TIMESTAMP
);