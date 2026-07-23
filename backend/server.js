/**
 * ============================================================================
 * server.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Entry point of the backend.
 *
 * Responsibilities:
 * - Load environment variables
 * - Import the Express app
 * - Start the HTTP server
 *
 * ============================================================================
 */

require("dotenv").config();

const app = require("./src/app");

require("./src/config/database");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("========================================");
    console.log(" Mtaa Watch Backend Started");
    console.log("========================================");
    console.log(` Server running on port ${PORT}`);
    console.log(` http://localhost:${PORT}`);
    console.log("========================================");
});