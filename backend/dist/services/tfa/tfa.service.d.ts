import { TfaDto, UsernameDto } from "src/dtos/auth";
import { UserService } from "../user/user.service";
export declare class TfaService {
    private readonly usersService;
    constructor(usersService: UserService);
    isTfaValid(tfaDto: TfaDto): Promise<boolean>;
    generateTfaSecret(usernameDto: UsernameDto): Promise<any>;
}
