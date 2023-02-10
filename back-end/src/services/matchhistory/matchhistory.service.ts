import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MatchHistory from "src/entities/matchhistory/matchhistory.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class MatchHistoryService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>
  ) {}

  getAllMatches() {
    return this.matchHistoryRepository.find();
  }

  findMatchById(id: number) {
    return this.matchHistoryRepository.findOne({ where: { id } });
  }

  async findMatchesByUserId(id: string): Promise<MatchHistory[]> {
    try {
      const matches: MatchHistory[] = await this.matchHistoryRepository
        .createQueryBuilder()
        .where({ playerOne: id })
        .orWhere({ playerTwo: id })
        .getMany();
      return matches;
    } catch (err) {
      return err;
    }
  }

  async createRecord(
    playerOne: string,
    playerTwo: string,
    scoreOne: number,
    scoreTwo: number,
    gameType: number
  ) {
    const query = {
      playerOne: playerOne,
      playerTwo: playerTwo,
      scoreOne: scoreOne,
      scoreTwo: scoreTwo,
      gameType: gameType
    };

    const newRecord: MatchHistory = this.matchHistoryRepository.create(query);
    if (scoreOne > scoreTwo) {
      await this.userService.incWins(playerOne);
      await this.userService.incLosses(playerTwo);
    } else {
      await this.userService.incWins(playerTwo);
      await this.userService.incLosses(playerOne);
    }
    return await this.matchHistoryRepository.save(newRecord);
  }

  async removeRecords(uid: string) {
    return await this.matchHistoryRepository
      .createQueryBuilder()
      .delete()
      .where({ playerOne: uid })
      .orWhere({ playerTwo: uid })
      .execute();
  }
}
