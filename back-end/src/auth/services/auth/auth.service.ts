import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
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
    
}
