/**
 * ============================================================================
 * categoryRoutes.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Defines all category-related API endpoints.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Map HTTP requests to controller functions.
 * - Keep routing logic separate from business logic.
 *
 * ENDPOINTS
 * ---------
 * GET    /              Get all categories
 * GET    /:id           Get a single category
 * POST   /              Create category (Admin)
 * PUT    /:id           Update category (Admin)
 * DELETE /:id           Disable category (Admin)
 *
 * ============================================================================
 */
const { authenticateUser } = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/roleMiddleware");



const express = require("express");

const router = express.Router();

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");
console.log("authenticateUser:", typeof authenticateUser);
console.log("authorizeAdmin:", typeof authorizeAdmin);
console.log("createCategory:", typeof createCategory);
/**
 * ============================================================================
 * Public Routes
 * ============================================================================
 */

// Get all active categories
router.get("/", getCategories);
// Get a single category by ID
router.get("/:id", getCategory);

/**
 * ============================================================================
 * Protected Admin Routes
 * ============================================================================
 *
 * These will be implemented later after we create
 * role-based authorization middleware.
 */

// router.get("/:id", getCategoryById);

 router.post("/", authenticateUser, authorizeAdmin, createCategory);

router.put("/:id", authenticateUser, authorizeAdmin, updateCategory);

router.delete("/:id", authenticateUser, authorizeAdmin, deleteCategory);

module.exports = router;