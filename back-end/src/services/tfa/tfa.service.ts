import { Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { intraIDDto } from "src/dtos/auth/intraID.dto";
import { TfaDto } from "src/dtos/auth/tfa.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class TfaService {
  constructor(private readonly usersService: UserService) {}

  async isTfaValid(tfaDto: TfaDto) {
    const ret = await this.usersService.findUsersByIdNoFilter(tfaDto.intraID);

    const res = authenticator.check(tfaDto.tfaCode, ret.tfaSecret);
    return res;
  }

  async generateTfaSecret(intraIDdto: intraIDDto) {
    const ret = await this.usersService.findUsersByIdNoFilter(
      intraIDdto.intraID
    );

    if (!ret || ret.isTfaEnabled === false) {
      throw TypeError;
    }
    var secret = "";
    if (ret.tfaSecret == "") {
      secret = authenticator.generateSecret();
      console.log("secret=", secret);
      this.usersService.update2faSecret(intraIDdto.intraID, secret);
    } else {
      secret = ret.tfaSecret;
    }
    const otpauthUrl = authenticator.keyuri(
      "",
      "TRANSCEND_2FA",
      secret
    );

    const res = toDataURL(otpauthUrl);

    return toDataURL(otpauthUrl);
  }
}
