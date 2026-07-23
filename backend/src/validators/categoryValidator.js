/**
 * ============================================================================
 * categoryValidator.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Validates category-related requests.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * Validate Create Category
 * ============================================================================
 */

const validateCreateCategory = (data) => {

    const errors = {};

    /*
    --------------------------------------------------------------------------
    Name Validation
    --------------------------------------------------------------------------
    */

    if (!data.name || data.name.trim() === "") {

        errors.name = "Category name is required.";

    } else if (data.name.length > 100) {

        errors.name = "Category name cannot exceed 100 characters.";

    }

    /*
    --------------------------------------------------------------------------
    Description Validation
    --------------------------------------------------------------------------
    */

    if (!data.description || data.description.trim() === "") {

        errors.description = "Category description is required.";

    }

    /*
    --------------------------------------------------------------------------
    Icon Validation
    --------------------------------------------------------------------------
    */

    if (!data.icon || data.icon.trim() === "") {

        errors.icon = "Category icon is required.";

    }

    return {

        isValid: Object.keys(errors).length === 0,
        errors

    };

};

module.exports = {

    validateCreateCategory

};