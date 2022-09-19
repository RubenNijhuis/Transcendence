import { BlockListController } from "./blocklist/blocklist.controller";
import { FriendlistController } from "./friendlist/friendlist.controller";
import { FriendRequestController } from "./friendrequest/friendrequest.controller";
import { UsersController } from "./user/user.controller";

const controllers = [
    UsersController,
    FriendlistController,
    FriendRequestController,
    BlockListController,
];

export {
    UsersController,
    FriendlistController,
    FriendRequestController,
    BlockListController,
};

export default controllers;