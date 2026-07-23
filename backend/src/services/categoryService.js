/**
 * ============================================================================
 * categoryService.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Handles all category-related business logic.
 *
 * ============================================================================
 */

const pool = require("../config/database");

/**
 * ============================================================================
 * Get All Active Categories
 * ============================================================================
 */

const getAllCategories = async () => {

    const query = `
        SELECT
            id,
            name,
            description,
            icon,
            is_active,
            created_at,
            updated_at
        FROM categories
        WHERE is_active = TRUE
        ORDER BY name ASC;
    `;

    const result = await pool.query(query);

    return result.rows;

};
/**
 * ============================================================================
 * Get Category By ID
 * ============================================================================
 */

const getCategoryById = async (categoryId) => {

    const query = `
        SELECT
            id,
            name,
            description,
            icon,
            is_active,
            created_at,
            updated_at
        FROM categories
        WHERE id = $1
        LIMIT 1;
    `;

    const result = await pool.query(query, [categoryId]);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];

};
/**
 * ============================================================================
 * Create Category
 * ============================================================================
 */

const createCategory = async (categoryData) => {

    const {
        name,
        description,
        icon
    } = categoryData;

    /*
    --------------------------------------------------------------------------
    Check for Existing Category
    --------------------------------------------------------------------------
    */

    const existingCategory = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE LOWER(name) = LOWER($1)
        LIMIT 1;
        `,
        [name]
    );

    if (existingCategory.rows.length > 0) {

        throw new Error("CATEGORY_ALREADY_EXISTS");

    }

    /*
    --------------------------------------------------------------------------
    Insert Category
    --------------------------------------------------------------------------
    */

    const result = await pool.query(
        `
        INSERT INTO categories
        (
            name,
            description,
            icon
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING
            id,
            name,
            description,
            icon,
            is_active,
            created_at,
            updated_at;
        `,
        [
            name,
            description,
            icon
        ]
    );

    return result.rows[0];

};

module.exports = {

    getAllCategories,
    getCategoryById,
    createCategory
};
