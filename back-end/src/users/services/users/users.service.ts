import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  getUsers() { // debugging purposes lol
    return this.userRepository.find()
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({where: {id}})
  }

  findUsersByIntraId(uid: string) {
    return this.userRepository.findOne({where: {uid}})
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({where: {username}});
  }

  createUser(createUserDto: CreateUserDto) { // should this be async?
    if (!this.findUserByUsername(createUserDto.username))
      return ;
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  addFriend(userOppDto: UserOppDto) {
    const ret = this.findUserByUsername(userOppDto.username);
    if (!ret || userOppDto.username === userOppDto.friend)
      return ;
    return this.userRepository
      .query(`SELECT * from post WHERE ${userOppDto.friend} = ANY(friend)`);
  }
}
