import * as SecureStore from "expo-secure-store";

/**
 * ============================================================================
 * Storage Keys
 * ============================================================================
 */

export const STORAGE_KEYS = {

    ACCESS_TOKEN: "accessToken",

    USER: "user"

};

/**
 * ============================================================================
 * Save Access Token
 * ============================================================================
 */

export const saveAccessToken = async (token) => {

    try {

        await SecureStore.setItemAsync(

            STORAGE_KEYS.ACCESS_TOKEN,

            token

        );

        console.log("Access token saved.");

    } catch (error) {

        console.error("Error saving access token:", error);

    }

};

/**
 * ============================================================================
 * Get Access Token
 * ============================================================================
 */

export const getAccessToken = async () => {

    try {

        return await SecureStore.getItemAsync(

            STORAGE_KEYS.ACCESS_TOKEN

        );

    } catch (error) {

        console.error("Error retrieving access token:", error);

        return null;

    }

};

/**
 * ============================================================================
 * Remove Access Token
 * ============================================================================
 */

export const removeAccessToken = async () => {

    try {

        await SecureStore.deleteItemAsync(

            STORAGE_KEYS.ACCESS_TOKEN

        );

        console.log("Access token removed.");

    } catch (error) {

        console.error("Error removing access token:", error);

    }

};

/**
 * ============================================================================
 * Save Logged In User
 * ============================================================================
 */

export const saveUser = async (user) => {

    try {

        await SecureStore.setItemAsync(

            STORAGE_KEYS.USER,

            JSON.stringify(user)

        );

        console.log("User saved.");

    } catch (error) {

        console.error("Error saving user:", error);

    }

};

/**
 * ============================================================================
 * Get Logged In User
 * ============================================================================
 */

export const getUser = async () => {

    try {

        const user = await SecureStore.getItemAsync(

            STORAGE_KEYS.USER

        );

        return user ? JSON.parse(user) : null;

    } catch (error) {

        console.error("Error retrieving user:", error);

        return null;

    }

};

/**
 * ============================================================================
 * Remove Logged In User
 * ============================================================================
 */

export const removeUser = async () => {

    try {

        await SecureStore.deleteItemAsync(

            STORAGE_KEYS.USER

        );

        console.log("User removed.");

    } catch (error) {

        console.error("Error removing user:", error);

    }

};

/**
 * ============================================================================
 * Check Authentication Status
 * ============================================================================
 */

export const isAuthenticated = async () => {

    const token = await getAccessToken();

    return !!token;

};

/**
 * ============================================================================
 * Clear Session
 * ============================================================================
 */

export const clearSession = async () => {

    try {

        await Promise.all([

            removeAccessToken(),

            removeUser()

        ]);

        console.log("Session cleared.");

    } catch (error) {

        console.error("Error clearing session:", error);

    }

};