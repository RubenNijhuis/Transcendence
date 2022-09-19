import BlockList from "src/entities/blocklist/blocklist.entity";
import { FriendList } from "src/modules/friendlist/friendlist.entity";
import { User } from "src/entities/user/user.entity";

const entities = [User, FriendList, BlockList];

export { User, FriendList };
export default entities;