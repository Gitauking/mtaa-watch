/**
 * ============================================================================
 * app.js
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Configures the Express application.
 *
 * This file is responsible for:
 * - Creating the Express app
 * - Registering middleware
 * - Defining global routes
 *
 * It DOES NOT start the server.
 * That responsibility belongs to server.js.
 *
 * ============================================================================
 */
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Create the Express application
const app = express();

/**
 * ============================================================================
 * Global Middleware
 * ============================================================================
 */

// Enables Cross-Origin Resource Sharing
app.use(cors());

// Adds common HTTP security headers
app.use(helmet());

// Logs incoming HTTP requests
app.use(morgan("dev"));

// Allows Express to parse JSON request bodies
app.use(express.json());

// Allows Express to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
/**
 * ============================================================================
 * Health Check Route
 * ============================================================================
 *
 * Used to verify that the API is running.
 */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Mtaa Watch API",
        version: "1.0.0"
    });
});

module.exports = app;