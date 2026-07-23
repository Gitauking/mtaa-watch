/*
|--------------------------------------------------------------------------
| 005_create_report_status_history.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Stores every status change made to a report.
|
| This table provides an audit trail showing who changed the
| status, when it was changed, and any optional comments.
|
*/

CREATE TABLE report_status_history (

    /*----------------------------------------------------------------------
    Primary Key
    ----------------------------------------------------------------------*/

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    /*----------------------------------------------------------------------
    Relationships
    ----------------------------------------------------------------------*/

    report_id UUID NOT NULL,

    changed_by UUID NOT NULL,

    /*----------------------------------------------------------------------
    Status Transition
    ----------------------------------------------------------------------*/

    old_status report_status,

    new_status report_status NOT NULL,

    /*
    Optional administrator comment.

    Example:

    "Maintenance team assigned."

    "Duplicate report."

    "Issue resolved on site."
    */

    comment TEXT,

    /*----------------------------------------------------------------------
    Audit Field
    ----------------------------------------------------------------------*/

    changed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /*----------------------------------------------------------------------
    Foreign Keys
    ----------------------------------------------------------------------*/

    CONSTRAINT fk_status_report
        FOREIGN KEY (report_id)
        REFERENCES reports(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_status_user
        FOREIGN KEY (changed_by)
        REFERENCES users(id)
        ON DELETE RESTRICT

);