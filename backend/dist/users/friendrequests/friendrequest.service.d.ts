import { Repository } from "typeorm";
import { CreateRequestDto } from "./dtos/create-request.dto";
import FriendRequests from "./friendrequest.entity";
export declare class FriendrequestService {
    private readonly friendlistRepository;
    constructor(friendlistRepository: Repository<FriendRequests>);
    getRequests(username: string): Promise<FriendRequests[]>;
    sendRequest(createrequestDto: CreateRequestDto): Promise<FriendRequests>;
    removeRequest(username: string, requested: string): Promise<import("typeorm").DeleteResult>;
}
