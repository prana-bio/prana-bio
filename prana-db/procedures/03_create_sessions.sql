CREATE TABLE sessions (
   tenant_id uuid,
   user_id uuid,
   id integer,
   device_name text,
   started timestamp,
   ended timestamp,
   title text,
   CONSTRAINT FK_tenants FOREIGN KEY(tenant_id) REFERENCES public.tenants(id),
   CONSTRAINT PK_session PRIMARY KEY(tenant_id, id)
);