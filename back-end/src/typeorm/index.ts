import { BlockList } from "src/users/blocklist/blocklist.entity";
import { FriendList } from "src/users/friendlist/friendlist.entity";
import { User } from "src/users/user.entity";
import { Chat } from "src/groups/chat/chat.entity";
import { Group } from "src/groups/groups.entity";

const entities = [User, FriendList, Chat, Group];

export { User, FriendList, Chat, Group };
export default entities;
