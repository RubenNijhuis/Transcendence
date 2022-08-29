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

  findUserByEmail(email: string) {
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

  async addFriend(userOppDto: UserOppDto) { // what should be checked in front-end and what in back-end
    const user = await this.findUserByUsername(userOppDto.username);
    const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);    
    let friendlist: Array<string> = JSON.parse(user.friends);
    let blocklist: Array<string> = JSON.parse(user.blocked);
    let selectedFriendlist: Array<string> = JSON.parse(selectedUser.friends);
    let selectedBlocklist: Array<string> = JSON.parse(selectedUser.blocked);

    if (!user 
        || !selectedUser 
        || userOppDto.username === userOppDto.selectedUsername 
        || blocklist.includes(userOppDto.selectedUsername, 0) 
        || selectedBlocklist.includes(userOppDto.username, 0) 
        || (friendlist.includes(userOppDto.selectedUsername, 0) 
        && friendlist.length != 0)) {
      console.log("\nthrows error\n");
      throw TypeError; // idk what to throw lol
    }
    friendlist.push(userOppDto.selectedUsername);
    await this.userRepository.createQueryBuilder()
      .update({ friends: JSON.stringify(friendlist) }) // protect from injections?
      .where({ id: user.id })
      .execute();
    if (!selectedFriendlist.includes(userOppDto.username, 0))
      this.addFriend({ username: userOppDto.selectedUsername, selectedUsername: userOppDto.username});
  }

  async addBlocked(userOppDto: UserOppDto) { // what should be checked in front-end and what in back-end
    const user = await this.findUserByUsername(userOppDto.username);
    const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
    let blockList: Array<string> = JSON.parse(user.blocked);
    let friendlist: Array<string> = JSON.parse(user.friends);

    if (!user 
        || !selectedUser 
        || userOppDto.username === userOppDto.selectedUsername 
        || (blockList.includes(userOppDto.selectedUsername, 0) 
        && blockList.length != 0)) {
      console.log("\nthrows error\n");
      throw TypeError; // idk what to throw lol
    }
    // remove each other from friendlist
    blockList.push(userOppDto.selectedUsername);
    await this.userRepository.createQueryBuilder()
      .update({ blocked: JSON.stringify(blockList) }) // protect from injections?
      .where({ id: user.id })
      .execute();
    if (friendlist.includes(userOppDto.selectedUsername)) {
        this.removeFriend(userOppDto);
        console.log("\nhier gaat het fout\n");
        this.removeFriend({username: userOppDto.selectedUsername, selectedUsername: userOppDto.username});
      }
  }

  async removeFriend(userOppDto: UserOppDto) { // what should be checked in front-end and what in back-end
    const user = await this.findUserByUsername(userOppDto.username);
    const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
    let friendlist: Array<string> = JSON.parse(user.friends);
    let selectedFriendlist: Array<string> = JSON.parse(selectedUser.friends);

    if (!user 
        || !selectedUser 
        || userOppDto.username === userOppDto.selectedUsername 
        || !friendlist.includes(userOppDto.selectedUsername, 0) 
        || friendlist.length == 0) {
      console.log("\nthrows error\n");
      throw TypeError; // idk what to throw lol
    }
    friendlist.splice(friendlist.indexOf(userOppDto.selectedUsername, 0));
    await this.userRepository.createQueryBuilder()
      .update({ friends: JSON.stringify(friendlist) }) // protect from injections?
      .where({ id: user.id })
      .execute();
    if (selectedFriendlist.includes(userOppDto.username, 0))
      this.removeFriend({ username: userOppDto.selectedUsername, selectedUsername: userOppDto.username});
  }

  async removeBlocked(userOppDto: UserOppDto) { // what should be checked in front-end and what in back-end
    const user = await this.findUserByUsername(userOppDto.username);
    const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
    let blockList: Array<string> = JSON.parse(user.blocked);

    if (!user 
        || !selectedUser 
        || userOppDto.username === userOppDto.selectedUsername 
        || !blockList.includes(userOppDto.selectedUsername, 0) 
        || blockList.length == 0) {
      console.log("\nthrows error\n");
      throw TypeError; // idk what to throw lol
    }
    blockList.splice(blockList.indexOf(userOppDto.selectedUsername, 0));
    await this.userRepository.createQueryBuilder()
      .update({ blocked: JSON.stringify(blockList) }) // protect from injections?
      .where({ id: user.id })
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
