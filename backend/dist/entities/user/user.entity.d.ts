import GroupUser from '../groupuser/groupuser.entity';
export declare class User {
    id: number;
    intraId: string;
    username: string;
    img_url: string;
    rank: number;
    wins: number;
    losses: number;
    tfaSecret: string;
    isTfaEnabled: boolean;
    jwtsession_token: string;
    groups: GroupUser[];
}
export default User;
