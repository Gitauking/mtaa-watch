import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/api";

import {

    saveAccessToken,

    saveUser,

    getUser,

    clearSession

} from "../utils/storage";

/**
 * ============================================================================
 * Register User
 * ============================================================================
 */

export const register = async (userData) => {

    try {

        console.log("Calling register API...");
console.log(userData);

const response = await apiClient.post(
    API_ENDPOINTS.REGISTER,
    userData
);

console.log("Register response received.");
console.log(response.data);

        console.log("User registered successfully.");

        return response.data;

    } catch (error) {

        console.error(
    "Register Error:",
    error.response?.data?.message || error.message
);

        throw error;

    }
    


};

/**
 * ============================================================================
 * Login User
 * ============================================================================
 */

export const login = async (credentials) => {

    try {

        console.log("================================");
        console.log("authService.login()");
        console.log("Credentials:", credentials);
        console.log("================================");

        console.log("Calling apiClient.post()...");

        const response = await apiClient.post(

            API_ENDPOINTS.LOGIN,

            credentials

        );

        console.log("apiClient.post() completed.");

        console.log("Response:", response.data);

        const { success, token, user, message } = response.data;

        console.log("Extracted response values.");

        if (!success) {

            throw new Error(message || "Login failed.");

        }

        if (!token || !user) {

            throw new Error("Invalid login response from server.");

        }

        console.log("Saving access token...");

        await saveAccessToken(token);

        console.log("Access token saved.");

        console.log("Saving user...");

        await saveUser(user);

        console.log("User saved.");

        console.log("Login successful.");

        return response.data;

    } catch (error) {

        console.error("================================");
        console.error("Login Error:");
        console.error(error.response?.data?.message || error.message);
        console.error("================================");

        throw error;

    }

};
/**
 * ============================================================================
 * Get Profile
 * ============================================================================
 */

export const getProfile = async () => {

    try {

        const response = await apiClient.get(

            API_ENDPOINTS.PROFILE

        );

        return response.data;

    } catch (error) {

        console.error("Profile Error:", error.response?.data || error.message);

        throw error;

    }

};

/**
 * ============================================================================
 * Get Cached User
 * ============================================================================
 */

export const getCurrentUser = async () => {

    return await getUser();

};

/**
 * ============================================================================
 * Logout
 * ============================================================================
 */

export const logout = async () => {

    await clearSession();

    console.log("Logout successful.");

};