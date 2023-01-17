// Nestjs
import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";

// Entitities
import GroupUser from "src/entities/groupuser/groupuser.entity";
import Record from "src/entities/record/record.entity";

// TypeORM
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

// Servies
import { GroupService } from "src/services/group/group.service";

// Types
import { MessagePermission } from "src/types/chat";
import { GroupPermissionLevel } from "src/types/group";

////////////////////////////////////////////////////////////

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService
  ) {}

  //////////////////////////////////////////////////////////

  async getAllRecords(): Promise<Record[]> {
    return await this.recordRepository.find();
  }

  async getRecordByUserId(userId: string, groupId: string): Promise<Record> {
    return await this.recordRepository
      .createQueryBuilder("record")
      .where({ groupId: groupId })
      .andWhere({ userId: userId })
      .getOne();
  }

  async createRecord(
    uid: string,
    groupUid: string,
    type: MessagePermission,
    time?: number,
    date?: Date
  ): Promise<Record> {
    if (await this.getRecordByUserId(uid, groupUid))
      this.deleteRecord(uid, groupUid);
    const query = {
      groupId: groupUid,
      userId: uid,
      type: type,
      createdTime: date,
      timeOfBan: time
    };
    const new_record = this.recordRepository.create(query);
    return await this.recordRepository.save(new_record);
  }

  async setMuteTime(
    uid: string,
    groupUid: string,
    time: number
  ): Promise<UpdateResult> {
    const query = {
      type: MessagePermission.Mute,
      timeToBan: time,
      timeOfBan: new Date()
    };
    return await this.recordRepository
      .createQueryBuilder("record")
      .update()
      .set(query)
      .where({ groupId: groupUid })
      .andWhere({ userId: uid })
      .execute();
  }

  async deleteRecord(uid: string, groupUid: string): Promise<DeleteResult> {
    return await this.recordRepository
      .createQueryBuilder("record")
      .delete()
      .where({ groupId: groupUid })
      .andWhere({ userId: uid })
      .execute();
  }

  /*
   *	returns unauthorized if user is default level
   *	returns badrequest if user or the other does not exist
   *	returns null if valid input
   */
  private async checkInput(
    uid: string,
    otherUid: string,
    groupUid: string
  ): Promise<HttpStatus | null> {
    try {
      const user: GroupUser = await this.groupService.findGroupuserById(
        uid,
        groupUid
      );
      const other: GroupUser = await this.groupService.findGroupuserById(
        otherUid,
        groupUid
      );

      if (!user || !other) return HttpStatus.BAD_REQUEST;
      if (
        user.permissions === GroupPermissionLevel.Default ||
        other.permissions === GroupPermissionLevel.Owner
      )
        return HttpStatus.UNAUTHORIZED;
      return null;
    } catch (err) {
      throw err;
    }
  }

  /*
   *	Use this method to ban or mute a user
   *
   *	if you ban a user who is already banned, nothing happens
   *	uses checkInput to validate input and returns httpstatus accordingly
   *
   *	returns a badrequest if you want to mute a banned person
   *	returns ok on successfull set
   */
  async setRecord(
    uid: string,
    muteUid: string,
    groupUid: string,
    type: MessagePermission,
    time?: number
  ): Promise<HttpStatus> {
    try {
      const ret = await this.checkInput(uid, muteUid, groupUid);
      if (ret) return ret;

      const record: Record = await this.getRecordByUserId(muteUid, groupUid);
      if (record && record.type === MessagePermission.Ban) {
        if (type === MessagePermission.Mute) return HttpStatus.BAD_REQUEST;
      } else {
        await this.createRecord(muteUid, groupUid, type, time, new Date());
      }
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  /*
   *	Use this method to unmute/unban people
   *
   *	uses checkInput to validate input and returns httpstatus accordingly
   *
   *	returns deletion result on success
   */
  async removeBanOrMute(
    uid: string,
    otherUid: string,
    groupUid: string
  ): Promise<HttpStatus | DeleteResult> {
    const ret = await this.checkInput(uid, otherUid, groupUid);
    if (ret) return ret;

    return await this.recordRepository
      .createQueryBuilder("record")
      .delete()
      .where({ groupId: groupUid })
      .andWhere({ userId: otherUid })
      .execute();
  }

  private expiredMute(record: Record): boolean {
    const timeUntilUnban =
      record.createdTime.valueOf() + record.timeToBan * 1000;
    const timeOfDay: number = new Date().getTime();

    return timeUntilUnban >= timeOfDay;
  }

  async checkIfMuted(userId: string, groupId: string): Promise<boolean> {
    const record: Record = await this.getRecordByUserId(userId, groupId);

    if (!record) return false;

    if (this.expiredMute(record)) {
      await this.recordRepository
        .createQueryBuilder("record")
        .delete()
        .where({ groupId: groupId })
        .andWhere({ userId: userId })
        .execute();
      return false;
    }
    return true;
  }

  async checkBan(userId: string, groupId: string): Promise<boolean> {
    const record: Record = await this.getRecordByUserId(userId, groupId);

    if (!record) return false;

    if (record.type === MessagePermission.Ban) return true;
    return false;
  }
}
