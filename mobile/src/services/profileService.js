import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/api";
import { saveUser } from "../utils/storage";
/**
 * ============================================================================
 * Get User Profile
 * ============================================================================
 */

export const getProfile = async () => {

    try {

        console.log("================================");
        console.log("Fetching User Profile...");
        console.log("================================");

        const response = await apiClient.get(
            API_ENDPOINTS.PROFILE
        );

        console.log("Profile received.");
        console.log(response.data);

        return response.data.data;

    } catch (error) {

        console.error("================================");
        console.error("Get Profile Error:");
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
 * Update User Profile
 * ============================================================================
 */

export const updateProfile = async (profileData) => {

    try {

        console.log("================================");
        console.log("Updating Profile...");
        console.log(profileData);
        console.log("================================");
const response = await apiClient.put(

    API_ENDPOINTS.PROFILE,

    profileData

);

console.log("Profile updated successfully.");

console.log(response.data);

/*
|--------------------------------------------------------------------------
| Update Cached User
|--------------------------------------------------------------------------
*/

await saveUser(response.data.data);

return response.data;
    } catch (error) {

        console.error("================================");
        console.error("Update Profile Error:");
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
 * Change Password
 * ============================================================================
 */

export const changePassword = async (

    currentPassword,

    newPassword

) => {

    try {

        console.log("================================");
        console.log("Changing Password...");
        console.log("================================");

        const response = await apiClient.put(

            API_ENDPOINTS.CHANGE_PASSWORD,

            {

                currentPassword,

                newPassword

            }

        );

        console.log("Password changed successfully.");

        return response.data;

    } catch (error) {

        console.error("================================");
        console.error("Change Password Error:");
        console.error(
            error.response?.data?.message ||
            error.message
        );
        console.error("================================");

        throw error;

    }

};