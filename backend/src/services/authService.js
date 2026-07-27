/**
 * ============================================================================
 * authService.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Contains all authentication business logic.
 *
 * RESPONSIBILITIES
 * ----------------
 * - Register users
 * - Login users
 * - Hash passwords
 * - Compare passwords
 * - Generate JWT tokens
 *
 * This layer communicates directly with PostgreSQL.
 * ============================================================================
 */

const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

/**
 * ============================================================================
 * Check if Email Exists
 * ============================================================================
 */
const emailExists = async (email) => {

    const query = `
        SELECT id
        FROM users
        WHERE email = $1
        LIMIT 1;
    `;

    const result = await pool.query(query, [email.toLowerCase()]);
    console.log("Login email:", email.toLowerCase());
console.log("Rows found:", result.rows.length);
console.log("User:", result.rows[0]);

    return result.rows.length > 0;
};

/**
 * ============================================================================
 * Check if Phone Exists
 * ============================================================================
 */
const phoneExists = async (phone) => {

    const query = `
        SELECT id
        FROM users
        WHERE phone = $1
        LIMIT 1;
    `;

    const result = await pool.query(query, [phone]);

    return result.rows.length > 0;
};

/**
 * ============================================================================
 * Register User
 * ============================================================================
 */
const registerUser = async (userData) => {

    const {
        firstName,
        lastName,
        email,
        password
    } = userData;

    /*
    --------------------------------------------------------------------------
    Check duplicate email
    --------------------------------------------------------------------------
    */

    if (await emailExists(email)) {

        throw new Error("Email address already exists.");

    }

    /*
    --------------------------------------------------------------------------
    Hash password
    --------------------------------------------------------------------------
    */

    const passwordHash = await bcrypt.hash(
        password,
        SALT_ROUNDS
    );

    /*
    --------------------------------------------------------------------------
    Insert user
    --------------------------------------------------------------------------
    */

    const query = `
        INSERT INTO users
        (
            first_name,
            last_name,
            email,
            phone,
            password_hash
        )
        VALUES
        (
            $1,
            $2,
            $3,
            NULL,
            $4
        )
        RETURNING
            id,
            first_name,
            last_name,
            email,
            phone,
            role,
            created_at;
    `;

    const values = [

        firstName,

        lastName,

        email.toLowerCase(),

        passwordHash

    ];

    const result = await pool.query(
        query,
        values
    );

    return result.rows[0];

};

/**
 * ============================================================================
 * Login User
 * ============================================================================
 */
const loginUser = async (loginData) => {

    const { email, password } = loginData;

    /*
    --------------------------------------------------------------------------
    Find user by email
    --------------------------------------------------------------------------
    */

    const query = `
        SELECT
            id,
            first_name,
            last_name,
            email,
            password_hash,
            role
        FROM users
        WHERE email = $1;
    `;

    const result = await pool.query(query, [email.toLowerCase()]);

console.log("================================");
console.log("LOGIN DEBUG");
console.log("Email:", email.toLowerCase());
console.log("Rows Found:", result.rows.length);

if (result.rows.length > 0) {
    console.log("Database User:", result.rows[0]);
}
console.log("================================");
    /*
    --------------------------------------------------------------------------
    User not found
    --------------------------------------------------------------------------
    */

    if (result.rows.length === 0) {
        throw new Error("Invalid email or password.");
    }

    const user = result.rows[0];

    /*
    --------------------------------------------------------------------------
    Compare password
    --------------------------------------------------------------------------
    */

    const passwordMatches = await bcrypt.compare(
        password,
        user.password_hash
    );
    console.log("Password Entered:", password);
    console.log("Stored Hash:", user.password_hash);
    console.log("Password Matches:", passwordMatches);

    if (!passwordMatches) {
        throw new Error("Invalid email or password.");
    }

    /*
    --------------------------------------------------------------------------
    Generate JWT
    --------------------------------------------------------------------------
    */

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    /*
    --------------------------------------------------------------------------
    Remove password hash before returning
    --------------------------------------------------------------------------
    */

    delete user.password_hash;

    return {
        token,
        user
    };
};

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

module.exports = {
    registerUser,
    loginUser
};