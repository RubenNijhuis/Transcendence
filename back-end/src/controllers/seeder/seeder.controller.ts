import { Body, Controller, Get, Post } from "@nestjs/common";
import { SeederAmountDto } from "src/dtos/seeder/custom-seeder.dto";
import { User } from "src/entities";
import { SeederService } from "src/services/seeder/seeder.service";

@Controller("seeder")
export class SeederController {
  constructor(private readonly seedService: SeederService) {}

  @Post("amount")
  async seedUsersAmount(@Body() dto: SeederAmountDto) {
    const seedResp: User[] = await this.seedService.seedCustom(dto.amount);

    const cleanedRet = await this.seedService.seedFriends();
    
    return cleanedRet;
  }

  @Get("friends")
  async seedFriends() {
    await this.seedService.seedFriends();
  }
}
