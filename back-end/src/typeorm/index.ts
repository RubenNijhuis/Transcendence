import { FriendList } from "src/users/friendlist/friendlist.entity";
import { User } from "src/users/user.entity";
import { Chat } from "src/chat/chat.entity"

const entities = [User, FriendList, Chat];

export { User, FriendList, Chat };
export default entities;