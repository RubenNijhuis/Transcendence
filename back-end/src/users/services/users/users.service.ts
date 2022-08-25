import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  createUser(createUserDto: CreateUserDto) {
    if (this.findUserByUsername(createUserDto.username) === null) {
      const newUser = this.userRepository.create(createUserDto);
      return this.userRepository.save(newUser);
    }
  }

  getUsers() { // debugging purposes lol
    return this.userRepository.find()
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({where: {username}});
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({where: {id}})
  }

  findUsersByIntraId(uid: string) {
    return this.userRepository.findOne({where: {uid}})
  }
//   async findOne(username: string): Promise<User | undefined> {
//     return this.find(user => user.username === username);
//   }
}
