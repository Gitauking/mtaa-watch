/*
|--------------------------------------------------------------------------
| 006_create_notifications.sql
|--------------------------------------------------------------------------
|
| PURPOSE
|
| Creates the notifications table.
|
| Notifications inform users about important events such as
| report submissions, status updates, and general system messages.
|
*/

CREATE TABLE notifications (

    /*----------------------------------------------------------------------
    Primary Key
    ----------------------------------------------------------------------*/

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    /*----------------------------------------------------------------------
    Relationships
    ----------------------------------------------------------------------*/

    user_id UUID NOT NULL,

    report_id UUID,

    /*----------------------------------------------------------------------
    Notification Content
    ----------------------------------------------------------------------*/

    title VARCHAR(150) NOT NULL,

    message TEXT NOT NULL,

    /*----------------------------------------------------------------------
    Notification Status
    ----------------------------------------------------------------------*/

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    /*----------------------------------------------------------------------
    Audit Field
    ----------------------------------------------------------------------*/

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    /*----------------------------------------------------------------------
    Foreign Keys
    ----------------------------------------------------------------------*/

    CONSTRAINT fk_notification_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_notification_report
        FOREIGN KEY (report_id)
        REFERENCES reports(id)
        ON DELETE CASCADE

);
