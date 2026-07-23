/**
 * ============================================================================
 * authMiddleware.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Protects routes by verifying JWT access tokens.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Read the Authorization header.
 * - Verify the JWT.
 * - Attach the authenticated user to req.user.
 * - Block unauthorized requests.
 *
 * ============================================================================
 */

const jwt = require("jsonwebtoken");

/**
 * ============================================================================
 * Authenticate User
 * ============================================================================
 */

const authenticateUser = (req, res, next) => {

    /*
    --------------------------------------------------------------------------
    Get Authorization Header
    --------------------------------------------------------------------------
    */

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            success: false,

            message: "Authorization header is missing."

        });

    }

    /*
    --------------------------------------------------------------------------
    Expected Format

    Authorization: Bearer <token>

    --------------------------------------------------------------------------
    */

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {

        return res.status(401).json({

            success: false,

            message: "Invalid authorization format."

        });

    }

    const token = parts[1];

    /*
    --------------------------------------------------------------------------
    Verify JWT
    --------------------------------------------------------------------------
    */

    try {

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        /*
        ----------------------------------------------------------------------
        Attach user to request
        ----------------------------------------------------------------------
        */

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Invalid or expired token."

        });

    }

};

module.exports = {
    authenticateUser
};