"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const username_dto_1 = require("../auth/dto/username.dto");
const seeder_config_1 = require("../configs/seeder.config");
const user_create_seed_1 = require("../database/seeds/user-create.seed");
const create_users_dto_1 = require("./dtos/create-users.dto");
const users_service_1 = require("./users.service");
const upload_img_dto_1 = require("./dtos/upload-img.dto");
const multer = require('multer');
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.getUsers();
    }
    findUsersById(res, username) {
        try {
            return this.userService.findUserByUsername(username);
        }
        catch (error) {
            res.status;
        }
    }
    async createUsers(createUserDto) {
        try {
            const user = await this.userService.createUser(createUserDto);
            const ret = user;
            console.log("user obj:", user);
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async seedUsers() {
        const seed = new user_create_seed_1.UserSeeder({ seedingSource: seeder_config_1.seederConfig });
        await seed.run();
    }
    async uploadImg(upload, file) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/src/uploads');
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = upload.intraId;
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        });
        const ret = platform_express_1.MulterModule.register({
            dest: 'src/uploads' + upload.type,
        });
    }
    async turnon2fa(usernameDto) {
        try {
            await this.userService.turnOn2fa(usernameDto);
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("id/:username"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUsersById", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Get)("seeder"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "seedUsers", null);
__decorate([
    (0, common_1.Post)('upload-img'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 1000
            }),
            new common_1.FileTypeValidator({
                fileType: 'jpeg'
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_img_dto_1.uploadImgDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadImg", null);
__decorate([
    (0, common_1.Post)("turnon2fa"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [username_dto_1.UsernameDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "turnon2fa", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map