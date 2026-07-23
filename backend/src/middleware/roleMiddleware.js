/**
 * ============================================================================
 * roleMiddleware.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Handles role-based authorization.
 *
 * This middleware is executed AFTER authenticateUser().
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * Authorize Admin
 * ============================================================================
 */

const authorizeAdmin = (req, res, next) => {

    console.log("================================");
    console.log("AUTHORIZE ADMIN");
    console.log("Authenticated User:", req.user);
    console.log("================================");

    // Safety check
    if (!req.user) {

        return res.status(401).json({

            success: false,
            message: "Authentication required."

        });

    }

    // Check user role
    if (req.user.role !== "admin") {

        return res.status(403).json({

            success: false,
            message: "Access denied. Administrator privileges required."

        });

    }

    next();

};

module.exports = {

    authorizeAdmin

};