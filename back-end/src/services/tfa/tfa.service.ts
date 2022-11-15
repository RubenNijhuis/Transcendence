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

function encrypt(text: any, key :any, iv :any) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text: any, key :any, iv :any) {
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
    //you can only confirm if the secret is set
    if (!ret || !ret.tfaSecret || !ret.tfa_iv || !ret.tfa_key)
      throw TypeError;

    //get the key and iv to decyrpt the secret
    const key = Buffer.from(await this.usersService.getTFAkey(ret.uid), "hex");
    const iv = Buffer.from(await this.usersService.getTFAiv(ret.uid), "hex");
    var pw  = decrypt(ret.tfaSecret, key, iv);

    //check if decrypted code is valid
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

    //Create and set key and iv needed for encryption and decryption, if it already exist get form database
    var key : any = null;
    var iv : any = null;
    if (!ret.tfa_key)
    {
      key = crypto.randomBytes(32);
      await this.usersService.setTFAkey(ret.uid, key.toString("hex"));
    }
    else 
      key = Buffer.from(await this.usersService.getTFAkey(ret.uid), "hex");
    if (!ret.tfa_iv)
    {
      iv = crypto.randomBytes(16);
      await this.usersService.setTFAiv(ret.uid, iv.toString("hex"));
    }  
    else 
      iv = Buffer.from(await this.usersService.getTFAiv(ret.uid), "hex");

    //get secret from database else create, encrypt and set one
    var secret = "";
    if (!ret.tfaSecret)
    {
      secret = authenticator.generateSecret();
      var pw = encrypt(secret, key, iv);
      this.usersService.update2faSecret(intraIDdto.intraID, pw);
    }
    else
      secret = decrypt(ret.tfaSecret, key, iv);

    //use secret to make the data for the qr
    const otpauthUrl = authenticator.keyuri(
      "",
      "TRANSCEND_2FA",
      secret
    );

    //return the url for qr
    return toDataURL(otpauthUrl);
  }
}