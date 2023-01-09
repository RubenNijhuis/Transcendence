import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import FriendRequest from "../../entities/friendrequest/friendrequest.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class FriendrequestService {
  inject: [UserService];
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendrequestRepository: Repository<FriendRequest>,
    private readonly userService: UserService
  ) {}

  private async filterOutput(username: string, requests: FriendRequest[]) {
    const filteredRequests = [];

    for (const item of requests) {
      let name = item.requested;

      if (name === username) name = item.username;
      filteredRequests.push(name);
    }
    const ret = await this.userService.getUsersOnUsernames(filteredRequests);
    return ret;
  }

  async getRequests(username: string) {
    const requests: FriendRequest[] = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .where("requested = :username", { username })
      .getMany();
    return await this.filterOutput(username, requests);
  }

  async getRequested(username: string) {
    const requested: FriendRequest[] = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .where("username = :username", { username })
      .getMany();
    return await this.filterOutput(username, requested);
  }

  async isRequested(username: string, requested: string): Promise<boolean> {
    let ret = false;

    const request: FriendRequest = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .where("username = :username", { username })
      .andWhere("requested = :requested", { requested })
      .getOne();

    if (request) ret = true;
    return ret;
  }

  async sendRequest(
    username: string,
    requested: string
  ): Promise<FriendRequest> {
    const query = {
      username: username,
      requested: requested
    };

    const newEntry: FriendRequest = this.friendrequestRepository.create(query);
    const saveResponse: FriendRequest = await this.friendrequestRepository.save(
      newEntry
    );
    return saveResponse;
  }

  async removeRequest(
    username: string,
    requested: string
  ): Promise<DeleteResult> {
    const removeResponse: DeleteResult = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .delete()
      .from("friend_request")
      .where("username = :username OR requested = :username", { username })
      .andWhere("requested = :requested OR username = :requested", {
        requested
      })
      .execute();

    return removeResponse;
  }
}
