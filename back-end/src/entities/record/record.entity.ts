import {
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import Group from "../group/group.entity";

// Types
import { MessagePermission } from "../../types/chat";

////////////////////////////////////////////////////////////

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: string;

  @ManyToOne(() => Group, (group) => group.records)
  group: Group;

  @Column()
  userId: string;

  @Column()
  type: MessagePermission;

  @CreateDateColumn({
    nullable: true
  })
  createdTime: Date;

  @Column({
    nullable: true
  })
  timeToBan: number; //in seconds
}

////////////////////////////////////////////////////////////

export default Record;
