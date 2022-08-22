import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/createUsers.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // create user based on 42 data
  private async createUser(userDto: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(userDto);
  }

  // check if user exists
  async checkUser(userDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findUsersByIntraId(userDto.uid);
    if (!user)
      return await this.createUser(userDto);
    return user;
  }

  // cookies ??
}
