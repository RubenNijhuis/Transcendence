import { randAmount, randEmail, randFullName, randPassword, randSkill } from '@ngneat/falso';
import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
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

  findUsersByIntraId(intraID: string) {
    return this.userRepository.findOne({where: {intraID}})
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

  removeUser(username: string) {
    const ret = this.userRepository
      .createQueryBuilder('Users')
      .delete()
      .from('users')
      .where('username =:username', { username })
      .execute()
    return ret;
  }

  setTwoFactorAuthSecret(id: number, twoFactorAuthenticationSecret: string) {
    return this.userRepository.update( id, {twoFactorAuthenticationSecret,} );
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    this.setTwoFactorAuthSecret(userId, secret);
  }

  async seedCustom(amount: number) {
    for (var i = 1; i <= amount; i++) {
      await this.createUser({ intraID: randAmount().toString(), username: randFullName()})
    }
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
