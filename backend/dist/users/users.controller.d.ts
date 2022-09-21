/// <reference types="multer" />
import { UsernameDto } from "src/auth/dto/username.dto";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UsersService } from "src/users/users.service";
import { UploadImgDto } from "./dtos/upload-img.dto";
import User from "./user.entity";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<User[]>;
    findUsersById(res: Response, username: string): Promise<User>;
    createUsers(createUserDto: CreateUserDto): Promise<any>;
    seedUsers(): Promise<void>;
    uploadImg(upload: UploadImgDto, file: Express.Multer.File): Promise<void>;
    turnon2fa(usernameDto: UsernameDto): Promise<any>;
}
