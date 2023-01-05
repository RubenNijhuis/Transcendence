import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  randColor,
  randFullName,
  randParagraph,
  randUserName
} from "@ngneat/falso";
import { User } from "src/entities";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { UserService } from "../user/user.service";

@Injectable()
export class UserSeederService {
  inject: [UserService];
  constructor(private readonly userService: UserService) {}

  // inserts number amount of users in database
  async seedCustom(amount: number): Promise<User[]> {
    try {
      for (let i = 0; i < amount; i++) {
        const genIntraId = randUserName();
        await this.userService.createUser(genIntraId);
        await this.userService.setUser(
          genIntraId,
          randFullName(),
          randColor(),
          randParagraph()
        );
      }
      return this.userService.getUsers();
    } catch (err) {
      console.error(err);
      throw errorHandler(
        err,
        "Failed to seed database",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
