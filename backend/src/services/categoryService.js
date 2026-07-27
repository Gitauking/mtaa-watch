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
/**
 * ============================================================================
 * Update Category
 * ============================================================================
 */

const updateCategory = async (categoryId, categoryData) => {

    const {
        name,
        description,
        icon
    } = categoryData;

    /*
    --------------------------------------------------------------------------
    Verify Category Exists
    --------------------------------------------------------------------------
    */

    const existingCategory = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE id = $1
        LIMIT 1;
        `,
        [categoryId]
    );

    if (existingCategory.rows.length === 0) {

        throw new Error("CATEGORY_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Check For Duplicate Category Name
    --------------------------------------------------------------------------
    */

    const duplicateCategory = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE LOWER(name) = LOWER($1)
        AND id <> $2
        LIMIT 1;
        `,
        [
            name,
            categoryId
        ]
    );

    if (duplicateCategory.rows.length > 0) {

        throw new Error("CATEGORY_ALREADY_EXISTS");

    }

    /*
    --------------------------------------------------------------------------
    Update Category
    --------------------------------------------------------------------------
    */

    const result = await pool.query(
        `
        UPDATE categories
        SET
            name = $1,
            description = $2,
            icon = $3,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
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
            icon,
            categoryId
        ]
    );

    return result.rows[0];

};
/**
 * ============================================================================
 * Delete Category
 * ============================================================================
 */

const deleteCategory = async (categoryId) => {

    /*
    --------------------------------------------------------------------------
    Verify Category Exists
    --------------------------------------------------------------------------
    */

    const existingCategory = await pool.query(
        `
        SELECT id
        FROM categories
        WHERE id = $1
        LIMIT 1;
        `,
        [categoryId]
    );

    if (existingCategory.rows.length === 0) {

        throw new Error("CATEGORY_NOT_FOUND");

    }

    /*
    --------------------------------------------------------------------------
    Check Whether Category Is In Use
    --------------------------------------------------------------------------
    */

    const reportsUsingCategory = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM reports
        WHERE category_id = $1;
        `,
        [categoryId]
    );

    if (parseInt(reportsUsingCategory.rows[0].total) > 0) {

        throw new Error("CATEGORY_IN_USE");

    }

    /*
    --------------------------------------------------------------------------
    Delete Category
    --------------------------------------------------------------------------
    */

    const result = await pool.query(
        `
        DELETE FROM categories
        WHERE id = $1
        RETURNING
            id,
            name,
            description,
            icon;
        `,
        [categoryId]
    );

    return result.rows[0];

};


module.exports = {

    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};