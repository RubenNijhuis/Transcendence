import { FriendlistModule } from "src/modules/friendlist/friendlist.module";
import { BlockListModule } from "./blocklist/blocklist.module";
import { FriendRequestModule } from "./friendrequest/friendrequest.module";
import { UserModule } from "./user/user.module";

const modules = [
    UserModule,
    FriendlistModule,
    FriendRequestModule,
    BlockListModule,
];

export {
    UserModule,
    FriendlistModule,
    FriendRequestModule,
    BlockListModule,
};

export default modules;