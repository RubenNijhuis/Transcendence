"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendList = exports.User = void 0;
const blocklist_entity_1 = require("../users/blocklist/blocklist.entity");
const friendlist_entity_1 = require("../users/friendlist/friendlist.entity");
Object.defineProperty(exports, "FriendList", { enumerable: true, get: function () { return friendlist_entity_1.FriendList; } });
const user_entity_1 = require("../users/user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.User; } });
const entities = [user_entity_1.User, friendlist_entity_1.FriendList, blocklist_entity_1.default];
exports.default = entities;
//# sourceMappingURL=index.js.map