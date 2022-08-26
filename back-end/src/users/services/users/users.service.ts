import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

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

  findUserByemail(email: string) {
    return this.userRepository.findOne({where: {email}});
  }

  setTwoFactorAuthSecret(id: number, twoFactorAuthenticationSecret: string) {
    return this.userRepository.update( id, {twoFactorAuthenticationSecret,} );
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    this.setTwoFactorAuthSecret(userId, secret);
  }

  createUser(createUserDto: CreateUserDto) { // should this be async?
    if (!this.findUserByUsername(createUserDto.username))
      return ;
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async addFriend(userOppDto: UserOppDto) {
    const ret = await this.findUserByUsername(userOppDto.username);
    if (!ret || 
        userOppDto.username === userOppDto.selectedUsername || 
        ret.friends.find(element => element.username === userOppDto.selectedUsername)) {
      throw TypeError; // idk what to throw lol
    }
    return await this.userRepository.createQueryBuilder()
      .update({ friends: [...ret.friends, { username: userOppDto.selectedUsername}]})
      .where({ id: ret.id })
      .returning('*')
      .execute();
  }

  async addBlocked(userOppDto: UserOppDto) {
    const ret = await this.findUserByUsername(userOppDto.username);
    if (!ret || 
        userOppDto.username === userOppDto.selectedUsername || 
        ret.blocked.find(element => element.username === userOppDto.selectedUsername)) {
      throw TypeError; // idk what to throw lol
    }
    return await this.userRepository.createQueryBuilder()
      .update({ blocked: [...ret.blocked, { username: userOppDto.selectedUsername}]})
      .where({ id: ret.id })
      .returning('*')
      .execute();
  }

  async deleteFriend(userOppDto: UserOppDto) {
    const ret = await this.findUserByUsername(userOppDto.username);
    if (!ret || 
        userOppDto.username === userOppDto.selectedUsername || 
        ret.blocked.find(element => element.username !== userOppDto.selectedUsername)) {
      throw TypeError; // idk what to throw lol
    }
    return await this.userRepository.createQueryBuilder()
      .update({ friends: [...ret.friends, { username: userOppDto.selectedUsername}]})
      .where({ id: ret.id })
      .returning('*')
      .execute();
  }

  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
    console.log(secret);

    const otpauthUrl = authenticator.keyuri('mehj177@gmail.com', 'AUTH_APP_NAME', secret);
    
    console.log(otpauthUrl);
    return(toDataURL(otpauthUrl));
    // await this.setTwoFactorAuthenticationSecret(secret, user.id);
    // console.log(user.twoFactorAuthenticationSecret);
    // return {
    //   secret,
    //   otpauthUrl
    // }
  }
}
