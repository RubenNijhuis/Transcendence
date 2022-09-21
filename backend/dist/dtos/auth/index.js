"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameDto = exports.MailDto = exports.IntraDto = exports.ConfirmDto = exports.TfaDto = void 0;
const confirm_dto_1 = require("./confirm.dto");
Object.defineProperty(exports, "ConfirmDto", { enumerable: true, get: function () { return confirm_dto_1.ConfirmDto; } });
const intra_dto_1 = require("./intra.dto");
Object.defineProperty(exports, "IntraDto", { enumerable: true, get: function () { return intra_dto_1.IntraDto; } });
const mail_dto_1 = require("./mail.dto");
Object.defineProperty(exports, "MailDto", { enumerable: true, get: function () { return mail_dto_1.MailDto; } });
const tfa_dto_1 = require("./tfa.dto");
Object.defineProperty(exports, "TfaDto", { enumerable: true, get: function () { return tfa_dto_1.TfaDto; } });
const username_dto_1 = require("./username.dto");
Object.defineProperty(exports, "UsernameDto", { enumerable: true, get: function () { return username_dto_1.UsernameDto; } });
const authDtos = [
    tfa_dto_1.TfaDto,
    confirm_dto_1.ConfirmDto,
    intra_dto_1.IntraDto,
    mail_dto_1.MailDto,
    username_dto_1.UsernameDto
];
exports.default = authDtos;
//# sourceMappingURL=index.js.map