import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserDetails } from "src/utils/types";

export interface AuthenticationProvider {
    validateUser(userDto: CreateUserDto): Promise<any>;
    createUser(userDto: CreateUserDto): Promise<any>;
    findUser();
}