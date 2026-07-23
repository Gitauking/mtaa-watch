/**
 * ============================================================================
 * categoryController.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Handles all category-related HTTP requests.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Receive requests from the client.
 * - Call the category service.
 * - Return HTTP responses.
 * - Handle unexpected errors.
 *
 * This controller should NEVER contain SQL queries.
 * ============================================================================
 */

const {
    getAllCategories,
    getCategoryById,
    createCategory: createCategoryService
} = require("../services/categoryService");

/**
 * ============================================================================
 * Get All Categories
 * ============================================================================
 */
const {
    validateCreateCategory
} = require("../validators/categoryValidator");

const getCategories = async (req, res) => {

    try {

        /*
        ----------------------------------------------------------------------
        Retrieve Categories
        ----------------------------------------------------------------------
        */

        const categories = await getAllCategories();

        /*
        ----------------------------------------------------------------------
        Debug Logging
        ----------------------------------------------------------------------
        */

        console.log("================================");
        console.log("GET ALL CATEGORIES");
        console.log("Categories Found:", categories.length);
        console.log(categories);
        console.log("================================");

        /*
        ----------------------------------------------------------------------
        Success Response
        ----------------------------------------------------------------------
        */

        return res.status(200).json({

            success: true,

            message: "Categories retrieved successfully.",

            count: categories.length,

            data: categories

        });

    } catch (error) {

        /*
        ----------------------------------------------------------------------
        Unexpected Error
        ----------------------------------------------------------------------
        */

        console.error("================================");
        console.error("CATEGORY CONTROLLER ERROR");
        console.error(error);
        console.error("================================");

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Get Category By ID
 * ============================================================================
 */

const getCategory = async (req, res) => {

    try {

        const { id } = req.params;

        console.log("================================");
        console.log("GET CATEGORY BY ID");
        console.log("Category ID:", id);
        console.log("================================");

        const category = await getCategoryById(id);

        if (!category) {

            return res.status(404).json({

                success: false,

                message: "Category not found."

            });

        }

        return res.status(200).json({

            success: true,

            message: "Category retrieved successfully.",

            data: category

        });

    } catch (error) {

        console.error("================================");
        console.error("CATEGORY CONTROLLER ERROR");
        console.error(error);
        console.error("================================");

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

/**
 * ============================================================================
 * Create Category
 * ============================================================================
 */

const createCategory = async (req, res) => {

    try {

        /*
        ------------------------------------------------------------------------
        Validate Request
        ------------------------------------------------------------------------
        */

        const { isValid, errors } = validateCreateCategory(req.body);

        if (!isValid) {

            console.log("================================");
            console.log("CATEGORY VALIDATION FAILED");
            console.log(errors);
            console.log("================================");

            return res.status(400).json({

                success: false,

                errors

            });

        }

        /*
        ------------------------------------------------------------------------
        Debug Request
        ------------------------------------------------------------------------
        */

        console.log("================================");
        console.log("CREATE CATEGORY REQUEST");
        console.log("User:", req.user);
        console.log("Body:", req.body);
        console.log("================================");

        /*
        ------------------------------------------------------------------------
        Create Category
        ------------------------------------------------------------------------
        */

        const category = await createCategoryService(req.body);

        /*
        ------------------------------------------------------------------------
        Success Response
        ------------------------------------------------------------------------
        */

        console.log("================================");
        console.log("CATEGORY CREATED");
        console.log(category);
        console.log("================================");

        return res.status(201).json({

            success: true,

            message: "Category created successfully.",

            data: category

        });

    } catch (error) {

        /*
        ------------------------------------------------------------------------
        Duplicate Category
        ------------------------------------------------------------------------
        */

        if (error.message === "CATEGORY_ALREADY_EXISTS") {

            return res.status(409).json({

                success: false,

                message: "A category with that name already exists."

            });

        }

        /*
        ------------------------------------------------------------------------
        Unexpected Error
        ------------------------------------------------------------------------
        */

        console.error("================================");
        console.error("CREATE CATEGORY ERROR");
        console.error(error);
        console.error("================================");

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

module.exports = {

    getCategories,
    getCategory,
    createCategory

};