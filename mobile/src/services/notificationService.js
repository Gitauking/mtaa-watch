import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/api";

/**
 * ============================================================================
 * Get Notifications
 * ============================================================================
 */

export const getNotifications = async () => {

    try {

        console.log("================================");
        console.log("Fetching Notifications...");
        console.log("================================");

        const response = await apiClient.get(
            API_ENDPOINTS.NOTIFICATIONS
        );

        console.log("Notifications received.");
        console.log(response.data);

        return response.data.data;

    } catch (error) {

        console.error("================================");
        console.error("Get Notifications Error:");
        console.error(
            error.response?.data?.message ||
            error.message
        );
        console.error("================================");

        throw error;

    }

};

/**
 * ============================================================================
 * Mark One Notification as Read
 * ============================================================================
 */

export const markAsRead = async (notificationId) => {

    const response = await apiClient.patch(
        `${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`
    );

    return response.data;

};

/**
 * ============================================================================
 * Mark All Notifications as Read
 * ============================================================================
 */

export const markAllAsRead = async () => {

    const response = await apiClient.patch(
        `${API_ENDPOINTS.NOTIFICATIONS}/read-all`
    );

    return response.data;

};