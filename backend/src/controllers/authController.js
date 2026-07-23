/**
 * ============================================================================
 * authController.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Handles incoming authentication HTTP requests.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Receive client requests
 * - Validate request data
 * - Call authentication services
 * - Return HTTP responses
 *
 * This controller should NEVER contain business logic.
 * ============================================================================
 */

const {
    registerUser,
    loginUser
} = require("../services/authService");

const {
    validateRegistration,
    validateLogin
} = require("../validators/authValidator");

/**
 * ============================================================================
 * Register User Controller
 * ============================================================================
 */

const register = async (req, res) => {

    try {

        /*
        -----------------------------------------------------------------------
        Validate Request
        -----------------------------------------------------------------------
        */

        const validation = validateRegistration(req.body);

        if (!validation.isValid) {

            return res.status(400).json({

                success: false,

                message: "Validation failed.",

                errors: validation.errors

            });

        }

        /*
        -----------------------------------------------------------------------
        Register User
        -----------------------------------------------------------------------
        */

        const user = await registerUser(req.body);

        /*
        -----------------------------------------------------------------------
        Success Response
        -----------------------------------------------------------------------
        */

        return res.status(201).json({

            success: true,

            message: "User registered successfully.",

            data: user

        });

    } catch (error) {

        /*
        -----------------------------------------------------------------------
        Handle Expected Errors
        -----------------------------------------------------------------------
        */

        if (
            error.message === "Email address already exists." ||
            error.message === "Phone number already exists."
        ) {

            return res.status(409).json({

                success: false,

                message: error.message

            });

        }

        /*
        -----------------------------------------------------------------------
        Unexpected Error
        -----------------------------------------------------------------------
        */

        console.error("Registration Error:", error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Login Controller
 * ============================================================================
 *
 * Placeholder implementation.
 *  build the login functionality next.
 * ============================================================================
 */

/**
 * ============================================================================
 * Login Controller
 * ============================================================================
 */

const login = async (req, res) => {
    console.log("Login request received");
    console.log(req.body);
    try {

        /*
        -----------------------------------------------------------------------
        Validate Request
        -----------------------------------------------------------------------
        */

        const validation = validateLogin(req.body);

        if (!validation.isValid) {

            return res.status(400).json({

                success: false,

                message: "Validation failed.",

                errors: validation.errors

            });

        }

        /*
        -----------------------------------------------------------------------
        Authenticate User
        -----------------------------------------------------------------------
        */

        const result = await loginUser(req.body);

        /*
        -----------------------------------------------------------------------
        Success Response
        -----------------------------------------------------------------------
        */

        return res.status(200).json({

            success: true,

            message: "Login successful.",

            token: result.token,

            user: result.user

        });

    } catch (error) {

        /*
        -----------------------------------------------------------------------
        Invalid Credentials
        -----------------------------------------------------------------------
        */

        if (error.message === "Invalid email or password.") {

            return res.status(401).json({

                success: false,

                message: error.message

            });

        }

        /*
        -----------------------------------------------------------------------
        Unexpected Error
        -----------------------------------------------------------------------
        */

        console.error("Login Error:", error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/*
|--------------------------------------------------------------------------
| Export Controllers
|--------------------------------------------------------------------------
*/

const getProfile = async (req, res) => {

    return res.status(200).json({

        success: true,

        message: "Authenticated user.",

        user: req.user

    });
}


module.exports = {

    register,

    login,

    getProfile

};
/**
 * ============================================================================
 * Current User Profile
 * ============================================================================
 */