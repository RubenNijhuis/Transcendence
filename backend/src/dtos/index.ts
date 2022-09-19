import { twoFaDto } from "./auth/2fa.dto";
import { IntraDto } from "./auth/intra.dto";
import { CreateBlockDto } from "./blocklist/create-blocklist.dto";
import { UploadImgDto } from "./database/upload-img.dto";
import { CreateFriensdDto } from "./friendlist/create-friend.dto";
import { CreateRequestDto } from "./friendrequest/create-request.dto";
import { CreateUserDto } from "./user/create-user.dto";

const dtos = [
    IntraDto,
    twoFaDto,
    CreateBlockDto,
    UploadImgDto,
    CreateFriensdDto,
    CreateRequestDto,
    CreateUserDto
];

export {
    IntraDto,
    CreateBlockDto,
    UploadImgDto,
    CreateFriensdDto,
    CreateRequestDto,
    CreateUserDto
};

export default dtos;