/**
 * ============================================================================
 * authController.js
 * ============================================================================
 *
 * Handles authentication and account management requests.
 * ============================================================================
 */

const {
    registerUser,
    loginUser,
    getProfile: getProfileService,
    updateProfile: updateProfileService,
    changePassword: changePasswordService
} = require("../services/authService");

const {
    validateRegistration,
    validateLogin
} = require("../validators/authValidator");

/**
 * ============================================================================
 * Register User
 * ============================================================================
 */

const register = async (req, res) => {

    try {

        const validation = validateRegistration(req.body);

        if (!validation.isValid) {

            return res.status(400).json({

                success: false,

                message: "Validation failed.",

                errors: validation.errors

            });

        }

        const user = await registerUser(req.body);

        return res.status(201).json({

            success: true,

            message: "User registered successfully.",

            data: user

        });

    } catch (error) {

        if (

            error.message === "Email address already exists." ||

            error.message === "Phone number already exists."

        ) {

            return res.status(409).json({

                success: false,

                message: error.message

            });

        }

        console.error("Registration Error:", error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Login User
 * ============================================================================
 */

const login = async (req, res) => {

    console.log("Login request received");

    console.log(req.body);

    try {

        const validation = validateLogin(req.body);

        if (!validation.isValid) {

            return res.status(400).json({

                success: false,

                message: "Validation failed.",

                errors: validation.errors

            });

        }

        const result = await loginUser(req.body);

        return res.status(200).json({

            success: true,

            message: "Login successful.",

            token: result.token,

            user: result.user

        });

    } catch (error) {

        if (error.message === "Invalid email or password.") {

            return res.status(401).json({

                success: false,

                message: error.message

            });

        }

        console.error("Login Error:", error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Get Logged-in User Profile
 * ============================================================================
 */

const getProfile = async (req, res) => {

    try {

        console.log("================================");

        console.log("GET PROFILE");

        console.log("User:", req.user.id);

        console.log("================================");

        const profile = await getProfileService(req.user.id);

        return res.status(200).json({

            success: true,

            message: "Profile retrieved successfully.",

            data: profile

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * ============================================================================
 * Update Profile
 * ============================================================================
 */

const updateProfile = async (req, res) => {

    try {

        console.log("================================");

        console.log("UPDATE PROFILE");

        console.log("User:", req.user.id);

        console.log("================================");

        const updatedUser = await updateProfileService(

            req.user.id,

            req.body

        );

        return res.status(200).json({

            success: true,

            message: "Profile updated successfully.",

            data: updatedUser

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

/**
 * ============================================================================
 * Change Password
 * ============================================================================
 */

const changePassword = async (req, res) => {

    try {

        console.log("================================");

        console.log("CHANGE PASSWORD");

        console.log("User:", req.user.id);

        console.log("================================");

        const {

            currentPassword,

            newPassword

        } = req.body;

        await changePasswordService(

            req.user.id,

            currentPassword,

            newPassword

        );

        return res.status(200).json({

            success: true,

            message: "Password changed successfully."

        });

    } catch (error) {

        console.error(error);

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

/*
|--------------------------------------------------------------------------
| Export Controllers
|--------------------------------------------------------------------------
*/

module.exports = {

    register,

    login,

    getProfile,

    updateProfile,

    changePassword

};