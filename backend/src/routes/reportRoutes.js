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
    deleteReport
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

router.get("/:id", authenticateUser, getReport);

router.put("/:id", authenticateUser, updateReport);

router.delete("/:id", authenticateUser, deleteReport);

module.exports = router;