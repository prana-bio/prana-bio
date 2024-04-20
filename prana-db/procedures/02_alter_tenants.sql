ALTER TABLE
   tenants
ADD
   COLUMN scope VARCHAR(20) CHECK (
      scope IN (
         'Personal',
         'Organization'
      )
   ) NOT NULL DEFAULT 'Personal';