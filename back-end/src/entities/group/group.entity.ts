import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  Generated,
  PrimaryGeneratedColumn
} from "typeorm";
import GroupUser from "../groupuser/groupuser.entity";
import Message from "../message/message.entity";
import Record from "../record/record.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn({
    type: "bigint"
  })
  index: number;

  @Column()
  name: string;

  @Column()
  @Generated("uuid")
  uid: string;

  @Column()
  owner: string;

  @Column({
    nullable: true
  })
  password: string;

  @Column()
  protected: boolean;

  @OneToMany(() => GroupUser, (groupuser) => groupuser.group)
  @JoinTable()
  members: GroupUser[];

  @OneToMany(() => Message, (message) => message.group, {
    nullable: true
  })
  @JoinTable()
  messages: Message[];

  @OneToMany(() => Record, (record) => record.group)
  @JoinTable()
  records: Record[];
}
export default Group;
