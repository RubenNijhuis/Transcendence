import BlockList from "src/users/blocklist/blocklist.entity";
import { FriendList } from "src/users/friendlist/friendlist.entity";
import { User } from "src/users/user.entity";
declare const entities: (typeof User | typeof FriendList | typeof BlockList)[];
export { User, FriendList };
export default entities;
