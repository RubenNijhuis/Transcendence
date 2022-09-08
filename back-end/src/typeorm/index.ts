import BlockList from "src/users/blocklist/blocklist.entity";
import { FriendList } from "src/users/friendlist/friendlist.entity";
import { User } from "src/users/user.entity";

const entities = [User, FriendList, BlockList];

export { User, FriendList };
export default entities;