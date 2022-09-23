import { randColor, randFullName, randParagraph } from "@ngneat/falso";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateUserDto } from "src/dtos/user/create-user.dto";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { UsernameDto } from "src/dtos/auth/username.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findUsersById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  findUsersByintraId(intraId: string): Promise<User> {
    return this.userRepository.findOne({ where: { intraId } });
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!(await this.findUserByUsername(createUserDto.username))) return;
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async addsessiontoken(
    userDto: UsernameDto,
    token: string
  ): Promise<UpdateResult> {
    const ret = await this.findUserByUsername(userDto.username);

    return await this.userRepository
      .createQueryBuilder()
      .update(ret)
      .set({ jwtsession_token: token })
      .where({ id: ret.id })
      .returning("*")
      .execute();
  }

  removeUser(username: string): Promise<DeleteResult> {
    const ret = this.userRepository
      .createQueryBuilder("Users")
      .delete()
      .from("users")
      .where("username =:username", { username })
      .execute();
    return ret;
  }

  setTwoFactorAuthSecret(id: number, tfaSecret: string): Promise<any> {
    return this.userRepository.update(id, { tfaSecret });
  }

  async update2fasecret(
    userDto: UsernameDto,
    secret: string
  ): Promise<UpdateResult> {
    const ret = await this.findUserByUsername(userDto.username);

    return this.userRepository
      .createQueryBuilder()
      .update(ret)
      .set({ tfaSecret: secret })
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

  async seedCustom(amount: number): Promise<HttpStatus> {
    try {
      for (let i = 1; i <= amount; i++) {
        await this.createUser({
          username: randFullName(),
          color: randColor().toString(),
          description: randParagraph()
        });
      }
      return HttpStatus.OK;
    } catch (error) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
  // WE NEED TO SPECIFY WHAT THIS RETURNS
  generateTwoFactorAuthenticationSecret(user: User): string {
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

  async turnOn2fa(usernameDto: UsernameDto): Promise<UpdateResult> {
    const ret = await this.findUserByUsername(usernameDto.username);

    return this.userRepository
      .createQueryBuilder()
      .update(ret)
      .set({ isTfaEnabled: true })
      .where({ id: ret.id })
      .returning("*")
      .execute();
  }
}
