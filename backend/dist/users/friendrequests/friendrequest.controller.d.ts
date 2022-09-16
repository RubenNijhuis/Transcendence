import { CreateRequestDto } from "./dtos/create-request.dto";
import { FriendrequestService } from "./friendrequest.service";
export declare class FriendRequestController {
    private readonly friendrequestService;
    constructor(friendrequestService: FriendrequestService);
    getrequests(username: any): Promise<import("./friendrequest.entity").FriendRequests[]>;
    senrequest(requestDto: CreateRequestDto): Promise<import("./friendrequest.entity").FriendRequests>;
    removerequest(requestDto: CreateRequestDto): Promise<import("typeorm").DeleteResult>;
}
