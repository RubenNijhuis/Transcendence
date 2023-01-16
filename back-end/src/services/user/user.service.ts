// random generators for seeding

// status and basic injectable
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// typeorm sql injection library
import { InjectRepository } from "@nestjs/typeorm";

// user entity
import { User } from "src/entities";

// typeorm repository manipulation
import { DeleteResult, Repository, UpdateResult } from "typeorm";

// hashing libraries - thanks angi
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";

import { ConfigService } from "@nestjs/config";
import { GroupService } from "../group/group.service";
import { FriendlistService } from "../friendlist/friendlist.service";
import { BlocklistService } from "../blocklist/blocklist.service";
import { FriendrequestService } from "../friendrequest/friendrequest.service";
import { MatchHistoryService } from "../matchhistory/matchhistory.service";
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
  inject: [
    GroupService,
    UserService,
    FriendlistService,
    FriendrequestService,
    BlocklistService,
    MatchHistoryService
  ];
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly groupService: GroupService,
    private readonly friendlistService: FriendlistService,
    private readonly friendrequestService: FriendrequestService,
    private readonly blocklistService: BlocklistService,
    private readonly matchhistoryService: MatchHistoryService
  ) {}

  filterProfile(profile: User): User {
    const new_profile: User = profile;

    if (!new_profile) return null;

    delete new_profile.intraId;
    delete new_profile.index;
    delete new_profile.isInitialized;
    delete new_profile.refreshToken;
    delete new_profile.tfaSecret;

    return new_profile;
  }

  filterProfiles(profiles: User[]): User[] {
    const filtered_profiles = [];

    for (const profile of profiles) {
      filtered_profiles.push(this.filterProfile(profile));
    }
    return filtered_profiles;
  }

  // only used for debug purposes
  async getUsers(): Promise<User[]> {
    const returnedUser: User[] = await this.userRepository.find();
    return Promise.resolve(returnedUser);
  }

  async getUsersSortedOnElo(): Promise<User[]> {
    const returnedUsers: User[] = await this.userRepository.find({
      order: {
        elo: "DESC"
      }
    });
    const filteredUsers = returnedUsers.map((profile) =>
      this.filterProfile(profile)
    );
    return Promise.resolve(filteredUsers);
  }

  async getUserByIndex(index: number): Promise<User | null> {
    const ret: User = await this.userRepository.findOneOrFail({
      where: { index }
    });
    return ret;
  }

  async findUserByUid(uid: string): Promise<User> {
    return await this.userRepository.findOne({ where: { uid } });
  }

  //  async findUserByUidNoFilter(uid: string): Promise<User> {
  //    try {
  //      const ret: User = await this.userRepository.findOneOrFail({
  //        where: { uid }
  //      });
  //      return ret;
  //    } catch (err) {
  //      throw err;
  //    }
  //  }

  async findUserByintraId(intraId: string): Promise<User> {
    const returnedUser: User = await this.userRepository.findOne({
      where: { intraId }
    });
    return returnedUser;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const returnedUser: User = await this.userRepository.findOneOrFail({
      where: { username: username }
    });

    return returnedUser;
  }

  async getUserIdFromIntraId(intraId: string): Promise<string | null> {
    const returnedUser: User = await this.userRepository.findOneOrFail({
      where: { intraId }
    });
    return returnedUser.uid;
  }

  async getUsersOnUsernames(usernames: string[]) {
    const profiles: User[] = [];

    for (const username of usernames) {
      profiles.push(await this.findUserByUsername(username));
    }
    return profiles;
  }

  async createUser(intraID: string): Promise<User> {
    const res: User = await this.findUserByintraId(intraID);

    if (res) return null;
    const query = {
      intraId: intraID
    };

    const newUser: User = this.userRepository.create(query);
    const savedUser: User = await this.userRepository.save(newUser);
    return savedUser;
  }

  async setUser(
    intraID: string,
    username: string,
    color: string,
    description: string
  ): Promise<User> {
    const user: User = await this.findUserByintraId(intraID);
    if (user === null) {
      throw new HttpException(
        "No Such Profile",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const query = {
      isInitialized: true,
      username: username,
      color: color,
      description: description
    };

    if (user.isInitialized) return null;

    await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set(query)
      .where({ uid: user.uid })
      .returning("*")
      .execute();

    return await this.findUserByintraId(intraID);
  }

  async removeUser(profile: User): Promise<DeleteResult> {
    const username: string = profile.username;

    await this.blocklistService.removePerson(username);
    await this.friendlistService.removePerson(username);
    await this.friendrequestService.removePerson(username);
    await this.groupService.removePerson(profile.uid);
    await this.matchhistoryService.removeRecords(profile.uid);
    //      await this.messageService.removeRecords(profile.uid);

    const result: DeleteResult = await this.userRepository
      .createQueryBuilder("user")
      .delete()
      .from("user")
      .where("username =:username", { username })
      .execute();
    return result;
  }

  async setRefreshToken(uid: string, token: string): Promise<UpdateResult> {
    const user: User = await this.findUserByUid(uid);
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
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }

  async set2faSecret(id: number, tfaSecret: string): Promise<UpdateResult> {
    return await this.userRepository.update(id, { tfaSecret });
  }

  // is deze functie niet hetzelde als set2faSecret? je update in beiden de 2fa
  // als ze iets anders doen, graag vermelden in de functie naam, anders eentje deleten
  // thanks :) - zeno
  async update2faSecret(uid: string, secret: string): Promise<UpdateResult> {
    const user: User = await this.findUserByUid(uid);

    return await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ tfaSecret: secret })
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }

  async setDescription(
    username: string,
    description: string
  ): Promise<UpdateResult> {
    const user: User = await this.findUserByUsername(username);

    return await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ description: description })
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }

  async setColor(username: string, color: string): Promise<UpdateResult> {
    const user: User = await this.findUserByUsername(username);

    return await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ color: color })
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }

  async setTFAiv(uid: string, tfa_iv: string): Promise<UpdateResult> {
    const user: User = await this.findUserByUid(uid);

    return await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ tfa_iv: tfa_iv })
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }

  async setTFAkey(uid: string, tfa_key: string): Promise<UpdateResult> {
    const user: User = await this.findUserByUid(uid);

    return await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ tfa_key: tfa_key })
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }

  async getTFAiv(uid: string): Promise<string> {
    try {
      const user: User = await this.findUserByUid(uid);
      return user.tfa_iv;
    } catch (err) {
      throw err;
    }
  }
  async getTFAkey(uid: string): Promise<string> {
    try {
      const user: User = await this.findUserByUid(uid);
      return user.tfa_key;
    } catch (err) {
      throw err;
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
    const user: User = await this.findUserByUid(uid);

    //console.log(user.isTfaEnabled, " ", !user.isTfaEnabled);
    return await this.userRepository
      .createQueryBuilder()
      .update(user)
      .set({ isTfaEnabled: !user.isTfaEnabled })
      .where({ uid: user.uid })
      .returning("*")
      .execute();
  }
}
