import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/entities";
export declare class SessionSerializer extends PassportSerializer {
    serializeUser(user: User, done: (err: Error, user: User) => void): void;
    deserializeUser(user: User, done: (err: Error, user: User) => void): void;
}
