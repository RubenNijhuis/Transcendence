import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";
import { UsersService } from "src/users/services/users/users.service";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("../../../typeorm").User[]>;
    findUsersById(username: string): Promise<import("../../../typeorm").User>;
    createUsers(createUserDto: CreateUserDto): Promise<any>;
    seedUsers(): Promise<void>;
    addfriend(userOppDto: UserOppDto): Promise<any>;
    addblocked(userOppDto: UserOppDto): Promise<any>;
    removefriend(userOppDto: UserOppDto): Promise<any>;
    removeblocked(userOppDto: UserOppDto): Promise<any>;
}
