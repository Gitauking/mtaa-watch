const express = require("express");

const router = express.Router();

const {
    getReports,
    getReport,
    updateStatus,
    deleteReport
} = require("../controllers/adminReportController");

const {
    authenticateUser
} = require("../middleware/authMiddleware");

const {
    authorizeAdmin
} = require("../middleware/roleMiddleware");


/**
 * ============================================================================
 * Admin Report Routes
 * ============================================================================
 */

// GET /api/admin/reports/:id
// GET /api/admin/reports
router.get(
    "/reports",
    authenticateUser,
    authorizeAdmin,
    getReports
);

router.get(
    "/reports/:id",
    authenticateUser,
    authorizeAdmin,
    getReport
);

// PATCH /api/admin/reports/:id/status
router.patch(
    "/reports/:id/status",
    authenticateUser,
    authorizeAdmin,
    updateStatus
);
// DELETE /api/admin/reports/:id
router.delete(
    "/reports/:id",
    authenticateUser,
    authorizeAdmin,
    deleteReport
);

module.exports = router;