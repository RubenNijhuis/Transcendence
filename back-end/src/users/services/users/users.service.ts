import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { UsernameDto } from "src/users/dtos/username.dto";
import { MailDto } from "src/users/dtos/mail.dto";
import { twofadto } from "src/users/dtos/2fa.dto";

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
    const ret = await this.findUserByUsername(userOppDto.username); console.log("AAAa");
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

  
  async update2fasecret(usernameDto: UsernameDto, secret: string) {
    const ret = await this.findUserByUsername(usernameDto.username);
    
    return await this.userRepository.createQueryBuilder()
    .update(ret)
    .set({ twoFactorAuthenticationSecret: secret,})
    .where({ id: ret.id })
    .returning('*')
    .execute();
  }
  
  async addMail(mailDto: MailDto) {
    const ret = await this.findUserByUsername(mailDto.username);
    
    return await this.userRepository.createQueryBuilder()
    .update(ret)
    .set({ email: mailDto.email,})
    .where({ id: ret.id })
    .returning('*')
    .execute();
  }
  
  async isTwoFactorAuthenticationCodeValid(Twofadto: twofadto) {
    const ret = await this.findUserByUsername(Twofadto.username);
    return authenticator.verify({
      token: Twofadto.twoFactorAuthenticationCode,
      secret: ret.twoFactorAuthenticationSecret,
    });
  }
  
  async turnOn2fa(Twofadto: twofadto) {
    const ret = await this.findUserByUsername(Twofadto.username);

    return await this.userRepository.createQueryBuilder()
    .update(ret)
    .set({ isTwoFactorAuthenticationEnabled: true,})
    .where({ id: ret.id })
    .returning('*')
    .execute();
  }

  async generateTwoFactorAuthenticationSecret(usernameDto: UsernameDto) {
    const ret = await this.findUserByUsername(usernameDto.username);
    
    if (!ret || ret.isTwoFactorAuthenticationEnabled === false ) {
    throw TypeError;
  }

    const secret = authenticator.generateSecret();
    console.log("secret:");
    console.log(secret);
    this.update2fasecret(usernameDto, secret);

    const otpauthUrl = authenticator.keyuri(ret.email, 'AUTH_APP_NAME', ret.twoFactorAuthenticationSecret);
    
    console.log("otapathurl:");
    console.log(otpauthUrl);

    console.log("todataurl:");
    console.log(toDataURL(otpauthUrl));
    return(toDataURL(otpauthUrl));
    // await this.setTwoFactorAuthenticationSecret(secret, user.id);
    // console.log(user.twoFactorAuthenticationSecret);
    // return {
    //   secret,
    //   otpauthUrl
    // }
  }
}

/**
 *  I need to make a jwt sesison token for the auth/login, and jwtguards
 *  also finish tutorial
 */