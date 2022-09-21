import { Repository } from "typeorm";
import { CreateRequestDto } from "../../dtos/friendrequest/create-request.dto";
import FriendRequests from "../../entities/friendrequest/friendrequest.entity";
export declare class FriendrequestService {
    private readonly friendlistRepository;
    constructor(friendlistRepository: Repository<FriendRequests>);
    getRequests(username: string): Promise<FriendRequests[]>;
    sendRequest(createrequestDto: CreateRequestDto): Promise<FriendRequests>;
    removeRequest(username: string, requested: string): Promise<import("typeorm").DeleteResult>;
}
