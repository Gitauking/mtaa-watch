const pool = require("../config/database");
const fs = require("fs");
const path = require("path");
/**
 * ============================================================================
 * Get All Reports (Admin)
 * ============================================================================
 */

const getAllReports = async (filters) => {

    /*
    --------------------------------------------------------------------------
    Extract Query Parameters
    --------------------------------------------------------------------------
    */

    let {
        page = 1,
        limit = 10,
        status,
        category,
        search,
        sort = "newest"
    } = filters;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    /*
    --------------------------------------------------------------------------
    Build Dynamic WHERE Clause
    --------------------------------------------------------------------------
    */

    const conditions = [];
    const values = [];

    // Filter by Status
    if (status) {

        conditions.push(
            `r.status = $${values.length + 1}`
        );

        values.push(status);

    }

    // Filter by Category
    if (category) {

        conditions.push(
            `r.category_id = $${values.length + 1}`
        );

        values.push(category);

    }

    // Search
    if (search) {

        conditions.push(`(
            LOWER(r.title) LIKE LOWER($${values.length + 1})
            OR LOWER(r.description) LIKE LOWER($${values.length + 1})
            OR LOWER(r.location_name) LIKE LOWER($${values.length + 1})
        )`);

        values.push(`%${search}%`);

    }

    const whereClause =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    /*
    --------------------------------------------------------------------------
    Sorting
    --------------------------------------------------------------------------
    */

    let orderBy = "ORDER BY r.created_at DESC";

    if (sort === "oldest") {

        orderBy = "ORDER BY r.created_at ASC";

    }

    /*
    --------------------------------------------------------------------------
    Count Query
    --------------------------------------------------------------------------
    */

    const countQuery = `
        SELECT COUNT(DISTINCT r.id) AS total

        FROM reports r

        INNER JOIN users u
            ON r.user_id = u.id

        INNER JOIN categories c
            ON r.category_id = c.id

        LEFT JOIN report_media rm
            ON rm.report_id = r.id

        ${whereClause};
    `;

    console.log("================================");
    console.log("COUNT QUERY");
    console.log(countQuery);
    console.log(values);
    console.log("================================");

    const countResult = await pool.query(
        countQuery,
        values
    );

    const total = parseInt(countResult.rows[0].total);

    /*
    --------------------------------------------------------------------------
    Main Query
    --------------------------------------------------------------------------
    */

    const reportQuery = `
        SELECT

            r.id,
            r.title,
            r.description,
            r.location_name,
            r.status,
            r.latitude,
            r.longitude,
            r.created_at,
            r.updated_at,

            c.id AS category_id,
            c.name AS category_name,

            u.id AS reporter_id,
            u.first_name,
            u.email,

            COUNT(rm.id)::INTEGER AS media_count

        FROM reports r

        INNER JOIN users u
            ON r.user_id = u.id

        INNER JOIN categories c
            ON r.category_id = c.id

        LEFT JOIN report_media rm
            ON rm.report_id = r.id

        ${whereClause}

        GROUP BY

            r.id,
            c.id,
            u.id

        ${orderBy}

        LIMIT $${values.length + 1}
        OFFSET $${values.length + 2};
    `;

    const reportValues = [
        ...values,
        limit,
        offset
    ];

    console.log("================================");
    console.log("REPORT QUERY");
    console.log(reportQuery);
    console.log(reportValues);
    console.log("================================");

    const reportsResult = await pool.query(
        reportQuery,
        reportValues
    );

    /*
    --------------------------------------------------------------------------
    Format Response
    --------------------------------------------------------------------------
    */

    const reports = reportsResult.rows.map(report => ({

        id: report.id,

        title: report.title,

        description: report.description,

        location_name: report.location_name,

        latitude: report.latitude,

        longitude: report.longitude,

        status: report.status,

        media_count: report.media_count,

        created_at: report.created_at,

        updated_at: report.updated_at,

        category: {

            id: report.category_id,

            name: report.category_name

        },

        reporter: {

            id: report.reporter_id,

            first_name: report.first_name,

            email: report.email

        }

    }));

    /*
    --------------------------------------------------------------------------
    Return Data
    --------------------------------------------------------------------------
    */

    return {

        reports,

        pagination: {

            page,

            limit,

            total,

            totalPages: Math.ceil(total / limit)

        }

    };

};
/**
 * ============================================================================
 * Get Report By ID (Admin)
 * ============================================================================
 */

const getReportById = async (reportId) => {

    /*
    --------------------------------------------------------------------------
    Get Report Details
    --------------------------------------------------------------------------
    */

    const reportResult = await pool.query(
        `
        SELECT

            r.id,
            r.title,
            r.description,
            r.location_name,
            r.latitude,
            r.longitude,
            r.status,
            r.created_at,
            r.updated_at,

            c.id AS category_id,
            c.name AS category_name,

            u.id AS reporter_id,
            u.first_name,
            u.email

        FROM reports r

        INNER JOIN users u
            ON r.user_id = u.id

        INNER JOIN categories c
            ON r.category_id = c.id

        WHERE r.id = $1

        LIMIT 1;
        `,
        [reportId]
    );

    if (reportResult.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    const report = reportResult.rows[0];

    /*
    --------------------------------------------------------------------------
    Get Report Media
    --------------------------------------------------------------------------
    */

    const mediaResult = await pool.query(
        `
        SELECT

            id,
            report_id,
            file_name,
            file_url,
            media_type,
            mime_type,
            file_size,
            created_at

        FROM report_media

        WHERE report_id = $1

        ORDER BY created_at ASC;
        `,
        [reportId]
    );

    /*
    --------------------------------------------------------------------------
    Return Formatted Response
    --------------------------------------------------------------------------
    */

    return {

        id: report.id,

        title: report.title,

        description: report.description,

        location_name: report.location_name,

        latitude: report.latitude,

        longitude: report.longitude,

        status: report.status,

        created_at: report.created_at,

        updated_at: report.updated_at,

        category: {

            id: report.category_id,

            name: report.category_name

        },

        reporter: {

            id: report.reporter_id,

            first_name: report.first_name,

            email: report.email

        },

        media: mediaResult.rows

    };

};
/**
 * ============================================================================
 * Update Report Status (Admin)
 * ============================================================================
 */

const updateReportStatus = async (reportId, status) => {

    /*
    --------------------------------------------------------------------------
    Allowed Statuses
    --------------------------------------------------------------------------
    */

    const allowedStatuses = [

        "pending",
        "in_progress",
        "resolved",
        "rejected"

    ];

    if (!allowedStatuses.includes(status)) {

        throw new Error("INVALID_STATUS");

    }

    /*
    --------------------------------------------------------------------------
    Verify Report Exists
    --------------------------------------------------------------------------
    */

    const existingReport = await pool.query(
        `
        SELECT id
        FROM reports
        WHERE id = $1
        LIMIT 1;
        `,
        [reportId]
    );

    if (existingReport.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Update Status
    --------------------------------------------------------------------------
    */

    const result = await pool.query(
        `
        UPDATE reports

        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP

        WHERE id = $2

        RETURNING
            id,
            title,
            status,
            updated_at;
        `,
        [
            status,
            reportId
        ]
    );

    return result.rows[0];

};
/**
 * ============================================================================
 * Delete Report (Admin)
 * ============================================================================
 */

const deleteReport = async (reportId) => {

    /*
    --------------------------------------------------------------------------
    Verify Report Exists
    --------------------------------------------------------------------------
    */

    const reportResult = await pool.query(
        `
        SELECT
            id,
            title
        FROM reports
        WHERE id = $1
        LIMIT 1;
        `,
        [reportId]
    );

    if (reportResult.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Retrieve All Media
    --------------------------------------------------------------------------
    */

    const mediaResult = await pool.query(
        `
        SELECT
            file_url
        FROM report_media
        WHERE report_id = $1;
        `,
        [reportId]
    );

    /*
    --------------------------------------------------------------------------
    Delete Physical Files
    --------------------------------------------------------------------------
    */

    for (const media of mediaResult.rows) {

        const filePath = path.join(
            __dirname,
            "../../",
            media.file_url
        );

        if (fs.existsSync(filePath)) {

            fs.unlinkSync(filePath);

        }

    }

    /*
    --------------------------------------------------------------------------
    Delete Report
    --------------------------------------------------------------------------
    */

    await pool.query(
        `
        DELETE FROM reports
        WHERE id = $1;
        `,
        [reportId]
    );

    return reportResult.rows[0];

};

/**
 * ============================================================================
 * Exports
 * ============================================================================
 */

module.exports = {

    getAllReports,
    getReportById,
    updateReportStatus,
    deleteReport

};