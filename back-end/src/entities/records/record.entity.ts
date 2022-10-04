import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Group from "../group/group.entity";
import User from "../user/user.entity";

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupId: number;

  @Column()
  userId: number;

  @Column()
  type: number;

  @Column()
  createdTime: Date;
}

export default Record;
