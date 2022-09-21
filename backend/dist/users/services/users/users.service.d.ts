import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    findUsersById(id: number): Promise<User>;
    findUsersByIntraId(uid: string): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;
    setTwoFactorAuthSecret(id: number, twoFactorAuthenticationSecret: string): Promise<import("typeorm").UpdateResult>;
    setTwoFactorAuthenticationSecret(secret: string, userId: number): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    addFriend(userOppDto: UserOppDto): Promise<void>;
    addBlocked(userOppDto: UserOppDto): Promise<void>;
    removeFriend(userOppDto: UserOppDto): Promise<void>;
    removeBlocked(userOppDto: UserOppDto): Promise<void>;
    generateTwoFactorAuthenticationSecret(user: User): Promise<any>;
}
