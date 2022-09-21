import { CreateUserDto } from "src/users/dtos/create-users.dto";
export interface AuthenticationProvider {
    validateUser(userDto: CreateUserDto): Promise<any>;
    createUser(userDto: CreateUserDto): Promise<any>;
    findUser(): any;
}
