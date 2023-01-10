import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MatchHistory from "src/entities/matchhistory/matchhistory.entity";
import { CreateRecordDto } from "src/dtos/matchhistory/create-record.dto";

@Injectable()
export class MatchHistoryService {
  constructor(
    @InjectRepository(MatchHistory)
    private readonly matchHistoryRepository: Repository<MatchHistory>
  ) {}

  getAllMatches() {
    return this.matchHistoryRepository.find();
  }

  findMatchById(id: number) {
    return this.matchHistoryRepository.findOne({ where: { id } });
  }

  async findMatchesByUserId(id: string) {
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

  createRecord(createRecordDto: CreateRecordDto) {
    const newRecord: MatchHistory =
      this.matchHistoryRepository.create(createRecordDto);

    return this.matchHistoryRepository.save(newRecord);
  }

  async removeRecords(uid: string) {
    await this.matchHistoryRepository
      .createQueryBuilder()
      .delete()
      .where({ playerOne: uid })
      .orWhere({ playerTwo: uid })
      .execute();
  }
}
