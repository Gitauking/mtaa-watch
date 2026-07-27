import axios from "axios";
import { BASE_URL } from "../constants/api";

import {
    getAccessToken,
    removeAccessToken
} from "../utils/storage";

/**
 * ============================================================================
 * Axios Instance
 * ============================================================================
 */

const apiClient = axios.create({

    baseURL: BASE_URL,

    timeout: 15000,

    headers: {

        "Content-Type": "application/json"

    }

});

/**
 * ============================================================================
 * Request Interceptor
 * ============================================================================
 *
 * Automatically attaches the JWT token to every authenticated request.
 *
 * Authorization: Bearer <token>
 * ============================================================================
 */

apiClient.interceptors.request.use(

    async (config) => {

        try {

            const token = await getAccessToken();

            if (token) {

                config.headers.Authorization = `Bearer ${token}`;

            }

            console.log("================================");
            console.log("API REQUEST");
            console.log("URL:", `${config.baseURL}${config.url}`);
            console.log("Method:", config.method?.toUpperCase());
            console.log("================================");

            return config;

        } catch (error) {

            console.error("Request Interceptor Error:", error);

            return config;

        }

    },

    (error) => {

        return Promise.reject(error);

    }

);

/**
 * ============================================================================
 * Response Interceptor
 * ============================================================================
 */

apiClient.interceptors.response.use(

    (response) => {

        console.log("================================");
        console.log("API RESPONSE");
        console.log("Status:", response.status);
        console.log("URL:", response.config.url);
        console.log("================================");

        return response;

    },

    async (error) => {

        console.log("================================");
        console.log("API ERROR");

        if (error.response) {

            console.log("Status:", error.response.status);
            console.log("Message:", error.response.data);

            /**
             * --------------------------------------------------------------
             * Unauthorized
             * --------------------------------------------------------------
             */

            if (error.response.status === 401) {

                await removeAccessToken();

            }

        } else {

            console.log(error.message);

        }

        console.log("================================");

        return Promise.reject(error);

    }

);

/**
 * ============================================================================
 * Export
 * ============================================================================
 */

export default apiClient;