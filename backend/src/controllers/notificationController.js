/**
 * ============================================================================
 * notificationController.js
 * ============================================================================
 *
 * Handles HTTP requests for notifications.
 * ============================================================================
 */

const {

    createNotification,

    getUserNotifications,

    markNotificationAsRead,

    markAllNotificationsAsRead

} = require("../services/notificationService");

/**
 * ============================================================================
 * Get Logged-in User Notifications
 * ============================================================================
 */

const getNotifications = async (req, res) => {

    try {

        console.log("================================");
        console.log("GET USER NOTIFICATIONS");
        console.log("User:", req.user.id);
        console.log("================================");

        const notifications = await getUserNotifications(
            req.user.id
        );

        return res.status(200).json({

            success: true,

            data: notifications

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch notifications."

        });

    }

};

/**
 * ============================================================================
 * Mark One Notification as Read
 * ============================================================================
 */

const markAsRead = async (req, res) => {

    try {

        const notification = await markNotificationAsRead(

            req.params.id,

            req.user.id

        );

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Notification marked as read.",

            data: notification

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to update notification."

        });

    }

};

/**
 * ============================================================================
 * Mark All Notifications as Read
 * ============================================================================
 */

const markAllAsRead = async (req, res) => {

    try {

        await markAllNotificationsAsRead(
            req.user.id
        );

        return res.status(200).json({

            success: true,

            message: "All notifications marked as read."

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to update notifications."

        });

    }

};

/*
|--------------------------------------------------------------------------
| Exports

|--------------------------------------------------------------------------
*/

module.exports = {

    getNotifications,

    markAsRead,

    markAllAsRead,

    createNotification

};