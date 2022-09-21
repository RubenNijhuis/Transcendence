"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockList = exports.FriendRequest = exports.FriendList = exports.User = void 0;
const blocklist_entity_1 = require("./blocklist/blocklist.entity");
exports.BlockList = blocklist_entity_1.default;
const friendlist_entity_1 = require("./friendlist/friendlist.entity");
Object.defineProperty(exports, "FriendList", { enumerable: true, get: function () { return friendlist_entity_1.FriendList; } });
const user_entity_1 = require("./user/user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.User; } });
const friendrequest_entity_1 = require("./friendrequest/friendrequest.entity");
exports.FriendRequest = friendrequest_entity_1.default;
const entities = [
    user_entity_1.User,
    friendlist_entity_1.FriendList,
    friendrequest_entity_1.default,
    blocklist_entity_1.default
];
exports.default = entities;
//# sourceMappingURL=index.js.map