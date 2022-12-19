import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { SeederAmountDto } from "src/dtos/seeder/custom-seeder.dto";
import { SeederGroupDto } from "src/dtos/seeder/group-seeder.dto";
import { User } from "src/entities";
import { FriendSeederService } from "src/services/seeder/friend.seeder.service";
import { GroupseederService } from "src/services/seeder/group.seeder.service";
import { UserSeederService } from "src/services/seeder/user.seeder.service";

@Controller("seeder")
export class SeederController {
  constructor(
    private readonly userSeeder: UserSeederService,
    private readonly friendSeeder: FriendSeederService,
    private readonly groupSeeder: GroupseederService
    ) {}

  @Post("amount")
  async seedUsersAmount(@Body() dto: SeederAmountDto) {
    const seedResp: User[] = await this.userSeeder.seedCustom(dto.amount);


    const cleanedRet = await this.friendSeeder.seedFriends();
    await this.groupSeeder.seedGroups();
    
    return cleanedRet;
  }

  @Get("friends")
  async seedFriends() {
    await this.friendSeeder.seedFriends();
  }

  @Post("group")
  async seedGroups() {
    await this.groupSeeder.seedGroups();
  }
}
