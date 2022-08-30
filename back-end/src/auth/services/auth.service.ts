import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    )  {}

    async validateUser(userDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.findUsersByIntraId(userDto.uid);
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

    async login(userDto: CreateUserDto) {
        const payload = { username: userDto.username, sub: userDto.uid };

        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
