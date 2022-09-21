import { HttpStatus } from "@nestjs/common";
import { User } from "src/entities";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "src/dtos/user/create-user.dto";
import { UsernameDto } from "src/dtos/auth/username.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    findUsersById(id: number): Promise<User>;
    findUsersByintraId(intraId: string): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    addsessiontoken(userDto: UsernameDto, token: string): Promise<UpdateResult>;
    removeUser(username: string): Promise<DeleteResult>;
    setTwoFactorAuthSecret(id: number, tfaSecret: string): Promise<any>;
    update2fasecret(userDto: UsernameDto, secret: string): Promise<UpdateResult>;
    seedCustom(amount: number): Promise<HttpStatus>;
    generateTwoFactorAuthenticationSecret(user: User): string;
    turnOn2fa(usernameDto: UsernameDto): Promise<UpdateResult>;
}
