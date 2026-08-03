/**
 * ============================================================================
 * authRoutes.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Defines all authentication-related API endpoints.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Map HTTP requests to controller functions.
 * - Keep routing logic separate from business logic.
 *
 * ENDPOINTS
 * ---------
 * POST   /register
 * POST   /login
 * GET    /profile
 * PUT    /profile
 *
 * ============================================================================
 */

const { authenticateUser } = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {

    register,

    login,

    getProfile,

    updateProfile,

    changePassword

} = require("../controllers/authController");
/**
 * ============================================================================
 * Public Routes
 * ============================================================================
 */
console.log("register:", typeof register);
console.log("login:", typeof login);
console.log("getProfile:", typeof getProfile);
console.log("authenticateUser:", typeof authenticateUser);

// Register a new user
router.post("/register", register);

// Login an existing user
router.post("/login", login);



/**
 * ============================================================================
 * Protected Routes
 * ============================================================================
 *
 * These will be implemented after we create the JWT middleware.
 */

router.get("/profile", authenticateUser, getProfile);

// router.put("/profile", authenticateUser, updateProfile);

/**
 * ============================================================================
 * Update Logged-in User Profile
 * ============================================================================
 */

router.put(

    "/profile",

    authenticateUser,

    updateProfile

);

/**
 * ============================================================================
 * Change Logged-in User Password
 * ============================================================================
 */

router.put(

    "/change-password",

    authenticateUser,

    changePassword

);

module.exports = router;