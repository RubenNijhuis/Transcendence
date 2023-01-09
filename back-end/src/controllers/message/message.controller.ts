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

////////////////////////////////////////////////////////////

@Controller("message")
@UseGuards(AccessTokenGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  //////////////////////////////////////////////////////////

  @Post("create")
  @UsePipes(ValidationPipe)
  async createMessage(
    @Req() req: Request,
    @Body() createMessageDto: CreateMessageDto
  ) {
    try {
      // Get UID through access token
      const profile: User = req.user["profile"];

      await this.messageService.createMessage(
        profile.uid,
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
