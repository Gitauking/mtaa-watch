/**
 * ============================================================================
 * notificationService.js
 * ============================================================================
 *
 * Handles all notification database operations.
 * ============================================================================
 */

const pool = require("../config/database");

/**
 * ============================================================================
 * Create Notification
 * ============================================================================
 */

const createNotification = async ({
    userId,
    reportId,
    title,
    message
}) => {

    const query = `
        INSERT INTO notifications (
            user_id,
            report_id,
            title,
            message
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        userId,
        reportId,
        title,
        message
    ];

    const result = await pool.query(query, values);

    return result.rows[0];

};

/**
 * ============================================================================
 * Get User Notifications
 * ============================================================================
 */

const getUserNotifications = async (userId) => {

    const query = `
        SELECT
            id,
            report_id,
            title,
            message,
            is_read,
            created_at
        FROM notifications
        WHERE user_id = $1
        ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [userId]);

    return result.rows;

};

/**
 * ============================================================================
 * Mark Notification as Read
 * ============================================================================
 */

const markNotificationAsRead = async (
    notificationId,
    userId
) => {

    const query = `
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = $1
        AND user_id = $2
        RETURNING *;
    `;

    const result = await pool.query(
        query,
        [notificationId, userId]
    );

    return result.rows[0];

};

/**
 * ============================================================================
 * Mark All Notifications as Read
 * ============================================================================
 */

const markAllNotificationsAsRead = async (userId) => {

    const query = `
        UPDATE notifications
        SET is_read = TRUE
        WHERE user_id = $1;
    `;

    await pool.query(query, [userId]);

};

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = {

    createNotification,

    getUserNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead

};