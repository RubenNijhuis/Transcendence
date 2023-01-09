import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BanUserDto } from "src/dtos/record/ban-user.dto";
import GroupUser from "src/entities/groupuser/groupuser.entity";
import Record from "src/entities/record/record.entity";
import { Repository } from "typeorm";
import { GroupService } from "src/services/group/group.service";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { check } from "prettier";
import { exec } from "child_process";
import { UnBanUserDto } from "src/dtos/record/unban-user.dto";

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

  getRecordByUserId(userId: string, groupId: string) {
    return this.recordRepository
      .createQueryBuilder("record")
      .where({ groupId: groupId })
      .andWhere({ userId: userId })
      .getOne();
  }

  async banUser(adminId: string, banUserDto: BanUserDto) {
    try {
      const admin: GroupUser = await this.groupService.findGroupuserById(
        adminId,
        banUserDto.groupId
      );
      if (admin.permissions === 0)
        throw errorHandler(
          Error(),
          "Not permitted to Ban users",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      if (await this.isUserBanned(banUserDto.userId, banUserDto.groupId)) {
        const record: Record = await this.getRecordByUserId(
          banUserDto.userId,
          banUserDto.groupId
        );
        // TODO: this checks whether the user is already banned or not, maybe better solution?
        if (record.type === 1)
          throw errorHandler(
            Error(),
            "User is already banned",
            HttpStatus.INTERNAL_SERVER_ERROR
          );

        await this.recordRepository
          .createQueryBuilder("record")
          .delete()
          .where({ groupId: banUserDto.groupId })
          .andWhere({ userId: banUserDto.userId })
          .execute();
      }
      const newRecord: Record = this.recordRepository.create(banUserDto);
      return this.recordRepository.save(newRecord);
    } catch (err) {
      throw err;
    }
  }

  async unbanUser(adminId: string, unbanUserDto: UnBanUserDto) {
    const adminUser: GroupUser = await this.groupService.findGroupuserById(
      adminId,
      unbanUserDto.groupId
    );
    if (adminUser.permissions === 0)
      throw errorHandler(
        Error(),
        "You are not allowed to unban this user",
        HttpStatus.FORBIDDEN
      );
    const userRecord: Record = await this.getRecordByUserId(
      unbanUserDto.userId,
      unbanUserDto.groupId
    );
    if (!userRecord)
      throw errorHandler(
        Error(),
        "This user is not banned/muted",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    await this.recordRepository
      .createQueryBuilder("record")
      .delete()
      .where({ groupId: unbanUserDto.groupId })
      .andWhere({ userId: unbanUserDto.userId })
      .execute();
  }

  async isUserBanned(userId: string, groupId: string) {
    const userRecord: Record = await this.getRecordByUserId(userId, groupId);
    if (!userRecord) return false;
    if (userRecord.type === 1) return true;
    const timeUntilUnban: number =
      userRecord.createdTime.valueOf() + userRecord.timeToBan * 1000;
    const timeOfDay: number = new Date().getTime(); //TODO: leak?
    if (timeUntilUnban >= timeOfDay) return true;
    await this.recordRepository
      .createQueryBuilder("record")
      .delete()
      .where({ groupId: groupId })
      .andWhere({ userId: userId })
      .execute();
    return false;
  }
}
