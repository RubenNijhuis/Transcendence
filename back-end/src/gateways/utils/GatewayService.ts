// typeorm sql injection library
import { InjectRepository } from "@nestjs/typeorm";

// user entity
import { User } from "src/entities";

// typeorm repository manipulation
import { Repository } from "typeorm";

// dtos
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { JwtPayload } from "src/types/auth";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/services/user/user.service";

/**
 *
 */
@Injectable()
export class GatewayService {
  constructor(
    @InjectRepository(User)
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async getMemberFromNewConnection(client: Socket): Promise<string> {
    if (client.handshake.query.type) {
      const connectionType = client.handshake.query.type;
      if (
        connectionType === "EventGateway" ||
        connectionType === "ChatGateway"
      ) {
        throw new Error("InternalGateway");
      }
    }

    const authToken = client.handshake.query.accessToken as string;

    if (!authToken) {
      throw new Error("No auth token specified during handshake");
    }

    const tokenPayload = this.jwtService.decode(authToken) as JwtPayload;
    const userFromJwt = await this.userService.findUserByUid(tokenPayload.uid);

    console.log(userFromJwt);
    if (!userFromJwt) {
      throw new Error("No user found by with token");
    }

    return userFromJwt.uid;
  }
}
