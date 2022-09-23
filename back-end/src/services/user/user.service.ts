// random generators for seeding
import { randColor, randFullName, randParagraph } from "@ngneat/falso";

// status and basic injectable
import { HttpStatus, Injectable } from "@nestjs/common";

// typeorm sql injection library
import { InjectRepository } from "@nestjs/typeorm";

// user entity
import { User } from "src/entities";

// typeorm repository manipulation
import { DeleteResult, Repository, TypeORMError, UpdateResult } from "typeorm";

// user dto
import { CreateUserDto } from "src/dtos/user/create-user.dto";

// dto to check for non empty username
import { UsernameDto } from "src/dtos/auth/username.dto";

/**
 * User services
 * 
 * Contains all typeorm sql injections.
 * Some functions that not yet used:
 * - setJwt
 * - seedCustom
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const ret = await this.userRepository.find();
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async findUsersById(id: number): Promise<User> {
    try {
      const ret = await this.userRepository.findOne({ where: { id } });
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async findUsersByintraId(intraId: string): Promise<User> {
    try {
      const ret = await this.userRepository.findOne({ where: { intraId } });
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      const ret = await this.userRepository.findOne({ where: { username } });
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      if (!(await this.findUserByUsername(createUserDto.username)))
        return null;
      const newUser = this.userRepository.create(createUserDto);
      const ret = await this.userRepository.save(newUser);
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async removeUser(username: string): Promise<DeleteResult> {
    try {
      const ret = await this.userRepository
      .createQueryBuilder("Users")
      .delete()
      .from("users")
      .where("username =:username", { username })
      .execute();
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  // FUNTION IS NOT YET USED
  async setJwt(
    username: string,
    jwt: string
  ): Promise<UpdateResult> {
    try {
      const user = await this.findUserByUsername(username);
      const ret = await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ jwtsession_token: jwt })
      .where({ id: user.id })
      .returning("*")
      .execute();
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async setTwoFactorAuthSecret(id: number, tfaSecret: string): Promise<any> {
    try {
      const ret = await this.userRepository.update(id, { tfaSecret });
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async update2fasecret(
    userDto: UsernameDto,
    secret: string
  ): Promise<UpdateResult> {
    try {
      const user = await this.findUserByUsername(userDto.username);
      const ret = await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ tfaSecret: secret })
      .where({ id: user.id })
      .returning("*")
      .execute();
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  async setTfa(username: string, option: boolean): Promise<UpdateResult> {
    try {
      const user = await this.findUserByUsername(username);

      const ret = await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ isTfaEnabled: option })
      .where({ id: user.id })
      .returning("*")
      .execute();
      return Promise.resolve(ret);
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }

  // FUNTION IS NOT YET USED
  async seedCustom(amount: number): Promise<User[]> {
    try {
      for (let i = 1; i <= amount; i++) {
        await this.createUser({
          username: randFullName(),
          color: randColor().toString(),
          description: randParagraph()
        });
      }
      return this.getUsers();
    } catch (err: any) {
      return Promise.reject(TypeORMError)
    }
  }
}
