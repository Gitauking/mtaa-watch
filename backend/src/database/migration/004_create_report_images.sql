/*
|--------------------------------------------------------------------------
| 004_create_report_images.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Creates the report_images table.
|
| Each image belongs to exactly one report.
| A report may contain one or more images.
|
*/

/*--------------------------------------------------------------------------
Create Report Images Table
--------------------------------------------------------------------------*/

CREATE TABLE report_images (

    /*----------------------------------------------------------------------
    Primary Key
    ----------------------------------------------------------------------*/

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    /*----------------------------------------------------------------------
    Relationship
    ----------------------------------------------------------------------*/

    report_id UUID NOT NULL,

    /*----------------------------------------------------------------------
    Image Information
    ----------------------------------------------------------------------*/

    image_url TEXT NOT NULL,

    /*
    Optional image filename.
    Example:
    pothole_001.jpg
    */

    file_name VARCHAR(255),

    /*
    MIME Type

    Example:

    image/jpeg

    image/png
    */

    mime_type VARCHAR(100),

    /*
    Image size in bytes.

    Example:

    3457821
    */

    file_size BIGINT,

    /*----------------------------------------------------------------------
    Audit Fields
    ----------------------------------------------------------------------*/

    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /*----------------------------------------------------------------------
    Foreign Key
    ----------------------------------------------------------------------*/

    CONSTRAINT fk_image_report
        FOREIGN KEY (report_id)
        REFERENCES reports(id)
        ON DELETE CASCADE

);