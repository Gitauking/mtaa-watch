/**
 * ============================================================================
 * reportRoutes.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Defines all report-related API endpoints.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Map HTTP requests to controller functions.
 * - Apply authentication middleware.
 * - Keep routing separate from business logic.
 *
 * ENDPOINTS
 * ---------
 * POST   /              Create a new report
 * GET    /              Get all reports
 * GET    /:id           Get a single report
 * PUT    /:id           Update a report
 * DELETE /:id           Delete (soft delete) a report
 *
 * ============================================================================
 */

const express = require("express");

const router = express.Router();

const {
    authenticateUser
} = require("../middleware/authMiddleware");

const {
    createReport,
    getReports,
    getReport,
    updateReport,
    deleteReport,
    getMyReports,
    getDashboard
} = require("../controllers/reportController");

/**
 * ============================================================================
 * Protected Routes
 * ============================================================================
 */

/*
|--------------------------------------------------------------------------
| Create Report
|--------------------------------------------------------------------------
|
| Only authenticated users can submit reports.
|
*/

router.post(
    "/",
    authenticateUser,
    createReport
);

/**
 * ============================================================================
 * Future Routes
 * ============================================================================
 */

router.get("/", authenticateUser, getReports);

router.get("/my-reports", authenticateUser, getMyReports);
router.get(

    "/dashboard",

    authenticateUser,

    getDashboard

);

router.get("/:id", authenticateUser, getReport);

/**
 * ============================================================================
 * Dashboard Summary
 * ============================================================================
 *
 * Returns dashboard statistics and recent reports for the logged-in user.
 * ============================================================================
 */


router.put("/:id", authenticateUser, updateReport);

router.delete("/:id", authenticateUser, deleteReport);

module.exports = router;