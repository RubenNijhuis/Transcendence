import { User } from '../typeorm';

export type UserDetails = {
    // id: string;
    intraId: string;
    username: string;
    // accessToken: string;
    // refreshToken: string;
    // email: string;
    // rank: string;
    // wins: string;
    // losses: string;
    // friends: string;
    // blocked: string;

}

export type Done = (err: Error, user: User) => void;