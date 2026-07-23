/**
 * ============================================================================
 * database.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Creates and exports a PostgreSQL connection pool.
 *
 * WHY A CONNECTION POOL?
 * ----------------------
 * Creating a new database connection for every request is expensive.
 * A connection pool keeps a set of open connections that can be reused,
 * making the application much faster and more efficient.
 *
 * Every controller and service in the application will use this same pool.
 * ============================================================================
 */

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

/**
 * Test the database connection.
 */
pool.connect()
    .then(client => {
        console.log("========================================");
        console.log(" PostgreSQL Connected Successfully");
        console.log(" Database:", process.env.DB_NAME);
        console.log("========================================");

        client.release();
    })
    .catch(error => {
        console.error("========================================");
        console.error(" Database Connection Failed");
        console.error(error.message);
        console.error("========================================");
    });

module.exports = pool;