// import {
//   Body,
//   Controller,
//   UsePipes,
//   ValidationPipe,
//   Delete,
//   Get,
//   Query,
//   Param,
//   Post,
//   Put,
//   UseGuards,
//   Req
// } from "@nestjs/common";

// import { RecordService } from "src/services/record/record.service";
// import Record from "src/entities/record/record.entity";
// import { BanUserDto } from "src/dtos/record/ban-user.dto";
// import { AccessTokenGuard } from "src/guards/accessToken.guard";
// import { User } from "src/entities";

// @Controller("record")
// export class RecordController {
//   constructor(private readonly recordService: RecordService) {}

//   @Get()
//   async getAllRecords() {
//     return await this.recordService.getAllRecords();
//   }

//   @Post("banUser")
//   @UsePipes(ValidationPipe)
//   @UseGuards(AccessTokenGuard)
//   async banUser(
//     @Req() req: Request,
//     @Body() banUserDto: BanUserDto
//   ) {
//     try {
//       // Get UID through access token
//       const intraID = req.user["intraID"];
//       const user: User = await this.userService.findUserByintraId(intraID);

//       await this.recordService.banUser(banUserDto);
//       const ret = { message: "User banned!" };
//       return ret;
//     } catch (err) {
//       throw err;
//     }
//   }
// }

