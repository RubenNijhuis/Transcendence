import { forwardRef, Inject, Injectable } from "@nestjs/common";
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
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async filterFriendrequests(username: string, requests: FriendRequest[]) {
    const filteredRequests = [];

    for (const item of requests) {
      let name = item.requested;

      if (name === username) name = item.username;
      filteredRequests.push(name);
    }
    const ret = this.userService.filterProfiles(
      await this.userService.getUsersOnUsernames(filteredRequests)
    );
    return ret;
  }

  async getRequests(username: string) {
    const requests: FriendRequest[] = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .where("requested = :username", { username })
      .getMany();
    return requests;
  }

  async getRequested(username: string) {
    const requested: FriendRequest[] = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .where("username = :username", { username })
      .getMany();
    return requested;
  }

  async isRequested(username: string, requested: string): Promise<boolean> {
    let ret = false;

    const request: FriendRequest = await this.friendrequestRepository
      .createQueryBuilder("friend_request")
      .where("username = :username AND requested = :requested", {
        requested,
        username
      })
      .orWhere("username = :requested AND requested = :username", {
        requested,
        username
      })
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
      .where("username = :username AND requested = :requested", {
        requested,
        username
      })
      .orWhere("username = :requested AND requested = :username", {
        requested,
        username
      })
      .execute();

    return removeResponse;
  }

  async removePerson(username: string) {
    const removeFriendResponse: DeleteResult =
      await this.friendrequestRepository
        .createQueryBuilder("friend_request")
        .delete()
        .from("friend_request")
        .where({ username })
        .orWhere({ requested: username })
        .execute();
    return removeFriendResponse;
  }
}
