import { User } from '../typeorm';
export declare type UserDetails = {
    intraId: string;
    username: string;
};
export declare type Done = (err: Error, user: User) => void;
