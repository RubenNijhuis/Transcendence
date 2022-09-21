import { ConfirmDto } from "./confirm.dto";
import { IntraDto } from "./intra.dto";
import { MailDto } from "./mail.dto";
import { TfaDto } from "./tfa.dto";
import { UsernameDto } from "./username.dto";

const authDtos = [TfaDto, ConfirmDto, IntraDto, MailDto, UsernameDto];

export { TfaDto, ConfirmDto, IntraDto, MailDto, UsernameDto };

export default authDtos;
