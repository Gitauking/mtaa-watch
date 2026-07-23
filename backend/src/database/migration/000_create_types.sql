/*
|--------------------------------------------------------------------------
| 000_create_types.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Creates reusable PostgreSQL ENUM types.
|
| Instead of storing unrestricted text values,
| these ENUMs ensure only valid values can be stored.
|
| Any future tables can reuse these types.
|
*/

/*--------------------------------------------------------------------------
User Roles
--------------------------------------------------------------------------*/

CREATE TYPE user_role AS ENUM (

    'citizen',

    'admin'

);

/*--------------------------------------------------------------------------
Report Status
--------------------------------------------------------------------------*/

CREATE TYPE report_status AS ENUM (

    'pending',

    'in_progress',

    'resolved',

    'rejected'

);