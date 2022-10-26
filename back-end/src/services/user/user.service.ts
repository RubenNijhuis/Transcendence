// random generators for seeding
import {
  randColor,
  randFullName,
  randNumber,
  randParagraph,
  randUserName
} from "@ngneat/falso";

// status and basic injectable
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// typeorm sql injection library
import { InjectRepository } from "@nestjs/typeorm";

// user entity
import { User } from "src/entities";

// typeorm repository manipulation
import { DeleteResult, Repository, TypeORMError, UpdateResult } from "typeorm";

// hashing libraries - thanks angi
import * as bcrypt from "bcrypt";
import { createHash, Hash } from "crypto";

// dtos
import { SetUserDto } from "src/dtos/user/set-user.dto";
import { UsernameDto } from "src/dtos/auth/username.dto";
import { intraIDDto } from "src/dtos/auth/intraID.dto";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { ConfigService } from "@nestjs/config";
/**
 * IMPORTANT: createUser wordt niet aangeroepen in de frontend
 * dus ik heb de path verwijderd.
 */

/**
 * User services
 *
 * Contains all typeorm sql injections.
 * Some functions that not yet used:
 * - set2faSecret
 * - update2faSecret is being used in tfa.service
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  filterUser(user: User): User {
    const newUser: User = user;

    if (!newUser) return null;
    delete newUser.intraId;
    delete newUser.isInitialized; 
    delete newUser.isTfaEnabled;
    delete newUser.refreshToken;
    delete newUser.tfaSecret;
    return newUser;
  }

  // only used for debug purposes
  async getUsers(): Promise<User[]> {
    try {
      const returnedUser: User[] = await this.userRepository.find();
      return Promise.resolve(returnedUser);
    } catch (err: any) {
      throw err;
    }
  }

  async getUserByIndex(index: number): Promise<User> {
    try {
      const ret: User = await this.userRepository.findOne({ where: { index } });
      return ret;
    } catch (err) {
      throw err;
    }
  }

  async findUsersById(id: string): Promise<User> {
    try {
      const ret: User = await this.userRepository.findOne({ where: { id } });
      return this.filterUser(ret);
    } catch (err: any) {
      throw err;
    }
  }

  async findUsersByIdNoFilter(id: string): Promise<User> {
    try {
      const ret: User = await this.userRepository.findOne({ where: { id } });
      return (ret);
    } catch (err: any) {
      throw err;
    }
  }

  async findUserByintraId(intraId: string): Promise<User> {
    try {
      const returnedUser: User = await this.userRepository.findOne({
        where: { intraId }
      });
      return returnedUser;
    } catch (err: any) {
      throw err;
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    try {
      const returnedUser: User = await this.userRepository.findOne({
        where: { username }
      });
      return returnedUser;
    } catch (err: any) {
      throw err;
    }
  }

  async getUserIdFromIntraId(intraId: string): Promise<string> {
    try {
      const returnedUser: User = await this.userRepository.findOne({
        where: { intraId }
      });
      return returnedUser.id;
    } catch (err: any) {
      throw err;
    }
  }

  async createUser(intraID: string, refreshToken: string): Promise<User> {
    try {
      if (await this.findUserByintraId(intraID)) return null;
      const query = {
        intraId: intraID,
        refreshToken: refreshToken
      };

      const newUser: User = this.userRepository.create(query);
      // var testUser: User;
      // const ret = await this.userRepository.save(testUser);
      const savedUser: User = await this.userRepository.save(newUser);
      return savedUser;
    } catch (err: any) {
      console.log("error: ", err);
      throw errorHandler(
        err,
        "Failed to create new user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async setUser(intraID: string, SetUserDto: SetUserDto): Promise<User> {
    try {
      const user: User = await this.findUserByintraId(intraID);
      const query = {
        isInitialized: true,
        username: SetUserDto.username,
        color: SetUserDto.color,
        description: SetUserDto.description
      };

      if (user.isInitialized) return null;

      await this.userRepository
        .createQueryBuilder()
        .update(user)
        .set(query)
        .where({ id: user.id })
        .returning("*")
        .execute();

      return await this.findUserByintraId(intraID);
    } catch (err: any) {
      console.log(err);
      throw errorHandler(
        err,
        "Failed to update user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeUser(username: string): Promise<DeleteResult> {
    try {
      const result: DeleteResult = await this.userRepository
        .createQueryBuilder("Users")
        .delete()
        .from("users")
        .where("username =:username", { username })
        .execute();
      return result;
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to remove user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async setRefreshToken(
    intraID: intraIDDto,
    token: string
  ): Promise<UpdateResult> {
    try {
      const user: User = await this.findUserByintraId(intraID.intraID);
      const hashedToken: string = createHash("sha256")
        .update(token)
        .digest("hex");
      const saltorounds: string =
        this.configService.get<string>("SALT_OR_ROUNDS");
      const numsalt: number = +saltorounds;
      const superHashedToken: string = await bcrypt.hash(hashedToken, numsalt);

      return await this.userRepository
        .createQueryBuilder()
        .update(user)
        .set({ refreshToken: superHashedToken })
        .where({ id: user.id })
        .returning("*")
        .execute();
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to set user refresh token",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async set2faSecret(id: number, tfaSecret: string): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, { tfaSecret });
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to set user 2fa secret",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // is deze functie niet hetzelde als set2faSecret? je update in beiden de 2fa
  // als ze iets anders doen, graag vermelden in de functie naam, anders eentje deleten
  // thanks :) - zeno
  async update2faSecret(
    userDto: UsernameDto,
    secret: string
  ): Promise<UpdateResult> {
    try {
      const user: User = await this.findUserByUsername(userDto.username);

      return await this.userRepository
        .createQueryBuilder()
        .update(user)
        .set({ tfaSecret: secret })
        .where({ id: user.id })
        .returning("*")
        .execute();
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to set user 2fa secret",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // @angi, kunnen deze weg?
  // setTwoFactorAuthSecret(id: number, twoFactorAuthenticationSecret: string) {
  //   return this.userRepository.update( id, {twoFactorAuthenticationSecret,} );
  // }

  // async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
  //   this.setTwoFactorAuthSecret(userId, secret);
  // }

  // FUNCTION IS NOT YET USED
  async setTfaOption(uid: string): Promise<UpdateResult> {
    try {
      const user: User = await this.findUsersByIdNoFilter(uid);

      console.log(user.isTfaEnabled, " ", !user.isTfaEnabled);
      return await this.userRepository
        .createQueryBuilder()
        .update(user)
        .set({ isTfaEnabled: !user.isTfaEnabled })
        .where({ id: user.id })
        .returning("*")
        .execute();
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to set user tfa option",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  

}
