import BlockList from "src/entities/blocklist.entity";
import { FriendList } from "src/modules/friendlist.entity";
import { User } from "src/entities/user.entity";

const entities = [User, FriendList, BlockList];

export { User, FriendList };
export default entities;