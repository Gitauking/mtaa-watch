/**
 * ============================================================================
 * reportService.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Handles all report-related business logic.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Verify referenced data exists.
 * - Interact with the database.
 * - Return report data to the controller.
 *
 * ============================================================================
 */

const pool = require("../config/database");

/**
 * ============================================================================
 * Create Report
 * ============================================================================
 */

const createReport = async (reportData, userId) => {

    const {
        categoryId,
        title,
        description,
        latitude,
        longitude,
        locationName
    } = reportData;

    /*
    --------------------------------------------------------------------------
    Debug Logging
    --------------------------------------------------------------------------
    */

    console.log("================================");
    console.log("REPORT SERVICE");
    console.log("User ID:", userId);
    console.log("Report Data:", reportData);
    console.log("================================");

    /*
    --------------------------------------------------------------------------
    Verify Category Exists
    --------------------------------------------------------------------------
    */

    const categoryResult = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE id = $1
        AND is_active = TRUE
        LIMIT 1;
        `,
        [categoryId]
    );

    if (categoryResult.rows.length === 0) {

        throw new Error("CATEGORY_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Create Report
    --------------------------------------------------------------------------
    */

    const result = await pool.query(
        `
        INSERT INTO reports
        (
            user_id,
            category_id,
            title,
            description,
            latitude,
            longitude,
            location_name
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )
        RETURNING
            id,
            user_id,
            category_id,
            title,
            description,
            status,
            latitude,
            longitude,
            location_name,
            created_at,
            updated_at;
        `,
        [
            userId,
            categoryId,
            title,
            description,
            latitude,
            longitude,
            locationName
        ]
    );

    console.log("================================");
    console.log("REPORT CREATED");
    console.log(result.rows[0]);
    console.log("================================");

    return result.rows[0];

};

/**
 * ============================================================================
 * Get All Reports
 * ============================================================================
 */

const getAllReports = async () => {

    console.log("================================");
    console.log("FETCHING ALL REPORTS");
    console.log("================================");

    const result = await pool.query(
        `
        SELECT
            r.id,
            r.title,
            r.description,
            r.status,
            r.latitude,
            r.longitude,
            r.location_name,
            r.created_at,
            r.updated_at,

            c.id AS category_id,
            c.name AS category_name,

            u.id AS user_id,
            u.email

        FROM reports r

        INNER JOIN categories c
            ON r.category_id = c.id

        INNER JOIN users u
            ON r.user_id = u.id

        ORDER BY r.created_at DESC;
        `
    );

    console.log("================================");
    console.log("REPORTS FOUND:", result.rows.length);
    console.log("================================");

    return result.rows;

};
/**
 * ============================================================================
 * Get Report By ID
 * ============================================================================
 */

const getReportById = async (reportId) => {

    console.log("================================");
    console.log("FETCHING REPORT");
    console.log("Report ID:", reportId);
    console.log("================================");

    const result = await pool.query(
        `
        SELECT
            r.id,
            r.title,
            r.description,
            r.status,
            r.latitude,
            r.longitude,
            r.location_name,
            r.created_at,
            r.updated_at,

            c.id AS category_id,
            c.name AS category_name,

            u.id AS user_id,
            u.email

        FROM reports r

        INNER JOIN categories c
            ON r.category_id = c.id

        INNER JOIN users u
            ON r.user_id = u.id

        WHERE r.id = $1;
        `,
        [reportId]
    );

    if (result.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    console.log("================================");
    console.log("REPORT FOUND");
    console.log(result.rows[0]);
    console.log("================================");

    return result.rows[0];

};
/**
 * ============================================================================
 * Update Report
 * ============================================================================
 */

const updateReport = async (reportId, reportData, userId) => {

    const {
        categoryId,
        title,
        description,
        latitude,
        longitude,
        locationName
    } = reportData;

    /*
    --------------------------------------------------------------------------
    Clean Input
    --------------------------------------------------------------------------
    */

    const cleanCategoryId = categoryId.trim();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const cleanLocationName = locationName.trim();

    /*
    --------------------------------------------------------------------------
    Debug Logging
    --------------------------------------------------------------------------
    */

    console.log("================================");
    console.log("UPDATE REPORT");
    console.log("Report ID:", reportId);
    console.log("User ID:", userId);
    console.log("================================");

    /*
    --------------------------------------------------------------------------
    Check Report Exists
    --------------------------------------------------------------------------
    */

    const reportResult = await pool.query(
        `
        SELECT
            id,
            user_id,
            status
        FROM reports
        WHERE id = $1;
        `,
        [reportId]
    );

    if (reportResult.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    const report = reportResult.rows[0];

    /*
    --------------------------------------------------------------------------
    Check Report Ownership
    --------------------------------------------------------------------------
    */

    if (report.user_id !== userId) {

        throw new Error("REPORT_NOT_OWNED");

    }

    /*
    --------------------------------------------------------------------------
    Check Report Status
    --------------------------------------------------------------------------
    */

    if (report.status !== "pending") {

        throw new Error("REPORT_ALREADY_PROCESSING");

    }

    /*
    --------------------------------------------------------------------------
    Verify Category Exists
    --------------------------------------------------------------------------
    */

    const categoryResult = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE id = $1
        AND is_active = TRUE;
        `,
        [cleanCategoryId]
    );

    if (categoryResult.rows.length === 0) {

        throw new Error("CATEGORY_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Update Report
    --------------------------------------------------------------------------
    */

    const result = await pool.query(
        `
        UPDATE reports
        SET
            category_id = $1,
            title = $2,
            description = $3,
            latitude = $4,
            longitude = $5,
            location_name = $6,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING
            id,
            user_id,
            category_id,
            title,
            description,
            status,
            latitude,
            longitude,
            location_name,
            created_at,
            updated_at;
        `,
        [
            cleanCategoryId,
            cleanTitle,
            cleanDescription,
            latitude,
            longitude,
            cleanLocationName,
            reportId
        ]
    );

    console.log("================================");
    console.log("REPORT UPDATED");
    console.log(result.rows[0]);
    console.log("================================");

    return result.rows[0];

};


const getUserReports = async (userId) => {

    console.log("================================");
    console.log("FETCH USER REPORTS");
    console.log("User:", userId);
    console.log("================================");
    const result = await pool.query(
        `
        SELECT
            r.id,
            r.title,
            r.description,
            r.status,
            r.latitude,
            r.longitude,
            r.location_name,
            r.created_at,
            r.updated_at,

            c.id AS category_id,
            c.name AS category_name

        FROM reports r

        INNER JOIN categories c
            ON r.category_id = c.id

        WHERE r.user_id = $1

        ORDER BY r.created_at DESC;
        `,
        [userId]
    );

    console.log("Reports Found:", result.rows.length);
    console.log(result.rows);

    return result.rows;

};
/**
 * ============================================================================
 * Delete Report (Soft Delete)
 * ============================================================================
 */

/**
 * ============================================================================
 * Delete Report
 * ============================================================================
 */

const deleteReport = async (reportId, userId) => {

    console.log("================================");
    console.log("DELETE REPORT");
    console.log("Report ID:", reportId);
    console.log("User ID:", userId);
    console.log("================================");

    /*
    --------------------------------------------------------------------------
    Check Report Exists
    --------------------------------------------------------------------------
    */

    const reportResult = await pool.query(
        `
        SELECT
            id,
            user_id,
            status
        FROM reports
        WHERE id = $1;
        `,
        [reportId]
    );

    if (reportResult.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    const report = reportResult.rows[0];

    /*
    --------------------------------------------------------------------------
    Check Ownership
    --------------------------------------------------------------------------
    */

    if (report.user_id !== userId) {

        throw new Error("REPORT_NOT_OWNED");

    }

    /*
    --------------------------------------------------------------------------
    Only Pending Reports Can Be Deleted
    --------------------------------------------------------------------------
    */

    if (report.status !== "pending") {

        throw new Error("REPORT_ALREADY_PROCESSING");

    }

    /*
    --------------------------------------------------------------------------
    Permanently Delete Report
    --------------------------------------------------------------------------
    */

    await pool.query(
        `
        DELETE FROM reports
        WHERE id = $1;
        `,
        [reportId]
    );

    console.log("================================");
    console.log("REPORT DELETED");
    console.log("================================");

    return;

};

/**
 * ============================================================================
 * Get Dashboard Summary
 * ============================================================================
 *
 * Returns dashboard statistics and recent reports for the logged-in user.
 * ============================================================================
 */

const getDashboardSummary = async (userId) => {

    /*
    --------------------------------------------------------------------------
    Dashboard Statistics
    --------------------------------------------------------------------------
    */

    const summaryQuery = `
        SELECT

            COUNT(*) AS reports_submitted,

            COUNT(*) FILTER (
                WHERE status = 'pending'
            ) AS pending,

            COUNT(*) FILTER (
                WHERE status = 'in_progress'
            ) AS in_progress,

            COUNT(*) FILTER (
                WHERE status = 'resolved'
            ) AS resolved

        FROM reports

        WHERE user_id = $1;
    `;

    const summaryResult = await pool.query(

        summaryQuery,

        [userId]

    );

    /*
    --------------------------------------------------------------------------
    Recent Reports
    --------------------------------------------------------------------------
    */

    const recentReportsQuery = `
        SELECT

            id,

            title,

            status,

            location_name,

            created_at

        FROM reports

        WHERE user_id = $1

        ORDER BY created_at DESC

        LIMIT 5;
    `;

    const recentReportsResult = await pool.query(

        recentReportsQuery,

        [userId]

    );

    return {

        summary: summaryResult.rows[0],

        recentReports: recentReportsResult.rows

    };

};
/*
|--------------------------------------------------------------------------
| Export Services
|--------------------------------------------------------------------------
*/

module.exports = {
    createReport,
    getAllReports,
    getUserReports,
    getReportById,
    updateReport,
    getDashboardSummary,
    deleteReport
};