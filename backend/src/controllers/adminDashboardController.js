const {
    getDashboardStatistics
} = require("../services/adminDashboardService");

/**
 * ============================================================================
 * Get Dashboard Statistics
 * ============================================================================
 */

const getDashboard = async (req, res) => {

    try {

        console.log("================================");
        console.log("ADMIN DASHBOARD");
        console.log("Fetching dashboard statistics...");
        console.log("================================");

        /*
        ----------------------------------------------------------------------
        Fetch Dashboard Statistics
        ----------------------------------------------------------------------
        */

        const statistics = await getDashboardStatistics();

        /*
        ----------------------------------------------------------------------
        Success Response
        ----------------------------------------------------------------------
        */

        return res.status(200).json({

            success: true,

            message: "Dashboard statistics retrieved successfully.",

            data: statistics

        });

    }
    catch (error) {

        console.error("================================");
        console.error("ADMIN DASHBOARD ERROR");
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

    getDashboard

};