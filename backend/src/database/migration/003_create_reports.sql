/*
|--------------------------------------------------------------------------
| 003_create_reports.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Creates the reports table.
|
| This is the central table of the Mtaa Watch system.
| Each record represents a single incident reported by a citizen.
|
*/

/*--------------------------------------------------------------------------
Create Reports Table
--------------------------------------------------------------------------*/

CREATE TABLE reports (

    /*----------------------------------------------------------------------
    Primary Key
    ----------------------------------------------------------------------*/

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    /*----------------------------------------------------------------------
    Relationships
    ----------------------------------------------------------------------*/

    user_id UUID NOT NULL,

    category_id UUID NOT NULL,

    /*----------------------------------------------------------------------
    Report Details
    ----------------------------------------------------------------------*/

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL,

    status report_status NOT NULL DEFAULT 'pending',

    /*----------------------------------------------------------------------
    Location Information
    ----------------------------------------------------------------------*/

    latitude DECIMAL(10,8) NOT NULL,

    longitude DECIMAL(11,8) NOT NULL,

    location_name TEXT,

    /*----------------------------------------------------------------------
    Audit Fields
    ----------------------------------------------------------------------*/

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /*----------------------------------------------------------------------
    Foreign Keys
    ----------------------------------------------------------------------*/

    CONSTRAINT fk_report_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_report_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT

);