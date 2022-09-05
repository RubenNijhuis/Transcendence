import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
    )  {}

    async validateUser(userDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.findUsersByIntraId(userDto.intraID);
    if (!user)
      return await this.createUser(userDto);
    return user;
    }

    private async createUser(userDto: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(userDto);
    }

    findUser() {
        throw new Error('Method not implemented.');
    }
    
    signup() {
        return { msg: 'I have signed up' }
    }

    signin() {
        return { msg: 'I have signed in' }
    }
}
