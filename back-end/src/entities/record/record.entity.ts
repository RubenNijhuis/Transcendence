import { Column, Entity, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import Group from "../group/group.entity";
import User from "../user/user.entity";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @ManyToOne((type) => Group, (group) => group.records)
  group: Group;

  @Column()
  userId: string;

  @Column()
  type: number;         //TODO: type 1 = ban; type2 = mute

  @CreateDateColumn({
    nullable: true
  })
  createdTime: Date;

  @Column({
    nullable: true
  })
  timeToBan: number; //in seconds
}

export default Record;
