import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import BlockList from "../../entities/blocklist/blocklist.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class BlocklistService {
  inject: [UserService];
  constructor(
    @InjectRepository(BlockList)
    private readonly blocklistRepository: Repository<BlockList>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async filterBlocklist(username: string, blocked: BlockList[]) {
    const filteredFriends = [];

    for (const block of blocked) {
      let name = block.blockname;

      if (name === username) name = block.username;
      filteredFriends.push(name);
    }
    const ret = this.userService.filterProfiles(
      await this.userService.getUsersOnUsernames(filteredFriends)
    );
    return ret;
  }

  async getBlockedUid(uid: string): Promise<string[]> {
    const usernameFromUid = (await this.userService.findUserByUid(uid)).uid;

    const list = await this.filterBlocklist(
      usernameFromUid,
      await this.getBlocked(usernameFromUid)
    );

    const ret: string[] = [];

    for (let i = 0; i < list.length; i++) {
      ret.push(list[i].uid);
    }

    return ret;
  }

  async getBlocked(username: string): Promise<BlockList[]> {
    const blocked: BlockList[] = await this.blocklistRepository
      .createQueryBuilder("block_list")
      .where({ username })
      .getMany();
    return blocked;
  }

  async isBlock(username: string, blockname: string): Promise<boolean> {
    let ret = false;
    const blocked = await this.blocklistRepository
      .createQueryBuilder("block_list")
      .where({ username })
      .andWhere({ blockname })
      .getOne();

    if (blocked) ret = true;
    return ret;
  }

  async blockPerson(username: string, blockname: string): Promise<BlockList> {
    const query = {
      username: username,
      blockname: blockname
    };
    const newEntry: BlockList = this.blocklistRepository.create(query);
    const saveResponse: BlockList = await this.blocklistRepository.save(
      newEntry
    );

    return saveResponse;
  }

  async unblockPerson(
    username: string,
    blockname: string
  ): Promise<DeleteResult> {
    const removeBlockResponse: DeleteResult = await this.blocklistRepository
      .createQueryBuilder("block_list")
      .delete()
      .from("block_list")
      .where({ username })
      .andWhere({ blockname })
      .execute();
    return removeBlockResponse;
  }

  async removePerson(username: string) {
    const removeBlockResponse: DeleteResult = await this.blocklistRepository
      .createQueryBuilder("block_list")
      .delete()
      .from("block_list")
      .where({ username })
      .orWhere({ blockname: username })
      .execute();
    return removeBlockResponse;
  }
}
