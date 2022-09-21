import { CreateUserDto } from "src/dtos/user/create-user.dto";
import { UserDetails } from "src/utils/types";

export interface AuthenticationProvider {
    validateUser(userDto: CreateUserDto): Promise<any>;
    createUser(userDto: CreateUserDto): Promise<any>;
    findUser();
}