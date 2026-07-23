const express = require("express");

const router = express.Router();

const {

    uploadMedia

} = require("../controllers/mediaController");

const {

    authenticateUser

} = require("../middleware/authMiddleware");

const {

    uploadMedia: uploadMiddleware

} = require("../middleware/uploadMiddleware");

const {
    getReportMedia
} = require("../controllers/mediaController");

const {
    deleteMedia
} = require("../controllers/mediaController");  
/**
 *
 * ============================================================================
 * Upload Media
 * ============================================================================
 */

router.post(

    "/:id/media",

    authenticateUser,

    uploadMiddleware,

    uploadMedia
);

router.get(
    "/:id/media",
    authenticateUser,
    getReportMedia
);

router.delete(
    "/:id/media/:mediaId",
    authenticateUser,
    deleteMedia
);

module.exports = router;