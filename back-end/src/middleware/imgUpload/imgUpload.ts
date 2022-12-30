// Multer
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import multer, { diskStorage } from "multer";

// File system
import { readdirSync, unlinkSync } from "fs";

////////////////////////////////////////////////////////////

// TODO: add types to params
export const deleteFiles = (path, id, uploadedFile) => {
  const files = readdirSync(path).filter((file) => file.startsWith(`${id}.`));
  if (!files) return;

  const filteredFiles = files.filter((e) => !e.includes(uploadedFile));
  if (!filteredFiles) return;

  for (let i = 0; i < filteredFiles.length; i++) {
    unlinkSync(path + filteredFiles[i]);
  }
};

export const getFileName = (req, file, cb) => {
  const extention: string = file.originalname.split(".").reverse()[0];
  cb(null, `${req.user.intraID}.${extention}`);
};

export const imgFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|jpeg|webm)$/)) {
    return cb(new Error("Please upload a Image"));
  }

  cb(null, true);
};

export const bannerStorage: multer.StorageEngine = diskStorage({
  destination: "./upload/banner",
  filename: getFileName
});

export const profileStorage: multer.StorageEngine = diskStorage({
  destination: "./upload/profile",
  filename: getFileName
});

export const bannerOptions: MulterOptions = {
  fileFilter: imgFilter,
  storage: bannerStorage
};

export const profileOptions: MulterOptions = {
  fileFilter: imgFilter,
  storage: profileStorage
};
