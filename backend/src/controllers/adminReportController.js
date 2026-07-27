const {
    getAllReports,
    getReportById,
    updateReportStatus,
    deleteReport: deleteReportService
} = require("../services/adminReportService");

/**
 * ============================================================================
 * Get All Reports (Admin)
 * ============================================================================
 */

const getReports = async (req, res) => {

    try {

        /*
        ----------------------------------------------------------------------
        Extract Query Parameters
        ----------------------------------------------------------------------
        */

        const filters = {

            page: req.query.page,
            limit: req.query.limit,
            status: req.query.status,
            category: req.query.category,
            search: req.query.search,
            sort: req.query.sort

        };

        console.log("================================");
        console.log("ADMIN GET REPORTS");
        console.log("Filters:", filters);
        console.log("================================");

        /*
        ----------------------------------------------------------------------
        Fetch Reports
        ----------------------------------------------------------------------
        */

        const result = await getAllReports(filters);

        /*
        ----------------------------------------------------------------------
        Success Response
        ----------------------------------------------------------------------
        */

        return res.status(200).json({

            success: true,

            message: "Reports retrieved successfully.",

            data: result.reports,

            pagination: result.pagination

        });

    }
    catch (error) {

        console.error("================================");
        console.error("ADMIN GET REPORTS ERROR");
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
 * Get Report By ID (Admin)
 * ============================================================================
 */

const getReport = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("================================");
        console.log("ADMIN GET REPORT");
        console.log("Report ID:", id);
        console.log("================================");

        const report = await getReportById(id);

        return res.status(200).json({

            success: true,

            message: "Report retrieved successfully.",

            data: report

        });

    }
    catch (error) {

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        console.error("================================");
        console.error("ADMIN GET REPORT ERROR");
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
 * Update Report Status (Admin)
 * ============================================================================
 */

const updateStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status } = req.body;

        console.log("================================");
        console.log("ADMIN UPDATE REPORT STATUS");
        console.log("Report ID:", id);
        console.log("Status:", status);
        console.log("================================");

        const report = await updateReportStatus(

            id,

            status

        );

        return res.status(200).json({

            success: true,

            message: "Report status updated successfully.",

            data: report

        });

    }
    catch (error) {

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        if (error.message === "INVALID_STATUS") {

            return res.status(400).json({

                success: false,

                message: "Invalid report status."

            });

        }

        console.error("================================");
        console.error("UPDATE REPORT STATUS ERROR");
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
 * Delete Report (Admin)
 * ============================================================================
 */

const deleteReport = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("================================");
        console.log("ADMIN DELETE REPORT");
        console.log("Report ID:", id);
        console.log("================================");

        const report = await deleteReportService(id);

        return res.status(200).json({

            success: true,

            message: "Report deleted successfully.",

            data: report

        });

    }
    catch (error) {

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        console.error("================================");
        console.error("DELETE REPORT ERROR");
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
 * Exports
 * ============================================================================
 */

module.exports = {

    getReports,
    getReport,
    updateStatus,
    deleteReport

};