/*
|--------------------------------------------------------------------------
| 002_create_categories.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Creates the categories table.
|
| Categories classify incident reports and allow administrators
| to manage the types of incidents available in the application.
|
*/

/*--------------------------------------------------------------------------
Create Categories Table
--------------------------------------------------------------------------*/

CREATE TABLE categories (

    /*----------------------------------------------------------------------
    Primary Key
    ----------------------------------------------------------------------*/

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    /*----------------------------------------------------------------------
    Category Information
    ----------------------------------------------------------------------*/

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    /*
    Icon name used by the React Native application.

    Example:

    road
    trash
    warning
    water
    shield
    */

    icon VARCHAR(100) NOT NULL,

    /*----------------------------------------------------------------------
    Status
    ----------------------------------------------------------------------*/

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    /*----------------------------------------------------------------------
    Audit Fields
    ----------------------------------------------------------------------*/

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);