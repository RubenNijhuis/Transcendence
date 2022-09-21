import { CreateRequestDto } from "src/dtos/friendrequest";
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";
export declare class FriendRequestController {
    private readonly friendrequestService;
    constructor(friendrequestService: FriendrequestService);
    getrequests(username: any): Promise<import("../../entities").FriendRequest[]>;
    senrequest(requestDto: CreateRequestDto): Promise<import("../../entities").FriendRequest>;
    removerequest(requestDto: CreateRequestDto): Promise<import("typeorm").DeleteResult>;
}
