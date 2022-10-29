import { Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { intraIDDto } from "src/dtos/auth/intraID.dto";
import { TfaDto } from "src/dtos/auth/tfa.dto";
import { UserService } from "../user/user.service";
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from "@nestjs/config";
import { createDecipheriv } from 'crypto';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text: any) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text: any) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

@Injectable()
export class TfaService {
  constructor(private readonly usersService: UserService, private readonly configService: ConfigService) {}

  async isTfaValid(tfaDto: TfaDto) {
    const ret = await this.usersService.findUsersByIdNoFilter(tfaDto.intraID);
    var pw  = decrypt(ret.tfaSecret)
    const res = authenticator.check(tfaDto.tfaCode, pw);
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
    if (!ret.tfaSecret) {
      secret = authenticator.generateSecret();
      var pw = encrypt(secret);
      this.usersService.update2faSecret(intraIDdto.intraID, pw);
    } else {
      secret = decrypt(ret.tfaSecret);
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
//AVJFM5BBIY7VIFIY