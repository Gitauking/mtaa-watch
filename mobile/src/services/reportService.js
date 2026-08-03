import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../constants/api";

/**
 * ============================================================================
 * Get Categories
 * ============================================================================
 *
 * Fetches all report categories from the backend.
 *
 * ============================================================================
 */

export const getCategories = async () => {

    try {

        console.log("================================");
        console.log("Fetching categories...");
        console.log("================================");

        const response = await apiClient.get(
            API_ENDPOINTS.CATEGORIES
        );

        console.log("Categories received.");

        console.log(response.data);

        return response.data.data;

    } catch (error) {

        console.error("================================");
        console.error("Get Categories Error:");
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
 * Create Report
 * ============================================================================
 *
 * Sends a new incident report to the backend.
 *
 * ============================================================================
 */

export const createReport = async (reportData) => {

    try {

        console.log("================================");
        console.log("Creating report...");
        console.log(reportData);
        console.log("================================");

        const response = await apiClient.post(

            API_ENDPOINTS.REPORTS,

            reportData

        );

        console.log("Report created successfully.");

        console.log(response.data);

        return response.data.data;

    } catch (error) {

        console.error("================================");
        console.error("Create Report Error:");
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
 * Get My Reports
 * ============================================================================
 */

export const getMyReports = async () => {

    try {

        console.log("================================");
        console.log("Fetching My Reports...");
        console.log("================================");

        const response = await apiClient.get(
            `${API_ENDPOINTS.REPORTS}/my-reports`
        );

        console.log("My Reports received.");
        console.log(response.data);

        return response.data.data;

    } catch (error) {

        console.error("================================");
        console.error("Get My Reports Error:");
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
 * Get Single Report
 * ============================================================================
 */

export const getReportById = async (reportId) => {

    try {

        const response = await apiClient.get(

            `${API_ENDPOINTS.REPORTS}/${reportId}`

        );

        return response.data;

    } catch (error) {

        console.error(

            "Get Report Error:",

            error.response?.data?.message ||

            error.message

        );

        throw error;

    }

};

/**
 * ============================================================================
 * Update Report
 * ============================================================================
 */

export const updateReport = async (

    reportId,

    reportData

) => {

    try {

        const response = await apiClient.put(

            `${API_ENDPOINTS.REPORTS}/${reportId}`,

            reportData

        );

        return response.data;

    } catch (error) {

        console.error(

            "Update Report Error:",

            error.response?.data?.message ||

            error.message

        );

        throw error;

    }

};

export const uploadReportMedia = async (reportId, imageUri) => {

    const formData = new FormData();

    formData.append("images", {
        uri: imageUri,
        name: `report-${Date.now()}.jpg`,
        type: "image/jpeg",
    });

    const response = await apiClient.post(
        `${API_ENDPOINTS.REPORTS}/${reportId}/media`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
};

/**
 * ============================================================================
 * Delete Report
 * ============================================================================
 */

export const deleteReport = async (reportId) => {

    try {

        const response = await apiClient.delete(

            `${API_ENDPOINTS.REPORTS}/${reportId}`

        );

        return response.data;

    } catch (error) {

        console.error(

            "Delete Report Error:",

            error.response?.data?.message ||

            error.message

        );

        throw error;

    }

};