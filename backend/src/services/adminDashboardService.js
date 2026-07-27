const pool = require("../config/database");

/**
 * ============================================================================
 * Get Dashboard Statistics
 * ============================================================================
 */

const getDashboardStatistics = async () => {

    /*
    --------------------------------------------------------------------------
    Execute All Queries In Parallel
    --------------------------------------------------------------------------
    */

    const [

        totalReportsResult,

        pendingReportsResult,

        inProgressReportsResult,

        resolvedReportsResult,

        rejectedReportsResult,

        totalUsersResult,

        totalCategoriesResult

    ] = await Promise.all([

        /*
        ----------------------------------------------------------------------
        Total Reports
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM reports;
        `),

        /*
        ----------------------------------------------------------------------
        Pending Reports
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM reports
            WHERE status = 'pending';
        `),

        /*
        ----------------------------------------------------------------------
        In Progress Reports
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM reports
            WHERE status = 'in_progress';
        `),

        /*
        ----------------------------------------------------------------------
        Resolved Reports
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM reports
            WHERE status = 'resolved';
        `),

        /*
        ----------------------------------------------------------------------
        Rejected Reports
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM reports
            WHERE status = 'rejected';
        `),

        /*
        ----------------------------------------------------------------------
        Total Users
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM users;
        `),

        /*
        ----------------------------------------------------------------------
        Total Categories
        ----------------------------------------------------------------------
        */

        pool.query(`
            SELECT COUNT(*)::INTEGER AS total
            FROM categories;
        `)

    ]);

    /*
    --------------------------------------------------------------------------
    Debug Logs
    --------------------------------------------------------------------------
    */

    console.log("================================");
    console.log("ADMIN DASHBOARD STATISTICS");
    console.log("Total Reports:", totalReportsResult.rows[0].total);
    console.log("Pending:", pendingReportsResult.rows[0].total);
    console.log("In Progress:", inProgressReportsResult.rows[0].total);
    console.log("Resolved:", resolvedReportsResult.rows[0].total);
    console.log("Rejected:", rejectedReportsResult.rows[0].total);
    console.log("Users:", totalUsersResult.rows[0].total);
    console.log("Categories:", totalCategoriesResult.rows[0].total);
    console.log("================================");

    /*
    --------------------------------------------------------------------------
    Return Statistics
    --------------------------------------------------------------------------
    */

    return {

        totalReports: totalReportsResult.rows[0].total,

        pendingReports: pendingReportsResult.rows[0].total,

        inProgressReports: inProgressReportsResult.rows[0].total,

        resolvedReports: resolvedReportsResult.rows[0].total,

        rejectedReports: rejectedReportsResult.rows[0].total,

        totalUsers: totalUsersResult.rows[0].total,

        totalCategories: totalCategoriesResult.rows[0].total

    };

};

/**
 * ============================================================================
 * Exports
 * ============================================================================
 */

module.exports = {

    getDashboardStatistics

};