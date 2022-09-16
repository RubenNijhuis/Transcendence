export declare class User {
    id: number;
    intraId: string;
    username: string;
    img_url: string;
    rank: number;
    wins: number;
    losses: number;
    twoFactorAuthenticationSecret: string;
    isTwoFactorAuthenticationEnabled: boolean;
    jwtsession_token: string;
}
export default User;
