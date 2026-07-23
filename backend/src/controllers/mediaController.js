
const {
    uploadMedia: uploadMediaService,
    getReportMedia: getReportMediaService,
    deleteMedia: deleteMediaService
} = require("../services/mediaService");

/**
 * ============================================================================
 * Upload Media
 * ============================================================================
 */

const uploadMedia = async (req, res) => {

    try {

        console.log("================================");
        console.log("MEDIA CONTROLLER");
        console.log("================================");

        const reportId = req.params.id;

        const userId = req.user.id;

        const files = req.files;

        const media = await uploadMediaService(

            reportId,

            userId,

            files

        );

        return res.status(201).json({

            success: true,

            message: "Media uploaded successfully.",

            count: media.length,

            data: media

        });

    }

    catch (error) {

        console.error(error);

        /*
        ------------------------------------------------------------------------
        Report Not Found
        ------------------------------------------------------------------------
        */

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        /*
        ------------------------------------------------------------------------
        User Does Not Own Report
        ------------------------------------------------------------------------
        */

        if (error.message === "REPORT_NOT_OWNED") {

            return res.status(403).json({

                success: false,

                message: "You can only upload media to your own report."

            });

        }

        /*
        ------------------------------------------------------------------------
        No Files Uploaded
        ------------------------------------------------------------------------
        */

        if (error.message === "NO_FILES_UPLOADED") {

            return res.status(400).json({

                success: false,

                message: "Please upload at least one image or video."

            });

        }

        /*
        ------------------------------------------------------------------------
        Server Error
        ------------------------------------------------------------------------
        */

        return res.status(500).json({

            success: false,

            message: "Failed to upload media."

        });

    }

};

/**
 * ============================================================================
 * Get Report Media
 * ============================================================================
 */

const getReportMedia = async (req, res) => {

    try {

        console.log("================================");
        console.log("GET REPORT MEDIA CONTROLLER");
        console.log("================================");

        const reportId = req.params.id;

        const media = await getReportMediaService(reportId);

        return res.status(200).json({

            success: true,

            count: media.length,

            data: media

        });

    }

    catch (error) {

        console.error(error);

        /*
        ------------------------------------------------------------------------
        Report Not Found
        ------------------------------------------------------------------------
        */

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        /*
        ------------------------------------------------------------------------
        Server Error
        ------------------------------------------------------------------------
        */

        return res.status(500).json({

            success: false,

            message: "Failed to retrieve report media."

        });

    }

};
/**
 * ============================================================================
 * Delete Media
 * ============================================================================
 */

const deleteMedia = async (req, res) => {

    try {

        console.log("================================");
        console.log("DELETE MEDIA CONTROLLER");
        console.log("================================");

        const mediaId = req.params.mediaId;

        const userId = req.user.id;

        const media = await deleteMediaService(

            mediaId,

            userId

        );

        return res.status(200).json({

            success: true,

            message: "Media deleted successfully.",

            data: media

        });

    }

    catch (error) {

        console.error(error);

        /*
        ------------------------------------------------------------------------
        Media Not Found
        ------------------------------------------------------------------------
        */

        if (error.message === "MEDIA_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Media not found."

            });

        }

        /*
        ------------------------------------------------------------------------
        Report Not Found
        ------------------------------------------------------------------------
        */

        if (error.message === "REPORT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Report not found."

            });

        }

        /*
        ------------------------------------------------------------------------
        User Does Not Own Report
        ------------------------------------------------------------------------
        */

        if (error.message === "REPORT_NOT_OWNED") {

            return res.status(403).json({

                success: false,

                message: "You can only delete media from your own report."

            });

        }

        /*
        ------------------------------------------------------------------------
        Server Error
        ------------------------------------------------------------------------
        */

        return res.status(500).json({

            success: false,

            message: "Failed to delete media."

        });

    }

};



module.exports = {
    deleteMedia,
    uploadMedia,
    getReportMedia

};