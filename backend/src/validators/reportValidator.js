/**
 * ============================================================================
 * reportValidator.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Validates report-related requests before they reach the service layer.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Validate required fields.
 * - Ensure data formats are correct.
 * - Return validation errors.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * Validate Create Report
 * ============================================================================
 */

const validateCreateReport = (data) => {

    const errors = {};

    /*
    --------------------------------------------------------------------------
    Category Validation
    --------------------------------------------------------------------------
    */

    if (!data.categoryId || data.categoryId.trim() === "") {

        errors.categoryId = "Category is required.";

    }

    /*
    --------------------------------------------------------------------------
    Title Validation
    --------------------------------------------------------------------------
    */

    if (!data.title || data.title.trim() === "") {

        errors.title = "Report title is required.";

    } else if (data.title.trim().length < 5) {

        errors.title = "Report title must be at least 5 characters.";

    } else if (data.title.trim().length > 150) {

        errors.title = "Report title cannot exceed 150 characters.";

    }

    /*
    --------------------------------------------------------------------------
    Description Validation
    --------------------------------------------------------------------------
    */

    if (!data.description || data.description.trim() === "") {

        errors.description = "Description is required.";

    } else if (data.description.trim().length < 10) {

        errors.description = "Description must be at least 10 characters.";

    }

    /*
    --------------------------------------------------------------------------
    Latitude Validation
    --------------------------------------------------------------------------
    */

    if (data.latitude === undefined || data.latitude === null) {

        errors.latitude = "Latitude is required.";

    } else if (
        isNaN(data.latitude) ||
        Number(data.latitude) < -90 ||
        Number(data.latitude) > 90
    ) {

        errors.latitude = "Latitude must be between -90 and 90.";

    }

    /*
    --------------------------------------------------------------------------
    Longitude Validation
    --------------------------------------------------------------------------
    */

    if (data.longitude === undefined || data.longitude === null) {

        errors.longitude = "Longitude is required.";

    } else if (
        isNaN(data.longitude) ||
        Number(data.longitude) < -180 ||
        Number(data.longitude) > 180
    ) {

        errors.longitude = "Longitude must be between -180 and 180.";

    }

    /*
    --------------------------------------------------------------------------
    Location Name Validation
    --------------------------------------------------------------------------
    */

    if (!data.locationName || data.locationName.trim() === "") {

        errors.locationName = "Location name is required.";

    } else if (data.locationName.trim().length > 255) {

        errors.locationName = "Location name cannot exceed 255 characters.";

    }

    /*
    --------------------------------------------------------------------------
    Validation Result
    --------------------------------------------------------------------------
    */

    return {

        isValid: Object.keys(errors).length === 0,

        errors

    };

};
/**
 * ============================================================================
 * Validate Update Report
 * ============================================================================
 */

const validateUpdateReport = (data) => {

    // Reuse the same validation rules
    return validateCreateReport(data);

};

/*
|--------------------------------------------------------------------------
| Export Validators
|--------------------------------------------------------------------------
*/

module.exports = {

    validateCreateReport,
    validateUpdateReport

};