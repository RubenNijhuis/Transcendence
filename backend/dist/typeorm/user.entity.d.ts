export declare class User {
    id: number;
    uid: string;
    username: string;
    img_url: string;
    email: string;
    rank: number;
    wins: number;
    losses: number;
    friends: string;
    blocked: string;
    twoFactorAuthenticationSecret: string;
    isTwoFactorAuthenticationEnabled: boolean;
}
export default User;
