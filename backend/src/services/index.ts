import { BlocklistService } from "./blocklist/blocklist.service";
import { FriendlistService } from "./friendlist/friendlist.service";
import { FriendrequestService } from "./friendrequest/friendrequest.service";
import { UserService } from "./user/user.service";

const services = [
    UserService,
    FriendlistService,
    FriendrequestService,
    BlocklistService
];

export {
    UserService,
    FriendlistService,
    FriendrequestService,
    BlocklistService
}

export default services;