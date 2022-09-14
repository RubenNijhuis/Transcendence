import {
  randAmount,
  randColor,
  randEmail,
  randFullName,
  randParagraph,
  randPassword,
  randSkill
} from "@ngneat/falso";
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { intraDto } from "./dtos/intra.dto";
import { MailDto } from "src/auth/dto/mail.dto";
import { UsernameDto } from "src/auth/dto/username.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  getUsers() {
    // debugging purposes lol
    return this.userRepository.find();
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findUsersByintraId(intraId: string) {
    return this.userRepository.findOne({ where: { intraId } });
  }

  findUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  createUser(createUserDto: CreateUserDto) {
    // should this be async? yes xo xo ruben
    if (!this.findUserByUsername(createUserDto.username)) return;
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async addsessiontoken(userDto: UsernameDto, token: string) {
    const ret = await this.findUserByUsername(userDto.username);

    return await this.userRepository
      .createQueryBuilder()
      .update(ret)
      .set({ jwtsession_token: token })
      .where({ id: ret.id })
      .returning("*")
      .execute();
  }

  removeUser(username: string) {
    const ret = this.userRepository
      .createQueryBuilder("Users")
      .delete()
      .from("users")
      .where("username =:username", { username })
      .execute();
    return ret;
  }

  setTwoFactorAuthSecret(id: number, twoFactorAuthenticationSecret: string) {
    return this.userRepository.update(id, { twoFactorAuthenticationSecret });
  }

  async update2fasecret(userDto: UsernameDto, secret: string) {
    const ret = await this.findUserByUsername(userDto.username);

    return await this.userRepository
      .createQueryBuilder()
      .update(ret)
      .set({ twoFactorAuthenticationSecret: secret })
      .where({ id: ret.id })
      .returning("*")
      .execute();
  }

  // setTwoFactorAuthSecret(id: number, twoFactorAuthenticationSecret: string) {
  //   return this.userRepository.update( id, {twoFactorAuthenticationSecret,} );
  // }

  // async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
  //   this.setTwoFactorAuthSecret(userId, secret);
  // }

  async seedCustom(amount: number) {
    for (let i = 1; i <= amount; i++) {
      await this.createUser({
        username: randFullName(),
        color: randColor().toString(),
        description: randParagraph()
      });
    }
  }

  async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
    console.log(secret);

    const otpauthUrl = authenticator.keyuri(
      "mehj177@gmail.com",
      "AUTH_APP_NAME",
      secret
    );

    console.log(otpauthUrl);
    return toDataURL(otpauthUrl);
    // await this.setTwoFactorAuthenticationSecret(secret, user.id);
    // console.log(user.twoFactorAuthenticationSecret);
    // return {
    //   secret,
    //   otpauthUrl
    // }
  }

  async turnOn2fa(usernameDto: UsernameDto) {
    const ret = await this.findUserByUsername(usernameDto.username);

    return await this.userRepository
      .createQueryBuilder()
      .update(ret)
      .set({ isTwoFactorAuthenticationEnabled: true })
      .where({ id: ret.id })
      .returning("*")
      .execute();
  }
}
