const express = require("express");

const router = express.Router();

const {
    getDashboard
} = require("../controllers/adminDashboardController");

const {
    authenticateUser
} = require("../middleware/authMiddleware");

const {
    authorizeAdmin
} = require("../middleware/roleMiddleware");

/**
 * ============================================================================
 * Admin Dashboard Routes
 * ============================================================================
 */

// GET /api/admin/dashboard
router.get(
    "/dashboard",
    authenticateUser,
    authorizeAdmin,
    getDashboard
);

module.exports = router;