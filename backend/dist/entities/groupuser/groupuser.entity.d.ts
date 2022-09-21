import Group from '../group/group.entity';
import User from '../user/user.entity';
export declare class GroupUser {
    id: number;
    groupId: number;
    group: Group;
    userId: number;
    user: User;
    userType: number;
}
export default GroupUser;
