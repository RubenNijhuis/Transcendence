/// <reference types="multer" />
import { UsernameDto } from "src/dtos/auth/username.dto";
import { CreateUserDto } from "src/dtos/user/create-user.dto";
import { UserService } from "src/services/user/user.service";
import { UploadImgDto } from "../../dtos/database/upload-img.dto";
import User from "../../entities/user/user.entity";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    findUsersById(res: Response, username: string): Promise<User>;
    createUsers(createUserDto: CreateUserDto): Promise<any>;
    seedUsers(): Promise<void>;
    uploadImg(upload: UploadImgDto, file: Express.Multer.File): Promise<void>;
    turnon2fa(usernameDto: UsernameDto): Promise<any>;
}
