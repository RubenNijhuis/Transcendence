import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BanUserDto } from "src/dtos/record/ban-user.dto";
import GroupUser from "src/entities/groupuser/groupuser.entity";
import Record from "src/entities/record/record.entity";
import { Repository } from "typeorm";
import { GroupService } from "src/services/group/group.service"
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { check } from "prettier";

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly groupService: GroupService
  ) {}

  getAllRecords() {
    return this.recordRepository.find();
  }

  getRecordByUserId(userId: string, groupId: string)
    {
      return (this.recordRepository
          .createQueryBuilder("record")
          .where({ groupId })
          .andWhere({ userId })
          .getOne());
    }

  async banUser(banUserDto : BanUserDto) {
    try {
      const admin : GroupUser = await this.groupService.findGroupuserById(banUserDto.admin, banUserDto.groupId);
      if (admin.permissions == 0)
        throw console.error("not permitted");
      const newRecord = this.recordRepository.create(banUserDto);
      return this.recordRepository.save(newRecord);
    }
    catch (err) {
      throw errorHandler(
        err,
        "Failed to ban member",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isUserBanned(userId : string, groupId : string) {
    try {
      const userRecord : Record = await this.getRecordByUserId(userId, groupId);
      const timeUntilUnban : number = userRecord.createdTime.valueOf() + (userRecord.timeToBan * 1000);
      const timeOfDay : number = new Date().getTime() //TODO: leak?
      if (timeUntilUnban >= timeOfDay)
        return true ;
      return false ;
    }
    catch (err) {
      throw errorHandler(
        err,
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
