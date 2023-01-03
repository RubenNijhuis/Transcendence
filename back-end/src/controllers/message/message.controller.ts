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

  //////////////////////////////////////////////////////////

  @Post("create")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async createMessage(
    @Req() req: Request,
    @Body() createMessageDto: CreateMessageDto
  ) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const sender: User = await this.userService.findUserByintraId(intraID);

      await this.messageService.createMessage(
        sender.uid,
        createMessageDto.group_id,
        createMessageDto.content,
        createMessageDto.content_type
      );

      return HttpStatus.OK;
    } catch (error) {
      return error;
    }
  }
}
