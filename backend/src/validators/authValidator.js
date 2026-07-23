/**
 * ============================================================================
 * authValidator.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Contains validation functions for authentication requests.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Validate user registration input.
 * - Validate user login input.
 * - Return validation errors in a consistent format.
 *
 * WHAT THIS FILE SHOULD NOT DO
 * ----------------------------
 * - Connect to the database.
 * - Check whether an email already exists.
 * - Hash passwords.
 * - Generate JWT tokens.
 *
 * Those responsibilities belong to the service layer.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * Validate Registration Data
 * ============================================================================
 *
 * Validates the information supplied during user registration.
 *
 * Returns:
 *
 * {
 *      isValid: Boolean,
 *      errors: Array
 * }
 *
 * ============================================================================
 */

const validateRegistration = (data) => {

    const errors = [];

    /*
    --------------------------------------------------------------------------
    Destructure request body.
    --------------------------------------------------------------------------
    */

    const {
        firstName,
        lastName,
        email,
        phone,
        password
    } = data;

    /*
    --------------------------------------------------------------------------
    First Name
    --------------------------------------------------------------------------
    */

    if (!firstName || firstName.trim() === "") {

        errors.push("First name is required.");

    } else if (firstName.trim().length < 2) {

        errors.push("First name must contain at least 2 characters.");

    } else if (firstName.trim().length > 100) {

        errors.push("First name cannot exceed 100 characters.");

    }

    /*
    --------------------------------------------------------------------------
    Last Name
    --------------------------------------------------------------------------
    */

    if (!lastName || lastName.trim() === "") {

        errors.push("Last name is required.");

    } else if (lastName.trim().length < 2) {

        errors.push("Last name must contain at least 2 characters.");

    } else if (lastName.trim().length > 100) {

        errors.push("Last name cannot exceed 100 characters.");

    }

    /*
    --------------------------------------------------------------------------
    Email
    --------------------------------------------------------------------------
    */

    if (!email || email.trim() === "") {

        errors.push("Email address is required.");

    } else {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {

            errors.push("Please enter a valid email address.");

        }

    }

    /*
    --------------------------------------------------------------------------
    Kenyan Phone Number
    --------------------------------------------------------------------------
    */

    if (!phone || phone.trim() === "") {

        errors.push("Phone number is required.");

    } else {

        /*
        Accepts:

        +254712345678

        254712345678

        0712345678
        */

        const phoneRegex =
            /^(\+254|254|0)[17]\d{8}$/;

        if (!phoneRegex.test(phone.trim())) {

            errors.push("Please enter a valid Kenyan phone number.");

        }

    }

    /*
    --------------------------------------------------------------------------
    Password
    --------------------------------------------------------------------------
    */

    if (!password) {

        errors.push("Password is required.");

    } else if (password.length < 8) {

        errors.push("Password must contain at least 8 characters.");

    }

    /*
    --------------------------------------------------------------------------
    Return Validation Result
    --------------------------------------------------------------------------
    */

    return {

        isValid: errors.length === 0,

        errors

    };

};

/**
 * ============================================================================
 * Validate Login Data
 * ============================================================================
 */

const validateLogin = (data) => {

    const errors = [];

    const {

        email,

        password

    } = data;

    /*
    --------------------------------------------------------------------------
    Email
    --------------------------------------------------------------------------
    */

    if (!email || email.trim() === "") {

        errors.push("Email address is required.");

    }

    /*
    --------------------------------------------------------------------------
    Password
    --------------------------------------------------------------------------
    */

    if (!password) {

        errors.push("Password is required.");

    }

    return {

        isValid: errors.length === 0,

        errors

    };

};

/*
|--------------------------------------------------------------------------
| Export Validation Functions
|--------------------------------------------------------------------------
*/

module.exports = {

    validateRegistration,

    validateLogin

};