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
  constructor(private readonly userServ: UserService) {}

  // inserts number amount of users in database
  async seedCustom(amount: number): Promise<User[]> {
    try {
      for (let i = 0; i < amount; i++) {
        let genIntraId = randUserName();
        await this.userServ.createUser(genIntraId, "lolo");
        await this.userServ.setUser(
          genIntraId,
          randFullName(),
          randColor(),
          randParagraph()
        );
      }
      return this.userServ.getUsers();
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
