/**
 * ============================================================================
 * reportController.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Handles all report-related HTTP requests.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Receive requests from the client.
 * - Validate request data.
 * - Call the report service.
 * - Return HTTP responses.
 * - Handle expected and unexpected errors.
 *
 * ============================================================================
 */

const {
    createNotification
} = require("../services/notificationService");


const {
    createReport: createReportService,
    getAllReports,
    getReportById,
    updateReport: updateReportService,
    deleteReport: deleteReportService,
    getUserReports
} = require("../services/reportService");

const {
    validateCreateReport,
    validateUpdateReport
} = require("../validators/reportValidator");

/**
 * ============================================================================
 * Create Report
 * ============================================================================
 */

const createReport = async (req, res) => {

    try {

        /*
        ------------------------------------------------------------------------
        Validate Request
        ------------------------------------------------------------------------
        */

        const { isValid, errors } = validateCreateReport(req.body);

        if (!isValid) {

            console.log("================================");
            console.log("REPORT VALIDATION FAILED");
            console.log(errors);
            console.log("================================");

            return res.status(400).json({

                success: false,

                errors

            });

        }

        /*
        ------------------------------------------------------------------------
        Debug Request
        ------------------------------------------------------------------------
        */

        console.log("================================");
        console.log("CREATE REPORT REQUEST");
        console.log("Authenticated User:", req.user);
        console.log("Request Body:", req.body);
        console.log("================================");

        /*
        ------------------------------------------------------------------------
        Get Authenticated User ID
        ------------------------------------------------------------------------
        */

        const userId = req.user.id;

        /*
        ------------------------------------------------------------------------
        Create Report
        ------------------------------------------------------------------------
        */

        const report = await createReportService(req.body, userId);

        await createNotification({

           userId: req.user.id,

           reportId: report.id,

           title: "Report Submitted",

           message:
            "Your incident report has been received and is awaiting review."

});

        /*
        ------------------------------------------------------------------------
        Success Response
        ------------------------------------------------------------------------
        */

        console.log("================================");
        console.log("REPORT CREATED SUCCESSFULLY");
        console.log(report);
        console.log("================================");

        return res.status(201).json({

            success: true,

            message: "Incident report submitted successfully.",

            data: report

        });

    } catch (error) {

        /*
        ------------------------------------------------------------------------
        Category Not Found
        ------------------------------------------------------------------------
        */

        if (error.message === "CATEGORY_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "The selected category does not exist."

            });

        }

        /*
        ------------------------------------------------------------------------
        Unexpected Error
        ------------------------------------------------------------------------
        */

        console.error("================================");
        console.error("REPORT CONTROLLER ERROR");
        console.error(error);
        console.error("================================");

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};
/**
 * ============================================================================
 * Get All Reports
 * ============================================================================
 */

const getReports = async (req, res) => {

    try {

        console.log("================================");
        console.log("GET ALL REPORTS REQUEST");
        console.log("Authenticated User:", req.user);
        console.log("================================");

        const reports = await getAllReports();

        return res.status(200).json({

            success: true,

            count: reports.length,

            data: reports

        });

    } catch (error) {

        console.error("================================");
        console.error("GET REPORTS ERROR");
        console.error(error);
        console.error("================================");

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Get Report By ID
 * ============================================================================
 */

const getReport = async (req, res) => {

    try {

        console.log("================================");
        console.log("GET REPORT REQUEST");
        console.log("Report ID:", req.params.id);
        console.log("================================");

        const report = await getReportById(req.params.id);

        return res.status(200).json({

            success: true,

            data: report

        });

    } catch (error) {

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        console.error("================================");
        console.error("GET REPORT ERROR");
        console.error(error);
        console.error("================================");

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Update Report
 * ============================================================================
 */

const updateReport = async (req, res) => {

    try {

        /*
        ------------------------------------------------------------------------
        Validate Request
        ------------------------------------------------------------------------
        */

        const { isValid, errors } = validateUpdateReport(req.body);

        if (!isValid) {

            console.log("================================");
            console.log("UPDATE REPORT VALIDATION FAILED");
            console.log(errors);
            console.log("================================");

            return res.status(400).json({

                success: false,

                errors

            });

        }

        /*
        ------------------------------------------------------------------------
        Debug Logging
        ------------------------------------------------------------------------
        */

        console.log("================================");
        console.log("UPDATE REPORT REQUEST");
        console.log("Report ID:", req.params.id);
        console.log("User:", req.user);
        console.log("Body:", req.body);
        console.log("================================");

        /*
        ------------------------------------------------------------------------
        Update Report
        ------------------------------------------------------------------------
        */

        const report = await updateReportService(

            req.params.id,

            req.body,

            req.user.id

        );

        /*
        ------------------------------------------------------------------------
        Success Response
        ------------------------------------------------------------------------
        */

        return res.status(200).json({

            success: true,

            message: "Report updated successfully.",

            data: report

        });

    } catch (error) {

        /*
        ------------------------------------------------------------------------
        Expected Business Errors
        ------------------------------------------------------------------------
        */

        switch (error.message) {

            case "REPORT_NOT_FOUND":

                return res.status(404).json({

                    success: false,

                    message: "Report not found."

                });

            case "CATEGORY_NOT_FOUND":

                return res.status(404).json({

                    success: false,

                    message: "Category not found."

                });

            case "REPORT_NOT_OWNED":

                return res.status(403).json({

                    success: false,

                    message: "You can only update your own reports."

                });

            case "REPORT_ALREADY_PROCESSING":

                return res.status(400).json({

                    success: false,

                    message: "This report can no longer be edited."

                });

        }

        /*
        ------------------------------------------------------------------------
        Unexpected Error
        ------------------------------------------------------------------------
        */

        console.error("================================");
        console.error("UPDATE REPORT ERROR");
        console.error(error);
        console.error("================================");

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

const getMyReports = async (req, res) => {

    try {

        const reports = await getUserReports(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Reports retrieved successfully.",
            data: reports
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve reports."
        });

    }

};
/**
 * ============================================================================
 * Delete Report
 * ============================================================================
 */

const deleteReport = async (req, res) => {

    try {

        await deleteReportService(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({

            success: true,

            message: "Report deleted successfully."

        });

    } catch (error) {

        switch (error.message) {

            case "REPORT_NOT_FOUND":

                return res.status(404).json({

                    success: false,

                    message: "Report not found."

                });

            case "REPORT_NOT_OWNED":

                return res.status(403).json({

                    success: false,

                    message: "You can only delete your own reports."

                });

            case "REPORT_ALREADY_PROCESSING":

                return res.status(400).json({

                    success: false,

                    message: "This report can no longer be deleted."

                });

        }

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/*
|--------------------------------------------------------------------------
| Export Controllers
|--------------------------------------------------------------------------
*/

module.exports = {

    createReport,
    getReports,
    getReport,
    updateReport,
    deleteReport,
    getUserReports,
    getMyReports

};