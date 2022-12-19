import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  HttpStatus,
  UseGuards,
  Req
} from "@nestjs/common";

// Requests
import { Request } from "express";

// Dto's
import { CreateMessageDto } from "src/dtos/group/create-message.dto";

// Types
import User from "src/entities/user/user.entity";

// Guard
import { AccessTokenGuard } from "src/guards/accessToken.guard";

// Services
import { MessageService } from "src/services/message/message.service";
import { UserService } from "src/services/user/user.service";

////////////////////////////////////////////////////////////

@Controller("message")
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService
  ) {}

  ////////////////////////////////////////////////////////////

  @Post("create")
  // @UsePipes(ValidationPipe)
  // @UseGuards(AccessTokenGuard)
  async createMessage(
    // @Req() req: Request,
    @Body() createMessageDto: CreateMessageDto
  ) {
    try {
      // Get UID through access token
      // const intraID = req.user["intraID"];
      // const user: User = await this.userService.findUserByintraId(intraID);

      const userId = "3ec03adf-c7fc-4fa4-b30e-50cf872b8888";
      await this.messageService.createMessage(userId, createMessageDto);

      return HttpStatus.OK;
    } catch (error) {
      return error;
    }
  }
}
