/*
|--------------------------------------------------------------------------
| 001_create_users.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Creates the users table for the Mtaa Watch system.
|
| The users table stores both citizens and administrators.
|
| Passwords are NEVER stored in plain text.
| Only password hashes generated with bcrypt will be saved.
|
*/

/*--------------------------------------------------------------------------
Enable UUID generation.

This extension only needs to be created once.
--------------------------------------------------------------------------*/

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

/*--------------------------------------------------------------------------
Create Users Table
--------------------------------------------------------------------------*/

CREATE TABLE users (

    /*----------------------------------------------------------------------
    Primary Key
    ----------------------------------------------------------------------*/

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    /*----------------------------------------------------------------------
    Personal Information
    ----------------------------------------------------------------------*/

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    phone VARCHAR(20) NOT NULL UNIQUE,

    /*----------------------------------------------------------------------
    Authentication
    ----------------------------------------------------------------------*/

    password_hash TEXT NOT NULL,
role user_role NOT NULL DEFAULT 'citizen',
    /*----------------------------------------------------------------------
    Profile
    ----------------------------------------------------------------------*/

    profile_image TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    /*----------------------------------------------------------------------
    Audit Fields
    ----------------------------------------------------------------------*/

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);