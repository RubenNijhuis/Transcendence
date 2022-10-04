import multer, { diskStorage } from "multer";

export const getFileName = (req, file, cb) => {
    const extention: string = file.originalname.split('.').reverse()[0];
    cb(null, req.user.intraID + '.' + extention);
};

export const imgFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webm)$/)) { 
        return cb(new Error('Please upload a Image'))
    }
    cb(null, true)
};

export const bannerStorage: multer.StorageEngine = diskStorage({
    destination: './upload/banner',
    filename: getFileName,
});

export const profileStorage: multer.StorageEngine = diskStorage({
    destination: './upload/banner',
    filename: getFileName,
});
