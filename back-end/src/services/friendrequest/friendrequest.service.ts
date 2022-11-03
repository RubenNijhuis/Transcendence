import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateRequestDto } from "../../dtos/friendrequest/create-request.dto";
import FriendRequests from "../../entities/friendrequest/friendrequest.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class FriendrequestService {
  inject: [UserService]
  constructor(
    @InjectRepository(FriendRequests)
    private readonly friendrequestRepository: Repository<FriendRequests>,
    private readonly userService: UserService
  ) {}

  private async filterOutput(requests: FriendRequests[]) {
    const filteredRequests = [];

    for (const item of requests) {
      filteredRequests.push(item.requested);
    }
    const ret = await this.userService.getUsersOnUsernames(filteredRequests);
    return ret;
  }

  async getRequests(username: string) {
    const requests: FriendRequests[] = await this.friendrequestRepository
      .createQueryBuilder("friend_requests")
      .where("requested = :username", { username })
      .getMany();
    return await this.filterOutput(requests);
  }

  async getRequested(username: string) {
    const requested: FriendRequests[] = await this.friendrequestRepository
    .createQueryBuilder("friend_requests")
    .where("username = :username", { username })
    .getMany();
  return await this.filterOutput(requested);
  }

  async isRequested(username:string, requested: string): Promise<boolean> {
    var ret: boolean = false;

    const request: FriendRequests = await this.friendrequestRepository
      .createQueryBuilder("friend_requests")
      .where("username = :username OR requested = :requested", { username, requested })
      .andWhere("username = :username OR requested = :requested", { username, requested })
      .getOne();

    if (request)
      ret = true;
    return ret;
  }

  async sendRequest(createrequestDto: CreateRequestDto): Promise<FriendRequests> {
    const newEntry: FriendRequests = this.friendrequestRepository.create(createrequestDto);
    const saveResponse: FriendRequests = await this.friendrequestRepository.save(newEntry);
    return saveResponse;
  }

  async removeRequest(username: string, requested: string): Promise<DeleteResult> {
    const removeResponse: DeleteResult = await this.friendrequestRepository
      .createQueryBuilder("friend_requests")
      .delete()
      .from("friend_list")
      .where("users = :username", { username })
      .andWhere("requested = :requested", { requested })
      .execute();

    return removeResponse;
  }
}
