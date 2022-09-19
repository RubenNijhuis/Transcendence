import { IntraDto } from "..";
import { ConfirmDto } from "./confirm.dto";
import { MailDto } from "./mail.dto";
import { TwoFaDto } from "./twofa.dto";
import { UsernameDto } from "./username.dto";

const authDtos = [
    TwoFaDto,
    ConfirmDto,
    IntraDto,
    MailDto,
    UsernameDto
];

export {
    TwoFaDto,
    ConfirmDto,
    IntraDto,
    MailDto,
    UsernameDto
};

export default authDtos;