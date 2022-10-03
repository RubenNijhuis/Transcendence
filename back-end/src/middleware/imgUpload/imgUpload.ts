const multer = require("multer");

export const imgFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webm)$/)) { 
        return cb(new Error('Please upload a Image'))
    }
    cb(null, true)
}

export const bannerStorage = (username: string) => {
    return multer.diskStorage({
        destination: "/uploads/banner/",
        filename: function (req, file, cb) {
        const uniqueSuffix = username; // get this from jwt
        cb(null, file.fieldname + "-" + uniqueSuffix);
        }
    });
};

export const profileStorage = (username: string) => {
    return multer.diskStorage({
        destination: "/uploads/profile/",
        filename: function (req, file, cb) {
        const uniqueSuffix = username; // get this from jwt
        cb(null, file.fieldname + "-" + uniqueSuffix);
        }
    });
};
