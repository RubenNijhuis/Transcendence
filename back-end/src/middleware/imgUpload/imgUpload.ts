import { Inject, Injectable, NestInterceptor, Type } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import multer, { diskStorage } from "multer";
import { User } from "src/entities";
import { UserService } from "src/services/user/user.service";
import { Repository } from "typeorm";

// @Injectable()
// export class ImgUpload {
//     inject: [UserService];
//     constructor(
//         private readonly userService: UserService
//     ) {}

//     private async getFileName(req, file, cb): Promise<any> {
//         const extention: string = file.originalname.split('.').reverse()[0];
//         const userID: string = await this.userService.getUserIdFromIntraId(req.user.intraID);
//         return cb(null, userID + '.' + extention);
//     }

//     private imgFilter = (req, file, cb) => {
//         if (!file.originalname.match(/\.(png|jpg|jpeg|webm)$/)) { 
//             return cb(new Error('Please upload a Image'))
//         }
//         cb(null, true)
//     };

//     bannerOptions(): MulterOptions {
//         const storage = diskStorage({
//             destination: './upload/banner',
//             filename: this.getFileName,
//         });
//         const options: MulterOptions = {
//             fileFilter: this.imgFilter,
//             storage: storage
//         };

//         return options
//     };

//     profilePicOptions(): MulterOptions {
//         const storage = diskStorage({
//             destination: './upload/profile',
//             filename: this.getFileName,
//         });
//         const options: MulterOptions = {
//             fileFilter: this.imgFilter,
//             storage: storage
//         };

//         return options
//     };
// };
export const getFileName = async (req, file, cb) => {
    // const UserServ = new UserService(Repository<User>, ConfigService);
    const extention: string = file.originalname.split('.').reverse()[0];
    // const userID: string = await UserService.getUserIdFromIntraId(req.user.intraID);
    cb(null, req.user.intraID + '.' + extention);
};

export const imgFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg)$/)) { 
        return cb(new Error('Please upload a Image'))
    }
    cb(null, true)
};

export const bannerStorage: multer.StorageEngine = diskStorage({
    destination: './upload/banner',
    filename: getFileName,
});

export const profileStorage: multer.StorageEngine = diskStorage({
    destination: './upload/profile',
    filename: getFileName,
});

export const bannerOptions: MulterOptions = {
    fileFilter: imgFilter,
    storage: bannerStorage
}

export const profileOptions: MulterOptions = {
    fileFilter: imgFilter,
    storage: profileStorage
}

export const testcase = () => {
    return {
        fileFilter: imgFilter,
        storage: {
            destination: './upload/profile',
            filename: getFileName,
        }
    };
};
