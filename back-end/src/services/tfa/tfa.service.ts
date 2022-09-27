import { Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { TfaDto } from "src/dtos/auth/tfa.dto";
import { UsernameDto } from "src/dtos/auth/username.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class TfaService {
  constructor(private readonly usersService: UserService) {}

  async isTfaValid(tfaDto: TfaDto) {
    const ret = await this.usersService.findUserByUsername(tfaDto.username);
    console.log(tfaDto.tfaCode);
    console.log(ret.tfaSecret);

    const res = authenticator.check(tfaDto.tfaCode, ret.tfaSecret);
    console.log(res);
    return res;
  }

  async generateTfaSecret(usernameDto: UsernameDto) {
    const ret = await this.usersService.findUserByUsername(
      usernameDto.username
    );

    if (!ret || ret.isTfaEnabled === false) {
      throw TypeError;
    }
    var secret = "";
    if (ret.tfaSecret == "") {
      secret = authenticator.generateSecret();
      console.log("secret:");
      console.log(secret);
      this.usersService.update2faSecret(usernameDto, secret);
    } else {
      secret = ret.tfaSecret;
    }
    const otpauthUrl = authenticator.keyuri(
      usernameDto.username,
      "TRANSCEND_2FA",
      secret
    );

    console.log("otapathurl:");
    console.log(otpauthUrl);

    console.log("todataurl:");
    const res = toDataURL(otpauthUrl);

    return toDataURL(otpauthUrl);
  }
}
