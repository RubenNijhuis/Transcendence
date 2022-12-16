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
  owner: string;

  @Column()
  @Generated("uuid")
  uid: string;

  @Column({
    nullable: true
  })
  password: string;

  @Column()
  protected: boolean;

  @Column()
  name: string;

  @OneToMany((type) => GroupUser, (groupuser) => groupuser.group)
  @JoinTable()
  users: GroupUser[];

  @OneToMany((type) => Message, (message) => message.group, {
    nullable: true
  })
  @JoinTable()
  messages: Message[];

  @OneToMany((type) => Record, (record) => record.group)
  @JoinTable()
  records: Record[];
}
export default Group;
