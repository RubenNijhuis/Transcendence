"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPasswordDto = exports.EditGroupDto = exports.CreatePasswordDto = exports.CreateAdminDto = exports.CreateGroupDto = exports.CreateMessageDto = void 0;
const create_admin_dto_1 = require("./create-admin.dto");
Object.defineProperty(exports, "CreateAdminDto", { enumerable: true, get: function () { return create_admin_dto_1.CreateAdminDto; } });
const create_group_dto_1 = require("./create-group.dto");
Object.defineProperty(exports, "CreateGroupDto", { enumerable: true, get: function () { return create_group_dto_1.CreateGroupDto; } });
const create_message_dto_1 = require("./create-message.dto");
Object.defineProperty(exports, "CreateMessageDto", { enumerable: true, get: function () { return create_message_dto_1.CreateMessageDto; } });
const create_password_dto_1 = require("./create-password.dto");
Object.defineProperty(exports, "CreatePasswordDto", { enumerable: true, get: function () { return create_password_dto_1.CreatePasswordDto; } });
const edit_group_dto_1 = require("./edit-group.dto");
Object.defineProperty(exports, "EditGroupDto", { enumerable: true, get: function () { return edit_group_dto_1.EditGroupDto; } });
const edit_password_dto_1 = require("./edit-password.dto");
Object.defineProperty(exports, "EditPasswordDto", { enumerable: true, get: function () { return edit_password_dto_1.EditPasswordDto; } });
const chatDtos = [
    create_message_dto_1.CreateMessageDto,
    create_group_dto_1.CreateGroupDto,
    create_admin_dto_1.CreateAdminDto,
    create_password_dto_1.CreatePasswordDto,
    edit_group_dto_1.EditGroupDto,
    edit_password_dto_1.EditPasswordDto
];
exports.default = chatDtos;
//# sourceMappingURL=index.js.map