const pool = require("../config/database");
const fs = require("fs");
const path = require("path");
/**
 * ============================================================================
 * Upload Report Media
 * ============================================================================
 */

const uploadMedia = async (reportId, userId, files) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        console.log("================================");
        console.log("UPLOAD MEDIA");
        console.log("Report ID:", reportId);
        console.log("User ID:", userId);
        console.log("================================");

        /*
        --------------------------------------------------------------------------
        Verify Report Exists
        --------------------------------------------------------------------------
        */

        const reportResult = await client.query(
            `
            SELECT
                id,
                user_id
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
        Verify Ownership
        --------------------------------------------------------------------------
        */

        if (report.user_id !== userId) {

            throw new Error("REPORT_NOT_OWNED");

        }

        /*
        --------------------------------------------------------------------------
        Collect Uploaded Files
        --------------------------------------------------------------------------
        */

        const uploadedFiles = [];

        if (files.images) {

            uploadedFiles.push(...files.images);

        }

        if (files.video) {

            uploadedFiles.push(...files.video);

        }

        /*
        --------------------------------------------------------------------------
        Ensure At Least One File Was Uploaded
        --------------------------------------------------------------------------
        */

        if (uploadedFiles.length === 0) {

            throw new Error("NO_FILES_UPLOADED");

        }

        /*
        --------------------------------------------------------------------------
        Save Files To Database
        --------------------------------------------------------------------------
        */

        const savedFiles = [];

        for (const file of uploadedFiles) {

            const mediaType = file.mimetype.startsWith("image/")
                ? "image"
                : "video";

            const result = await client.query(
                `
                INSERT INTO report_media
                (
                    report_id,
                    file_name,
                    file_url,
                    media_type,
                    mime_type,
                    file_size
                )
                VALUES
                (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                )
                RETURNING *;
                `,
                [
                    reportId,
                    file.filename,
                    file.path,
                    mediaType,
                    file.mimetype,
                    file.size
                ]
            );

            savedFiles.push(result.rows[0]);

        }

        await client.query("COMMIT");

        console.log("================================");
        console.log("FILES SAVED:", savedFiles.length);
        console.log("================================");

        return savedFiles;

    }
    catch (error) {

        await client.query("ROLLBACK");

        console.error("Transaction rolled back:", error.message);

        throw error;

    }
    finally {

        client.release();

    }

};
/**
 * ============================================================================
 * Get Media for a Report
 * ============================================================================
 */

const getReportMedia = async (reportId) => {

    console.log("================================");
    console.log("GET REPORT MEDIA");
    console.log("Report ID:", reportId);
    console.log("================================");

    /*
    --------------------------------------------------------------------------
    Verify Report Exists
    --------------------------------------------------------------------------
    */

    const reportResult = await pool.query(
        `
        SELECT id
        FROM reports
        WHERE id = $1;
        `,
        [reportId]
    );

    if (reportResult.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Fetch Report Media
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

    console.log("================================");
    console.log("MEDIA FOUND:", mediaResult.rows.length);
    console.log("================================");

    return mediaResult.rows;

};
/**
 * ============================================================================
 * Delete Media
 * ============================================================================
 */

const deleteMedia = async (mediaId, userId) => {

    console.log("================================");
    console.log("DELETE MEDIA");
    console.log("Media ID:", mediaId);
    console.log("User ID:", userId);
    console.log("================================");

    /*
    --------------------------------------------------------------------------
    Find Media Record
    --------------------------------------------------------------------------
    */

    const mediaResult = await pool.query(
        `
        SELECT
            id,
            report_id,
            file_name,
            file_url
        FROM report_media
        WHERE id = $1;
        `,
        [mediaId]
    );

    if (mediaResult.rows.length === 0) {

        throw new Error("MEDIA_NOT_FOUND");

    }

    const media = mediaResult.rows[0];

    /*
    --------------------------------------------------------------------------
    Verify Report Ownership
    --------------------------------------------------------------------------
    */

    const reportResult = await pool.query(
        `
        SELECT
            id,
            user_id
        FROM reports
        WHERE id = $1;
        `,
        [media.report_id]
    );

    if (reportResult.rows.length === 0) {

        throw new Error("REPORT_NOT_FOUND");

    }

    const report = reportResult.rows[0];

    if (report.user_id !== userId) {

        throw new Error("REPORT_NOT_OWNED");

    }

    /*
    --------------------------------------------------------------------------
    Delete Physical File
    --------------------------------------------------------------------------
    */

    const filePath = path.resolve(media.file_url);

    if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        console.log("Deleted file:", filePath);

    }

    /*
    --------------------------------------------------------------------------
    Delete Database Record
    --------------------------------------------------------------------------
    */

    await pool.query(
        `
        DELETE FROM report_media
        WHERE id = $1;
        `,
        [mediaId]
    );

    console.log("================================");
    console.log("MEDIA DELETED");
    console.log("================================");

    return media;

};

module.exports = {

    uploadMedia,
    getReportMedia,
    deleteMedia
};