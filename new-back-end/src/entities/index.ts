import BlockList from "src/entities/blocklist/blocklist.entity";
import { FriendList } from "src/entities/friendlist/friendlist.entity";
import { User } from "src/entities/user/user.entity";
import FriendRequest from "./friendrequest/friendrequest.entity";

const entities = [
    User,
    FriendList,
    FriendRequest,
    BlockList
];

export {
    User,
    FriendList,
    FriendRequest,
    BlockList
};

export default entities;