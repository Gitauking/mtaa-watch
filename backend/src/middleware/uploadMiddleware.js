const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * ============================================================================
 * Multer Storage Configuration
 * ============================================================================
 */

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        let uploadPath = "";

        /*
        ------------------------------------------------------------------------
        Images
        ------------------------------------------------------------------------
        */

        if (file.mimetype.startsWith("image/")) {

            uploadPath = "uploads/images";

        }

        /*
        ------------------------------------------------------------------------
        Videos
        ------------------------------------------------------------------------
        */

        else if (file.mimetype.startsWith("video/")) {

            uploadPath = "uploads/videos";

        }

        /*
        ------------------------------------------------------------------------
        Create Folder If Missing
        ------------------------------------------------------------------------
        */

        if (!fs.existsSync(uploadPath)) {

            fs.mkdirSync(uploadPath, { recursive: true });

        }

        cb(null, uploadPath);

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9);

        const extension = path.extname(file.originalname);

        cb(null, uniqueName + extension);

    }

});

/**
 * ============================================================================
 * File Filter
 * ============================================================================
 */

const fileFilter = (req, file, cb) => {

    /*
    ------------------------------------------------------------------------
    Allowed Image Types
    ------------------------------------------------------------------------
    */

    const allowedImages = [

        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"

    ];

    /*
    ------------------------------------------------------------------------
    Allowed Video Types
    ------------------------------------------------------------------------
    */

    const allowedVideos = [

        "video/mp4",
        "video/quicktime"

    ];

    if (

        allowedImages.includes(file.mimetype) ||

        allowedVideos.includes(file.mimetype)

    ) {

        cb(null, true);

    }

    else {

        cb(

            new Error("Only images and MP4/MOV videos are allowed."),

            false

        );

    }

};

/**
 * ============================================================================
 * Multer Upload Configuration
 * ============================================================================
 */

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 20 * 1024 * 1024 // 20 MB

    }

});

/**
 * ============================================================================
 * Upload Fields
 * ============================================================================
 */

const uploadMedia = upload.fields([

    {

        name: "images",

        maxCount: 3

    },

    {

        name: "video",

        maxCount: 1

    }

]);

module.exports = {

    uploadMedia

};