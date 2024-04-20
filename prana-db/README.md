# 🦚 DBA Guide

The primary data storage for Prana is **The Nile Serverless PostgreSQL DB;** we use it to store both the application-generated and engine-generated data for Prana.

#### DBA Snippets

Read Users by Tenant

```
     SELECT UU.id as user_id, 
            UU.email, 
            UU.full_name,
            UTU.tenant_id, 
            PT.name as tenant_name,
            PT.stripe_customer_id,
            UTU.roles
       FROM "users"."tenant_users" UTU
  LEFT JOIN public.tenants PT ON UTU.tenant_id = PT.id
  LEFT JOIN users.users    UU ON UU.id = UTU.user_id;
```

Add Role to User

```
update users.tenant_users
   set roles = array['Admin']
 where user_id = '{user_id}';
```

Add Tenant to User

```
insert into users.tenant_users(tenant_id, user_id, roles)
     values ('{tenant_id}', '{user_id}', ARRAY['Admin']);
```

Hard Delete User

```
delete from auth.credentials where user_id = {user_id};
delete from users.tenant_users where user_id = {user_id};
delete from users.users where id = {user_id};
delete from tenants where name LIKE '%{user_id}%;
```

Create Sessions Table

```
create table sessions (
  tenant_id uuid,
  user_id uuid,
  id integer,
  device_name text,
  login_time timestamp,
  logout_time timestamp,
  title text,
  constraint FK_tenants FOREIGN KEY(tenant_id) references tenants(id),
  constraint PK_session PRIMARY KEY(tenant_id,id)
);
```
